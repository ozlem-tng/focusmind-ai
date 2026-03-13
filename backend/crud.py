from sqlalchemy.orm import Session
import models
import schemas


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        name=user.name,
        email=user.email,
        password=user.password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_daily_record(db: Session, record: schemas.DailyRecordCreate, prediction: str, recommendation: str):
    db_record = models.DailyRecord(
        user_id=record.user_id,
        study_hours=record.study_hours,
        break_count=record.break_count,
        sleep_hours=record.sleep_hours,
        screen_time=record.screen_time,
        caffeine_cups=record.caffeine_cups,
        stress_level=record.stress_level,
        focus_prediction=prediction,
        recommendation=recommendation
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record


def get_user_records(db: Session, user_id: int):
    return db.query(models.DailyRecord).filter(models.DailyRecord.user_id == user_id).all()


def create_feedback(db: Session, feedback: schemas.FeedbackCreate):
    db_feedback = models.Feedback(
        record_id=feedback.record_id,
        is_correct=feedback.is_correct
    )
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback