"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({ email, senha }),
        headers: { "Content-Type": "application/json" }
      });

      if (res.ok) {
        router.push("/produtos");
      } else {
        const data = await res.json();
        setErro(data.error || "Acesso negado");
      }
    } catch (err) {
      setErro("Falha ao conectar com o servidor");
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      backgroundColor: "#f9f9f9",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ 
        width: "100%", 
        maxWidth: "350px", 
        backgroundColor: "#fff", 
        padding: "40px 30px",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)" // Sombra bem sutil para destacar do fundo
      }}>
        
        <h3 style={{ 
          textAlign: "center", 
          color: "#666", 
          fontWeight: "normal", 
          fontSize: "16px",
          marginBottom: "30px",
          marginTop: "0"
        }}>
          Sistema de Gestão de Estoque
        </h3>
        
        {erro && (
          <div style={{ 
            backgroundColor: "#fee2e2", 
            color: "#b91c1c", 
            padding: "10px", 
            marginBottom: "15px", 
            fontSize: "14px",
            textAlign: "center"
          }}>
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              display: "block", 
              fontWeight: "bold", 
              color: "#333", 
              marginBottom: "8px",
              fontSize: "15px"
            }}>
              E-mail
            </label>
            <input 
              type="email" 
              placeholder="Digite seu e-mail"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{ 
                width: "100%", 
                padding: "10px", 
                border: "1px solid #ccc", 
                boxSizing: "border-box",
                fontSize: "14px",
                outline: "none"
              }}
            />
          </div>
          
          <div style={{ marginBottom: "25px" }}>
            <label style={{ 
              display: "block", 
              fontWeight: "bold", 
              color: "#333", 
              marginBottom: "8px",
              fontSize: "15px"
            }}>
              Senha
            </label>
            <input 
              type="password" 
              placeholder="Digite sua senha"
              value={senha} 
              onChange={e => setSenha(e.target.value)} 
              required 
              style={{ 
                width: "100%", 
                padding: "10px", 
                border: "1px solid #ccc", 
                boxSizing: "border-box",
                fontSize: "14px",
                outline: "none"
              }}
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              width: "100%", 
              padding: "12px", 
              backgroundColor: "#333", 
              color: "#fff", 
              border: "none", 
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "normal"
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}