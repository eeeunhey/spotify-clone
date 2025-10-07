import { Button, styled } from "@mui/material";



const CustomButton = styled(Button)(({ theme }) => ({
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,

    "&:hover":{
        backgroundColor: "rgba(30, 215, 96, 0.05)",
        color:"#1ed760",
        borderColor: theme.palette.secondary.main,
    },
}))


const SignButton = () => {

  return (
  <div >
  <CustomButton size="large" 
      sx={{ marginRight: "20px" }}
  >Sign In</CustomButton>
  </div>
  )
}

export default SignButton