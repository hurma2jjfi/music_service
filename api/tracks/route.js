import { query } from '@/db/db';

export async function GET() {
  try {
    const tracks = await query({ 
      query: `
        SELECT t.id, t.title, t.duration, t.audio_url, t.cover_url, a.name AS artist_name
        FROM Tracks t
        JOIN Artists a ON t.artist_id = a.id
        ORDER BY t.id DESC
        LIMIT 20
      `
    });
    return new Response(JSON.stringify(tracks), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
