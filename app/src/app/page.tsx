"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleClick() {
    const res = await fetch("/api/test");
    const data = await res.json();
    alert(data.msg);
  }

  async function register() {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  }

  async function login() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32 }}>Toonflow Web 前端</h1>

      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10, maxWidth: 300 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={register}
            style={{
              padding: "10px 20px",
              background: "green",
              color: "white",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            注册
          </button>
          <button
            onClick={login}
            style={{
              padding: "10px 20px",
              background: "blue",
              color: "white",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            登录
          </button>
        </div>
      </div>

      <button
        onClick={handleClick}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
        }}
      >
        测试后端 API
      </button>
    </div>
  );
}
