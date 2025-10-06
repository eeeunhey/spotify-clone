import  BookmarksIcon  from "@mui/icons-material/Bookmarks";
import AddIcon from "@mui/icons-material/Add";
import { Box ,Button,styled, Typography } from "@mui/material";


const Head = styled("div")({
    display:"flex",
    alignItems: "center",
    padding: "8px",
    justifyContent:"space-between",
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