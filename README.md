# Toonood — AI 短剧创作流水线（MVP）

Toonood 是一个开源的 AI 短剧创作工具，目标是让创作者能够将文本内容快速转化为动画短剧。本项目当前为 MVP 阶段，重点验证基础功能与未来扩展能力。

---

## ✨ 技术优化方向（基于行业最佳实践 & AI 创作者工作流）

以下技术方向来自对真实 AI 创作者（包括视频案例）的工作流分析，代表 Toonood 的未来演进路线。

---

### 1. AI 编剧引擎（Story Engine）
- 自动生成三幕式结构  
- 自动生成冲突、反转、节奏点  
- 自动提炼小说/长文的剧情骨架  
- 自动生成角色关系图  
- 自动生成短剧脚本（3/5/10 分钟）

技术方向：
- 使用 LLM 构建剧情生成链  
- 引入情绪曲线模型（Freytag / Dan Harmon）  
- 爆款剧情模板化  

---

### 2. 智能分镜系统（Shot Planning Engine）
- 自动生成镜头类型（远景/中景/特写）  
- 自动生成镜头运动（推拉摇移）  
- 自动生成镜头节奏（快剪/慢镜）  
- 自动生成场景切换逻辑  
- 自动生成构图与角色位置  

技术方向：
- LLM 生成分镜 JSON  
- 镜头语法规则库（Shot Grammar）  
- 可视化分镜板（Storyboard）  

---

### 3. 角色一致性系统（Character Consistency Engine）
- 角色设定（外貌、服装、性格）  
- 角色 ID（跨镜头保持一致）  
- 多镜头一致性生成  
- 多场景一致性生成  

技术方向：
- Character Embedding（角色向量）  
- 角色描述模板化  
- 角色锁定机制  

---

### 4. 场景生成系统（Scene Engine）
- 自动生成场景描述  
- 自动生成场景风格  
- 自动生成场景一致性  
- 支持场景复用  

技术方向：
- 场景 Prompt 模板  
- 风格控制（Style Control）  
- 场景库（Scene Library）  

---

### 5. 动画生成流水线（Animation Pipeline）
- 文生视频（Text-to-Video）  
- 图生视频（Image-to-Video）  
- 角色驱动（Motion Control）  
- 镜头拼接（Timeline Assembly）  

技术方向：
- Runway / Pika / Kling API  
- 自动拼接镜头  
- 自动生成转场  
- 自动生成字幕  

---

### 6. 可编辑的 AI 流水线（Editable Pipeline）
- 每一步可人工修改  
- 每个镜头可替换  
- 每段文案可微调  
- 每个角色可重生成  

技术方向：
- 节点化流水线（Node-based Pipeline）  
- 可视化编辑器  
- 历史版本回溯  

---

### 7. 爆款内容模板（Viral Content Templates）
- 爆款剧情模板  
- 情绪曲线模板  
- 热点跟风模板  
- 争议型模板  
- 情感共鸣模板  

技术方向：
- 模板化 Prompt  
- 情绪曲线生成器  
- 热点抓取 API  

---

### 8. 批量生成（Batch Production）
- 批量生成剧本  
- 批量生成分镜  
- 批量生成角色  
- 批量生成视频  

技术方向：
- 任务队列（Task Queue）  
- 异步生成（Async Pipeline）  
- 任务监控（Job Monitor）  

---

### 9. 插件化架构（Plugin Architecture）
- 支持第三方模型接入  
- 支持自定义 Prompt 模板  
- 支持自定义渲染器  

技术方向：
- Plugin SDK  
- API Adapter  
- Prompt Registry  

---

### 10. 多端部署（Web + Desktop）
- Web 端  
- 桌面端（Tauri / Electron）  
- 本地模型推理（可选）  

技术方向：
- Tauri 打包  
- WebGPU 加速  
- 本地缓存  

---

## 🧩 UI 中的 AI 优化选项（本次任务新增）

