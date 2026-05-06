import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, senha } = await request.json();

    // Consulta no banco procurando pelo e-mail e senha exatos
    const [rows]: any = await pool.query(
      'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
      [email, senha]
    );

    // Se encontrou alguma linha, o login é válido
    if (rows.length > 0) {
      return NextResponse.json({ success: true });
    } else {
      // Se não encontrou, retorna erro 401 (Não Autorizado)
      return NextResponse.json({ error: 'E-mail ou senha incorretos' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao conectar com o servidor' }, { status: 500 });
  }
}