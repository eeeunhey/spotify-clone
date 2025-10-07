
### ✅ 1) 페이지 안에서 훅을 만드는 방법

* 예를 들어 **Home 페이지** 안에 `useHomeData` 훅을 만든다고 해보자.
* 이건 **“그 페이지만의 데이터”** 를 불러올 때 좋아.
* 폴더 안에 다 모여 있어서
  → 수정할 때 한눈에 보기 쉽고,
  → 그 페이지가 어떻게 동작하는지도 바로 이해돼.

📌 **언제 쓰면 좋냐면?**
→ 홈, 마이페이지처럼 “해당 화면에서만” 쓰는 데이터일 때!

---

### ✅ 2) 훅만 따로 모아두는 방법

* `/hooks` 폴더를 만들어서
  `useFetch`, `useDebounce`, `useInfiniteScroll` 같은 **공용 훅**을 넣는 거야.
* 이렇게 하면 여러 페이지에서 **공통으로 재사용하기** 좋아.
* 대신 “이 훅이 어디에 쓰이는지”는 조금 헷갈릴 수 있어.

📌 **언제 쓰면 좋냐면?**
→ 여러 화면에서 공통으로 반복해서 쓰는 기능일 때!
(예: 무한 스크롤, API 기본 패턴, 로딩 처리 등)

---

💡 **정리하자면**

| 구분      | 위치                      | 장점           | 단점      |
| ------- | ----------------------- | ------------ | ------- |
| 페이지별 훅  | `pages/Home/hooks.ts`   | 응집력 높고 관리 쉬움 | 재사용 어려움 |
| 공용 훅 폴더 | `hooks/useSomething.ts` | 재사용 쉬움       | 맥락이 약해짐 |

---

설치 명령어
`npm install @tanstack/react-query`

`npm install @tanstack/react-query-devtools`

1. return useQuery({ }) 기본 셋팅
2. 임폴트해야암 `import { useQuery } from "@tanstack/react-query"`
3. useQuery({ }) 안에 값을 채워줄거다
    1. 쿼리키가 필요하다 ID값에 따라 업데이트 / 기한만료 하면 쿼리 호출할 수 있게 정해준다
    2. `queryKey: ["new-releases"],` // 쿼리에 관한 이름 지어줌 고유 ID
    3. `queryFn: async() => {return }` // 이 이름을 가진 키가 어떤 함수를 가져올지 알려줌 
    4. `queryFn: async() => {return getNewReleases() }` // async(비동기)로 `getNewReleases` 함수를 가져올거다
    5. `getNewReleases` 만들러 가보자


api 관려 함수 만들어보자
src/api 폴더를 만든다
1. 앨범관련 정보를 가져올 API 함수를 만들어보자
    1. src/apis/albumApi.ts
    2. 아까 호출하려 했던 `getNewReleases`를 내보낼거다
       `export const getNewReleases = async() => {}` 
    3. 내부에 내용을 채워보자 try/catch 로 예외처리 하기
    ```ts
    async() => {
        try {
            const response await axios.get(`API 주소임`)
        } catch (error) {}
    } 
    ```

    4. axios를 사용하기 위해서 설치가 필요하다
    `npm install axios`
    import 해준다 `import axios from "axios";`
    
    5. api 주소 가져오기 위해 정보를 찾아보자

    이제 주소를 넣어서 API를 가져와보자 
    주소는 어디서 알 수 있냐
    API 제공해주는 곳 사이트에 자세히 적혀있다
    https://developer.spotify.com/documentation/web-api/reference
    스포티파이에서 제공하는 Develop 문서이다 k-v값 주소 겁나 상세히 잘 적혀있다

    https://api.spotify.com/v1/ // 기본적으로 들어가는 주소
    browse/new-releases // 엔드포인트만 잘 지정하면 된다
    limit : 몇개 가져올거니
    offset : 5 페이지에 5개씩 보여줌 1:0~4 2:4~9 이런식으로 보여준다
    지금 구현하기 기능에는 딱히 페이지 넘기는 기능이 없을거라서 필요가 없다

    해당 API가 필요로 하는 정보 
    curl --request GET \
    --url https://api.spotify.com/v1/browse/new-releases \
    --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z' // 토큰이가 필요하다 없으면 데이터 못받는다 
    
    6. 토큰이를 만들어보자
    Getting Started 를 보면 나온다
    https://developer.spotify.com/dashboard 들어가서 앱을 생성한다

    7. Create app을 들어간다
    8. app name : Spotify(해당프로젝트이름 맘대로)
       App descripion : 해당설명 적음
       website 추후 연동 시 사용
       Redirect URIs : http://localhost:5173/ 이거 안됨 (최근 정책 변경으로 인해 로컬호스트 사용 제한)
       npm run dev -- --host 입력
       http://192.168.0. 네트워크 주소 번호  :5173/ 이런식으로 로컬 IP를 입력해야 추가가 됨 
       
       마지막 체크 : Web API / 재생기능 추가 Web Playback SDK 
       저장
       데시보드 가면 권한 토큰 줌 그거 가져다 쓰면 됨 setting - ClientID를 가져다 써라

    9. .env 만들러 가기 프로젝트 폴더 안에 만듬
        `REACT_APP_SPOTIFY_CLIENT_ID=`ID넣음
        `REACT_APP_SPOTIFY_SECRET_ID=`시크릿키 넣음
        나의 경우 vite 때문에 
        `VITE_APP_SPOTIFY_CLIENT_ID=`ID넣음
        `VITE_APP_SPOTIFY_SECRET_ID=`시크릿키 넣음
        https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
        사용방법은 아래 사이트에 잘 기재
    
