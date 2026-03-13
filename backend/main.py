from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

import models
import schemas
import crud
from database import engine, SessionLocal, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="FocusMind AI Backend")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def simple_focus_predict(record: schemas.DailyRecordCreate):
    score = 0

    if record.study_hours >= 4:
        score += 2
    elif record.study_hours >= 2:
        score += 1

    if record.sleep_hours >= 7:
        score += 2
    elif record.sleep_hours >= 5:
        score += 1

    if record.break_count >= 2 and record.break_count <= 5:
        score += 1

    if record.screen_time <= 5:
        score += 1

    if record.caffeine_cups <= 2:
        score += 1

    if record.stress_level <= 4:
        score += 2
    elif record.stress_level <= 7:
        score += 1

    if score >= 8:
        prediction = "High Focus"
        recommendation = "Odak seviyen iyi görünüyor. Bu düzeni koruyabilirsin."
    elif score >= 5:
        prediction = "Medium Focus"
        recommendation = "Odak seviyen orta. Uyku ve ekran süresini iyileştirmek faydalı olabilir."
    else:
        prediction = "Low Focus"
        recommendation = "Uyku düzeni, stres kontrolü ve mola planlaması üzerinde çalışmalısın."

    return prediction, recommendation


@app.get("/")
def root():
    return {"message": "FocusMind AI backend çalışıyor"}


@app.post("/users", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)


@app.post("/predict", response_model=schemas.DailyRecordResponse)
def predict_focus(record: schemas.DailyRecordCreate, db: Session = Depends(get_db)):
    prediction, recommendation = simple_focus_predict(record)
    saved_record = crud.create_daily_record(db, record, prediction, recommendation)
    return saved_record


@app.get("/records/{user_id}")
def get_records(user_id: int, db: Session = Depends(get_db)):
    records = crud.get_user_records(db, user_id)
    return records


@app.post("/feedback", response_model=schemas.FeedbackResponse)
def create_feedback(feedback: schemas.FeedbackCreate, db: Session = Depends(get_db)):
    return crud.create_feedback(db, feedback)