import { Button, styled } from '@mui/material'
import { getSpotifyAuthUrl } from '../../uitls/auth'


const CustomButton = styled(Button)(({ theme }) => ({
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,

    "&:hover":{
        backgroundColor: "rgba(30, 215, 96, 0.05)",
        color:"#1ed760",
        borderColor: theme.palette.secondary.main,
    },
}))

const LoginButton = () => {
  const login=() =>{
    //로그인 함수를 만들자
    getSpotifyAuthUrl()
  }
  return (
    <CustomButton  color="secondary" size="large" onClick={login}>
      Login</CustomButton>
  )
}

export default LoginButton