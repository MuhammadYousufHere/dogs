import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getDogs, Dogs, getBreeds, Breeds } from './api';

export interface InitialState {
  allBreeds: Dogs
  status: 'idle' | 'loading' | 'failed';
  availableBreeds: Breeds[];
  success: boolean;
}

const initialState: InitialState = {
  allBreeds: {
    message: {},
    status: ''
  },
  status: 'idle',
  availableBreeds: [],
  success: false
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

export const dogsSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    recievedDogs(state, action: PayloadAction<Dogs[]>) {
      // store products in varable;
      const dogs = action.payload
      // convert an arr to obj
      dogs.forEach(dog => {

        // state.products[product.id] = product;
      })

    }
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
  },
});

// export const { } = dogsSlice.actions;





export default dogsSlice.reducer;
