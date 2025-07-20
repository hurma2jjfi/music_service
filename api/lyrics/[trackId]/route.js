import { query } from '@/db/db';

export async function GET(request, { params }) {
  const { trackId } = params;

  try {
    const lyricsLines = await query({
      query: `
        SELECT time, text FROM lyricslines 
        WHERE track_id = ? 
        ORDER BY time ASC
      `,
      values: [trackId],
    });

    if (!lyricsLines.length) {
      return new Response(JSON.stringify({ error: 'Lyrics not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ lyrics: lyricsLines }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
