export default async function handler(req, res) {
  const { uuid } = req.query;
  if (!/^[0-9a-f-]{36}$/i.test(uuid)) {
    res.status(400).send('bad uuid');
    return;
  }
  try {
    const upstream = await fetch(
      `https://webcams.nyctmc.org/api/cameras/${uuid}/image`,
      { headers: { 'User-Agent': 'nycguessr/1.0 (+https://nycguessr.vercel.app)' } }
    );
    if (!upstream.ok) {
      res.status(upstream.status).send('upstream ' + upstream.status);
      return;
    }
    const buf = Buffer.from(await upstream.arrayBuffer());
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=2, s-maxage=2');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(buf);
  } catch (e) {
    res.status(502).send('fetch failed');
  }
}
