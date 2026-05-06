"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditarProduto() {
  const [form, setForm] = useState<any>(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/produtos/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          nome: data.nome || "",
          descricao: data.descricao || "",
          preco: data.preco !== null ? String(data.preco) : "",
          quantidade: data.quantidade !== null ? String(data.quantidade) : "",
          estoque_min: data.estoque_min !== null ? String(data.estoque_min) : ""
        });
      });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/produtos/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...form,
        preco: parseFloat(form.preco),
        quantidade: parseInt(form.quantidade),
        estoque_min: parseInt(form.estoque_min)
      }),
      headers: { "Content-Type": "application/json" }
    });
    router.push("/produtos");
  };

  if (!form) return <div className="container">Carregando...</div>;

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div className="form-group">
          <label>Nome *</label>
          <input type="text" value={form.nome} required onChange={e => setForm({...form, nome: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea rows={3} value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Preço (R$) *</label>
          <input type="number" step="0.01" value={form.preco} required onChange={e => setForm({...form, preco: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Quantidade *</label>
          <input type="number" value={form.quantidade} required onChange={e => setForm({...form, quantidade: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Estoque Mínimo</label>
          <input type="number" value={form.estoque_min} onChange={e => setForm({...form, estoque_min: e.target.value})} />
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button type="submit" className="btn btn-green">Salvar</button>
          <Link href="/produtos" className="btn btn-gray">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}