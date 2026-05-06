"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NovoProduto() {
  const [form, setForm] = useState({ nome: "", descricao: "", preco: 0, quantidade: 0, estoque_min: 5 });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/produtos", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" }
    });
    router.push("/produtos");
  };

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <h2>Novo Produto</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div className="form-group">
          <label>Nome *</label>
          <input type="text" required onChange={e => setForm({...form, nome: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea rows={3} onChange={e => setForm({...form, descricao: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Preço (R$) *</label>
          <input type="number" step="0.01" required onChange={e => setForm({...form, preco: parseFloat(e.target.value)})} />
        </div>
        <div className="form-group">
          <label>Quantidade *</label>
          <input type="number" required onChange={e => setForm({...form, quantidade: parseInt(e.target.value)})} />
        </div>
        <div className="form-group">
          <label>Estoque Mínimo</label>
          <input type="number" defaultValue={5} onChange={e => setForm({...form, estoque_min: parseInt(e.target.value)})} />
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button type="submit" className="btn btn-green">Salvar</button>
          <Link href="/produtos" className="btn btn-gray">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}