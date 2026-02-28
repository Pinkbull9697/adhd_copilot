import os
from openai import OpenAI
from app.models import (
    TaskDecomposeResponse,
    BrainDumpResponse,
    MotivationResponse,
    OverwhelmResponse,
    FocusSprintResponse,
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def decompose_task(task_text: str) -> TaskDecomposeResponse:
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {
                "role": "system",
                "content": """You are an ADHD-friendly task breakdown assistant.
                Break down tasks into very small, concrete, actionable micro-steps.
                Each step should be so small that it feels almost impossible to fail.
                Be specific and include estimated time for each step.
                Suggest an appropriate focus sprint duration based on the task complexity."""
            },
            {
                "role": "user",
                "content": f"Break down this task into micro-steps: {task_text}"
            }
        ],
        response_format=TaskDecomposeResponse,
    )
    return completion.choices[0].message.parsed


def parse_brain_dump(messy_thoughts: str) -> BrainDumpResponse:
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {
                "role": "system",
                "content": """You are a compassionate thought organizer for people with ADHD and anxiety.
                Parse unstructured thoughts into three categories:
                1. Urgent - tasks that need immediate attention
                2. Later - tasks that can wait
                3. Emotional Processing - concerns that are emotional rather than actionable

                Be kind and non-judgmental. Recognize that what seems urgent to the person
                may not actually be urgent, but validate their feelings."""
            },
            {
                "role": "user",
                "content": f"Please organize these thoughts: {messy_thoughts}"
            }
        ],
        response_format=BrainDumpResponse,
    )
    return completion.choices[0].message.parsed


def generate_motivation(task: str) -> MotivationResponse:
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {
                "role": "system",
                "content": """You are a warm, understanding motivational coach for people with ADHD and anxiety.
                Provide brief, genuine encouragement that:
                - Acknowledges the difficulty
                - Removes shame and judgment
                - Focuses on tiny progress
                - Uses warm, friendly language
                - Keeps it short (2-3 sentences max)

                Avoid toxic positivity. Be real and compassionate."""
            },
            {
                "role": "user",
                "content": f"I need to {task} but I'm struggling to start."
            }
        ],
        response_format=MotivationResponse,
    )
    return completion.choices[0].message.parsed


def handle_overwhelm(task: str) -> OverwhelmResponse:
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {
                "role": "system",
                "content": """You are an ADHD-specialized task helper for overwhelm mode.
                When someone is overwhelmed, provide EXACTLY ONE tiny, ridiculously simple first step.
                This step should be so small it takes less than 2 minutes.
                It should be concrete and specific, not vague.

                Examples:
                - "Open the document"
                - "Put your shoes on"
                - "Write the first sentence"

                Do not give multiple steps. Just one."""
            },
            {
                "role": "user",
                "content": f"I'm overwhelmed by this: {task}. What's one tiny step I can take?"
            }
        ],
        response_format=OverwhelmResponse,
    )
    return completion.choices[0].message.parsed


def generate_focus_sprint(task: str) -> FocusSprintResponse:
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {
                "role": "system",
                "content": """You are a focus sprint designer for people with ADHD.
                Create one specific action that can be completed in exactly 5 minutes.
                Make it concrete, measurable, and achievable.

                Examples:
                - "Write 3 bullet points outlining the main ideas"
                - "Gather all the materials you need in one place"
                - "Read and summarize the first page"

                Keep it to ONE action only."""
            },
            {
                "role": "user",
                "content": f"Create a 5-minute focus sprint for: {task}"
            }
        ],
        response_format=FocusSprintResponse,
    )
    return completion.choices[0].message.parsed
