"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NovaMovimentacao() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [form, setForm] = useState({ 
    produtos_id: "", 
    tipo: "Entrada", 
    quantidade: "", 
    data: new Date().toISOString().split('T')[0] 
  });
  const router = useRouter();

  useEffect(() => {
    fetch("/api/produtos").then(res => res.json()).then(data => setProdutos(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.produtos_id) return alert("Selecione um produto");
    
    const res = await fetch("/api/movimentacoes", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        produtos_id: Number(form.produtos_id),
        quantidade: Number(form.quantidade)
      }),
      headers: { "Content-Type": "application/json" }
    });

    if (res.ok) router.push("/estoque");
    else alert("Erro ao salvar movimentação");
  };

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <h2>Nova Movimentação</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div className="form-group">
          <label>Produto *</label>
          <select required value={form.produtos_id} onChange={e => setForm({...form, produtos_id: e.target.value})}>
            <option value="">Selecione um produto...</option>
            {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Tipo de Movimentação *</label>
          <select required value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})}>
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
          </select>
        </div>
        <div className="form-group">
          <label>Quantidade *</label>
          <input type="number" min="1" required value={form.quantidade} onChange={e => setForm({...form, quantidade: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Data da Movimentação *</label>
          <input type="date" required value={form.data} onChange={e => setForm({...form, data: e.target.value})} />
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button type="submit" className="btn btn-green">Registrar</button>
          <Link href="/estoque" className="btn btn-gray">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}