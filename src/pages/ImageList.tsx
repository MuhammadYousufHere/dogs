import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import StarBorder from "@mui/icons-material/StarBorder";

const ImageListComp = ({ breeds }: { breeds: any[] }) => {
  return (
    <ImageList
      sx={{
        width: 500,
        height: 450,
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: "translateZ(0)",
      }}
      rowHeight={200}
      gap={1}
    >
      {breeds?.map((breed: any) => {
        const cols = breed.featured ? 2 : 1;
        const rows = breed.featured ? 2 : 1;
        /// try to ignore those lines with const cols and rows

        return (
          <ImageListItem key={breed.key} cols={cols} rows={rows}>
            <img
              src={breed.value}
              alt={breed.key}
              // loading="lazy"
              width={250}
              height={200}
            />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              title={breed}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: "white" }}
                  aria-label={`star ${breed}`}
                >
                  <StarBorder />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

export default ImageListComp;
