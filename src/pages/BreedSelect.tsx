import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Breeds } from '../features/api';
import { capitalize } from '../util';

interface Props {
  handleChange: (event: SelectChangeEvent<string>) => void;
  value: string;
  data: Breeds[];
  name: string;
}
const Breed: React.FC<Props> = (props) => {
  const { value, name, data, handleChange } = props;

  return (
    <Box sx={{ minWidth: 220 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Breed</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={value}
          label='breed'
          name={name}
          onChange={handleChange}
        >
          {data?.map((item) => (
            <MenuItem
              key={item.key}
              value={item?.key}
            >
              {capitalize(item?.key)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default Breed;
