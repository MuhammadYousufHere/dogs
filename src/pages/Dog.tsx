/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import Breed from './BreedSelect';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchBreeds,
  fetchSubBreed,
  getAllBreeds,
} from '../features/dogsSlice';
import SubBreed from './SubBreeds';
import { Dogs } from '../features/api';

const BreedSelectorBox = () => {
  const [selectBreeds, setSelectBreeds] = useState<string>('');
  const [selectSubBreed, setSelectSubBreed] = useState<string>('');
  const [selectedBreed, setSelectedSubBreed] = useState<any[]>([]);

  const dispatch = useAppDispatch();
  const { allBreeds, availableBreeds, subBreed, success } = useAppSelector(
    (state) => state.dogs
  );

  useEffect(() => {
    dispatch(getAllBreeds());
  }, []);
  useEffect(() => {
    dispatch(fetchBreeds(allBreeds));
  }, [success]);
  useEffect(() => {
    setSelectedSubBreed(Object.values(subBreed.message));
  }, [subBreed]);
  //onchange
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSelectBreeds(event.target.value as string);
    dispatch(fetchSubBreed(event.target.value as string));
  };
  const handleSubBreedChange = (event: SelectChangeEvent<unknown>) => {
    setSelectSubBreed(event.target.value as string);
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
        <SubBreed
          name='subBreed'
          value={selectSubBreed}
          data={selectedBreed}
          handleChange={handleSubBreedChange}
        />

        <Button variant='contained'>+</Button>
      </Box>
    </>
  );
};

export default BreedSelectorBox;
