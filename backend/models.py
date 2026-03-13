from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    records = relationship("DailyRecord", back_populates="user")


class DailyRecord(Base):
    __tablename__ = "daily_records"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    study_hours = Column(Float, nullable=False)
    break_count = Column(Integer, nullable=False)
    sleep_hours = Column(Float, nullable=False)
    screen_time = Column(Float, nullable=False)
    caffeine_cups = Column(Integer, nullable=False)
    stress_level = Column(Integer, nullable=False)

    focus_prediction = Column(String, nullable=True)
    recommendation = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="records")
    feedbacks = relationship("Feedback", back_populates="record")


class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    record_id = Column(Integer, ForeignKey("daily_records.id"), nullable=False)
    is_correct = Column(Boolean, nullable=False)

    record = relationship("DailyRecord", back_populates="feedbacks")