# AI Podcast Repurposer

Transform your podcasts into multiple high-quality content formats. 

This repository contains the Viva-1 Frontend MVP of the AI Podcast Repurposer.

## Project Overview

**Problem Statement:** Podcast creators spend hours extracting value from their episodes. They need to write show notes, summarize takeaways, craft social media posts (LinkedIn, X, Instagram), and find short video ideas.
**Objective:** Provide a centralized SaaS platform to upload a podcast, generate transcripts, and run specialized AI prompts to extract multiple content pieces automatically.

## Current Implementation (Viva-1 Scope)

The current implementation focuses on a robust, professional Next.js Frontend MVP that establishes the UX and user journey.
- **Dashboard:** Overview of podcast stats, recent podcasts, and quick actions.
- **Podcast Library:** Management interface for uploaded podcasts.
- **Content Studio:** The core interface to select a podcast, choose a platform/tone, and generate content.
- **Content Library:** A repository of all saved generated content.
- **Analytics & Settings:** Placeholder views for future aggregation.

*Note: For the Viva-1 demo, backend operations (transcription, LLM generation, database storage) are simulated via frontend state and mock delays to demonstrate the intended user experience.*

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Utilities:** clsx, tailwind-merge

## How to Run

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Future Architecture (Phase 2+)

The frontend is designed to be cleanly integrated with the following stack in upcoming phases:
- **Backend:** FastAPI (Python), PostgreSQL, SQLAlchemy.
- **Authentication:** JWT via OAuth2PasswordBearer.
- **AI Integration:** Real transcription APIs, LLM calls via LangChain/LangGraph for structured prompt chains.
- **RAG / Vector DB:** ChromaDB and RAGAS for semantic search and context injection.
- **Deployment:** Docker, CI/CD, and cloud hosting.
