<h2 align=center>네이버 추모게시판 클론 프로젝트📚</h2>

<p align=center> 📆 2024.12.31 ~ 2025.01.07</p>

<div align=center>
    <img src="https://img.shields.io/badge/17.0.2-React-61DAFB?style=flat&logo=react&logoColor=61DAFB"/>
    <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
    <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
    <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>
    <img src="https://img.shields.io/badge/7.32.0-Eslint-4B32C3?style=flat&logo=eslint&logoColor=4B32C3"/>
    <img src="https://img.shields.io/badge/2.4.1-Prettier-F7B93E?style=flat&logo=Prettier&logoColor=F7B93E"/>
</div>
<br>
<p align=center><img src=./src/assets/images/velogClone.gif  width=60% /></p>
<p align=center> 🏠 <a href="https://jpmemorial-project.vercel.app/">웹 페이지</a></p>
<p align=center> 💼 <a href=https://github.com/dnr14/velog-react-app/wiki/%ED%99%94%EB%A9%B4-%EA%B5%AC%EC%84%B1-%EB%B0%8F-%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%84%A4%EB%AA%85> 화면 구성 및 주요 기능 설명</a></p>

## 1. 프로젝트 살펴보기 🔎
### 🙎‍♂️ 팀 구성 
|장미르|박진우|
| :---: | :---: |
|Front-End|Front-End|Back-End|Back-End|

- 프론트엔드 개발자 2명

<hr/>

### 🔥 개요


2024년 12월 29일 제주공항 여객기 참사를 추모하며, 리액트와 카카오 API를 처음 공부하면서 깃허브 사용을 익숙하게 하기 위해 적용해본 디지털 추모 게시판 프로젝트입니다.

### 👨‍💻 주요 기능

- 카카오톡 api를 사용해서 로그인 및 로그아웃 기능을 사용할 수 있습니다.
- 카카오톡 공유기능을 이용해 추모의 참여를 유도할 수 있습니다.
- 추모에 참여할 수 있습니다.
- 카카오맵을 사용해 합동 분향소 바로가기 기능을 사용할 수 있습니다.

### 💻 기술 스택

- 'React' : 웹 UI를 구축하기 위한 라이브러리.
- 'Tailwind CSS' : 유틸리티 기반의 CSS 프레임워크로, 효율적인 스타일링을 위해 사용.
- 'TypeScript' : 정적 타입을 제공하여 코드의 안정성을 높이기 위해 사용.
- 'ESLint' : 코드 스타일과 컨벤션 검사를 위해 사용.
- 'Prettier' : 일관된 코드 포맷팅을 유지하기 위해 사용.
- 'Next.js' : 서버 사이드 렌더링(SSR)과 파일 기반 라우팅을 제공하는 React 프레임워크.
- 'Axios' : API 통신 및 데이터 fetch를 위해 사용.
- 'Custom Hooks' : React에서 재사용 가능한 상태 관리와 로직 분리를 위해 사용.
<br>

> #### ⚙ 프로젝트 실행 해보기

```js
git clone https://github.com/jangmireu/memorial.git
npm install
npm start
브라우저 localhost:3000 접속
```

<br>

> #### 📁 프로젝트 구조

```js
├─api             // 백엔드와 통신을 위한 API 모듈화 파일 모음
│  ├─auth         // 인증 관련 API 모듈
│  └─kakao        // 카카오 API 관련 파일
├─app             // Next.js의 앱 라우팅 관련 디렉토리
│  ├─api          // 서버와 관련된 API 라우팅
│  │  └─auth/kakao // 카카오 인증 관련 API
│  ├─login        // 로그인 페이지 및 관련 컴포넌트
│  │  └─page.tsx  // 로그인 페이지 파일
│  ├─main         // 메인 페이지 및 관련 컴포넌트
│  │  └─page.tsx  // 메인 페이지 파일
│  ├─layout.tsx   // 공통 레이아웃 파일
│  └─page.tsx     // 루트 페이지 파일
├─components      // 재사용 가능한 컴포넌트 모음
│  ├─TearEffect   // 눈물 효과 관련 컴포넌트
│  ├─DarkModeToggle // 다크모드 전환 버튼 컴포넌트
│  ├─KakaoLoginButton // 카카오 로그인 버튼
│  ├─KakaoLogoutButton // 카카오 로그아웃 버튼
│  ├─KakaoShareButton // 카카오 공유 버튼
│  ├─MemorialButton // 추모 관련 버튼
│  └─NicknameRoller // 닉네임 롤링 컴포넌트
├─fonts           // 프로젝트에 사용되는 폰트 파일
│  ├─Danjo.otf    // 특정 폰트 파일
│  ├─font1.ttf    // 폰트 파일
│  └─font2.ttf    // 폰트 파일
├─public          // 정적 파일 (이미지, 폰트 등)
│  └─images       // 프로젝트에 사용되는 이미지 모음
├─styles          // 전역 및 컴포넌트 스타일 정의
│  └─globals.css  // 전역 CSS 스타일
├─hooks           // Custom Hooks 모음
├─utils           // 유틸리티 함수 모음
├─.env            // 환경 변수 파일
├─next.config.js  // Next.js 설정 파일
├─package.json    // 프로젝트 종속성 및 설정
└─README.md       // 프로젝트 설명 파일

```

<br>
<hr/>

# 2. 협업 👤

### 🪚 협업을 위한 툴

- Discord
  - 개발 진행 상황 공유하기 위해 사용했습니다.
- Git, Github
  - 코드 버전 관리 및 공유하기 위해 사용했습니다.
<hr/>

# 3. 배포 👨‍🔧

#### 배포 환경 그림

<div align=center>
    <img src=./src/assets/images/deploy.png  width=80%  />
</div>
<br>

> #### 📜 배포 과정 설명

1. 개발이 완료된 `main branch`에서 deploy를 진행 합니다.
2. Vecel에서 제공하는 cli를 이용하여 빌드된 리액트 프로젝트를 s3에 배포합니다.
3. 배포가 완료되고 사용자는 `CloudFront`를 통해 배포된 사이트([velogClone 사이트](https://d3kinchzmkbtue.cloudfront.net))를 접속합니다.
