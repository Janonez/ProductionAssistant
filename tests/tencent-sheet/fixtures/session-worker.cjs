'use strict';
const fs=require('node:fs');
const readline=require('node:readline');
if(process.argv[2]==='--probe') {
  try {const fd=fs.openSync(process.argv[3],'r+');fs.closeSync(fd);process.stdout.write('available');}
  catch(error) {process.stdout.write(error.code==='EBUSY'||error.code==='EACCES'||error.code==='EPERM'?'blocked':error.code);}
} else {
const marker=process.argv[2]+'.closed';
const input=readline.createInterface({input:process.stdin});
input.on('line',line=>{
  const request=JSON.parse(line);
  if(request.operation==='hang')return;
  if(request.operation==='crash'){process.exit(7);return;}
  process.stdout.write(JSON.stringify({ok:true,browserOpen:true,data:{message:'fixture opened'}})+'\n');
});
input.on('close',()=>fs.writeFileSync(marker,'flushed on EOF'));
}
