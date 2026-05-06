"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Produtos() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [busca, setBusca] = useState("");

  const carregarProdutos = async () => {
    const res = await fetch("/api/produtos");
    const data = await res.json();
    setProdutos(data);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleExcluir = async (id: number, nome: string) => {
    if (confirm(`Deseja excluir o produto "${nome}"?`)) {
      await fetch(`/api/produtos/${id}`, { method: "DELETE" });
      carregarProdutos();
    }
  };

  const produtosFiltrados = produtos.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div>
      <nav className="navbar">
        <h2>- Gestão de Estoque</h2>
        <div>Olá, <b>Administrador</b> <Link href="/"><button className="btn-sair">Sair</button></Link></div>
      </nav>

      <div className="container">
        <h2>Cadastro de Produtos</h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>Gerencie o catálogo de produtos do sistema</p>

        <div className="header-actions">
          <input 
            type="text" 
            placeholder="Buscar produto por nome..." 
            style={{ width: "300px", margin: 0 }}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <div>
            <Link href="/produtos/novo" className="btn btn-dark">+ Novo Produto</Link>
            <Link href="/estoque" className="btn btn-gray" style={{ marginLeft: "10px" }}>Ir para Estoque</Link>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço (R$)</th>
              <th>Estoque</th>
              <th>Estoque Min.</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.descricao}</td>
                <td>{Number(p.preco).toFixed(2)}</td>
                <td>{p.quantidade}</td>
                <td>{p.estoque_min}</td>
                <td>
                  <Link href={`/produtos/editar/${p.id}`} className="btn btn-yellow">Editar</Link>
                  <button onClick={() => handleExcluir(p.id, p.nome)} className="btn btn-red">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}