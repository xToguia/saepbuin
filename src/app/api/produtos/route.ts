import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { nome, descricao, preco, quantidade, estoque_min } = data;
    await pool.query(
      'INSERT INTO produtos (nome, descricao, preco, quantidade, estoque_min) VALUES (?, ?, ?, ?, ?)',
      [nome, descricao, preco, quantidade, estoque_min]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 });
  }
}