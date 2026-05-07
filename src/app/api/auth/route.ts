import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, senha } = await request.json();
    
    // LOG para debug: veja isso no terminal do seu VS Code
    console.log(`Tentativa de login: ${email} / ${senha}`);

    const [rows]: any = await pool.query(
      'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
      [email, senha]
    );

    if (rows.length > 0) {
      // ENCONTROU NO BANCO - Sucesso
      console.log("Login autorizado!");
      return NextResponse.json({ success: true });
    } else {
      // NÃO ENCONTROU - Erro 401 (Não autorizado)
      console.log("Login negado: usuário não existe ou senha errada.");
      return NextResponse.json(
        { error: 'E-mail ou senha incorretos. Acesso negado.' }, 
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Erro na API de Auth:", error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}