1. src/configs 폴더를 만든다
    1. src/configs/AuthConfig 파일 만들기
    2. 아까 만들었던 .env 파일에서 정보를 가져오자 
    이런식으로 만들어놓으면 밑에 긴코드를 굳이 안들고 와도 
    `clientSecret` / `clientId` 이것만 꼴랑 가져다 쓰면 된다
    `export const clientSecret = process.env.REACT_APP_SPOTIFY_SECRET_ID`
    `export const clientId=process.env.REACT_APP_SPOTIFY_CLIENT_ID`

2. hooks/useClientCredentialToken.ts 만든다
    API 토큰 가져오기 위한 훅
    ```ts
    1. const useCrentCredentialToken = () => {
            useQuery({})
        }
    ```
    ```ts
    2. useQuery({
        queryKey:['client-credential=token'],
        queryFn: getClientCredientialToken
    })
    ```

    3. `getClientCredientialToken` 함수를 또 만들거 가야한다
    apis/authApi.ts를 만들어준다
    ```ts
    4. export const getClientCredientialToken = async() => {
        try{

        }catch(error){}
    }
    ```

    5. API를 호출하기 위해 바디를 준비해야 한다 
    이걸 try 내부에 body를 만든다 
    ```ts
    try {
        const body = new URLSearchParams({})
    }
    ```
    ```ts
    const body = new URLSearchParams({
        grant_type:"client_credentials"
    })
    ```

    post를 위해 response를 만든다 

    ```ts
    try{
        const body = new URLSearchParams({
            grant_type:"client_credentials"
        })
        const response = await axios.post("http://accounts.spotify.com/api/token",body, {
            // 헤더값을 넣어준다
            headers: {
                Authorization: `Basic ${}`
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
    }catch(error) {}

    ```
    response 안에 헤더값을 넣어주는데 스포티 파이에서 제공하는 자료에 적혀 있다 
    (new Buffer.from(client_id + ':' + client_secret).toString('base64')) 이값을 따로 함수로 상단에 만든다 나중에 개발할 떄 보여주기 위함
    ```ts
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    "Content-Type":"application/x-www-form-urlencoded"
    ```
    import 아래 만들어준다 encodedBase64
    ```ts
        const encodeBase64=(data:string) => {
            return Buffer.from(data).toString("base64")
        }

            try{
        const body = new URLSearchParams({
            grant_type:"client_credentials"
        })
        const response = await axios.post("http://accounts.spotify.com/api/token",body, {
            // 헤더값을 넣어준다
            headers: {
                Authorization: `Basic ${encodeBase64(clientId+":"+clientSecret)}`,
                "Content-Type":"application/x-www-form-urlencoded",
            },
        })
        return response.data
    } catch(error) {
        throw new Error("토큰을 가져오는데 실패하였습니다")
    }

    ```
`const encodeBase64=(data:string):string => {` 리턴 타입 스트링이라고 명시해줘야 한다

- HTTP 헤더는 ASCII만 안전하게 받을 수 있다 그래서 인코딩 과정이 필요하다
인코딩 하기 위해 Buffer.from(data).toString("base64") 사용했다 
하지만 문제가 발생 Buffer란 녀석은 Node.js전용이라서 (React/vite)에서 문제일어남
그래서 vite에서 제공하는 ASCII만: btoa 유니코드 안전: TextEncoder + btoa
사용하면 되지만 요즘은 편리하게 사용할 수 있도록 js-base64  라이브러리가 있다

`npm i js-base64` 

인코딩/디코딩을 환경 가리지 않고(브라우저/Node/SSR) 안전하게 처리해주는 라이브러리
그래서 btoa 예외처리를 해줘야 되서 귀찮다
이걸 쓰면 `const encodeBase64 = (secret: string) => Base64.encode(secret);`
코드 한줄로 끝난다 너무 햄복하다 


받아올 타입을 정하자
/TS_devleop/models/auth.ts 만든다
내부에는 제공하는 API key랑 타입을 입력
```ts
export interface ClientCredentialTokenResponse {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
}

```
이걸 getClientCredientialToken = async():Promise<ClientCredentialTokenResponse> 
지정한다 그 다음 sueClientCredetialToken.ts를 수정
```ts

const useClientCredentialToken = () => {
    useQuery({
        queryKey:['client-credential=token'],
        queryFn: getClientCredentialToken
    })
}
```
받아오긴 하는데 토큰값만 가져오면 된다 그러기 위해서 
const {data} data 안에 getClientCredentialToken 받아오는데 
데이터가 있으면 access_token을 가져오게 한다
리턴 타입을ClientCredentialTokenResponse 정의하면 정의한 타입을 가져올 수 있다

`retrun clientCredentialToken; ` 저장된 값을 반환한다
useClientCredentialToken 마우스커서를 두면 타입을 알려주는데 그에 맞게 리턴 타입을 작성한다
const useClientCredentialToken = () : (리턴값)string | undefined (반환 되는 경우 access_token 값이 없을 경우)
이렇게 정의가 완료되면 해당 훅을 export default 로 내보낸다

```ts
const useClientCredentialToken = ():string | undefined => {
    const {data} = useQuery({
        queryKey:['client-credential=token'],
        queryFn: getClientCredentialToken
    })
    const clientCredentialToken = data?.access_token
    retrun clientCredentialToken;
}

export default useClientCredentialToken
```



