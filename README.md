# 홍동우 개인 소개 및 FastAPI 연동 프로젝트

개인 소개 페이지와 프론트엔드·백엔드 연동 실습을 하나의 화면에 구성한 프로젝트입니다. 정적 프론트엔드는 Vercel, FastAPI 백엔드는 Render 배포를 기준으로 작성했습니다.

## 주요 구성

- 개인 소개: 학습 방향, 관심 분야, 기술 스택
- 프론트엔드: HTML, CSS, JavaScript로 구현한 반응형 단일 페이지
- API 연동: 브라우저에서 FastAPI의 `/api/profile`을 호출해 JSON 응답 표시
- 백엔드: 상태 확인 및 프로필 데이터를 제공하는 FastAPI API
- API 문서: FastAPI가 자동 생성하는 Swagger UI

## 프로젝트 구조

```text
.
├── index.html              # 개인 소개 및 API 실습 화면
├── styles.css              # 반응형 디자인
├── script.js               # 백엔드 API 호출 및 결과 표시
├── backend/
│   ├── main.py             # FastAPI 애플리케이션
│   └── requirements.txt    # Python 패키지 목록
├── render.yaml             # Render 배포 설정
└── vercel.json             # Vercel 배포 설정
```

## API 목록

| Method | Endpoint | 설명 |
| --- | --- | --- |
| GET | `/` | 서버 안내 |
| GET | `/health` | 서버 상태 확인 |
| GET | `/api/profile` | 개인 프로필 데이터 반환 |
| GET | `/docs` | Swagger UI |

## 로컬 실행

### 백엔드

```bash
cd backend
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

브라우저에서 `http://localhost:8000/docs`로 Swagger UI를 확인할 수 있습니다.

### 프론트엔드

간단한 로컬 서버로 프로젝트 루트의 `index.html`을 실행합니다. 로컬 백엔드와 연동하려면 `script.js`의 `API_BASE_URL`을 `http://localhost:8000`으로 변경합니다.

## 배포 주소

- GitHub 저장소: https://github.com/hongdw1126/cloud_computing_introduce
- Vercel 프론트엔드: https://cloud-computing-introduce.vercel.app
- Render Swagger UI: https://personal-profile-api-fhmc.onrender.com/docs

## 배포 방법

1. 이 프로젝트를 GitHub 저장소에 올립니다.
2. Render에서 저장소를 연결하고 루트의 `render.yaml`을 이용해 백엔드를 배포합니다.
3. 발급된 Render 주소를 `script.js`의 `API_BASE_URL`에 반영합니다.
4. Vercel에서 같은 저장소를 연결하고 프로젝트 루트를 정적 사이트로 배포합니다.
5. Vercel 페이지에서 **요청 보내기**를 눌러 `200 OK`와 JSON 응답을 확인합니다.
