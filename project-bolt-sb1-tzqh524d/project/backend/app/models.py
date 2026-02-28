from pydantic import BaseModel, Field
from typing import List


class MicroStep(BaseModel):
    step: str = Field(..., description="A single micro-step")
    estimated_minutes: int = Field(..., description="Estimated time in minutes")


class TaskDecomposeRequest(BaseModel):
    task_text: str = Field(..., description="The task to decompose into micro-steps")


class TaskDecomposeResponse(BaseModel):
    micro_steps: List[MicroStep] = Field(..., description="List of micro-steps to complete the task")
    focus_sprint_duration: int = Field(..., description="Suggested focus sprint duration in minutes")


class BrainDumpRequest(BaseModel):
    messy_thoughts: str = Field(..., description="Unstructured thoughts and tasks")


class BrainDumpResponse(BaseModel):
    urgent: List[str] = Field(..., description="Tasks that need immediate attention")
    later: List[str] = Field(..., description="Tasks that can be done later")
    emotional_processing: List[str] = Field(..., description="Items that are emotional concerns rather than actionable tasks")


class MotivationRequest(BaseModel):
    task: str = Field(..., description="The task that needs motivation")


class MotivationResponse(BaseModel):
    encouragement_message: str = Field(..., description="A non-judgmental, supportive encouragement message")


class OverwhelmRequest(BaseModel):
    task: str = Field(..., description="The overwhelming task")


class OverwhelmResponse(BaseModel):
    tiny_first_step: str = Field(..., description="The smallest possible first step to take")


class FocusSprintRequest(BaseModel):
    task: str = Field(..., description="The task to create a focus sprint for")


class FocusSprintResponse(BaseModel):
    five_minute_action: str = Field(..., description="A specific action that can be completed in 5 minutes")
