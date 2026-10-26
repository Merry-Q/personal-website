import { chromium } from '../自媒体AI工作台/node_modules/playwright-core/index.mjs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const site=dirname(fileURLToPath(import.meta.url));
const output=resolve(site,'../docs/portfolio-design-2026-10-27');
await mkdir(output,{recursive:true});
const catalog=JSON.parse(await readFile(resolve(site,'portfolio.json'),'utf8'));
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const result={checks:[],errors:[]};
try {
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 // Verify local rendering also works without Google Fonts / other external resources.
 await context.route('**/*',route=>new URL(route.request().url()).hostname==='localhost'?route.continue():route.abort());
 const page=await context.newPage();
 page.on('pageerror',e=>result.errors.push(e.message));
 await page.goto('http://localhost:4310/',{waitUntil:'domcontentloaded'});
 assert.deepEqual(await page.locator('#tracks .portfolio-project').evaluateAll(ns=>ns.map(n=>n.id)),['project-offeros','project-paper','project-baby','project-sticky']);
 assert.equal(await page.locator('#research .portfolio-project').count(),7);
 assert.equal(await page.locator('.project-cover').count(),4);
 await page.screenshot({path:resolve(output,'hero-desktop.png')});
 const docs=await page.locator('a[download][href^="/materials/"]').evaluateAll(ns=>ns.map(n=>n.getAttribute('href')));
 assert.equal(docs.length,23);
 for(const href of docs){const r=await context.request.get('http://localhost:4310'+href);assert.equal(r.status(),200);assert.ok((await r.body()).length>10);}
 for(const p of catalog.filter(p=>p.case)){const r=await context.request.get('http://localhost:4310'+p.case);assert.equal(r.status(),200);assert.ok((await r.text()).includes('阅读案例'));}
 result.checks.push('4 featured / 7 exploratory; 4 real image covers; 23 document links; 4 existing case routes');
 await page.locator('[data-project-nav="offeros"]').click();
 await page.waitForFunction(()=>document.querySelector('[data-project-nav="offeros"]').getAttribute('aria-current')==='location');
 await page.locator('#project-offeros .cover-mat img').waitFor();
 await page.screenshot({path:resolve(output,'side-a-desktop.png')});
 await page.locator('[data-project-nav="paper"]').click();
 await page.waitForFunction(()=>document.querySelector('[data-project-nav="paper"]').getAttribute('aria-current')==='location');
 await page.screenshot({path:resolve(output,'paper-desktop.png')});
 const summary=page.locator('#detail-paper summary');
 await summary.focus();await page.keyboard.press('Enter');
 assert.equal(await page.locator('#detail-paper').getAttribute('open'),'');
 await page.locator('#detail-paper [data-preview]').first().click();
 await page.waitForFunction(()=>document.querySelector('#material-content').textContent.includes('paperMind'));
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('#material-dialog').isVisible(),false);
 await summary.click();
 await page.locator('[data-section-nav="research"]').click();
 await page.waitForFunction(()=>document.querySelector('[data-section-nav="research"]').getAttribute('aria-current')==='location');
 await page.screenshot({path:resolve(output,'side-b-desktop.png')});
 result.checks.push('native anchor navigation / active chapter and track / keyboard details / preview and Escape');
 for(const width of [834,390,320]){
  await page.setViewportSize({width,height:900});
  await page.goto('http://localhost:4310/#project-offeros',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('#project-offeros .cover-mat img').complete);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow at '+width);
  assert.equal(await page.getByRole('navigation',{name:'主导航'}).getByRole('link',{name:'探索创新',exact:true}).isVisible(),true);
  await page.locator('#project-offeros .project-copy').scrollIntoViewIfNeeded();
  const rect=await page.locator('.edition-nav').boundingBox();assert.ok(rect.y>=70&&rect.y<=80);
  await page.screenshot({path:resolve(output,'project-'+width+'.png')});
  await page.goto('http://localhost:4310/#research',{waitUntil:'domcontentloaded'});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Side B overflow at '+width);
 }
 result.checks.push('1440 / 834 / 390 / 320 responsive layout; sticky directory below header');
 // Test the material error path and retry without reaching an external service.
 await page.goto('http://localhost:4310/#detail-paper',{waitUntil:'domcontentloaded'});
 await page.route('**/materials/paper-1.md',route=>route.fulfill({status:503,body:'unavailable'}));
 await page.locator('#detail-paper [data-preview]').first().click();
 await page.getByText('资料加载失败。请下载原文件，或关闭后重新打开。',{exact:true}).waitFor();
 await page.keyboard.press('Escape');
 await page.unroute('**/materials/paper-1.md');
 await page.locator('#detail-paper [data-preview]').first().click();
 await page.waitForFunction(()=>document.querySelector('#material-content').textContent.includes('paperMind'));
 await page.keyboard.press('Escape');
 result.checks.push('preview failure feedback / close / retry recovery');
 await page.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
 assert.equal(await page.locator('.project-cover').first().evaluate(n=>getComputedStyle(n).animationName),'none');
 const plain=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 await plain.route('**/*',route=>new URL(route.request().url()).hostname==='localhost'?route.continue():route.abort());
 const offline=await plain.newPage();await offline.goto('http://localhost:4310/',{waitUntil:'domcontentloaded'});
 assert.equal(await offline.locator('#tracks .portfolio-project').count(),4);
 assert.equal(await offline.locator('#project-paper .project-copy').evaluate(n=>getComputedStyle(n).opacity),'1');
 result.checks.push('reduced motion and no-JavaScript readable fallback');
 assert.deepEqual(result.errors,[]);
 result.pass=true;
} catch(e){result.pass=false;result.error=e.message;process.exitCode=1;}
finally { await writeFile(resolve(output,'browser-results.json'),JSON.stringify(result,null,2));console.log(result);await browser.close(); }
