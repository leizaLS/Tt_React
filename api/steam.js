export default async function handler(req, res) {
  const { appids } = req.query;

  try {
    const steamRes = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appids}`
    );

    const data = await steamRes.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Steam API error", details: error });
  }
}
