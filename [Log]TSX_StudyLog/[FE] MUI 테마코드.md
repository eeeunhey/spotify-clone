
**MUI(Material UI)**는 **UI 컴포넌트 라이브러리**
Theme(테마) = 색상, 폰트, 여백, 크기, 그림자 등 디자인 공통값을 한 곳에 모은 객체

## 🧱 1️⃣ MUI란?

> **MUI(Material-UI)** = **React용 Material Design UI 라이브러리**

* 구글이 만든 **Material Design 철학**을 기반으로 한
  **버튼, 카드, 모달, 입력창 같은 컴포넌트들을 제공**해요.
* 예쁘고 접근성 좋은 UI를 **직접 CSS 안 짜도 바로 쓸 수 있게** 해줍니다.

👉 즉,
“디자인팀이 없어도 프로 수준의 화면을 빠르게 만들 수 있게 해주는 도구.”


---

## ⚙️ 2️⃣ 설치 방법

```bash
# 기본 설치
npm install @mui/material @emotion/react @emotion/styled

# (아이콘도 쓰려면)
npm install @mui/icons-material
```

`emotion`은 MUI 내부에서 스타일을 적용하기 위해 사용하는 스타일 엔진.

---

## 🧩 3️⃣ 기본 사용 예시 — MUI 테마 구조 & 적용 흐름

✅ 1. `theme.ts` — 테마 정의 파일

```tsx
// theme.ts
import { createTheme } from "@mui/material";

// createTheme(): MUI 테마를 만드는 함수
const theme = createTheme({
  palette: {
    // 색상 관련 설정 (primary, secondary 등)
  },
  typography: {
    // 글꼴 관련 설정 (fontFamily, fontSize 등)
  },
});

export default theme;
```

📘 **설명**

* `createTheme()` : MUI의 기본 테마 생성 함수
* `palette` : 색상 팔레트 (primary, secondary 등)
* `typography` : 폰트 스타일 정의
* `theme` 객체는 나중에 앱 전체에서 사용됨

---

### ✅ 2. `main.tsx` (또는 `_app.tsx`) — 테마를 앱에 주입

```tsx
import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import App from "./App";

export default function Root() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
```

📘 **설명**

* `ThemeProvider` : 테마를 앱 전체 컴포넌트에 전달하는 Provider
* `theme={theme}` : 우리가 만든 테마 객체를 주입
* 이렇게 감싸면 **모든 MUI 컴포넌트(Button, TextField 등)** 이 theme 값을 인식함

* `<CssBaseline />` : 다양한 브라우저(크롬, 엣지)에서 기본적으로 지원하는 스타일이 다른데 이걸 일정하게 맞춰준다

---

### ✅ 3. 정리 흐름

```
createTheme()  →  theme 객체 생성
        ↓
ThemeProvider로 감싸기
        ↓
모든 MUI 컴포넌트가 공통 테마 사용
```
