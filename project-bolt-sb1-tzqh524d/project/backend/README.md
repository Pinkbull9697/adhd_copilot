# ADHD & Anxiety Copilot - Backend

FastAPI backend with AI agents powered by OpenAI.

## Setup

1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Create a `.env` file with your OpenAI API key:
```
OPENAI_API_KEY=your_key_here
```

3. Run the server:
```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:
- Interactive docs: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

## Endpoints

- `POST /api/decompose` - Break down tasks into micro-steps
- `POST /api/braindump` - Parse messy thoughts into categories
- `POST /api/motivate` - Get encouragement for a task
- `POST /api/overwhelm` - Get one tiny first step when overwhelmed
- `POST /api/focus` - Get a 5-minute focus sprint action
