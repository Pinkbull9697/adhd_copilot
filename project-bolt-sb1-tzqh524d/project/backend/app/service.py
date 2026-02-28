import os
import json
from dotenv import load_dotenv
from google import genai
from app.models import (
    TaskDecomposeResponse,
    BrainDumpResponse,
    MotivationResponse,
    OverwhelmResponse,
    FocusSprintResponse,
)

load_dotenv()

# Clean client. No v1beta overrides.
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def parse_brain_dump(messy_thoughts: str) -> BrainDumpResponse:
    try:
        prompt = f"Extract tasks and return ONLY a JSON object with keys 'urgent', 'later', 'emotional_processing'. Thoughts: {messy_thoughts}"
        # THE FIX: Just "gemini-1.5-flash". No "models/" prefix.
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        text = response.text.replace('```json', '').replace('```', '').strip()
        return BrainDumpResponse(**json.loads(text))
    except Exception as e:
        print(f"BRAIN DUMP ERROR: {str(e)}")
        raise e

def decompose_task(task_text: str) -> TaskDecomposeResponse:
    try:
        prompt = f"Break this task into micro-steps. Return ONLY JSON matching TaskDecomposeResponse schema. Task: {task_text}"
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        text = response.text.replace('```json', '').replace('```', '').strip()
        return TaskDecomposeResponse(**json.loads(text))
    except Exception as e:
        print(f"DECOMPOSE ERROR: {str(e)}")
        raise e

def generate_motivation(task: str) -> MotivationResponse:
    try:
        prompt = f"Give short ADHD-friendly motivation for: {task}. Return ONLY JSON with key 'message'."
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        text = response.text.replace('```json', '').replace('```', '').strip()
        return MotivationResponse(**json.loads(text))
    except Exception as e:
        print(f"MOTIVATION ERROR: {str(e)}")
        raise e

def handle_overwhelm(task: str) -> OverwhelmResponse:
    try:
        prompt = f"Give EXACTLY ONE tiny step for: {task}. Return ONLY JSON with key 'tiny_step'."
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        text = response.text.replace('```json', '').replace('```', '').strip()
        return OverwhelmResponse(**json.loads(text))
    except Exception as e:
        print(f"OVERWHELM ERROR: {str(e)}")
        raise e

def generate_focus_sprint(task: str) -> FocusSprintResponse:
    try:
        prompt = f"Create a 5-minute action for: {task}. Return ONLY JSON with key 'action'."
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        text = response.text.replace('```json', '').replace('```', '').strip()
        return FocusSprintResponse(**json.loads(text))
    except Exception as e:
        print(f"SPRINT ERROR: {str(e)}")
        raise e