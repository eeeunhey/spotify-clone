import { createTheme } from "@mui/material";


const theme = createTheme({
  palette: {
    mode: "dark",
    // 버전별로 구성 
    primary: {
      main: "#1ed760",
    },
    // 두번째로 많이 사용할 색상
    secondary: {
      main: "#ffffff",
    },
    //배경색 2가지 버전으로 
    //paer: 박스 
    background: {
      default: "#000",
      paper: "#121212",
    },

    text: {
      primary: "#fff",
      secondary: "#b3b3b3",
    },
    //호버 / 액티브 이벤트 시
    action: {
      hover: "#282828",
      active: "#333",
    },
  },
  // 폰트 관련 태그 설정
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "24px",
    },
    h2: {
      fontSize: "1rem",
    },
    body1: {
      fontSize: "14px",
    },
    subtitle1: {
      fontSize: "0.6875rem",
    },
  },

  // 컴포넌트 관련 스타일
  // 버튼  미리 디자인 기존 스타일에 오버라이드 적용
  // 
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
          textTransform: "none",
        },
        containedSecondary: {
          backgroundColor: "#ffffff",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        },
        sizeLarge: {
          padding: "8px 32px",
          fontWeight: 700,
          fontSize: "16px",
        },
      },
    },
  },
});

export default theme;
  