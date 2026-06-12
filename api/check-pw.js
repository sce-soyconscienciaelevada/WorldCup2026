export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { password, who } = req.body || {};
  const adminPw = process['env']['ADMIN_PASSWORD'] || 'admin2026';
  const theoPw  = process['env']['THEO_PASSWORD']  || 'liverpool';

  if (who === 'admin') return res.json({ ok: password === adminPw });
  if (who === 'theo')  return res.json({ ok: password === theoPw });
  return res.status(400).json({ ok: false });
}
