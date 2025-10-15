export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { fid } = req.query;
  
  if (!fid) {
    return res.status(400).json({ error: 'FID required' });
  }
  
  try {
    const response = await fetch(`https://api.warpcast.com/v2/casts?fid=${fid}&limit=10`);
    const data = await response.json();
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch casts' });
  }
}
