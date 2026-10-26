import { localEnvironment, services } from './local-dev.mjs';
import { spawn } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync, writeFileSync } from 'node:fs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const id=process.argv[2], kind=process.argv[3]||'build';
const s=services.find(s=>s.id===id);
if(!s) throw new Error('Unknown project');
const cwd=resolve(root,s.dir), env=localEnvironment(cwd);
const tasks=[];
if(kind==='test') tasks.push(['node_modules/vitest/vitest.mjs','run',...(id==='baby'?['src']:[])]);
else {
 if(s.kind==='vite') tasks.push(['node_modules/vite/bin/vite.js','build']);
 if(s.kind==='next') {
   tasks.push(['node_modules/typescript/bin/tsc','--noEmit']);
   if(kind==='build') tasks.push(['node_modules/next/dist/bin/next','build',...(id==='baby'?['--webpack']:[])]);
 }
}
let output=''; let code=0;
for(const args of tasks){
 const result=await new Promise(done=>{
  const child=spawn(process.execPath,[resolve(cwd,args[0]),...args.slice(1)],{cwd,env,windowsHide:true});
  child.stdout.on('data',b=>output+=b);child.stderr.on('data',b=>output+=b);
  child.on('error',e=>{output+=e.message;done(1)});child.on('exit',done);
 });
 if(result){code=result;break;}
}
const dir=resolve(root,'docs/portfolio-update-2026-10-26');mkdirSync(dir,{recursive:true});
writeFileSync(resolve(dir,`${id}-${kind}.log`),output);
console.log(`${id} ${kind}: ${code===0?'PASS':'FAIL'}\n${output.slice(-3500)}`);process.exitCode=code;
