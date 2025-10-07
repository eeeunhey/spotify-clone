import { Button, Card, styled, Typography } from "@mui/material";

const EmptyPlaylistCard = styled(Card)(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    padding: "20px",
    borderRadius: "8px",
}));

const CreatePlaylistButton = styled(Button)({
    marginTop: "20px",
    fontWeight: 700,
})

const EmptyPlaylist = () => {
    return (
        <EmptyPlaylistCard>
            <Typography variant="h2" fontWeight={700}>
                첫 번째 플레이리스트를 만들어보세요
            </Typography>
            <Typography variant="body2">간단해요! 저희가 도와드릴게요.</Typography>
            <CreatePlaylistButton variant="contained" color="secondary" >
            플레이리스트 만들기
            </CreatePlaylistButton>
        </EmptyPlaylistCard>
  );
};

export default EmptyPlaylist;