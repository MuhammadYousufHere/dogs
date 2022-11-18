import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getDogs, Dogs } from './api';

export interface InitialState {
  allBreeds: {};
  status: 'idle' | 'loading' | 'failed';
}

const initialState: InitialState = {
  allBreeds: {},
  status: 'idle',
};


export const getAllBreeds = createAsyncThunk(
  'dogs/fetchDogs',
  async () => {
    const response = await getDogs();
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
      })
      .addCase(getAllBreeds.fulfilled, (state, action: PayloadAction<Dogs[]>) => {
        state.status = 'idle';
        state.allBreeds = action.payload
      })
      .addCase(getAllBreeds.rejected, (state) => {
        state.status = 'failed';
        state.allBreeds = {}
      });
  },
});

// export const { } = dogsSlice.actions;





export default dogsSlice.reducer;
