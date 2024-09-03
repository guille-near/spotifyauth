import { getSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "No autenticado" });
  }

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  spotifyApi.setAccessToken(session.accessToken);

  try {
    const me = await spotifyApi.getMe();
    const artistName = "Nombre del Artista"; // Reemplaza con el nombre del artista que quieres verificar
    const searchResults = await spotifyApi.searchArtists(artistName, { limit: 1 });

    if (searchResults.body.artists.items.length > 0) {
      const artist = searchResults.body.artists.items[0];
      if (me.body.id === artist.id) {
        return res.status(200).json({ isArtist: true, artistName: artist.name });
      }
    }

    return res.status(200).json({ isArtist: false });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error al verificar el artista" });
  }
}