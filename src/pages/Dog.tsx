/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import Breed from './BreedSelect';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchBreeds, getAllBreeds } from '../features/dogsSlice';

const BreedSelectorBox = () => {
  const [selectBreeds, setSelectBreeds] = useState<string>('');

  const dispatch = useAppDispatch();
  const { allBreeds, availableBreeds, success } = useAppSelector(
    (state) => state.dogs
  );
  useEffect(() => {
    dispatch(getAllBreeds());
  }, []);
  useEffect(() => {
    dispatch(fetchBreeds(allBreeds));
  }, [success]);

  //onchange
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSelectBreeds(event.target.value as string);
  };

  return (
    <>
      <Box style={{ display: 'flex', width: '100%', gap: '1rem' }}>
        <Breed
          data={availableBreeds ?? availableBreeds}
          value={selectBreeds}
          name='breed'
          handleChange={handleChange}
        />

        <Button variant='contained'>+</Button>
      </Box>
    </>
  );
};

export default BreedSelectorBox;
