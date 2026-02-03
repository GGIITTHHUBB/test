export default async function handler(req, res) {
  const h = req.headers;
  let b = {};
  try { if (req.body) { b = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; } } catch (e) {}
  const data = {
    timestamp: new Date().toISOString(),
    server: {
      os: h['sec-ch-ua-platform'],
      os_ver: h['sec-ch-ua-platform-version'],
      arch: h['sec-ch-ua-arch'],
      model: h['sec-ch-ua-model'],
      bitness: h['sec-ch-ua-bitness'],
      ram: h['device-memory'],
      ua: h['user-agent']
    },
    client: b
  };
  const url = process.env.wu;
  if (url && req.method === 'POST') {
    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: "```json\n" + JSON.stringify(data, null, 2) + "\n```"
        }),
        keepalive: true
      });
    } catch (err) {}
  }
  res.setHeader('Accept-CH', 'Sec-CH-UA, Sec-CH-UA-Platform, Sec-CH-UA-Arch, Sec-CH-UA-Model, Sec-CH-UA-Bitness, Sec-CH-UA-Platform-Version, Device-Memory');
  res.setHeader('Permissions-Policy', 'ch-ua-arch=(*), ch-ua-model=(*), ch-device-memory=(*)');
  res.status(200).json(data);
}
