<img src="./assets/hero.svg" width="100%" alt="Abdullah Latif — web × mobile × backend × AI" />

<p align="center">
  <a href="#-the-10-second-version"><img src="https://img.shields.io/badge/OVERVIEW-0D1117?style=for-the-badge&labelColor=0D1117&color=38BDF8" /></a>
  <a href="#-featured-work"><img src="https://img.shields.io/badge/WORK-0D1117?style=for-the-badge&labelColor=0D1117&color=818CF8" /></a>
  <a href="#-stack"><img src="https://img.shields.io/badge/STACK-0D1117?style=for-the-badge&labelColor=0D1117&color=A78BFA" /></a>
  <a href="#-how-i-build"><img src="https://img.shields.io/badge/APPROACH-0D1117?style=for-the-badge&labelColor=0D1117&color=F472B6" /></a>
  <a href="#-connect"><img src="https://img.shields.io/badge/CONTACT-0D1117?style=for-the-badge&labelColor=0D1117&color=34D399" /></a>
</p>

<br/>

## ⚡ The 10-Second Version

|  |  |
|:--|:--|
| **I build** | AI-powered products, healthcare platforms, and cross-platform apps — end to end |
| **Core stack** | `NestJS` · `Next.js` · `React Native` · `PostgreSQL` · `TypeScript` |
| **AI focus** | Retrieval pipelines, embeddings, and LLM assistants built *into* products |
| **Also** | Cinematic 3D web with Three.js · learning Unity by shipping a game |
| **Studying** | BSCS, final semester — Lahore Garrison University |

<br/>

## 🚀 Featured Work

<table>
<tr>
<td width="50%" valign="top">

### 🩺 Honicomb AI
**AI billing assistant for the Australian MBS.**
Clinicians ask billing questions in plain language and get item-number-accurate answers.

`NestJS` `pgvector` `RAG` `OpenAI` `EC2`

</td>
<td width="50%" valign="top">

### 🏥 Circi
**AHPRA-verified GP & specialist network.**
Directory, practitioner profiles, and referral flows for Australian healthcare.

`Next.js` `NestJS` `Prisma` `PostgreSQL`

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🔧 Skill Link
**Service marketplace for skilled workers.**
Location-aware discovery, ratings, and AI-assisted recommendations.

`React Native` `Expo` `NestJS` `MongoDB`

</td>
<td width="50%" valign="top">

### 📰 Aikonnect
**Content platform with a business model.**
Subscriptions, reading-progress tracking, admin tooling, AI content features.

`Next.js` `Prisma` `Stripe` `PostgreSQL`

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🧠 CompareBestAI
**AI tool comparison engine.**
Structured, explainable recommendations instead of a ranked list.

`Next.js` `LLM APIs` `Vector Search`

</td>
<td width="50%" valign="top">

### 🚗 DriverX
**Driving platform with a conversational assistant.**
Chat-first UX over a domain-specific knowledge base.

`Next.js` `Node.js` `LLM APIs`

</td>
</tr>
</table>

<details>
<summary><b>🔍 The engineering behind them</b> — architecture notes, if you want the detail</summary>

<br/>

**Honicomb AI — separating language from arithmetic**
The system is split in two on purpose: a retrieval-based knowledge assistant, and a **deterministic billing engine**. The LLM explains and locates the right MBS item numbers; it never calculates money. Retrieval runs on PostgreSQL with `pgvector` and an HNSW index using local embeddings, which keeps latency and cost flat as the corpus grows. Deployed on EC2 behind Nginx with PM2.

**Circi — the domain is the hard part**
Provider verification, medical taxonomy, and Australian billing conventions all have to be modelled correctly before a single screen makes sense. Rendering strategy is chosen per route — SSR for authenticated views, ISR for directory pages that need to be indexable and fast.

**Skill Link — two-sided marketplace mechanics**
Matching, trust, and availability decide whether the app feels usable. Real-time updates over sockets, geo-aware querying, and a schema that treats workers and customers as genuinely different entities rather than one flag on a user table.

**Aikonnect — subscriptions done properly**
Entitlement checks live in the backend, not the UI. Stripe webhooks are idempotent, and reading progress is modelled per user per article so it survives a device change.

</details>

<br/>

## 🧰 Stack

