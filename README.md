# AI Podcast Repurposer

## Project Overview
AI Podcast Repurposer is a professional Creator Economy platform designed to help podcasters easily manage episodes and repurpose long-form audio into a variety of high-impact content formats. This tool helps creators automatically generate social media posts, summaries, show notes, and short-form content ideas from a single source file.

## Problem Statement
Creating high-quality marketing collateral across multiple channels (LinkedIn, X, Instagram, Blogs) from a single podcast episode is time-consuming and labor-intensive. Creators often spend more time distributing content than creating it. This platform aims to automate the repurposing pipeline to maximize reach with minimal effort.

## Current Features
This repository currently contains a fully functional **Phase 1 Frontend MVP**. It utilizes local state and realistic mock data to demonstrate the core user experience.

*   **Professional Dashboard:** High-level metrics (Total Podcasts, Content Generated, Processing Status) and recent podcast overviews.
*   **Podcast Library:** A searchable, filterable repository of all podcast episodes with status tracking (Ready, Processing, Draft).
*   **New Podcast Flow:** A polished interface for adding new podcast episodes with simulated upload and processing states.
*   **Podcast Detail View:** A comprehensive detail page featuring episode overviews, realistic mock transcripts, and categorized AI-generated content cards.
*   **Content Generation Studio:** A workspace to select an episode, content type (e.g., LinkedIn, Show Notes), and tone, which generates editable mock content templates.
*   **Basic Analytics:** Visualizations of content generation trends and activity.
*   **Settings Management:** User profile and content preferences (persisted locally).

## Tech Stack
*   **Framework:** Next.js (App Router)
*   **Library:** React
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (Dark SaaS Theme)
*   **Icons:** Lucide React

## Project Structure
```
ai-podcast-repurposer/
├── src/
│   ├── app/                # Next.js app router pages & layout
│   ├── components/         # Modular React components
│   │   ├── layout/         # Header, Sidebar
│   │   ├── modals/         # New Podcast Modal
│   │   ├── pages/          # Page-level components
│   │   └── ui/             # Reusable UI elements (Cards, Badges, Toasts)
│   ├── data/               # Local mock data for development
│   ├── hooks/              # Custom state management hooks
│   └── types/              # TypeScript interfaces
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Current MVP Architecture
The current architecture is frontend-only, designed to demonstrate the user interface and interactions. It relies on React state and `localStorage` to persist data (like user preferences and newly added podcasts) across browser sessions. AI content generation and transcription features are currently simulated using templates and mock data.

## Future Development & Planned AI/Backend Integration
The codebase is structured to seamlessly integrate with backend services in subsequent development phases. 

**Planned Integrations include:**
*   **FastAPI Backend:** RESTful API for handling core business logic, user management, and workflow orchestration.
*   **PostgreSQL Database:** Persistent, scalable storage replacing current local mock data.
*   **JWT Authentication:** Secure user identity and session management.
*   **LangGraph AI Workflows:** Complex orchestration of AI generation tasks (e.g., Audio -> Transcript -> Summary -> Social Posts).
*   **Real Transcription & LLMs:** Integration with models like Whisper for transcription and GPT-4/Gemini for intelligent, context-aware content generation.
*   **RAG / ChromaDB:** For semantic search and context retrieval across a creator's historical episodes.
*   **Production Deployment:** Dockerization and CI/CD pipelines for cloud deployment.
