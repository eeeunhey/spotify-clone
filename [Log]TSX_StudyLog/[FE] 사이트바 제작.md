

---

## 🧱 전체 구조 개요

이 코드는 화면을 이렇게 나누는 레이아웃이에요.

```
┌───────────────────────────────┐
│   Sidebar   |     Main(Outlet)│
│             |                 │
└───────────────────────────────┘
```

즉,
왼쪽엔 `Sidebar` (메뉴 영역),
오른쪽엔 `Outlet` (각 페이지 내용)이 들어가는 구조입니다.

---

## 🔹 1️⃣ `Layout` — 전체 레이아웃 컨테이너

```tsx
const Layout = styled("div")({
  display: "flex",     // 자식들을 가로로 나열
  height: "100vh",     // 화면 전체 높이
  padding: "8px",      // 박스 사이 여백
});
```

### 💬 설명

* **`styled("div")`** → MUI의 `styled` 유틸을 이용해 `div` 태그에 CSS를 입힘
* **`display: flex`** → 자식 요소(`Sidebar`, `Outlet`)를 **가로 방향**으로 배치
* **`height: 100vh`** → 브라우저 화면 전체 높이를 차지
* **`padding: 8px`** → 화면 테두리에 8px의 여백 추가 (공간이 좀 더 여유롭게 보이게 함)

즉, `Layout`은 **전체 페이지의 큰 틀**이에요.

---

## 🔹 2️⃣ `Sidebar` — 왼쪽 메뉴 영역

```tsx
const Sidebar = styled("div")(({ theme }) => ({
  width: "331px",       // 사이드바 고정 너비
  height: "100%",       // Layout 높이에 맞게 100%
  display: "flex",      // 내부 아이템 정렬용
  flexDirection: "column", // 세로 방향 정렬 (메뉴가 위→아래로 쌓임)
  
  // 📱 반응형 설정: 작은 화면(sm) 이하일 때
  [theme.breakpoints.down("sm")]: {
    display: "none", // 사이드바 숨김
  },
}));
```

### 💬 설명

* **`({ theme }) => (...)`** : MUI의 `theme` 객체를 받아서 내부 값 사용 가능
* **`breakpoints.down("sm")`** :
  → MUI의 반응형 도우미로
  → 화면 크기가 **“small(600px)” 이하**이면 CSS를 다르게 적용
* 이 예제에선 **모바일 화면에서는 사이드바를 아예 안 보이게 처리**

즉, `Sidebar`는 **데스크톱에선 보이고, 모바일에선 자동으로 사라지는** 반응형 메뉴 영역입니다.

---

## 🔹 3️⃣ `AppLayout` — 전체 레이아웃 컴포넌트

```tsx
const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>Sidebar</Sidebar>
      <Outlet />
    </Layout>
  );
};
```

### 💬 설명

* `Layout`으로 전체 감싸고,
* `Sidebar`와 `Outlet`을 나란히 배치.

`<Outlet />`은 **React Router**에서 사용하는 특수 컴포넌트예요.
→ 현재 라우트에 해당하는 페이지 내용이 이 자리에 렌더링됩니다.

즉, `AppLayout`은
**고정된 사이드바 + 페이지 전환에 따라 바뀌는 메인 콘텐츠** 구조를 만드는 컴포넌트예요.

---

## 📱 결과 구조 요약

| 영역          | 내용            | 역할                 |
| ----------- | ------------- | ------------------ |
| **Layout**  | 전체 화면 wrapper | flex로 가로 정렬        |
| **Sidebar** | 왼쪽 메뉴         | 데스크톱 전용 (sm 이하 숨김) |
| **Outlet**  | 오른쪽 메인        | 페이지별 내용 렌더링        |

---

## 💡 개념 요약

| 개념                  | 설명                                |
| ------------------- | --------------------------------- |
| `styled()`          | MUI에서 제공하는 스타일 유틸 (Emotion 기반)    |
| `theme.breakpoints` | MUI 반응형 시스템 (xs, sm, md, lg, xl)  |
| `Outlet`            | React Router에서 현재 페이지 내용을 주입하는 영역 |
| `100vh`             | 브라우저 전체 높이를 의미                    |
| `flex`              | 가로 방향 배치 (Sidebar + Content)      |

---

## 📋 전체 구조 정리

```tsx
// Layout.tsx
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
});

const Sidebar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const AppLayout = () => (
  <Layout>
    <Sidebar>Sidebar</Sidebar>
    <Outlet />
  </Layout>
);

export default AppLayout;
```


--- 
박스별 스타일 적용하기

좋아 👍
이제 지금까지 나온 세 컴포넌트(`ContentBox`, `NavList`, `styledNavLink`)는
 “사이드바 메뉴 구성설정”

---

## 🎯 전체 개념


