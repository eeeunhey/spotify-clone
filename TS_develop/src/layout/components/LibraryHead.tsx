import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AddIcon from "@mui/icons-material/Add";
import EastIcon from "@mui/icons-material/East";
import { Box, Button, styled, Typography } from "@mui/material";

const Head = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "8px",
  justifyContent: "space-between",
});

const LibraryHead = () => {
  const handleCreatePlaylist = () => {
    // 나중에 구현
  };

  return (
    <Head>
      <Box display="flex" alignItems= "center">
        <BookmarksIcon sx={{ marginRight: "20px" }} />
        <Typography variant="h2" fontWeight={700} >
          Your Library
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <EastIcon />
        <Button  
        sx={{
            padding :"4px 8px", 
            minWidth: "auto", 
        }} 
        onClick={handleCreatePlaylist}>
          <AddIcon />
        </Button>
      </Box>
    </Head>
  );
};

export default LibraryHead;
