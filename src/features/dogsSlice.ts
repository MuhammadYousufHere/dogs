import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getDogs, Dogs, getBreeds, Breeds, getSubBreed, getSubBreedImages, Params } from './api';

export interface InitialState {
  allBreeds: Dogs
  status: 'idle' | 'loading' | 'failed';
  availableBreeds: Breeds[];
  success: boolean;
  subBreed: Dogs;
  subBreedImages: Dogs
}

const initialState: InitialState = {
  allBreeds: {
    message: {},
    status: ''
  },
  status: 'idle',
  availableBreeds: [],
  success: false,
  subBreed: {
    message: {},
    status: ''
  },
  subBreedImages: {
    message: {},
    status: ''
  }
};


export const getAllBreeds = createAsyncThunk(
  'dogs/fetchDogs',
  async () => {
    const response = await getDogs();
    return response

  }
);
export const fetchBreeds = createAsyncThunk(
  'dogs/getBreeds',
  async (allData: Dogs) => {
    const response = await getBreeds(allData);
    return response

  }
);

export const fetchSubBreed = createAsyncThunk('dogs/getBreeds/sub_breed',
  async (breed: string) => {
    const response = await getSubBreed(breed)
    return response;
  });


export const fetchSubBreedImages = createAsyncThunk('dogs/getBreeds/sub_breed/images',
  async (params: Params) => {
    const response = await getSubBreedImages(params.breed, params.subBreed)
    return response;
  });

export const dogsSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    recievedDogs(state, action: PayloadAction<Dogs[]>) { }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllBreeds.pending, (state) => {
        state.status = 'loading';
        state.success = false
      })
      .addCase(getAllBreeds.fulfilled, (state, action: PayloadAction<Dogs>) => {
        state.status = 'idle';
        state.allBreeds = action.payload;
        state.success = true
      })
      .addCase(getAllBreeds.rejected, (state) => {
        state.status = 'failed';
        state.allBreeds = {
          message: {},
          status: 'failed'
        };
        state.success = false
      })
      .addCase(fetchBreeds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBreeds.fulfilled, (state, action) => {
        state.status = 'idle';
        state.availableBreeds = action.payload
      })
      .addCase(fetchBreeds.rejected, (state) => {
        state.status = 'failed';
        state.availableBreeds = []
      })
      .addCase(fetchSubBreed.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubBreed.fulfilled, (state, action: PayloadAction<Dogs>) => {
        state.status = 'idle';
        state.subBreed = action.payload
      })
      .addCase(fetchSubBreed.rejected, (state) => {
        state.status = 'failed';
        state.subBreed = {
          message: {},
          status: 'failed'
        }
      })
      .addCase(fetchSubBreedImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubBreedImages.fulfilled, (state, action: PayloadAction<Dogs>) => {
        state.status = 'idle';
        state.subBreedImages = action.payload
      })
      .addCase(fetchSubBreedImages.rejected, (state) => {
        state.status = 'failed';
        state.subBreedImages = {
          message: {},
          status: 'failed'
        }
      })
  },
});

// export const { } = dogsSlice.actions;





export default dogsSlice.reducer;
