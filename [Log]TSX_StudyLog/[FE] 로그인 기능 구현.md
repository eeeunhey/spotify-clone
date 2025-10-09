onclickEvent 구현
  const login=() =>{
    //로그인 함수를 만들자
    getSpotifyAuthUrl()
  }
  return (
    <CustomButton  color="secondary" size="large" onClick={login}>
      Login</CustomButton>
  )

스포티파이에서 제공하는 로그인기능 가져오기 Authoriztion 문서를 확인하자

End User -> APP -> 스포티파이 공식사이트 

OAuth 
PKCE 
 
로그인 인증에 필요한 코드이다 
src/uitls/crypto.ts 어디 속하기 애매한 코드를 여기에 모아놀거다
TS라 Poprs 타입 지정이 필요하다 리턴 타입으로 넣어준다


const generateRandomString = (length:number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], ""); // 리턴값 스트링
}

const codeVerifier  = generateRandomString(64);

export const generateRandomString = (length:number) : string

# 해쉬코드 생성 코드 
export const sha256 = async (plain:string):string => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}
1. plain:string 지정
2. :  return window.crypto.subtle.digest('SHA-256', data) 리턴타입 지정하는데 async 이기 때문에 Pormise 필수
3. Promise<ArrayBuffer> 위타입이 어레이 버퍼라고 한다

 
# 필요한 함수 불러오기
const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export const base64encode = (input:ArrayBuffer):string=> {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}


utils/auth.ts 파일만들기
로그인 관련 함수 넣기

export const getSpotyfyAuthUrl=() => {
    위에서 만든 함수 때려넣으면 된다
      const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);
}

await의 경우 async와 같이 쓰여야 한다

사용자 권한 요청하기
const clientId = 'YOUR_CLIENT_ID';
const redirectUri = 'http://127.0.0.1:8080';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

// generated in the previous step
window.localStorage.setItem('code_verifier', codeVerifier);

const params =  {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
}

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();
1.     const clientId =env에서 지정한 값 들고옴; 
2. redirectUri 정해야 하는데 env에서 지정한다
3.   const scope = "user-read-private user-read-email";
    API요청 시 필요한 권한을 호출할 때 사용예정 따로 정의예정

4.  authUrl.search = new URLSearchParams(params)
    1. params에 대한 매개변수 타입을 지정해줘야 한다
    2. 이런식으로 정할 수도 있지만 models/정의
      const params :{
        response_type: "code",
        client_id : string,
        scope: string,

  }={
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

5. models/auth.ts 내 params 타입 정의
AuthUrlParams
export interface AuthUrlParams {
  response_type: "code";
  client_id: string;
  scope: string;
  code_challenge_method: "S256";
  code_challenge: string;
  redirect_uri: string;
}

6. AuthUrlParams 타입 적용하기
if (clientId && redirectUri) { // undefien일 경우 대비
  const params: AuthUrlParams = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // spotify 로그인 주소로 이동
}

7. 그래도 Params에서 오류가 남아있다

     ✅ 1. 객체를 그대로 펼쳐서 전달
    const query1 = new URLSearchParams({ ...params }).toString();
     ✅ 2. [키, 값] 쌍의 배열로 전달
    const query2 = new URLSearchParams(Object.entries(params)).toString();