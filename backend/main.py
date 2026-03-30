from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware


import models
import schemas
import crud
from database import engine, SessionLocal, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="FocusMind AI Backend")

app.add_middleware(
    CORSMiddleware,
  allow_origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/predict")
def predict(record: schemas.DailyRecordCreate, db: Session = Depends(get_db)):

    # basit örnek prediction
    if record.study_hours >= 5 and record.sleep_hours >= 7:
        prediction = "High Focus"
    else:
        prediction = "Low Focus"

    # ✅ BURASI ÖNEMLİ (aynı hizaya dikkat et)
    if record.sleep_hours < 6:
        recommendation = "Daha iyi odaklanmak için uyku süreni artırmalısın."
    elif record.stress_level > 7:
        recommendation = "Stres seviyen yüksek. Kısa molalar ve nefes egzersizleri faydalı olabilir."
    elif record.screen_time > 8:
        recommendation = "Ekran süren fazla. Gözlerini dinlendirmek için mola ver."
    elif record.study_hours >= 5 and record.sleep_hours >= 7:
        recommendation = "Odak seviyen iyi görünüyor. Bu düzeni koruyabilirsin."
    else:
        recommendation = "Daha verimli çalışmak için çalışma ve dinlenme dengesini gözden geçirebilirsin."

    return crud.create_daily_record(db, record, prediction, recommendation)

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

@app.post("/login", response_model=schemas.UserResponse)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.login_user(db, user)

    if not db_user:
        raise HTTPException(status_code=401, detail="Email veya şifre hatalı")

    return db_user