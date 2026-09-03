<h1 align="center">Web × Mobile × Backend × AI</h1>

<p align="center">
  I build production software — not demos.
</p>

<p align="center">
  <a href="#featured-work">Featured Work</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#how-i-build">How I Build</a> •
  <a href="#lets-connect">Contact</a>
</p>

---

## About

I'm **Abdullah Latif**, a full-stack developer working across web, mobile, backend and AI-powered products.

Most of my work sits where product design meets systems design: React and React Native interfaces on the front, NestJS and Node APIs with properly modelled PostgreSQL/MongoDB schemas behind them, deployed and maintained on real infrastructure. Lately a lot of that work involves LLMs — retrieval pipelines, embeddings, and AI assistants built into products rather than bolted onto them.

Currently in my final semester of **BSCS at Lahore Garrison University**, and building for real users while I finish.

**What I care about:** clean architecture, correct data relationships, backends that survive growth, and interfaces people don't have to think about.

---

## Featured Work

### Honicomb AI
An AI billing assistant for the **Australian Medicare Benefits Schedule (MBS)** — clinicians ask billing questions in plain language and get grounded, item-number-accurate answers.

The interesting part is the architecture: a retrieval-based knowledge assistant and a **deterministic billing engine** are deliberately separated, so the LLM answers questions but never calculates money. Retrieval runs on PostgreSQL + `pgvector` with an HNSW index and local embeddings, which keeps cost predictable at scale.

`NestJS` `Next.js` `PostgreSQL` `pgvector` `RAG` `OpenAI` `AWS EC2` `Nginx`

---

### Circi
A healthcare network connecting patients with **AHPRA-verified GPs and specialists** in Australia — specialist directory, practitioner profiles, and referral flows.

A domain-heavy product: provider verification, medical taxonomy, and Australian billing conventions all have to be modelled correctly before a single screen makes sense.

`Next.js` `NestJS` `PostgreSQL` `Prisma` `SSR / ISR`

---

### Skill Link
A service marketplace connecting customers with skilled blue-collar workers through location-aware discovery, ratings, and AI-assisted recommendations.

Two-sided marketplaces are a good test of backend design — matching, trust, and availability all have to work before the app feels usable.

`React Native` `Expo` `NestJS` `MongoDB` `Socket.io`

---

### Aikonnect
A content and article platform with subscriptions, reading progress tracking, an admin layer, and AI-assisted content features.

`Next.js` `Node.js` `Prisma` `PostgreSQL` `Stripe`

---

### CompareBestAI &nbsp;·&nbsp; DriverX
Two AI-first products: an AI tool comparison platform with structured recommendations, and a driving platform built around a conversational AI assistant.

`Next.js` `LLM APIs` `Vector Search` `Tailwind CSS`

> **Also building:** a cinematic scroll-driven 3D site (Three.js + GSAP) for a gaming zone I'm opening, and my first Unity game — learning game dev by shipping one, not by watching tutorials.

---

## Tech Stack

<table>
  <tr>
    <td><b>Frontend</b></td>
    <td>
      <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
      <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white" />
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
      <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white" />
      <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td><b>Mobile</b></td>
    <td>
      <img src="https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
      <img src="https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td><b>Backend</b></td>
    <td>
      <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white" />
      <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
      <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" />
      <img src="https://img.shields.io/badge/REST_APIs-005571?style=flat-square" />
    </td>
  </tr>
  <tr>
    <td><b>Data</b></td>
    <td>
      <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
      <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" />
      <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" />
      <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white" />
      <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" />
    </td>
  </tr>
  <tr>
    <td><b>AI &amp; Automation</b></td>
    <td>
      <img src="https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white" />
      <img src="https://img.shields.io/badge/RAG_Pipelines-5A2D8C?style=flat-square" />
      <img src="https://img.shields.io/badge/pgvector-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
      <img src="https://img.shields.io/badge/Embeddings-1A7F64?style=flat-square" />
      <img src="https://img.shields.io/badge/n8n-EA4B71?style=flat-square&logo=n8n&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td><b>Infra &amp; DevOps</b></td>
    <td>
      <img src="https://img.shields.io/badge/AWS_EC2-FF9900?style=flat-square&logo=amazonec2&logoColor=white" />
      <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" />
      <img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white" />
      <img src="https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=pm2&logoColor=white" />
      <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" />
      <img src="https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td><b>Also</b></td>
    <td>Stripe · Klarna · Redux · Socket.io · Python · TypeORM · Three.js · GSAP</td>
  </tr>
</table>

---

## How I Build

**AI as part of the workflow.** I work daily with AI coding assistants — Claude Code with custom MCP servers wired into my environment — and treat them as leverage on architecture and iteration speed, not a substitute for understanding the system.

**Data model first.** Most product bugs are schema decisions made too early. I'd rather spend a day on relationships than a month on migrations.

**Deterministic where it matters.** LLMs are excellent at language and unreliable at arithmetic and compliance. I design systems that use them for the first and never the second.

**Ship, then own it.** Deployment, TLS, process management, and post-incident hardening are part of the job, not someone else's problem.

---

## Currently

- Extending the **MBS billing assistant** — retrieval quality, cost modelling, and evaluation
- Building **3D, scroll-driven web experiences** with Three.js and GSAP
- Learning **Unity** by building a full game, not by following along
- Going deeper on **retrieval systems** — chunking strategy, hybrid search, and grounding

---

## GitHub

<p align="center">
  <img height="165" src="https://github-readme-stats.vercel.app/api?username=YOUR-GITHUB-USERNAME&show_icons=true&hide_border=true&count_private=true&include_all_commits=true&theme=github_dark&hide_title=true" />
  <img height="165" src="https://github-readme-stats.vercel.app/api/top-langs/?username=YOUR-GITHUB-USERNAME&layout=compact&hide_border=true&langs_count=8&theme=github_dark&hide_title=true" />
</p>

<p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=YOUR-GITHUB-USERNAME&hide_border=true&theme=github-dark" />
</p>

---

## Let's Connect

Open to interesting product work — especially anything involving AI-powered applications, healthcare systems, or hard backend problems.

<p align="left">
  <a href="mailto:YOUR-EMAIL"><img src="https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white" /></a>
  <a href="https://linkedin.com/in/YOUR-LINKEDIN"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" /></a>
  <a href="https://YOUR-PORTFOLIO"><img src="https://img.shields.io/badge/Portfolio-111111?style=flat-square&logo=vercel&logoColor=white" /></a>
</p>