<table>
<tr><td><b>Frontend</b></td><td><img src="https://skillicons.dev/icons?i=react,nextjs,vue,ts,tailwind,redux&theme=dark" height="38" /></td></tr>
<tr><td><b>Mobile</b></td><td><img src="https://skillicons.dev/icons?i=react,expo&theme=dark" height="38" /></td></tr>
<tr><td><b>Backend</b></td><td><img src="https://skillicons.dev/icons?i=nestjs,nodejs,express,py&theme=dark" height="38" /></td></tr>
<tr><td><b>Data</b></td><td><img src="https://skillicons.dev/icons?i=postgres,mongodb,prisma,supabase,firebase&theme=dark" height="38" /></td></tr>
<tr><td><b>Infra</b></td><td><img src="https://skillicons.dev/icons?i=aws,docker,nginx,vercel,cloudflare,git&theme=dark" height="38" /></td></tr>
<tr><td><b>Creative</b></td><td><img src="https://skillicons.dev/icons?i=threejs,unity,figma&theme=dark" height="38" /></td></tr>
</table>

<p>
  <img src="https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/RAG_Pipelines-1F2937?style=flat-square" />
  <img src="https://img.shields.io/badge/pgvector-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Embeddings-1F2937?style=flat-square" />
  <img src="https://img.shields.io/badge/n8n-EA4B71?style=flat-square&logo=n8n&logoColor=white" />
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white" />
  <img src="https://img.shields.io/badge/Klarna-FFB3C7?style=flat-square&logo=klarna&logoColor=black" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black" />
</p>

<br/>

## 🧭 How I Build

<table>
<tr>
<td width="25%" valign="top"><b>Data model first</b><br/><sub>Most product bugs are schema decisions made too early.</sub></td>
<td width="25%" valign="top"><b>Deterministic where it counts</b><br/><sub>LLMs for language. Never for money, compliance, or arithmetic.</sub></td>
<td width="25%" valign="top"><b>AI as leverage</b><br/><sub>Claude Code and custom MCP servers in my daily loop — for speed, not instead of understanding.</sub></td>
<td width="25%" valign="top"><b>Ship, then own it</b><br/><sub>Deploys, TLS, process management and hardening are part of the job.</sub></td>
</tr>
</table>

<br/>

## 🔭 Currently

```yaml
building:   MBS retrieval assistant — chunking strategy, evals, cost modelling
designing:  scroll-driven 3D web experiences (Three.js + GSAP)
learning:   Unity — by building a full game, not by watching tutorials
reading_on: hybrid search, grounding, and RAG evaluation
```

<br/>

<details>
<summary><b>📊 GitHub activity</b></summary>

<br/>

<p align="center">
  <img height="160" src="https://github-readme-stats.vercel.app/api?username=YOUR-GITHUB-USERNAME&show_icons=true&hide_border=true&include_all_commits=true&count_private=true&hide_title=true&bg_color=0D1117&text_color=8FA1B8&icon_color=38BDF8&title_color=F8FAFC" />
  <img height="160" src="https://github-readme-stats.vercel.app/api/top-langs/?username=YOUR-GITHUB-USERNAME&layout=compact&hide_border=true&langs_count=8&hide_title=true&bg_color=0D1117&text_color=8FA1B8&title_color=F8FAFC" />
</p>

<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=YOUR-GITHUB-USERNAME&bg_color=0D1117&color=8FA1B8&line=38BDF8&point=F472B6&area=true&hide_border=true" width="98%" />
</p>

</details>

<br/>

## 📬 Connect

Open to product work — especially AI-powered applications, healthcare systems, or hard backend problems.

<p>
  <a href="mailto:YOUR-EMAIL"><img src="https://img.shields.io/badge/Email-0D1117?style=for-the-badge&logo=gmail&logoColor=EA4335" /></a>
  <a href="https://linkedin.com/in/YOUR-LINKEDIN"><img src="https://img.shields.io/badge/LinkedIn-0D1117?style=for-the-badge&logo=linkedin&logoColor=0A66C2" /></a>
  <a href="https://YOUR-PORTFOLIO"><img src="https://img.shields.io/badge/Portfolio-0D1117?style=for-the-badge&logo=vercel&logoColor=white" /></a>
</p>
