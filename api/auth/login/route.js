import { query } from '@/db/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // безопасно храните в .env

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email и пароль обязательны' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Ищем пользователя по email
    const users = await query({
      query: 'SELECT id, username, email, password FROM users WHERE email = ? LIMIT 1',
      values: [email],
    });

    if (users.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Неверный email или пароль' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = users[0];

    // Проверяем пароль с полем password (в котором хранится хэш)
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return new Response(
        JSON.stringify({ error: 'Неверный email или пароль' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Генерируем JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return new Response(
      JSON.stringify({ token, user: { id: user.id, username: user.username, email: user.email } }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
