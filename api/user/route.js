import { query } from '@/db/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }

    // Попытка достать id пользователя из нескольких вариантов
    const userId = payload.userId || payload.sub || payload.id;

    if (userId === undefined || userId === null) {
      return new Response(JSON.stringify({ error: 'userId not found in token' }), { status: 400 });
    }

    const users = await query({
      query: `
        SELECT id, username, email, created_at, updated_at
        FROM users
        WHERE id = ?
        LIMIT 1
      `,
      values: [userId],
    });

    if (!users.length) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(users[0]), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
