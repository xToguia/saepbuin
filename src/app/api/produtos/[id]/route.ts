import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const [rows]: any = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
    if (rows.length === 0) return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar produto' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir produto' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const data = await request.json();
    const { nome, descricao, preco, quantidade, estoque_min } = data;
    await pool.query(
      'UPDATE produtos SET nome=?, descricao=?, preco=?, quantidade=?, estoque_min=? WHERE id=?',
      [nome, descricao, preco, quantidade, estoque_min, id]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 });
  }
}