```
<Sidebar>
 ├─ <ContentBox>     ← 메뉴 섹션(박스)
 │   └─ <NavList>    ← 메뉴 항목 묶음(ul)
 │        ├─ <styledNavLink> 아이콘+텍스트 링크
 │        └─ <styledNavLink> 아이콘+텍스트 링크
 └─ ...
</Sidebar>
```

즉,

* **ContentBox** → 하나의 “메뉴 그룹”이나 “카드형 컨테이너”
* **NavList** → 그 안의 메뉴 항목들을 나열하는 리스트
* **styledNavLink** → 각 항목을 클릭할 수 있는 네비게이션 링크

---

## 🧩 1️⃣ ContentBox

```tsx
const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  marginBottom: "8px",
  marginRight: "8px",
}));
```

### ✅ 역할

* **Box**는 단순 컨테이너.
* `styled(Box)`를 써서 MUI 테마(`theme`)와 연결.

### ✅ 속성 설명

| 속성                                                | 의미                      |
| ------------------------------------------------- | ----------------------- |
| `borderRadius: "8px"`                             | 박스 모서리를 둥글게 → 카드 느낌     |
| `backgroundColor: theme.palette.background.paper` | 테마 색상 사용 (라이트/다크 자동 대응) |
| `color: theme.palette.text.primary`               | 내부 텍스트 색상 지정            |
| `width: "100%"`                                   | 가로 공간을 모두 사용            |
| `marginBottom`, `marginRight`                     | 박스끼리 간격 확보              |

📌 **요약**
사이드바 안에서 “각 메뉴 섹션”을 시각적으로 구분하기 위한 카드형 컨테이너.

---

## 🧩 2️⃣ NavList

```tsx
const NavList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});
```

### ✅ 역할

* 실제 네비게이션 항목(`NavLink`)을 담는 **리스트 컨테이너**

### ✅ 속성 설명

| 속성                  | 의미         |
| ------------------- | ---------- |
| `listStyle: "none"` | 기본 불릿 제거   |
| `padding: 0`        | 기본 들여쓰기 제거 |
| `margin: 0`         | 위아래 여백 제거  |

📌 **요약**
브라우저 기본 스타일을 없애서, **깔끔한 맞춤 네비게이션 목록**을 만들기 위한 초기화 단계.

---

## 🧩 3️⃣ styledNavLink

```tsx
const styledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  color: theme.palette.text.secondary,
  "&.hover": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,
  },
}));
```

### ✅ 역할

* **React Router의 NavLink**에 스타일을 입힌 컴포넌트.
* 사이드바 메뉴의 **클릭 가능한 항목(링크)** 역할.

### ✅ 속성 설명

| 속성                                    | 의미                                 |
| ------------------------------------- | ---------------------------------- |
| `textDecoration: "none"`              | 밑줄 제거 (디자인 정돈)                     |
| `display: "flex"`                     | 아이콘 + 텍스트를 가로 정렬                   |
| `alignItems: "center"`                | 세로 가운데 정렬                          |
| `gap: "20px"`                         | 아이콘과 텍스트 사이 간격                     |
| `color: theme.palette.text.secondary` | 기본 글자색(덜 강조된 회색 계열)                |
| `&:hover`                             | 마우스 올리면 글자색을 더 강조 (`text.primary`) |
| `&.active`                            | 현재 페이지와 링크가 일치할 때 글자색 강조           |

💡 **`NavLink`는 현재 경로와 같으면 자동으로 “활성 상태”를 가질 수 있어요.**

* React Router v6/7에서는 이렇게 쓸 수 있습니다:

  ```tsx
  <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
    Dashboard
  </NavLink>
  ```

📌 **요약**
`styledNavLink`는 단순한 링크가 아니라
“**현재 페이지 표시 + hover 반응 + 테마 색상 연동**”이 적용된 **네비게이션 버튼**이에요.

---

## 💡 전체 요약

| 컴포넌트              | 역할          | 주요 목적                              |
| ----------------- | ----------- | ---------------------------------- |
| **ContentBox**    | 메뉴 그룹 카드    | 배경색·둥근 모서리 등으로 시각 구분               |
| **NavList**       | 항목 리스트 컨테이너 | 기본 `<ul>` 초기화, 간결한 정렬              |
| **styledNavLink** | 실제 클릭 링크    | 아이콘+텍스트 구조, hover/active 반응, 테마 연동 |

---

## 🧠 최종 정리 문장

> 이 세 코드는 **사이드바의 구조와 디자인을 체계적으로 구성하기 위한 세트**다.
> `ContentBox`는 각 섹션의 배경과 여백을 담당하고,
> `NavList`는 깔끔한 목록 구조를 제공하며,
> `styledNavLink`는 테마 기반 색상 + hover/active 상태를 가진 네비게이션 링크를 만든다.