Toonood 的 UI 将新增以下 AI 优化选项：

- 模型选择（DeepSeek / GPT / Claude / Runway / Pika / Kling）  
- 风格选择（写实 / 二次元 / 赛博朋克 / 国风 / 电影感）  
- 分镜策略（远景优先 / 特写优先 / 快节奏 / 慢节奏）  
- 角色一致性（开启 / 关闭）  
- 场景风格（写实 / 插画 / 3D / 动漫）  
- 输出质量（普通 / 高清 / 电影级）  

这些选项将传入 /api/generate，用于未来扩展。

---

## 🚀 当前版本（MVP）功能

### 1. 用户系统（本地 JSON 存储）
无需数据库，使用本地 JSON 文件模拟用户系统。

功能包括：

- 用户注册  
- 用户登录  
- 密码校验  
- 用户数据持久化（data/users.json）

API：

- `POST /api/register`
- `POST /api/login`

---

### 2. AI 文本生成（DeepSeek API）
提供基础的 AI 文本生成能力，用于未来扩展 AI 编剧功能。

功能包括：

- 输入一句话  
- 调用 DeepSeek API  
- 返回生成文本  
- 保存生成记录  

API：

- `POST /api/generate`

---

### 3. 历史记录（本地 JSON 存储）
每次 AI 生成的内容都会保存到本地 JSON 文件。

功能包括：

- 自动保存生成内容  
- 查看历史记录  
- 持久化存储（data/records.json）

---

### 4. 前端界面（Next.js）
提供基础的前端 UI：

- 注册 / 登录输入框  
- AI 生成输入框  
- AI 优化选项（模型、风格、分镜策略等）  
- 历史记录按钮  
- 结果展示区  

未来将升级为完整的创作工作台界面。

---

## 🧱 技术栈

- **Next.js** — 前端 + 后端 API  
- **Vercel** — 自动部署  
- **JSON 文件** — 本地伪数据库  
- **DeepSeek API** — AI 文本生成  
- **Cline** — 自动化开发执行器  

---

## 📁 项目结构

```
Toonood/
 ├─ app/
 │   ├─ src/
 │   │   ├─ app/
 │   │   │   ├─ page.tsx          # 前端页面（含 AI 优化选项）
 │   │   │   ├─ layout.tsx        # 布局
 │   │   │   └─ api/
 │   │   │       ├─ register/route.ts   # 注册接口
 │   │   │       ├─ login/route.ts      # 登录接口
 │   │   │       ├─ generate/route.ts   # AI 生成接口
 │   │   │       └─ history/route.ts    # 历史记录接口
 │   │   └─ lib/
 │   │       └─ supabaseClient.ts
 ├─ data/
 │   ├─ users.json        # 用户数据
 │   └─ records.json      # 生成记录
 ├─ vercel.json
 ├─ package.json
 └─ README.md
```

---

## 🔧 本地开发

```bash
npm install
npm run dev
```

访问：

```
http://localhost:3000
```

---

## ☁️ 部署（Vercel）

项目已支持：

- GitHub 自动推送  
- Vercel 自动部署  
- 无需环境变量（除非启用 DeepSeek API）  

部署命令：

```bash
vercel --prod
```

---

## 🛣️ 未来路线图（Roadmap）

### ✔ 已完成（MVP）
- 用户系统（本地 JSON）
- AI 文本生成
- 历史记录
- AI 优化选项 UI
- 自动部署流水线
- 基础 UI

### 🔜 即将开发
- AI 编剧（从小说自动生成剧本）
- 智能分镜（自动生成镜头脚本）
- 角色生成（AI 形象）
- 视频生成（动画短剧）
- 云数据库（Supabase / MongoDB）
- 桌面端（Electron / Tauri）
- 批量生成流水线

---

## 📄 许可证
MIT License

---

## ❤️ 致谢

Toonood 由创作者驱动，致力于让每个人都能轻松创作属于自己的动画短剧。
