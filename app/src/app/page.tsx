"use client";

export default function Home() {
  async function testAPI() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/test");
    const data = await res.json();
    console.log(data);
    alert(JSON.stringify(data));
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32 }}>Toonflow Web 前端</h1>
      <button
        onClick={testAPI}
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
