1. hooks/useGetNewReleases.ts 설정하기
토큰값이 있어야 API를 호출할 수 있다 토큰을 들고 와보장

```ts
import { useQuery } from "@tanstack/react-query"
import { getNewReleases } from "../apis/albumApi"

const useGetNewReleases = () => {
    cosnt clientCredentialToken = useClientCredentialToken()
    return useQuery({
      queryKey: ["new-releases"],
      queryFn: async() => {
         return getNewReleases(clientCredentialToken)
      }

    })
}


```
1.     cosnt clientCredentialToken = useClientCredentialToken() 토큰값 들고오기 위해 선언함
2. return getNewReleases(clientCredentialToken) 
3. api/albumApi.ts 내부에 export const getNewReleases = async (clientCredentialToken:string) => {}
4. clientCredentialToken 에러가 있다 보니깐 전달이 string 올수도 undefine이 올 수도 있는데
그 부분에 대해 처리를 해줘야 한다 만약에 undefine이면 
5. hooks/useGetNewReleases.ts  
``` ts
if(!clientCredentialToken) {
    throw new Error("No Token available") // 에러를 발생해서 걸러준다
}
return getNewReleases(clientCredentialToken);

```
getNewReleases API 주소 호출하기
1. 공통적으로 들어가는 주소 부분을 .env에 입력한다 
SPOTIFY_BASE_URL = https://api.spotify.com/v1
2. 가져오기 편하도록 config로 지정한다
configs/commonConfig.ts 
`export const SPOTIFY_BASE_URL = import.meta.env.SPOTIFY_BASE_URL` 추가하
3. `const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases`)` 추가

4. 토큰 넣기
const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases`, {
    headers: {
        Authorization: `Bearer ${clientCredentialToken}`
    }
})

```ts

    try {   
        const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases`,
            {
                headers: {
                    Authorization: `Bearer ${clientCredentialToken}`,
                },
            }
        );
        return response.data
    } catch(error) {
        throw new Error("fail to fetch new releases");
    }
```

5. 반환값의 타입을 지정하자 
현재 return response.data 타입은 any 타입이다 그러면 온갖 데이터가 다 들어온다
그래서 반환값 타입을 정해주자 
export const getNewReleases = async(clientCredentialToken:string): Promise< 타입 만들기>

6. Rsponse data 에 대해 limit 20개가 기본값인데 그렇게까지 필요가 없기 때문에 값을 정하자
 const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases?limit=6

7. 타입을 지정하기
models/album.ts 추가한다
```ts
    albums : {
        href: string;
        limit: number;
        next: string;
        offset:number;
        previous : string | null; // nullable 널이 올 수도 있다
        total : number;
        items:{}[]
    }
```
items 객체 배열 타입이다 
```ts
        items: {
            album_type : string;
            totaa_tracks : string;
            available_markets : string[]; //array of String 배열형식으로 받아야와야 한다
            external_urls: { // 오브젝트라서 열어줘야함
                spotify?:string //Required 가 없어서 ? 붙여줘야한다
                // 값이 올수도 있고 안올 수도 있기 때문에 그러한다
            };
            href: string;
            id: string;
            images: {
                url: string;
                height: number | null;
                width: number | null;
            }[];

            name: string;
            release_date: string;
            release_date_precition: string;
            restrictions?: {
                reason?: string;
            };
            type: string;
            uri: string;
            
            artists: {
                external_urls?: {
                spotify?: string;
                };
                href?: string;
                id?: string;
                name?: string;
                type?: string;
                uri?: string;

            }[];
        }
                

```

중복 코드를 처리해보자
models/commonType.ts로 공통적으로 들어가는 부분을 넣을 ts

            restrictions?: {
                reason?: string;
            }; 겹친다

models/commonType.ts
export interface ExternalURLs{
    spotify: string;
}

이렇게 만들고 
      external_urls: ExternalUrls // 이런식으로 가져올 수 있다

images 도 자주 등장할거 같기 때문에 만들어보장
reason도 빼주자
export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface Restriction {
  reason?: string;
}


아티스트도 분리하자 
models/artist.ts
import type { ExternalUrls } from "./commonType";

export interface Artist {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
}


앨범도 앨범 정보만 볼 수 있게 만들자 
export interface SimplifiedAlbum {
  album_type: string;
  total_tracks: string;
  available_markets: string[];
  external_urls: ExternalUrls;

  href: string;
  id: string;
  images: Image[];

  name: string;
  release_date: string;
  release_date_precition: string;
  restrictions?: Restriction;
  type: string;
  uri: string;

  artists: Artist[];
}

이렇게 나눔으로서 getNewReleasesResponse 가 필요한 정보만 보여줄 수 있다

export interface getNewReleasesResponse {
  albums: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string | null;
    total: number;
    items: SimplifiedAlbum[];
  };
}
