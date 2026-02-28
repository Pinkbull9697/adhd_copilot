# 🧠 ADHD & Anxiety Copilot

An AI-powered, full-stack web application designed to help individuals overcome task paralysis, overwhelm, and executive dysfunction. Built with compassion for minds that work differently.

**[🔴 Live Demo](https://adhd-copilo.vercel.app/)** *(Replace with your actual Vercel link)*

---

## 🚀 Features

This application utilizes highly structured AI prompts to break down mental roadblocks into manageable, bite-sized actions:

* **Brain Dump Organizer:** Takes a messy stream of consciousness and automatically categorizes thoughts into "Urgent Tasks," "Later Tasks," and "Emotional Processing."
* **Task Decomposer:** Breaks down intimidating tasks into concrete, impossibly small micro-steps with estimated timeframes.
* **Overwhelm Mode:** When everything is too much, this feature bypasses lists and gives the user exactly *one* ridiculously simple, 2-minute first step to build momentum.
* **Focus Sprints:** Designs a single, highly specific action that can be completed in exactly 5 minutes.
* **Shame-Free Motivation:** Generates brief, compassionate encouragement tailored to neurodivergent struggles, actively avoiding toxic positivity.

---

## 🛠️ Tech Stack & Architecture

This project is built using a modern decoupled architecture, separating the client interface from the AI orchestration layer.

**Frontend:**
* Next.js / React
* Deployed on **Vercel**

**Backend:**
* **FastAPI** (Python) for high-performance async API routing
* **Uvicorn** ASGI web server
* Deployed on **Render** **AI Engine:**
* **Google Gemini API** (`gemini-2.5-flash` model)
* Utilizes zero-shot prompting and structured JSON schema parsing to guarantee consistent API payloads.

---

## 💻 Local Development Setup

To run this project locally, you will need two terminal windows running simultaneously.

### 1. Backend Setup
Navigate to the backend directory and install the required Python packages:
```bash
cd backend
pip install -r requirements.txt
