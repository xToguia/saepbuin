"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica simplificada de login - idealmente chamaria /api/auth
    if (email && senha) {
      router.push("/produtos");
    }
  };

  return (
    <div className="login-box">
      <h3 style={{ marginBottom: "20px", color: "#666" }}>Sistema de Gestão de Estoque</h3>
      <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
        <div className="form-group">
          <label>E-mail</label>
          <input type="email" placeholder="Digite seu e-mail" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" value={senha} onChange={e => setSenha(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-dark" style={{ width: "100%" }}>Entrar</button>
      </form>
    </div>
  );
}