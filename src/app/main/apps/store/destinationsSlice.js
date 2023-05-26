import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import mock10 from './mock-10';
import mock25 from './mock-25';
import mock50 from './mock-50';
import mock100 from './mock-100';

const sleep = async ms => {
  // eslint-disable-next-line no-new
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

export const getDestinations = createAsyncThunk(
  'destinations/getDestinations',
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
    console.log('🚀 ~ destinationsSlice.js', { arg: params, state, thunkAPI });
    await sleep(5000);

    switch (state?.destinations?.destinations?.rowsPerPage ?? 10) {
      case 10:
        return mock10.data;

      case 25:
        return mock25.data;

      case 50:
        return mock50.data;

      case 100:
        return mock100.data;

      default:
        return {};
    }
  }
);

const destinationAdapter = createEntityAdapter({});

const destinationSlice = createSlice({
  name: 'destinations',
  initialState: destinationAdapter.getInitialState({
    loading: false,
    searchText: '',
    total: 0,
    rowsPerPage: 10,
    page: 0,
  }),

  reducers: {
    setSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },

      prepare: evt => ({ payload: evt?.target?.value ?? '' }),
    },

    setRowsPerPage: {
      reducer: (state, action) => {
        state.rowsPerPage = action.payload;
      },

      prepare: evt => ({ payload: evt?.target?.value ?? 10 }),
    },

    setPage: {
      reducer: (state, action) => {
        state.page = action.payload;
      },

      prepare: page => ({ payload: page ?? 0 }),
    },
  },

  extraReducers: {
    [getDestinations.pending]: state => {
      state.loading = true;
    },

    [getDestinations.fulfilled]: (state, action) => {
      state.loading = false;
      state.total = action.payload.totalElements;
      state.rowsPerPage = action.payload.pageable.pageSize;
      state.page = action.payload.pageable.pageNumber;

      action.payload = action.payload.content;

      return destinationAdapter.setAll(state, action);
    },

    [getDestinations.rejected]: (state, action) => {
      state.loading = false;

      console.log('🚀 ~ destinationsSlice.js ~ getDestinations.rejected', { state, action });
    },
  },
});

export const { selectAll: selectDestinations } = destinationAdapter.getSelectors(
  ({ destinations }) => destinations.destinations
);

export const { setSearchText, setRowsPerPage, setPage } = destinationSlice.actions;

export const selectLoading = ({ destinations }) => destinations.destinations.loading;
export const selectSearchText = ({ destinations }) => destinations.destinations.searchText;
export const selectTotal = ({ destinations }) => destinations.destinations.total;
export const selectRowsPerPage = ({ destinations }) => destinations.destinations.rowsPerPage;
export const selectPage = ({ destinations }) => destinations.destinations.page;

export default destinationSlice.reducer;
