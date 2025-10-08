import { Grid, Typography } from "@mui/material"
import useGetNewReleases from "../../../hooks/useGetNewReleases"
import ErrorMessage from "../../../common/components/ErrorMessage";
import LodingSpinner from "../../../common/components/Loader/LodingSpinner";
import Card from "../../../common/components/Card";



const NewReleases = () => {
   const {data, error, isLoading }=useGetNewReleases();
   console.log("data", data);
   if(isLoading) {
      return <LodingSpinner />
   }
   if(error) {
    return <ErrorMessage errorMessage={error.message} />
   }
  return (
    <div>
      <Typography variant="h1" padding="8px">
        New Relesed Albums
      </Typography>
      {data && data.albums.items.length>0?(
        <Grid container spacing= {2}>
          {data.albums.items.map((album)=>(
            <Grid size={{xs:6, sm:4, md:2}} key={album.id}>
                <Card 
                  name={album.name}
                  artistName={album.artists.map((artist) => artist.name).join(",")}
                  image={album.images[0].url}
                  />
              </Grid>
          ))}
        </Grid>
      )
      : (
        <Typography variant="h2">No Data</Typography>
      )}
    </div>
  )
}

export default NewReleases