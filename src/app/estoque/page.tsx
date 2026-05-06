"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Estoque() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [movimentacoes, setMovimentacoes] = useState<any[]>([]);

  const carregarDados = async () => {
    try {
      // 1. Busca Produtos para a tabela superior
      const resProd = await fetch("/api/produtos");
      let dataProd = await resProd.json();
      
      // Bubble Sort para ordenar por Nome
      for (let i = 0; i < dataProd.length - 1; i++) {
        for (let j = 0; j < dataProd.length - i - 1; j++) {
          if (dataProd[j].nome.localeCompare(dataProd[j + 1].nome) > 0) {
            let temp = dataProd[j];
            dataProd[j] = dataProd[j + 1];
            dataProd[j + 1] = temp;
          }
        }
      }
      setProdutos(dataProd);

      // 2. Busca Movimentações para o Histórico
      const resMov = await fetch("/api/movimentacoes");
      const dataMov = await resMov.json();
      setMovimentacoes(dataMov);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const produtosAbaixoDoMinimo = produtos.filter(p => p.quantidade < p.estoque_min);

  return (
    <div>
      <nav className="navbar">
        <h2>- Gestão de Estoque</h2>
        <div>Olá, <b>Administrador</b> <Link href="/"><button className="btn-sair">Sair</button></Link></div>
      </nav>

      <div className="container">
        <h2>Gestão de Estoque</h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>Registre movimentações de entrada e saída</p>

        {produtosAbaixoDoMinimo.length > 0 && (
          <div className="alert-warning">
            <strong>⚠ Alertas de Estoque:</strong><br/>
            {produtosAbaixoDoMinimo.map(p => (
              <span key={p.id}>"{p.nome}" está abaixo do mínimo ({p.quantidade}/{p.estoque_min})<br/></span>
            ))}
          </div>
        )}

        <div className="header-actions">
          <h4>Produtos ordenados alfabeticamente (Bubble Sort)</h4>
          <div>
            <Link href="/estoque/nova" className="btn btn-dark">+ Nova Movimentação</Link>
            <Link href="/produtos" className="btn btn-gray" style={{ marginLeft: "10px" }}>Voltar</Link>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Est. Mínimo</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.quantidade}</td>
                <td>{p.estoque_min}</td>
                <td>
                  {p.quantidade < p.estoque_min 
                    ? <span className="badge-warning">Abaixo do mínimo</span>
                    : <span className="badge-normal">Normal</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ marginTop: "40px", marginBottom: "5px" }}>Histórico de Movimentações</h3>
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "15px" }}>Últimas movimentações registradas</p>
        
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Produto</th>
              <th>Tipo</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((m) => (
              <tr key={m.id}>
                <td>{new Date(m.data).toLocaleDateString("pt-BR", {timeZone: 'UTC'})}</td>
                <td>{m.produto_nome}</td>
                <td>
                  <span className={m.tipo === "Entrada" ? "badge-normal" : "badge-saida"}>
                    {m.tipo}
                  </span>
                </td>
                <td>{m.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}