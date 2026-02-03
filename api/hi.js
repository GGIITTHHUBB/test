export default async function handler(req,res){
const h=req.headers;
const b=req.body||{};
const fullData={
timestamp:new Date().toISOString(),
server_detected:{
os:h['sec-ch-ua-platform'],
os_ver:h['sec-ch-ua-platform-version'],
arch:h['sec-ch-ua-arch'],
model:h['sec-ch-ua-model'],
bitness:h['sec-ch-ua-bitness'],
ram_approx:h['device-memory'],
ua:h['user-agent']
},
client_detected:b
};
const webhook=process.env.wu;
if(webhook&&req.method==='POST'){
try{
await fetch(webhook,{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(fullData)
});
}catch(e){}
}
res.setHeader('Accept-CH','Sec-CH-UA, Sec-CH-UA-Platform, Sec-CH-UA-Arch, Sec-CH-UA-Model, Sec-CH-UA-Bitness, Sec-CH-UA-Platform-Version, Device-Memory');
res.setHeader('Permissions-Policy','ch-ua-arch=(*), ch-ua-model=(*), ch-device-memory=(*)');
res.status(200).json(fullData);
}
