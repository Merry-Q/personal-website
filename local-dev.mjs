import { readFileSync, readdirSync, mkdirSync, openSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import net from 'node:net';
const site = dirname(fileURLToPath(import.meta.url));
const root = resolve(site, '..');
export const services = JSON.parse(readFileSync(resolve(site, 'local-services.json'), 'utf8'));
export function localEnvironment(cwd) {
  const env = { ...process.env, NEXT_TELEMETRY_DISABLED: '1' };
  // Clear values from all local dotenv files without printing or changing those files.
  for (const name of readdirSync(cwd).filter(n => /^\.env(?:\.|$)/.test(n))) {
    for (const line of readFileSync(resolve(cwd, name), 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z_0-9]*)\s*=/);
      if (match) env[match[1]] = '';
    }
  }
  for (const key of Object.keys(env)) if (/API_KEY|TOKEN|SECRET|DATABASE_URL|SUPABASE|OSS_|QWEN_|GLM_|OPENAI_|ANTHROPIC_/.test(key)) env[key] = '';
  Object.assign(env, { PORTFOLIO_LOCAL_ONLY: '1', NEXT_PUBLIC_PORTFOLIO_LOCAL_ONLY: 'true', NEXT_PUBLIC_DEMO_MODE: 'true', NEXT_PUBLIC_USE_MOCK_AI: 'true', NEXT_PUBLIC_BASE_PATH: '', LLM_MODE: 'mock', ENVIRONMENT: 'development', OFFEROS_BASE_PATH: '', DATABASE_URL: 'postgres://localhost:1/portfolio_unconfigured', NEXT_PUBLIC_SUPABASE_URL: '', NEXT_PUBLIC_SUPABASE_ANON_KEY: '', PORTFOLIO_DISABLE_BACKGROUND: '1', OFFEROS_DATA_DIR: resolve(root,'docs/portfolio-audit-2026-10-10/runtime/offeros') });
  // Empty numeric dotenv entries must not override application defaults.
  for (const [key,value] of Object.entries(env)) if (value === '' && /PORT$|TIMEOUT|MAX_UPLOAD|MAX_.*MB/.test(key)) delete env[key];
  return env;
}
function free(port) {
  return new Promise((yes,no) => {
    const probe=net.createServer();
    probe.once('error',()=>no(new Error(`端口 ${port} 已占用。请检查占用程序；不会终止已有进程，也不会自动换端口。`)));
    probe.listen(port,'127.0.0.1',()=>probe.close(yes));
  });
}
async function main() {
  const args=process.argv.slice(2);
  if(args.includes('--list')) { for(const s of services) console.log(`${s.id.padEnd(16)} http://localhost:${s.port}/`); return; }
  const ids=args.length?args:['home','offeros','baby'];
  const selected=ids.includes('--all')?services:ids.map(id=>{const s=services.find(s=>s.id===id);if(!s)throw new Error(`未知项目 ${id}，用 --list 查看。`);return s;});
  for(const s of selected) await free(s.port);
  const children=[];
  const logs=resolve(root,'docs/portfolio-audit-2026-10-10/runtime');mkdirSync(logs,{recursive:true});
  for(const s of selected){
    const cwd=resolve(root,s.dir), env=localEnvironment(cwd);
    let command=process.execPath, params;
    if(s.kind==='vite') params=[resolve(cwd,'node_modules/vite/bin/vite.js'),'--host','127.0.0.1','--port',String(s.port),'--strictPort'];
    if(s.kind==='next') params=[resolve(cwd,'node_modules/next/dist/bin/next'),'dev','--hostname','127.0.0.1','--port',String(s.port)];
    if(s.kind==='fastapi'){command='python';params=['-m','uvicorn',s.module,'--host','127.0.0.1','--port',String(s.port)];}
    if(s.kind==='static'){command='python';params=['-m','http.server',String(s.port),'--bind','127.0.0.1'];}
    const log=openSync(resolve(logs,`${s.id}.log`),'a');
    const child=spawn(command,params,{cwd,env,stdio:['ignore',log,log],windowsHide:true});
    children.push(child);
    child.on('error',e=>console.error(`${s.id}: ${e.message}`));
    child.on('exit',code=>{if(code)console.error(`${s.id} 启动退出 (${code})，查看 runtime/${s.id}.log`);});
    console.log(`${s.id}: http://localhost:${s.port}/ （启动中；日志 runtime/${s.id}.log）`);
  }
  const stop=()=>{for(const child of children)child.kill();};
  process.once('SIGINT',stop);process.once('SIGTERM',stop);
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) main().catch(e=>{console.error(e.message);process.exitCode=1;});
