from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.models import (
    TaskDecomposeRequest,
    TaskDecomposeResponse,
    BrainDumpRequest,
    BrainDumpResponse,
    MotivationRequest,
    MotivationResponse,
    OverwhelmRequest,
    OverwhelmResponse,
    FocusSprintRequest,
    FocusSprintResponse,
)
from app.service import (
    decompose_task,
    parse_brain_dump,
    generate_motivation,
    handle_overwhelm,
    generate_focus_sprint,
)

load_dotenv()

app = FastAPI(
    title="ADHD & Anxiety Copilot API",
    description="AI-powered agents to help overcome task paralysis",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "ADHD & Anxiety Copilot API",
        "status": "running",
        "endpoints": [
            "/api/decompose",
            "/api/braindump",
            "/api/motivate",
            "/api/overwhelm",
            "/api/focus"
        ]
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.post("/api/decompose", response_model=TaskDecomposeResponse)
async def decompose_endpoint(request: TaskDecomposeRequest):
    try:
        result = decompose_task(request.task_text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error decomposing task: {str(e)}")


@app.post("/api/braindump", response_model=BrainDumpResponse)
async def brain_dump_endpoint(request: BrainDumpRequest):
    try:
        result = parse_brain_dump(request.messy_thoughts)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing brain dump: {str(e)}")


@app.post("/api/motivate", response_model=MotivationResponse)
async def motivation_endpoint(request: MotivationRequest):
    try:
        result = generate_motivation(request.task)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating motivation: {str(e)}")


@app.post("/api/overwhelm", response_model=OverwhelmResponse)
async def overwhelm_endpoint(request: OverwhelmRequest):
    try:
        result = handle_overwhelm(request.task)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error handling overwhelm: {str(e)}")


@app.post("/api/focus", response_model=FocusSprintResponse)
async def focus_sprint_endpoint(request: FocusSprintRequest):
    try:
        result = generate_focus_sprint(request.task)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating focus sprint: {str(e)}")
