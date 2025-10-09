import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    // 로그인 후 code 값은 URL에 들어옴, 지금은 바로 홈으로 리디렉트
    window.location.href = "http://localhost:5173/";
  }, []);

  return <div>로그인 중...</div>;
}
