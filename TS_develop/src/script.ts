const clientId = "9e35581587d8464db4abff30a9c00e03"; // Replace with your client id
// ▶️ Spotify 개발자 대시보드에서 발급받은 앱의 Client ID를 상수로 보관.
//    (비밀 값 아님. 단, 'client secret'은 절대 브라우저에 두면 안 됨)

const code = undefined;
// ▶️ '인가 코드(authorization code)'를 담을 자리.
//    실제 구현에서는 콜백 URL의 쿼리스트링에서 ?code=... 값을 파싱해 넣습니다.
//    여기서는 설명용으로 비워둔 상태.

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    populateUI(profile);
}
// ▶️ 제어 흐름(control flow):
//    - code가 없으면(첫 방문): Spotify 로그인/동의 페이지로 리다이렉트 요청.
//    - code가 있으면(콜백 단계): 토큰 발급 → 사용자 프로필 API 호출 → 화면 갱신.
//    - 상단의 await는 모듈 스코프에서 쓰는 'Top-level await'라서
//      <script type="module"> 또는 ESM 번들 환경이어야 동작합니다.

async function redirectToAuthCodeFlow(clientId: string) {
    // TODO: Redirect to Spotify authorization page
}
// ▶️ "인가 요청" 단계:
//    - https://accounts.spotify.com/authorize 로 이동시키는 함수.
//    - PKCE를 쓴다면 code_verifier(랜덤 문자열) 생성 → code_challenge(SHA-256 후 base64url)
//      계산 → localStorage/sessionStorage에 verifier 저장 → 아래 파라미터로 리다이렉트:
//        response_type=code
//        client_id=... (여기 clientId)
//        redirect_uri=... (등록된 콜백 URL과 정확히 일치해야 함)
//        scope=... (필요 권한들, 공백은 %20)
//        state=... (CSRF 방지 토큰)
//        code_challenge_method=S256
//        code_challenge=... (위에서 계산한 값)
//    - 마지막에 location.href = builtUrl

async function getAccessToken(clientId: string, code: string) {
  // TODO: Get access token for code
}
// ▶️ "토큰 교환" 단계:
//    - https://accounts.spotify.com/api/token 에 POST (Content-Type: application/x-www-form-urlencoded)
//    - grant_type=authorization_code
//      code=... (위에서 받은 인가 코드)
//      redirect_uri=... (인가 때 썼던 것과 '완전히' 동일해야 함)
//      client_id=... (PKCE에서는 포함)
//      code_verifier=... (인가 전 단계에서 저장해 둔 원본 verifier)
//    - 응답(JSON): { access_token, token_type, expires_in, refresh_token, scope }
//    - ⚠️ SPA에서는 반드시 PKCE를 사용(브라우저에 client secret을 두지 않기 위함).
//      client secret이 필요한 '비PKCE' 교환은 서버에서만 처리해야 안전.

async function fetchProfile(token: string): Promise<any> {
    // TODO: Call Web API
}
// ▶️ "API 호출" 단계(리소스 서버):
//    - GET https://api.spotify.com/v1/me
//    - 헤더: Authorization: Bearer <access_token>
//    - 응답에는 display_name, id, images 등 계정 정보가 담김.

function populateUI(profile: any) {
    // TODO: Update UI with profile data
}
// ▶️ "UI 렌더링" 단계:
//    - fetchProfile에서 받은 JSON을 바탕으로 화면을 업데이트.
//    - 예: 사용자 이름 표시, 아바타 이미지 보여주기, 이메일/팔로워 수 등 배치.
