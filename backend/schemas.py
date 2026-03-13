from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True


class DailyRecordCreate(BaseModel):
    user_id: int
    study_hours: float
    break_count: int
    sleep_hours: float
    screen_time: float
    caffeine_cups: int
    stress_level: int


class DailyRecordResponse(BaseModel):
    id: int
    user_id: int
    study_hours: float
    break_count: int
    sleep_hours: float
    screen_time: float
    caffeine_cups: int
    stress_level: int
    focus_prediction: Optional[str]
    recommendation: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class FeedbackCreate(BaseModel):
    record_id: int
    is_correct: bool


class FeedbackResponse(BaseModel):
    id: int
    record_id: int
    is_correct: bool

    class Config:
        from_attributes = True