🎬 MoviePlay — 디즈니플러스 감성 스트리밍 앱

React + Vite + Firebase + TMDB API 기반의 스트리밍 플랫폼
넷플릭스 클론을 발전시켜, 디즈니플러스 감성으로 재해석한 포트폴리오 프로젝트

🚀 프로젝트 개요

MoviePlay는 영화와 드라마를 감성적으로 큐레이션하는
디즈니플러스 스타일의 스트리밍 웹 앱입니다.

Firebase를 활용한 인증·DB 관리,
TMDB API를 통한 실시간 콘텐츠 연동,
그리고 감정 기반 추천 기능까지 포함해
단순한 클론을 넘어선 창의적 확장형 스트리밍 플랫폼을 목표로 합니다.

✨ 주요 기능
🔐 회원 인증 / 계정 관리

Firebase Authentication 연동

자동 로그인 / 로그아웃

비밀번호 재설정 및 변경 기능

사용자 프로필 Firestore 저장

🧑‍💼 프로필 관리

사용자 정보 수정 (이름, 성별 등)

기본 아바타 이미지 변경 기능

🎥 메인 페이지

TMDB API 기반 실시간 카테고리별 콘텐츠 표시

성인물 자동 필터링 (강화된 키워드 기반)

마우스 오버 시 예고편 자동 재생 (YouTube)

포스터 없는 영화는 기본 이미지로 대체

❤️ 사용자 맞춤 기능

좋아요 / 즐겨찾기 저장 (Firestore 연동)

감정 기반 추천 (오늘의 무드에 맞는 영화 추천)

감정 기록 다이어리 (향후 확장 예정)

💬 평점 & 댓글 (Review System)

로그인 사용자만 댓글 작성 가능

각 영화별 댓글 및 별점 저장 (comments/{movieId}/items)

실시간 댓글 목록 표시

작성자 본인 또는 관리자만 삭제 가능

별점 평균을 통해 콘텐츠 평가 기능 제공

🔎 검색 기능

실시간 검색어 입력 필터링

/home 내에서 바로 결과 표시 (페이지 이동 없음)

👑 관리자 페이지

role: admin 전용 접근 라우팅

Firestore 기반 콘텐츠 관리 (추가 예정)

🛠 기술 스택
구분	사용 기술
Frontend	React 18, Vite, React Router
Styling	CSS Modules, Tailwind CSS (일부), Custom Design System
Backend / Infra	Firebase Authentication, Firestore, Firebase Hosting
API	TMDB (The Movie Database) API
Tools	Git / GitHub / VSCode / GitHub Actions (CI 예정)
📂 프로젝트 구조
react-streaming-app/
├── public/
│   └── assets/               # 정적 리소스 (로고, 기본 이미지 등)
├── src/
│   ├── components/           # 재사용 가능한 컴포넌트
│   ├── context/              # AuthContext, MovieContext, FavoritesContext
│   ├── pages/                # 주요 페이지 (Home, Login, Profile, MovieDetail 등)
│   ├── routes/               # PrivateRoute, AdminRoute
│   ├── services/             # TMDB API 연동, Firebase 초기화
│   └── styles/               # 전역/컴포넌트별 CSS
├── .env.example              # 환경 변수 템플릿
├── .gitignore
├── package.json
└── vite.config.js

🔑 환경 변수 설정 (.env)
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_FB_API_KEY=your_firebase_api_key
VITE_FB_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FB_PROJECT_ID=your_project_id
VITE_FB_STORAGE_BUCKET=your_project.appspot.com
VITE_FB_APP_ID=your_firebase_app_id

⚙️ 실행 방법
# 1️⃣ 레포지토리 클론
git clone https://github.com/stakim876/react-streaming-app.git
cd react-streaming-app

# 2️⃣ 의존성 설치
npm install

# 3️⃣ 개발 서버 실행
npm run dev

🌈 향후 개선 예정

감정 다이어리 UI 및 통계 시각화

관리자 페이지 내 콘텐츠 등록/삭제 기능

Firestore 쿼리 캐싱 및 최적화

GitHub Actions 기반 CI/CD 자동 배포

💫 프로젝트 포인트

“단순한 클론을 넘어 감정·평가 중심으로 진화한
감성 스트리밍 플랫폼 — MoviePlay”

🔹 Firebase + TMDB 실시간 연동

🔹 강화된 성인 콘텐츠 필터링 로직

🔹 평점 + 댓글 기반 사용자 인터랙션

🔹 디즈니플러스 감성의 컬러·모션 디자인

🔹 감정 기반 추천 UX로 차별화
