# React Portfolio Admin

포트폴리오 관리를 위한 관리자 대시보드 애플리케이션입니다. Vite 기반의 최신 React 프레임워크로 구축되었으며, Styled-components, Tailwind CSS를 활용한 현대적인 UI/UX를 제공합니다.

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [설치 및 실행](#설치-및-실행)
- [프로젝트 구조](#프로젝트-구조)
- [주요 기능](#주요-기능)
- [사용 방법](#사용-방법)
- [개발 가이드](#개발-가이드)
- [배포](#배포)

## 프로젝트 개요

**React Portfolio Admin**은 개인/회사 포트폴리오 프로젝트를 효율적으로 관리할 수 있는 관리자 대시보드입니다.

### 주요 특징

- 🔐 **인증 시스템**: 로그인 기반의 보안 보호 라우트
- 📊 **대시보드**: 프로젝트 통계 및 최근 프로젝트 현황 표시
- 📝 **프로젝트 관리**: 프로젝트 등록, 수정, 삭제 기능
- 🎨 **디자인 시스템**: 일관된 UI 컴포넌트 라이브러리
- 💾 **데이터 저장**: LocalStorage 및 IndexedDB 활용
- 📱 **반응형 디자인**: 모든 디바이스에 최적화된 레이아웃

## 기술 스택

### 핵심 기술

- **Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.3
- **Styling**: Tailwind CSS 4.2.2, Styled Components 6.3.12
- **Routing**: React Router DOM 7.14.0
- **HTTP Client**: Axios 1.14.0
- **State Management**: React Hooks

### 개발 도구

- **Testing**: React Testing Library, Jest DOM
- **Plugin**: Vite React Plugin, Tailwind CSS Vite Plugin
- **Utilities**: Autoprefixer, Babel Runtime

## 설치 및 실행

### 필수 조건

- Node.js 18.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone <repository-url>

# frontend 디렉토리로 이동
cd frontend

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

- 개발 서버는 `http://localhost:3000`에서 시작됩니다.
- 파일 변경 시 자동으로 핫 리로드됩니다.

### 프로덕션 빌드

```bash
npm run build
```

- `dist/` 디렉토리에 최적화된 빌드 파일이 생성됩니다.

### 빌드 미리보기

```bash
npm run preview
```

## 프로젝트 구조

```
frontend/
├── public/                    # 정적 자산
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/               # 이미지, 아이콘 등
│   │   └── asset.js          # 자산 인덱스
│   ├── components/           # 재사용 가능한 컴포넌트
│   │   ├── Base/            # 기본 UI 컴포넌트
│   │   │   ├── Badge.jsx    # 배지 컴포넌트
│   │   │   ├── Button.jsx   # 버튼 컴포넌트
│   │   │   ├── Card.jsx     # 카드 컴포넌트
│   │   │   ├── Input.jsx    # 입력 필드
│   │   │   ├── Modal.jsx    # 모달 컴포넌트
│   │   │   ├── Pagination.jsx  # 페이지네이션
│   │   │   ├── Popover.jsx  # 팝오버
│   │   │   ├── Select.jsx   # 선택 드롭다운
│   │   │   ├── SubTitle.jsx # 소제목
│   │   │   ├── Tag.jsx      # 태그
│   │   │   ├── Textarea.jsx # 텍스트 영역
│   │   │   ├── Title.jsx    # 제목
│   │   │   └── Tooltip.jsx  # 툴팁
│   │   ├── Form.jsx         # 프로젝트 폼 컴포넌트
│   │   ├── FormField.jsx    # 폼 필드 래퍼
│   │   ├── Header.jsx       # 상단 헤더
│   │   ├── Layout.jsx       # 메인 레이아웃
│   │   ├── SideBar.jsx      # 사이드바 네비게이션
│   │   └── Table.jsx        # 테이블 컴포넌트
│   ├── constants/           # 상수 정의
│   │   └── formConstants.js # 폼 관련 상수
│   ├── hooks/              # 커스텀 React 훅
│   │   └── useProjectManagement.js  # 프로젝트 관리 훅
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── LoginPage.jsx   # 로그인 페이지
│   │   ├── DesignSystemPage.jsx  # 디자인 시스템 페이지
│   │   └── projects/       # 프로젝트 관련 페이지
│   │       ├── DashboardPage.jsx  # 대시보드 페이지
│   │       ├── ListPage.jsx       # 프로젝트 목록 페이지
│   │       └── RegistrationPage.jsx # 프로젝트 등록 페이지
│   ├── services/           # 비즈니스 로직 서비스
│   │   ├── api.js          # Axios API 설정
│   │   ├── mockData.js     # 목 데이터
│   │   └── storage.js      # LocalStorage 및 IndexedDB 관리
│   ├── utils/              # 유틸리티 함수
│   │   ├── imageUtils.js   # 이미지 처리 유틸
│   │   └── projectUtils.js # 프로젝트 관련 유틸
│   ├── App.jsx             # 루트 애플리케이션 컴포넌트
│   ├── App.css             # 애플리케이션 스타일
│   ├── index.css           # 글로벌 스타일
│   ├── main.jsx            # 엔트리 포인트
│   ├── reportWebVitals.js  # 성능 모니터링
│   └── setupTests.js       # 테스트 설정
├── index.html              # HTML 템플릿
├── package.json            # 프로젝트 의존성
├── package-lock.json       # 의존성 잠금
├── tailwind.config.js      # Tailwind CSS 설정
└── vite.config.js          # Vite 설정
```

## 주요 기능

### 1. 인증 시스템

- 사용자 로그인/로그아웃
- 세션 기반 인증 관리
- 보호된 라우트 구현

**관련 파일**: `src/pages/LoginPage.jsx`, `src/services/storage.js`, `src/App.jsx`

### 2. 대시보드

- 프로젝트 통계 표시
  - 총 프로젝트 개수
  - 게시된 프로젝트 수
  - 완료된 프로젝트 수
- 개인/회사 프로젝트 구분
- 최근 프로젝트 5개 미리보기

**관련 파일**: `src/pages/projects/DashboardPage.jsx`

### 3. 프로젝트 관리

- **프로젝트 등록**: 새 프로젝트 추가
- **프로젝트 목록**: 필터링 및 검색 기능
- **프로젝트 상세보기**: 모달을 통한 상세 정보 확인
- **프로젝트 수정**: 기존 프로젝트 정보 변경
- **프로젝트 삭제**: 프로젝트 삭제

**관련 파일**:

- `src/pages/projects/RegistrationPage.jsx`
- `src/pages/projects/ListPage.jsx`
- `src/components/Form.jsx`

### 4. 디자인 시스템

- 통일된 UI 컴포넌트 라이브러리
- 컴포넌트 문서화 및 시각적 가이드

**관련 파일**: `src/pages/DesignSystemPage.jsx`

### 5. 데이터 관리

- **LocalStorage**: 프로젝트 메타데이터 저장
- **IndexedDB**: 이미지 파일 저장
- **Axios API**: 백엔드 연결 준비 완료

**관련 파일**: `src/services/storage.js`, `src/services/api.js`

## 사용 방법

### 로그인

1. 애플리케이션 시작 시 로그인 페이지로 이동
2. 사용자 인증 정보 입력
3. 로그인 성공 후 대시보드로 리다이렉트

### 프로젝트 등록

1. 사이드바에서 "프로젝트 등록" 메뉴 클릭
2. 프로젝트 정보 입력
   - 제목, 설명, 카테고리
   - 상태, 게시 여부, 링크 등
3. 이미지 업로드 (선택사항)
4. 저장 버튼 클릭

### 프로젝트 목록 조회

1. "프로젝트 목록" 메뉴에서 모든 프로젝트 확인
2. 검색 및 필터링으로 원하는 프로젝트 찾기
   - 제목 검색
   - 카테고리 필터

### 프로젝트 관리

- **상세보기**: 프로젝트 행에서 클릭하여 상세 정보 확인
- **수정**: 상세 정보 모달에서 "수정" 버튼으로 편집
- **삭제**: 프로젝트 행의 삭제 버튼으로 제거

## 개발 가이드

### 새 컴포넌트 추가

```javascript
// src/components/Base/MyComponent.jsx
import React from "react";

const MyComponent = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default MyComponent;
```

### 새 페이지 추가

```javascript
// src/pages/MyPage.jsx
import React from "react";
import Layout from "../components/Layout";

const MyPage = () => {
  return (
    <>
      <h1>My Page</h1>
      {/* 페이지 내용 */}
    </>
  );
};

export default MyPage;
```

### 라우트 추가

`src/App.jsx`에서 라우트 추가:

```javascript
<Route path="/my-page" element={<MyPage />} />
```

### API 연동

`src/services/api.js`에서 API 엔드포인트 정의 후, 컴포넌트에서 사용:

```javascript
import { projectApi } from "../services/api";

// API 호출 예시
const response = await projectApi.getAll();
```

### 스타일링

#### Tailwind CSS 사용

```javascript
<div className="flex gap-4 p-4 rounded-lg bg-gray-50">{/* 내용 */}</div>
```

#### Styled Components 사용

```javascript
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  gap: 1rem;
`;
```

### 테스트 작성

```javascript
// src/components/MyComponent.test.jsx
import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent>Test</MyComponent>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

## 배포

### 환경 설정

프로덕션 배포 전 환경 변수 설정:

- API 베이스 URL
- 인증 토큰
- 기타 설정값

### 빌드 및 배포

```bash
# 1. 프로덕션 빌드
npm run build

# 2. 빌드 결과 미리보기
npm run preview

# 3. dist 폴더를 호스팅 서비스에 배포
# (예: Vercel, Netlify, AWS S3, GitHub Pages 등)
```

### 배포 체크리스트

- [ ] 환경 변수 설정 확인
- [ ] 빌드 오류 없음 확인
- [ ] 성능 최적화 완료
- [ ] 보안 설정 확인
- [ ] CORS 설정 확인
- [ ] 백엔드 API 연동 확인

## 백엔드 연동

현재 애플리케이션은 LocalStorage와 IndexedDB를 사용하여 개발 중입니다. 백엔드 API가 준비되면 다음 파일을 수정하여 연동할 수 있습니다:

**주요 수정 파일**: `src/pages/projects/DashboardPage.jsx`

```javascript
// 기존 (LocalStorage)
const allProjects = projectStorage.getAll();

// 변경 (Backend API)
const response = await projectApi.getAll();
const allProjects = response.data;
```

자세한 API 스펙은 백엔드 README를 참고하세요.

## 참고 사항

### 성능 최적화

- Code Splitting으로 번들 크기 최소화
- 이미지 최적화 (ImageUtils 활용)
- 불필요한 리렌더링 방지 (React.memo, useMemo 활용)

### 보안 주의사항

- 민감한 정보는 localStorage에 저장하지 않기
- XSS 방지를 위해 dangerouslySetInnerHTML 사용 최소화
- CSRF 토큰 사용 (백엔드 연동 시)

### 브라우저 호환성

- Chrome, Firefox, Safari 최신 버전 지원
- IndexedDB 지원 필수

## 문제 해결

### 개발 서버 시작 오류

```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### 빌드 오류

```bash
# Vite 캐시 삭제
rm -rf .vite dist
npm run build
```

### 스타일 적용 안됨

- Tailwind CSS 클래스가 `src/` 디렉토리 하위의 파일에만 적용됩니다.
- `tailwind.config.js`의 `content` 설정 확인

---

**마지막 업데이트**: 2026-04-07
