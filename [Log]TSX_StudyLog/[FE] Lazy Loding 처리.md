
## Suspense(서스펜스) 란
 React에서 **비동기 로딩 상태를 다루기 위한 컴포넌트**예요.
즉, **“아직 준비되지 않은 컴포넌트를 기다리는 동안 보여줄 UI를 지정”**

---

## 🎬 1️⃣  정의

> “데이터나 컴포넌트가 아직 로드되지 않았을 때,
> 대신 보여줄 화면을 지정해주는 React의 대기 컴포넌트”

---

## 🧠 2️⃣ 어떤식으로 사용



```tsx
<Suspense fallback={<div>loading......</div>}>
<Routes>
<Route>
    { 안에 있는 폴더 응답이 올 때까지 로딩창을 띄워준다}
</Route>
</Routes>
</Suspense>
```
`<Suspense fallback={<div>loading......</div>}>`

→ 페이지 응답이 올 때 까지 로딩 메세지를 보여준다
→ 

---

## ⚙️ 3️⃣ 동작 원리

* React의 `lazy()`로 불러오는 컴포넌트는 **Promise(비동기)**로 동작.
* 이 컴포넌트가 아직 “resolve”되지 않았을 때 React가 **일시 중단(suspend)** 상태로 둠.
* 그동안 `<Suspense>`의 `fallback` UI가 렌더링됨.
* 로드 완료 시 React가 다시 정상 렌더링을 진행.

그래서 이름이 **Suspense(“기다림”)**이에요.

---

## 🧩 4️⃣ 코드 예시

### (1) lazy + Suspense 조합

```tsx
import { lazy, Suspense } from "react";

const Chart = lazy(() => import("./Chart"));

export default function Dashboard() {
  return (
    <div>
      <h1>대시보드</h1>

      <Suspense fallback={<p>📊 차트를 불러오는 중...</p>}>
        <Chart />
      </Suspense>
    </div>
  );
}
```

➡️ Chart가 import될 때까지 fallback 표시
➡️ 완료되면 Chart 컴포넌트 렌더링

---

### (2) 데이터 로딩에서도 활용 (React 18+)

React 18 이후부터는 **데이터 fetching에도 Suspense를 적용 가능**합니다.
(React Query, Relay, Next.js 13 App Router 등)

```tsx
export default function UserPage() {
  return (
    <Suspense fallback={<div>유저 데이터 로딩 중...</div>}>
      <UserProfile />
    </Suspense>
  );
}
```

➡️ `UserProfile`이 내부에서 데이터를 fetch하고 있으면
React는 자동으로 “suspend” 상태를 인식해서 fallback을 보여줌.

---

## 📚 5️⃣ `fallback` 속성

`fallback`은 “기다리는 동안 보여줄 컴포넌트(UI)”를 의미합니다.

```tsx
<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>
```

* 단순 텍스트, 스피너, 스켈레톤 등 원하는 UI를 자유롭게 넣을 수 있음.

---

## ⚡ 6️⃣ 주의할 점

| 주의사항                           | 설명                                                        |
| ------------------------------ | --------------------------------------------------------- |
| Suspense는 동기 코드엔 영향 없음         | 반드시 **Promise 기반 비동기 렌더링**과 함께 써야 함                       |
| Suspense는 “대체 UI”일 뿐 데이터 캐싱 아님 | React Query, SWR 등과 조합 필요                                 |
| SSR 환경에서는 조심                   | Next.js 13 이후 App Router에서 완전 지원됨 (`loading.tsx`와 비슷한 원리) |

---

## 🔍 요약 정리표

| 구분       | 설명                                           | 예시                                        |
| -------- | -------------------------------------------- | ----------------------------------------- |
| 역할       | 비동기 로딩 동안 대체 UI 표시                           | `<Suspense fallback={<p>Loading...</p>}>` |
| 함께 쓰는 기능 | `React.lazy`, `dynamic import`, 데이터 fetching | `lazy(() => import('./Chart'))`           |
| 장점       | UX 개선, 깔끔한 코드 흐름                             | 로딩 상태를 한 곳에서 관리                           |
| React 버전 | 16.6+에서 기본 제공                                | React 18부터 데이터 로딩에도 확대 지원                 |

---

## 💡 한 줄로 정리

> **Suspense = “비동기 기다림 중에 보여줄 임시 화면을 지정하는 React의 대기 컴포넌트”**

