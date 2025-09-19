# 🎬 MoviePlay (디즈니플러스 스타일 스트리밍 앱)

> React + Vite + Firebase + TMDB API 기반 스트리밍 플랫폼  
> 넷플릭스 클론을 발전시켜 **디즈니플러스 감성**으로 재해석한 포트폴리오 프로젝트

---

## 🚀 프로젝트 개요

MoviePlay는 영화와 드라마를 감성적으로 큐레이션하는 **디즈니플러스 스타일 스트리밍 앱**입니다.  
Firebase를 활용한 **인증·DB 관리**, TMDB API를 통한 **실시간 영화/드라마 데이터** 연동,  
그리고 감정 기반 추천 기능을 포함해 단순한 클론을 넘어선 **창의적 확장**을 목표로 합니다.  

---

## ✨ 주요 기능

- 🔐 **회원가입 & 로그인**
  - Firebase Authentication 연동
  - 자동 로그인 / 로그아웃 기능
  - 비밀번호 재설정, 변경 기능 지원

- 📝 **프로필 관리**
  - 사용자 정보 저장 (Firestore)
  - 프로필 편집 및 아바타 변경 가능

- 🎥 **메인 페이지**
  - TMDB API 기반 카테고리별 콘텐츠
  - 성인물 자동 필터링 (엄격 적용)
  - 마우스 오버 시 예고편 자동재생 (YouTube)

- ❤️ **사용자 맞춤 기능**
  - 좋아요 / 즐겨찾기 저장 (Firestore)
  - 감정 기반 추천 (오늘의 무드에 맞는 영화 추천)
  - 감정 기록 다이어리

- 🔎 **검색 기능**
  - 실시간 검색어 필터링
  - `/home` 내에서 바로 결과 표시

- 👑 **관리자 페이지**
  - `role: admin` 전용 접근
  - 콘텐츠 관리 기능 (추가 예정)

---

## 🛠 기술 스택

- **Frontend**: React 18, Vite, React Router
- **Styling**: CSS, Tailwind CSS (일부), Custom Design System
- **Backend / Infra**:
  - Firebase Authentication
  - Firebase Firestore
  - Firebase Hosting
- **API**: TMDB (The Movie Database) API
- **Etc**: Git, GitHub Actions (추가 예정)

---

## 📂 프로젝트 구조

```bash
react-streming-app/
├── public/assets        # 프로젝트 이미지 및 아이콘
├── src/
│   ├── components/      # 재사용 가능한 UI 컴포넌트
│   ├── context/         # Auth, Movie, Favorites Context
│   ├── pages/           # 주요 페이지 (Home, Login, Profile 등)
│   ├── routes/          # PrivateRoute, AdminRoute
│   ├── services/        # TMDB API, Firebase 관련 로직
│   └── styles/          # CSS 파일 모음
├── .env.example         # 환경변수 템플릿
├── .gitignore
├── package.json
└── vite.config.js


VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_FB_API_KEY=your_firebase_api_key
VITE_FB_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FB_PROJECT_ID=your_project_id
VITE_FB_STORAGE_BUCKET=your_project.appspot.com
VITE_FB_APP_ID=your_firebase_app_id


# 1. 레포지토리 클론
git clone https://github.com/stakim876/react-streming-app.git
cd react-streming-app

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev


