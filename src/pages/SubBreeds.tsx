import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Dogs } from '../features/api';
interface Props {
  handleChange?: (event: SelectChangeEvent<unknown>) => void;
  value: string;
  data: string[];
  name: string;
}
const SubBreed: React.FC<Props> = (props) => {
  const { value, name, data, handleChange } = props;

  return (
    <Box sx={{ minWidth: 400 }}>
      <FormControl fullWidth>
        <InputLabel id='sub-breed'>Sub Breed</InputLabel>
        <Select
          labelId='sub-breed'
          id='sub-breed'
          value={value}
          label='subBreed'
          name={name}
          onChange={handleChange}
        >
          {data?.map((item: string) => (
            <MenuItem
              key={item}
              value={item}
            >
              {item?.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default SubBreed;
