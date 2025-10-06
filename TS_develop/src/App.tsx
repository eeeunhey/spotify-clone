
import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import SpinnerLoader from "./common/components/Loader/SpinnerLoader";

const AppLayout = React.lazy(()=>import('./layout/AppLayout'));
const HomePage = React.lazy(()=>import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(()=>import("./pages/SearchPage/SearchPage"));
const SearchWithPage = React.lazy(()=>import("./pages/SearchWithPage/SearchWithPage"));
const PlaylistDetailPage  = React.lazy(()=>import("./pages/PlaylistDetailPage/PlaylistDetailPage"));
const LibraryPage  = React.lazy(()=>import("./pages/LibraryPage/LibraryPage"));


function App() {
  // 1. 홈페이지  / 사이드 바 유지
  // 앱 레이아웃 있다 -> 한번 렌더딩하게 하자
  // 2. 서치 페이지  /search
  // 3. 서치 결과 페이지 /search/:keyword
  // 4. 플레이 리스트 페이지 /playlist/:id
  // 0. 사이드바 있어야함 (플레이리스트, 메뉴)
  // 5. 플레이리스트 디테일 페이지
  // 6. 모바일버전 플레이리스트 보여주는 페이지  /playlist

  return (
    <Suspense fallback={<SpinnerLoader />}>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="search/:keyword" element={<SearchWithPage />} />
        <Route path="palylist/:id" element={<PlaylistDetailPage />} />  
        { <Route path="/playlist" element={<LibraryPage />}/>}
  
      </Route>
      {/* <Route path="/admin" element={<AdminPage/>}/> */}
      {/* 레이아웃별로 라우트를 묶을 수 있다 */}
    </Routes>
    </Suspense>
  );
}

export default App;
