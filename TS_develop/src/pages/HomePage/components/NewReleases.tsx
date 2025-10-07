import { Typography } from "@mui/material"
import useGetNewReleases from "../../../hooks/useGetNewReleases"


const NewReleases = () => {
   const {data }=useGetNewReleases();
   console.log("data", data);
  return (
    <div>
      <Typography variant="h1" padding="8px">
        New Relesed Albums
      </Typography>
    </div>
  )
}

export default NewReleases