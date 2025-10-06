import { Box } from "@mui/material"
import LoginButton from "../../common/components/LoginButton"
import SignButton from "../../common/components/test/SignButton"


const Navbar = () => {
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px" gap={1}>
    
    <LoginButton />
    <SignButton />
    </Box>
  )
}

export default Navbar