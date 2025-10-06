

# 언제 이득이 가장 큼?

* **페이지가 여러 개**거나, 화면을 **역할/기능별로 나눠야** 할 때
* **URL을 공유/북마크/뒤로가기**로 정확히 복원해야 할 때
* **코드 스플리팅(지연 로딩)**으로 첫 로딩을 가볍게 하고 싶을 때
* 페이지마다 **데이터 패칭·에러·로딩**을 **분리**해서 관리하고 싶을 때
* **레이아웃 중첩(공통 헤더/사이드바)**로 반복 렌더·보일러플레이트를 줄이고 싶을 때

---

# 핵심 이점 8가지

1. **URL = 상태 (Deep-linkable State)**
   탭/필터/페이지네이션 같은 상태를 `?tab=emotion&page=2`처럼 **링크로 공유/복원** 가능.
   → “같은 화면을 정확히 다시 보여줄 수 있음”.

2. **중첩 레이아웃(Outlets)**
   공통 레이아웃(헤더/사이드바/탭바)은 그대로 두고 **자식 화면만 교체**.
   보일러플레이트 감소 + 렌더 효율 상승.

3. **페이지 단위 코드 스플리팅**
   무거운 분석/차트 페이지는 **lazy import**로 분할 로딩 → 초기 번들 작아짐, Vite와 찰떡.

4. **데이터 라우팅(Loader/Action/Defer)** *(v7 데이터 라우터)*
   각 라우트에 **패칭/에러/로딩**을 묶어 관리.

   * `loader`: 진입 전 데이터 로드 & 캐시 무효화(revalidation)
   * `action`: 폼/변경 요청 처리
   * `defer`: 큰 데이터는 **스트리밍 분할 로딩**으로 첫 페인트 빨리

5. **라우트별 에러·경계 처리**
   페이지마다 **에러 경계**와 **로딩 UI**를 분리 → 한 페이지 에러가 전체를 망치지 않음.

6. **접근 제어(Protected Routes) 패턴이 깔끔**
   로그인 필요 페이지는 라우트 진입 단계에서 리다이렉트/차단 → UI 로딩 후 깜빡임 방지.

7. **내비 UX 강화**
   `useNavigate`, `Link`, `useSearchParams`, `useParams` 등으로 **뒤로가기/앞으로가기** 자연스러움.
   스크롤 복원(Scroll Restoration)도 구성 가능.

8. **테스트/유지보수 유리**
   페이지를 **독립 유닛**으로 테스트(`MemoryRouter`) 하기 쉬움. 폴더 구조도 명확해짐.

---

# 미니 예시들

## 1) 중첩 레이아웃 + 페이지 분할

```tsx
// router.tsx (v7)
import { createBrowserRouter, lazyRoute } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'

const Dashboard = lazyRoute(() => import('./pages/Dashboard'))  // 코드 스플리팅
const SessionDetail = lazyRoute(() => import('./pages/SessionDetail'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,   // 헤더/사이드바 등 공통
    children: [
      { index: true, element: <Home /> },
      { path: 'dashboard', lazy: Dashboard },
      { path: 'sessions/:id', lazy: SessionDetail },
    ],
  },
])
```

## 2) 보호 라우트(로그인 체크)

```tsx
// routes/protected.ts
import { redirect } from 'react-router-dom'

export async function authLoader() {
  const token = localStorage.getItem('token')   // *SSR 아니라면 안전
  if (!token) throw redirect('/login')
  return null
}
```

```tsx
// router 일부
{
  path: 'mypage',
  loader: authLoader,             // 진입 전에 가드
  lazy: () => import('./pages/MyPage'),
}
```

## 3) 라우트에서 데이터 패칭(Loader) + 오류 경계

```tsx
// pages/SessionDetail.tsx
import { useLoaderData, useRouteError, json, defer, Await } from 'react-router-dom'

export async function loader({ params }: { params: { id: string } }) {
  const summaryPromise = fetch(`/api/sessions/${params.id}/summary`).then(r => r.json())
  const chartPromise   = fetch(`/api/sessions/${params.id}/chart`).then(r => r.json())
  return defer({ summary: summaryPromise, chart: chartPromise }) // 일부 먼저 그림
}

export default function SessionDetail() {
  const data = useLoaderData() as { summary: Promise<any>, chart: Promise<any> }
  return (
    <div>
      <h1>세션 상세</h1>
      <React.Suspense fallback={<p>요약 불러오는 중…</p>}>
        <Await resolve={data.summary}>{s => <SummaryView data={s} />}</Await>
      </React.Suspense>
      <React.Suspense fallback={<p>차트 불러오는 중…</p>}>
        <Await resolve={data.chart}>{c => <ChartView data={c} />}</Await>
      </React.Suspense>
    </div>
  )
}

export function ErrorBoundary() {
  const err = useRouteError() as Error
  return <p>문제가 발생했어요: {err.message}</p>
}
```

## 4) URL로 상태 싱크(탭/필터 공유 가능)

```tsx
// hooks/useTabParam.ts
import { useSearchParams } from 'react-router-dom'
export function useTabParam(key = 'tab', initial = 'emotion') {
  const [sp, setSp] = useSearchParams()
  const tab = sp.get(key) ?? initial
  const setTab = (next: string) => {
    sp.set(key, next)
    setSp(sp, { replace: true })
  }
  return [tab, setTab] as const
}
```

---

# React Query와의 역할 분담 (중요!)

* **React Router**: “어느 페이지/상태를 보여줄지” (URL, 전환, 가드, 레이아웃)
* **React Query**: “데이터를 어떻게 가져오고 캐시할지” (staleTime, retry, 동기화)

둘을 조합하면:

* **라우트 진입 시 필요한 최소 데이터**는 `loader`로 가져오고,
* 화면 내 **상세/부가 데이터**는 React Query로 **캐시 최적화** 하며 점진 로딩.

이렇게 하면 “첫 화면 전환은 빠르게, 추가 데이터는 효율적으로”가 됩니다.

---

# 안 써도 되는 경우

* 화면이 1~2개뿐이고, URL 공유/복원이 중요하지 않을 때
* 탭/모달 전환 정도만 있고 “링크로 상태 공유” 니즈가 없을 때

> 이럴 땐 라우터가 오히려 과해요. `useState`/`zustand`로 충분.

---

# 당신 프로젝트 기준 추천

AI 인터뷰/분석 대시보드처럼
**(리스트 → 상세/리뷰 → 통계/리포트)** 흐름이 있고,
링크 공유/재현/북마크가 필요하다면 **강력 추천**입니다.

* `/:userId/sessions` (목록)
* `/:userId/sessions/:id` (상세·타임라인) — **차트는 lazy**
* `/:userId/reports/:id` (리포트 PDF/이미지) — **별도 청크**
* `/:userId/settings` (설정) — 공통 레이아웃 유지


