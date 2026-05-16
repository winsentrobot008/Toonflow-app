"use client";

export default function Home() {
  async function handleClick() {
    const res = await fetch("/api/test");
    const data = await res.json();
    alert(data.msg);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32 }}>Toonflow Web 前端</h1>
      <button
        onClick={handleClick}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: 8,
        }}
      >
        测试后端 API
      </button>
    </div>
  );
}
