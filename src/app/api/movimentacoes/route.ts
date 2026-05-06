import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT m.*, p.nome as produto_nome 
      FROM movimentacao m 
      JOIN produtos p ON m.produtos_id = p.id 
      ORDER BY m.data DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const connection = await pool.getConnection();
  try {
    const data = await request.json();
    const pid = Number(data.produtos_id);
    const qtd = Number(data.quantidade);

    await connection.beginTransaction();

    // 1. Insere a movimentação
    await connection.query(
      'INSERT INTO movimentacao (tipo, quantidade, data, produtos_id) VALUES (?, ?, ?, ?)',
      [data.tipo, qtd, data.data, pid]
    );

    // 2. Atualiza o saldo no produto (+ se entrada, - se saída)
    const op = data.tipo === 'Entrada' ? '+' : '-';
    await connection.query(
      `UPDATE produtos SET quantidade = quantidade ${op} ? WHERE id = ?`,
      [qtd, pid]
    );

    await connection.commit();
    return NextResponse.json({ success: true });
  } catch (error) {
    await connection.rollback();
    return NextResponse.json({ error: 'Erro na transação' }, { status: 500 });
  } finally {
    connection.release();
  }
}