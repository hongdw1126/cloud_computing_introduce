from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="홍동우 개인 소개 API",
    description="개인 소개 페이지의 프론트엔드·백엔드 연동을 위한 FastAPI 서비스입니다.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/", tags=["상태 확인"])
def root():
    return {"message": "홍동우의 FastAPI 서버가 정상 작동 중입니다.", "docs": "/docs"}


@app.get("/health", tags=["상태 확인"])
def health():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}


@app.get("/api/profile", tags=["프로필"])
def get_profile():
    return {
        "name": "홍동우",
        "role": "Software Learner",
        "message": "호기심을 작동하는 경험으로 만듭니다.",
        "interests": ["Frontend", "Backend", "API Connection"],
        "skills": ["HTML", "CSS", "JavaScript", "Python", "FastAPI"],
        "connection": "success",
    }

