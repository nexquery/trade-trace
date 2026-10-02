import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
const files=['server.js','validation.js','tradingview.js','start.js','.env.example','README.md','package-lock.json'];
await mkdir('dist',{recursive:true});
for(const file of files)await cp(file,'dist/'+file);
await cp('public','dist/public',{recursive:true});
const pkg=JSON.parse(await readFile('package.json','utf8'));
pkg.scripts={start:'node start.js'};
await writeFile('dist/package.json',JSON.stringify(pkg,null,2));
console.log('Production paketi hazır: dist (bağlantı bilgileri dahil edilmedi).');
