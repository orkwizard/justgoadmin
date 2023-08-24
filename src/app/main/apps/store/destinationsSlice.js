import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getDestinations } from 'src/app/services/destinations';

export const getDestinationsThunk = createAsyncThunk(
  'destinations/getDestinations',
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
    const { searchText, page, rowsPerPage } = state.destinations.destinations;

    return getDestinations({
      searchText,
      page: page + 1,
      rowsPerPage,
    });
  }
);

const destinationAdapter = createEntityAdapter({});

const initialState = {
  loading: false,
  searchText: '',
  total: 0,
  rowsPerPage: 10,
  page: 0,
};

const destinationSlice = createSlice({
  name: 'destinations',
  initialState: destinationAdapter.getInitialState(initialState),

  reducers: {
    setSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },

      prepare: evt => ({ payload: evt?.target?.value ?? initialState.searchText }),
    },

    setRowsPerPage: {
      reducer: (state, action) => {
        state.rowsPerPage = action.payload;
      },

      prepare: evt => ({ payload: evt?.target?.value ?? initialState.rowsPerPage }),
    },

    setPage: {
      reducer: (state, action) => {
        state.page = action.payload;
      },

      prepare: page => ({ payload: page ?? initialState.page }),
    },
  },

  extraReducers: {
    [getDestinationsThunk.pending]: state => {
      state.loading = true;
    },

    [getDestinationsThunk.fulfilled]: (state, action) => {
      // console.log('🚀 ~ destinationsSlice.js', JSON.parse(JSON.stringify({ state, action })));

      const { totalElements, pageable, content } = action.payload;

      state.loading = false;
      state.total = totalElements;
      state.rowsPerPage = pageable.pageSize;
      state.page = pageable.pageNumber;

      action.payload = content;
      return destinationAdapter.setAll(state, action);
    },

    [getDestinationsThunk.rejected]: (state, action) => {
      // console.log('🚀 ~ destinationsSlice.js', JSON.parse(JSON.stringify({ state, action })));
      state.loading = false;
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
