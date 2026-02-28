# ADHD & Anxiety Copilot

A production-ready full-stack AI-powered application designed to help users with ADHD and anxiety overcome task paralysis using intelligent AI agents.

## Architecture

- **Frontend**: Next.js 14 (App Router), TailwindCSS, shadcn/ui
- **Backend**: FastAPI (Python)
- **AI Engine**: OpenAI API with structured JSON outputs
- **Database**: Supabase (optional, for future persistence)

## Features

### 1. Brain Dump
Parse unstructured thoughts into organized categories:
- Urgent tasks (need immediate attention)
- Later tasks (can be deferred)
- Emotional processing (concerns that need emotional support)

### 2. Task Decomposition
Break down overwhelming tasks into tiny, concrete micro-steps:
- Each step is specific and actionable
- Includes time estimates
- Suggests optimal focus sprint duration

### 3. Motivation Agent
Get non-judgmental, compassionate encouragement:
- Acknowledges difficulty without shame
- Focuses on tiny progress
- Uses warm, friendly language

### 4. Overwhelm Mode
When everything feels like too much:
- Returns exactly ONE tiny first step
- Takes less than 2 minutes
- Concrete and specific (not vague)

### 5. Focus Sprint
Create 5-minute focused actions:
- Specific, measurable, achievable actions
- Helps build momentum
- Perfect for working with limited focus capacity

## Project Structure

```
├── /app                          # Next.js frontend
│   ├── page.tsx                 # Main dashboard
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── /backend                      # FastAPI backend
│   ├── app/
│   │   ├── main.py              # FastAPI app
│   │   ├── models.py            # Pydantic models
│   │   └── service.py           # OpenAI integration
│   ├── requirements.txt          # Python dependencies
│   ├── .env.example              # Environment template
│   └── README.md                 # Backend setup
├── /components                   # shadcn/ui components
├── /hooks                        # React hooks
├── /lib                          # Utilities
├── package.json                  # Frontend dependencies
└── tsconfig.json                 # TypeScript config
```

## Quick Start

### Prerequisites

- Node.js 18+ (for frontend)
- Python 3.9+ (for backend)
- OpenAI API key

### Backend Setup

1. Install Python dependencies:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. Create `.env` file in `/backend`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

3. Run the server:
```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`
- Interactive docs: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

### Frontend Setup

1. Install Node dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Running Both Servers

For full functionality, run in separate terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## API Endpoints

All endpoints require JSON input and return structured JSON responses.

### `POST /api/decompose`
Break down a task into micro-steps.

**Request:**
```json
{
  "task_text": "Write a 5-page report on renewable energy"
}
```

**Response:**
```json
{
  "micro_steps": [
    {
      "step": "Open a blank document",
      "estimated_minutes": 2
    },
    {
      "step": "Write the title and introduction",
      "estimated_minutes": 15
    }
  ],
  "focus_sprint_duration": 25
}
```

### `POST /api/braindump`
Organize messy thoughts into categories.

**Request:**
```json
{
  "messy_thoughts": "Need to call the doctor, worried about deadline, pick up groceries, what if I fail the exam"
}
```

**Response:**
```json
{
  "urgent": ["Call the doctor"],
  "later": ["Pick up groceries"],
  "emotional_processing": ["Worried about deadline", "What if I fail the exam"]
}
```

### `POST /api/motivate`
Get compassionate encouragement.

**Request:**
```json
{
  "task": "start writing my thesis"
}
```

**Response:**
```json
{
  "encouragement_message": "Writing a thesis is genuinely hard, especially when you're dealing with ADHD. The fact that you're even thinking about starting shows real courage. How about you just write one sentence today? That's all you need."
}
```

### `POST /api/overwhelm`
Get one tiny first step.

**Request:**
```json
{
  "task": "Clean my entire apartment before my parents arrive tomorrow"
}
```

**Response:**
```json
{
  "tiny_first_step": "Pick up your phone and set a 5-minute timer"
}
```

### `POST /api/focus`
Get a 5-minute action.

**Request:**
```json
{
  "task": "Learn JavaScript"
}
```

**Response:**
```json
{
  "five_minute_action": "Read the first section of the JavaScript tutorial and write down one new concept you learned"
}
```

## Configuration

### Environment Variables

**Frontend** (`.env` in root):
- No required variables for basic setup
- Backend URL is hardcoded to `http://localhost:8000/api`

**Backend** (`.env` in `/backend`):
- `OPENAI_API_KEY`: Your OpenAI API key (required)

### Production Deployment

For production:

1. Update Frontend API URL:
   - Modify `API_URL` in `/app/page.tsx` to your production backend

2. Backend Deployment:
   - Deploy FastAPI to a server (e.g., Railway, Render, AWS)
   - Set `OPENAI_API_KEY` in production environment
   - Update CORS origins in `app/main.py`

3. Frontend Deployment:
   - Deploy to Vercel, Netlify, or similar
   - Ensure backend URL is set correctly

## Customization

### Styling

The app uses TailwindCSS. Modify colors in:
- `/app/page.tsx`: Component classes
- `/tailwind.config.ts`: Color palette

### AI Prompts

Customize AI behavior in `/backend/app/service.py`:
- System prompts for each agent
- Response formats
- AI model (currently gpt-4o-2024-08-06)

## Architecture Details

### Frontend Flow

1. User enters input in a textarea
2. JavaScript fetches to backend API endpoint
3. Response is displayed in real-time
4. Results are stored in React state

### Backend Flow

1. FastAPI receives POST request with Pydantic validation
2. Service layer calls OpenAI API with structured JSON output
3. Response is parsed and validated against response model
4. Structured JSON is returned to frontend

### AI Integration

Uses OpenAI's Structured Outputs feature:
- `client.beta.chat.completions.parse()` enforces JSON schema
- Pydantic models define exact response format
- Type-safe responses on both sides

## Features for ADHD & Anxiety Support

- **Non-judgmental language**: AI responses acknowledge difficulty without shame
- **Bite-sized steps**: All suggestions are small enough to feel achievable
- **Multiple modes**: Different tools for different mental states
- **Calm UI**: Soft colors and clear navigation reduce cognitive load
- **No time pressure**: Users work at their own pace

## Testing

To test the API manually:

```bash
# Brain Dump
curl -X POST "http://localhost:8000/api/braindump" \
  -H "Content-Type: application/json" \
  -d '{"messy_thoughts":"too much to do, feeling anxious"}'

# Task Decomposition
curl -X POST "http://localhost:8000/api/decompose" \
  -H "Content-Type: application/json" \
  -d '{"task_text":"organize my desk"}'
```

## Troubleshooting

### Backend won't start
- Check Python 3.9+ is installed
- Verify virtual environment is activated
- Ensure `OPENAI_API_KEY` is set
- Check port 8000 is available

### Frontend won't connect to backend
- Verify backend is running on port 8000
- Check CORS origin in `backend/app/main.py`
- Ensure frontend is accessing `http://localhost:8000/api`

### OpenAI API errors
- Verify API key is valid
- Check account has credits
- Monitor API usage in OpenAI dashboard
- Ensure model `gpt-4o-2024-08-06` is available in your account

## Support for ADHD & Anxiety

This application is designed with input from the ADHD and anxiety communities:
- Removes shame and judgment
- Acknowledges legitimate difficulty
- Provides validation
- Breaks tasks into tiny steps
- Respects limited focus capacity
- Uses warm, friendly language

## License

MIT

## Contributing

This is a production template. Customize as needed for your use case.

## More Information

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
