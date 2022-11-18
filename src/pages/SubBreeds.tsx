import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
interface Props {
  handleChange?: (event: SelectChangeEvent<unknown>) => void;
  value: string;
  data: any;
  name: string;
}
const SubBreed: React.FC<Props> = (props) => {
  const { value, name, data, handleChange } = props;

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Breed</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="breed"
          name={name}
          onChange={handleChange}
        >
          {data.map((item: any) => (
            <MenuItem key={item} value={item}>
              {item?.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default SubBreed;
