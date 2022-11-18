import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

const Loader: FC = () => {
  return (
    <Box>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
