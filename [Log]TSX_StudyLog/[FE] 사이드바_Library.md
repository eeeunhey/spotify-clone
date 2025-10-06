좋아 😊
이제 오타 수정까지 반영해서 **정리된 코드 + 아주 쉽게 이해되는 설명**으로 만들어줄게.
그냥 “왜 이렇게 써야 하는지”만 딱딱 잡아주면 돼요 👇

---

## ✅ 완성된 코드 구조

### **📁 LibraryHead.tsx**

```tsx

import  BookmarksIcon  from "@mui/icons-material/Bookmarks";
import AddIcon from "@mui/icons-material/Add";
import { Box ,Button,styled, Typography } from "@mui/material";

// Head: 상단 헤더 전체 박스
// div를 쓰는 이유 → 특별한 의미(헤더, 본문 등)가 필요 없고
// 단순히 레이아웃을 묶어주는 “상자”로 쓰기 좋기 때문이에요.
const Head = styled("div")({
    display:"flex",
    alignItems: "center",
    padding: "8px",
    justifyContent:"space-between",  // 왼쪽-오른쪽으로 나누기
});

const LibraryHead = () => {
  const handleCreatePlaylist = () => {
    // 나중에 구현
  };
  
    return (
        <Head>
            <Box display="flex">
                <BookmarksIcon sx={{ marginRight: "20px" }} />
                <Typography variant="h2" fontWeight={700}>
                    Your Library
                </Typography>
            </Box>
            <Button onClick={handleCreatePlaylist}>
                <AddIcon />
            </Button>
        </Head>
  );
};

export default LibraryHead;

```
---

### **📁 Library.tsx**

따로 분리한 이유는 상황에 따라 내용이 바뀜 그에 따라 그려줘야 하는데 예를 들어 로그인을 했을 떄 플레이 리스트를 보여줘야 한다 
로그인 안했을 떄 화면 / 로그인을 해도 리스트를 아직 만들지 않은 유저 여러 상황을 고려해야 함 그래서 컴포넌트 화를 시켰다

```tsx
import EmptyPlaylist from "./EmptyPlaylist";

export const Library = () => {
  // 나중에 로그인 여부나 플레이리스트 데이터를 확인해서
  // if문으로 다른 화면을 보여줄 수 있음
  // ex)
  // if (!isLoggedIn) return <LoginMessage />;
  // if (isLoggedIn && playlists.length === 0) return <EmptyPlaylist />;
  // return <PlaylistList />;

  return <EmptyPlaylist />;
};

export default Library;
```



---

### **📁 EmptyPlaylist.tsx**

```tsx
import { Button, Card, styled, Typography } from "@mui/material";

// Card 전체 스타일
const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "8px", // 글자 사이 간격
}));

// 버튼 스타일
const CreatePlaylistButton = styled(Button)({
  marginTop: "12px",
  fontWeight: 700, 
  alignSelf: "flex-start", // 왼쪽 정렬 (중앙으로 하고 싶다면 'center')
});

const EmptyPlaylist = () => {
  return (
    <EmptyPlaylistCard>
      <Typography variant="h6" fontWeight={700}>
        Create your first playlist
      </Typography>

      <Typography variant="body2" color="text.secondary">
        It’s easy, we’ll help you
      </Typography>

      <CreatePlaylistButton variant="contained" color="secondary">
        Create playlist 
      </CreatePlaylistButton>
    </EmptyPlaylistCard>
  );
};

export default EmptyPlaylist;
```

---

## 🧠 아주 쉽게 이해하기

| 부분                                | 역할                    | 왜 이렇게 써야 할까?                        |
| --------------------------------- | --------------------- | ----------------------------------- |
| `Head = styled("div")`            | 헤더를 감싸는 상자            | `<div>`는 아무 의미 없는 상자라, 레이아웃 짜기 딱 좋음 |
| `display: "flex"`                 | 가로로 나열하기              | 아이콘, 글자, 버튼을 한 줄에 정렬할 때 사용          |
| `justifyContent: "space-between"` | 좌우 끝으로 배치             | 왼쪽엔 제목, 오른쪽엔 버튼이 가게 함               |
| `gap`                             | 사이 간격 주기              | 너무 붙어보이지 않게 여백을 만듦                  |
| `alignSelf`                       | 버튼 위치                 | 카드 안에서 버튼이 어디 있을지 정함                |
| `IconButton`                      | 아이콘 전용 버튼             | 아이콘만 쓸 때 딱 맞는 버튼 타입                 |
| `EmptyPlaylist`                   | 아무 노래 리스트 없을 때 보여줄 화면 | 로그인/리스트 상황에 따라 바뀌는 부분을 분리해둠         |

---

## ✨ 정리하자면

* **div는 단순히 “상자 역할”**이라서 레이아웃 묶기 좋고
* **flex는 가로로 정렬**할 때 필수
* **space-between은 좌우 끝으로 나누는 정렬 방식**
* `EmptyPlaylist`, `Library`, `LibraryHead`로 나눈 이유는
  → **상황별로 다른 화면을 쉽게 교체하기 위해서**


