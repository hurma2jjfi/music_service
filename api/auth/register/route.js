import { query } from '@/db/db';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    // Проверка наличия всех полей
    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ error: 'Missing fields: username, email and password are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Проверяем, есть ли такой email или username
    const userExists = await query({
      query: `SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1`,
      values: [email, username],
    });

    if (userExists.length > 0) {
      return new Response(
        JSON.stringify({ error: 'Пользователь с таким email или именем уже существует' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Хешируем пароль
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Вставляем нового пользователя (храним хэш в поле password)
    await query({
      query: `
        INSERT INTO users (username, email, password, created_at, updated_at)
        VALUES (?, ?, ?, NOW(), NOW())
      `,
      values: [username, email, password_hash],
    });

    return new Response(
      JSON.stringify({ message: 'Регистрация прошла успешно' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
