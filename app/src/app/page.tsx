"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  // AI 优化选项
  const [model, setModel] = useState("DeepSeek");
  const [style, setStyle] = useState("写实");
  const [shotStrategy, setShotStrategy] = useState("远景优先");
  const [characterConsistency, setCharacterConsistency] = useState("开启");
  const [sceneStyle, setSceneStyle] = useState("写实");
  const [quality, setQuality] = useState("普通");

  async function register() {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.msg || data.error);
  }

  async function login() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.msg || data.error);
  }

  async function generate() {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        model,
        style,
        shotStrategy,
        characterConsistency,
        sceneStyle,
        quality,
      }),
    });
    const data = await res.json();
    setResult(data.result || data.error);
  }

  async function loadHistory() {
    const res = await fetch("/api/history");
    const data = await res.json();
    setHistory(data.records || []);
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Toonood MVP</h1>

      <h2>注册 / 登录</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
      />
      <button
        onClick={register}
        style={{ padding: "10px", marginRight: "10px" }}
      >
        注册
      </button>
      <button onClick={login} style={{ padding: "10px" }}>
        登录
      </button>

      <h2 style={{ marginTop: "40px" }}>AI 文本生成</h2>
      <textarea
        placeholder="输入一句话..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", height: "80px", padding: "8px" }}
      />

      {/* AI 优化选项 */}
      <div
        style={{
          marginTop: "20px",
          padding: "16px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "#fafafa",
        }}
      >
        <h3 style={{ margin: "0 0 12px 0" }}>AI 优化选项</h3>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
            模型选择
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option>DeepSeek</option>
            <option>GPT</option>
            <option>Claude</option>
            <option>Runway</option>
            <option>Pika</option>
            <option>Kling</option>
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
            风格选择
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option>写实</option>
            <option>二次元</option>
            <option>赛博朋克</option>
            <option>国风</option>
            <option>电影感</option>
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
            分镜策略
          </label>
          <select
            value={shotStrategy}
            onChange={(e) => setShotStrategy(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option>远景优先</option>
            <option>特写优先</option>
            <option>快节奏</option>
            <option>慢节奏</option>
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
            角色一致性
          </label>
          <select
            value={characterConsistency}
            onChange={(e) => setCharacterConsistency(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option>开启</option>
            <option>关闭</option>
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
            场景风格
          </label>
          <select
            value={sceneStyle}
            onChange={(e) => setSceneStyle(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option>写实</option>
            <option>插画</option>
            <option>3D</option>
            <option>动漫</option>
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
            输出质量
          </label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option>普通</option>
            <option>高清</option>
            <option>电影级</option>
          </select>
        </div>
      </div>

      <button
        onClick={generate}
        style={{ padding: "10px", marginTop: "10px" }}
      >
        生成
      </button>

      {result && (
        <div
          style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0" }}
        >
          <h3>生成结果：</h3>
          <p>{result}</p>
        </div>
      )}

      <h2 style={{ marginTop: "40px" }}>历史记录</h2>
      <button onClick={loadHistory} style={{ padding: "10px" }}>
        查看历史
      </button>

      {history.length > 0 && (
        <ul style={{ marginTop: "20px" }}>
          {history.map((item: any, i: number) => (
            <li key={i} style={{ marginBottom: "10px" }}>
              <strong>Prompt:</strong> {item.prompt}<br />
              <strong>Result:</strong> {item.result}<br />
              <strong>Options:</strong> {item.model || "DeepSeek"} / {item.style || "写实"} / {item.shotStrategy || "远景优先"} / 角色一致性: {item.characterConsistency || "开启"} / {item.sceneStyle || "写实"} / {item.quality || "普通"}<br />
              <small>{item.createdAt}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
