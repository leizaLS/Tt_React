// /api/steam.js
export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Falta el parámetro 'id'." });
  }

  const url = `https://store.steampowered.com/api/appdetails?appids=${id}&l=spanish&cc=US`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener datos de Steam:", error);
    res.status(500).json({ error: "Error al obtener los datos del juego." });
  }
}