import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDestinations = createAsyncThunk('justGo/getDestinations', async () => {
  const response = await axios.get('/api/ecommerce/products');
  const data = await response.data;

  return data;
});

export const removeDestinations = createAsyncThunk(
  'justGo',
  async (destinationIds, { dispatch, getState }) => {
    await axios.delete('/api/ecommerce/products', { data: destinationIds });

    return destinationIds;
  }
);

const destinationsAdapter = createEntityAdapter({});

export const { selectAll: selectDestinations, selectById: selectDestinationById } =
  destinationsAdapter.getSelectors(state => state.justGo.destinations);

const destinationsSlice = createSlice({
  name: 'justGo',
  initialState: destinationsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setDestinationsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: event => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getDestinations.fulfilled]: destinationsAdapter.setAll,
    [removeDestinations.fulfilled]: (state, action) =>
      destinationsAdapter.removeMany(state, action.payload),
  },
});

export const { setDestinationsSearchText } = destinationsSlice.actions;

export const selectDestinationsSearchText = ({ justGo }) => justGo.destinations.searchText;

export default destinationsSlice.reducer;
