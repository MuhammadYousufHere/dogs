/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import Breed from './BreedSelect';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchBreeds,
  fetchSubBreed,
  fetchSubBreedImages,
  getAllBreeds,
} from '../features/dogsSlice';
import SubBreed from './SubBreeds';

const BreedSelectorBox = () => {
  const [selectBreed, setSelectBreed] = useState<string>('');
  const [selectSubBreed, setSelectSubBreed] = useState<string>('');
  const [selectedBreed, setSelectedSubBreed] = useState<any[]>([]);

  const dispatch = useAppDispatch();
  const { allBreeds, availableBreeds, subBreed, success, subBreedImages } =
    useAppSelector((state) => state.dogs);

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
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectBreed(event.target.value);
    dispatch(fetchSubBreed(event.target.value));
  };
  const handleSubBreedChange = (event: SelectChangeEvent<string>) => {
    setSelectSubBreed(event.target.value);
  };
  const fetchImages = () =>
    dispatch(
      fetchSubBreedImages({
        breed: selectBreed,
        subBreed: selectSubBreed,
      })
    );
  return (
    <>
      <Box style={{ display: 'flex', width: '100%', gap: '1rem' }}>
        <Breed
          data={availableBreeds ?? availableBreeds}
          value={selectBreed}
          name='breed'
          handleChange={handleChange}
        />
        <SubBreed
          name='subBreed'
          value={selectSubBreed}
          data={selectedBreed}
          handleChange={handleSubBreedChange}
        />

        <Button
          variant='contained'
          onClick={fetchImages}
          disabled={selectBreed && selectSubBreed ? false : true}
        >
          +
        </Button>
      </Box>
      <Box>
        {subBreedImages.message.length ? subBreedImages.message.length : 0}{' '}
        Images Available
      </Box>
    </>
  );
};

export default BreedSelectorBox;
