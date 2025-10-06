import { Button, styled } from "@mui/material";



const CustomButton = styled(Button)(({ theme }) => ({
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,

    "&:hover":{
        backgroundColor: theme.palette.secondary.main,
        color:"#1ed760",
        borderColor: theme.palette.secondary.main,
    },
}))


const SignButton = () => {

  return <CustomButton variant="outlined" size="large">Sign In</CustomButton>
}

export default SignButton