

# AppLayout 핵심 개념

* **AppLayout**은 앱의 **공통 뼈대(헤더/사이드바/푸터)** 를 렌더링하고,
  본문 자리에 **자식 라우트**를 끼워 넣기 위한 **`<Outlet />` 슬롯**을 가진 컴포넌트

* “맨 처음 들어오면 레이아웃을 보여주고, 그 안에서 각 페이지 콘텐츠만 바뀐다

import 시 ctrl + . 을 누르면 자동 임폴트가 가능하다
---

# 라우터 계층 구조(React Router v7)

* **부모(레이아웃) 라우트**: `element: <AppLayout />` + `children: [...]`
* **자식 라우트**: 부모의 `<Outlet />` 위치에 렌더됨
* **index 라우트**: 부모 경로와 정확히 같은 URL에서 렌더되는 “기본 페이지”


```tsx
// layouts/AppLayout.tsx
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="min-h-dvh">
      <header>헤더(항상 보임)</header>
      <main>
        <Outlet />  {/* 자식 페이지가 여기로 들어옴 */}
      </main>
      <footer>푸터(항상 보임)</footer>
    </div>
  )
}
```

> 이렇게 하면 **헤더/푸터는 고정**, `<Outlet />` 자리만
> `Home`, `Dashboard`, `Settings` 등으로 바뀜

---

# “앞에 슬래시 없어도 된다” 정확히 설명

* **자식 라우트의 `path`는 기본적으로 “부모 기준의 상대 경로”**야.
  그래서 `dashboard`, `settings`처럼 **슬래시 없이** 쓰는 게 일반적이고 권장돼.
* **절대 경로**(`/reports/:id`)를 자식에 써도 **렌더는 부모 `<Outlet />` 안에서** 되긴 하지만,
  **부모 경로를 바꾸면 링크/매칭 유지가 어려워져**.
  → 유지보수성과 이동성 측면에서 **상대 경로(슬래시 없음)** 를 추천!

요약:

* `children: [{ path: 'dashboard' }]` ✅ (권장, 상대경로)
* `children: [{ path: '/dashboard' }]` ⚠️ (절대경로, 쓸 수는 있지만 추천 X)

---

# “Routs 안의 route를 자식객체로 인식해서 가져온다” 보완

* v7 표준은 **객체 기반 라우트** + `<RouterProvider>` 사용이야.
  (이전 JSX 방식 `<Routes><Route …/></Routes>`도 가능하지만 v7에선 객체 구성이 기본)
* “자식객체로 인식” → **부모 라우트의 `<Outlet />` 위치에 자식 라우트가 렌더된다**가 정확한 표현이야.
* **index 라우트**는 `path` 없이 `{ index: true, element: <…> }`로 부모와 같은 URL에서 기본 화면을 제공.

---

# 자주 하는 응용

1. **인증 전/후 레이아웃 분리**

```tsx
{
  element: <AuthLayout />,        // 헤더/푸터 없는 로그인 전 레이아웃
  children: [{ path: 'login', lazy: () => import('@/pages/Login') }],
},
{
  path: '/',
  element: <AppLayout />,         // 로그인 후 공통 레이아웃
  children: [
    { index: true, element: <Home /> },
    { path: 'dashboard', lazy: () => import('@/pages/Dashboard') },
  ],
}
```

2. **중첩 레이아웃 (섹션 전용 탭/보조 내비)**

```tsx
{
  path: '/',
  element: <AppLayout />,
  children: [
    {
      path: 'dashboard',
      element: <DashboardLayout />,  // 대시보드 전용 탭/필터
      children: [
        { index: true, element: <Overview /> },
        { path: 'reports', element: <Reports /> },
      ],
    },
  ],
}
```

---

* **AppLayout** = 공통 UI + `<Outlet />` 슬롯
* **루트 경로 “/”**로 들어오면 **AppLayout이 먼저** 렌더되고,
  그 안에서 **자식 라우트가 `<Outlet />`에 꽂혀** 페이지가 바뀜
* **자식 경로는 슬래시 없이(상대경로) 쓰는 게 권장**
* **index 라우트**로 “부모와 같은 경로의 기본 페이지” 구성

