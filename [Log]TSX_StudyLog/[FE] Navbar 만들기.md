### Navbar 만들기
1. Box를 묶는다
2. <LoginButton> 가져온다
import { Box } from "@mui/material"
import LoginButton from "../../common/components/LoginButton"


const Navbar = () => {
  return (
    <Box><LoginButton/></Box>
  )
}

export default Navbar

/common/components/LoginButton"
로그인의 경우 공통적으로 많이 사용하기 때문에 commom 폴더에 만든다

 로그인 버튼 스타일 지정해보자
 이런식으로 버튼의 스타일 속성을 지정한다
 MUI 홈페이지에 다양한 속성에 대한 설명이 적혀 있다
 `contained` 내부에 색상이 채워져 있는 버튼 
 `outline` 테두리만 있는 버튼
 <Button variant="contained" color="secondary" size="large">