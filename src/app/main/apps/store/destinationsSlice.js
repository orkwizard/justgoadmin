import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getDestinations } from 'src/app/services/destinations';

export const getDestinationsThunk = createAsyncThunk(
  'justGo/destinations/getDestinations',
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
    const { searchText, page, rowsPerPage } = state.justGo.destinations;

    const destinations = await getDestinations({
      searchText,
      page: page + 1,
      rowsPerPage,
    });

    // console.log('🚀 ~ destinationsSlice.js', { destinations });
    return destinations;
  }
);

const destinationAdapter = createEntityAdapter({});

const initialState = destinationAdapter.getInitialState({
  loading: false,
  searchText: '',
  total: 0,
  rowsPerPage: 10,
  page: 0,
});

const destinationSlice = createSlice({
  name: 'justGo/destinations',
  initialState,

  reducers: {
    resetDestinations: () => initialState,

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
      const { totalElements, pageable, content } = action.payload;

      state.loading = false;
      state.total = totalElements;
      state.rowsPerPage = pageable.pageSize;
      state.page = pageable.pageNumber;

      destinationAdapter.setAll(state, content);
    },

    [getDestinationsThunk.rejected]: state => {
      state.loading = false;
    },
  },
});

export const { selectAll: selectDestinations } = destinationAdapter.getSelectors(
  ({ justGo }) => justGo.destinations
);

export const { resetDestinations, setSearchText, setRowsPerPage, setPage } =
  destinationSlice.actions;

export const selectLoading = ({ justGo }) => justGo.destinations.loading;
export const selectSearchText = ({ justGo }) => justGo.destinations.searchText;
export const selectTotal = ({ justGo }) => justGo.destinations.total;
export const selectRowsPerPage = ({ justGo }) => justGo.destinations.rowsPerPage;
export const selectPage = ({ justGo }) => justGo.destinations.page;

export default destinationSlice.reducer;
