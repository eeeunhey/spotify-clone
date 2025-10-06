import { Box, styled, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

import { NavLink, Outlet } from "react-router-dom";
import Library from "../common/components/Library";
import LibraryHead from "./components/LibraryHead";

const Layout = styled("div")({
  display: "flex", // 양옆 배치
  height: "100vh",
  padding: "8px", // 박스 사이 약간의 텀을 주기 위해 사용
});

const Sidebar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100%", // 100vh
  display: "flex", // 요소들을 쉽게 배치시키기 위해 사용
  flexDirection: "column",
  // 모바일 버전에는 사이드바가 사라질 예정인데
  // mui 제공하는 breakpoints를 사용한다
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%", //width:"331px" 100% 활용
  marginBottom: "8px",
  marginRight: "8px",
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  color: theme.palette.text.secondary,
  "&.hover": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,
  },
}));

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <NavList>
            <StyledNavLink to="/">
              <HomeIcon />
              <Typography variant="h2" fontWeight={700}>
                Home
              </Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
              <SearchIcon />
              <Typography variant="h2" fontWeight={700}>
                Search
              </Typography>
            </StyledNavLink>
          </NavList>
        </ContentBox>

        <ContentBox height="100%">
          <LibraryHead />
          <Library />
        </ContentBox>

        <Outlet />
      </Sidebar>
    </Layout>
  );
};

export default AppLayout;
