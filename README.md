# React Native Calendar App

연두색 테마의 모던한 캘린더 앱입니다.

## 주요 기능
- 월간 캘린더 뷰
- 일정 추가/수정/삭제
- 일정 목록 보기
- 로컬 저장소 (AsyncStorage)

## 기술 스택
- React Native
- TypeScript
- Zustand (상태 관리)
- react-native-calendars
- react-native-paper (UI)
- date-fns (날짜 처리)
- React Navigation

## 설치 방법

```bash
# 의존성 설치
npm install

# iOS
npx pod-install
npm run ios

# Android
npm run android
```

## 필수 패키지

```bash
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install zustand
npm install @react-native-async-storage/async-storage
npm install react-native-calendars
npm install react-native-paper
npm install date-fns
npm install react-native-uuid
npm install react-hook-form
```

## 프로젝트 구조

```
src/
├── components/       # 재사용 가능한 컴포넌트
├── screens/         # 화면 컴포넌트
├── navigation/      # 네비게이션 설정
├── store/          # Zustand 스토어
├── services/       # 비즈니스 로직
├── utils/          # 유틸리티 함수
├── types/          # TypeScript 타입
└── constants/      # 상수 정의
```

## 색상 테마
- Primary: #9ACD32 (연두색)
- Secondary: #7CB342
- Background: #F5F9F0
