# React Native Calendar App - 설치 가이드

## 🚀 빠른 시작

### 1. 사전 요구사항

#### 공통
- Node.js 18 이상
- npm 또는 yarn
- Git

#### iOS (macOS만 해당)
- Xcode 14 이상
- CocoaPods (`sudo gem install cocoapods`)
- iOS Simulator

#### Android
- Android Studio
- Android SDK (API 34)
- Android Emulator 또는 실제 디바이스

### 2. React Native 개발 환경 설정

아직 React Native 환경이 설정되지 않았다면:
https://reactnative.dev/docs/environment-setup

**"React Native CLI Quickstart"** 탭을 선택하고 본인의 OS와 타겟 플랫폼에 맞게 설정하세요.

### 3. 프로젝트 설치

```bash
# 프로젝트 디렉토리로 이동
cd calendar-app

# 의존성 설치
npm install

# iOS만 해당 - CocoaPods 설치
cd ios
pod install
cd ..
```

### 4. 앱 실행

#### iOS (macOS만 해당)
```bash
npm run ios
# 또는 특정 시뮬레이터 선택
npx react-native run-ios --simulator="iPhone 15 Pro"
```

#### Android
```bash
# Android Emulator를 먼저 실행하거나 실제 디바이스 연결
npm run android
```

## 🔧 VS Code에서 개발하기

### 1. VS Code 열기
```bash
code .
```

### 2. 추천 확장 프로그램
- **ES7+ React/Redux/React-Native snippets**: 코드 스니펫
- **React Native Tools**: 디버깅 및 개발 도구
- **Prettier - Code formatter**: 코드 포맷팅
- **ESLint**: 린팅

설치 방법:
1. VS Code에서 `Cmd/Ctrl + Shift + X`
2. 위 확장 프로그램 검색 및 설치

### 3. Metro 번들러 시작
새 터미널을 열고:
```bash
npm start
# 또는
npx react-native start
```

Metro 번들러가 실행되면 다른 터미널에서 `npm run ios` 또는 `npm run android` 실행

### 4. 디버깅 (선택사항)
1. VS Code에서 `Cmd/Ctrl + Shift + D`
2. "Run and Debug" 클릭
3. React Native 구성 선택

## 📁 프로젝트 구조

```
calendar-app/
├── src/                    # 소스 코드
│   ├── components/        # UI 컴포넌트
│   ├── screens/          # 화면
│   ├── navigation/       # 네비게이션
│   ├── store/            # 상태 관리
│   ├── services/         # 비즈니스 로직
│   ├── utils/            # 유틸리티
│   ├── types/            # TypeScript 타입
│   └── constants/        # 상수
├── android/               # Android 네이티브 코드
├── ios/                   # iOS 네이티브 코드
├── App.tsx               # 루트 컴포넌트
├── index.js              # 엔트리 포인트
└── package.json          # 의존성
```

## 🐛 문제 해결

### iOS Pod 설치 오류
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Android 빌드 오류
```bash
cd android
./gradlew clean
cd ..
```

### Metro 캐시 정리
```bash
npm start -- --reset-cache
```

### 패키지 재설치
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### 네이티브 모듈 오류
```bash
# iOS
cd ios && pod install && cd ..

# Android
cd android && ./gradlew clean && cd ..
```

## 📱 주요 기능

- ✅ 월간 캘린더 뷰
- ✅ 일정 추가/수정/삭제
- ✅ 시간 설정 (시작/종료)
- ✅ 6가지 색상 옵션
- ✅ 로컬 저장소 (AsyncStorage)
- ✅ 애니메이션 효과
- ✅ TypeScript 완전 지원

## 🎨 커스터마이징

### 색상 변경
`src/constants/index.ts` 파일에서 `COLORS` 객체 수정

### 새로운 화면 추가
1. `src/screens/` 폴더에 새 파일 생성
2. `src/navigation/AppNavigator.tsx`에 라우트 추가
3. `src/types/index.ts`에 타입 추가

## 📚 사용된 주요 라이브러리

- **React Native**: 0.73.0
- **React Navigation**: 네비게이션
- **Zustand**: 상태 관리
- **React Native Calendars**: 캘린더 UI
- **React Native Paper**: Material Design 컴포넌트
- **date-fns**: 날짜 처리
- **AsyncStorage**: 로컬 저장소

## 🤝 도움이 필요하신가요?

- React Native 공식 문서: https://reactnative.dev
- React Navigation: https://reactnavigation.org
- Zustand: https://github.com/pmndrs/zustand

## 📝 다음 단계

- [ ] 반복 일정 기능 추가
- [ ] 알림 기능 구현
- [ ] 클라우드 동기화
- [ ] 위젯 지원
- [ ] 다크 모드
