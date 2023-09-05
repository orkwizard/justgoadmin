import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getStates } from 'src/app/services/states';

export const getStatesThunk = createAsyncThunk(
  'justGo/states/getStates',
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
    const { searchText, page, rowsPerPage } = state.justGo.states;

    const states = await getStates({
      searchText,
      page: page + 1,
      rowsPerPage,
    });

    console.log('🚀 ~ statesSlice.js', { states });
    return states;
  }
);

const statesAdapter = createEntityAdapter({});

const initialState = statesAdapter.getInitialState({
  loading: false,
  searchText: '',
  total: 0,
  rowsPerPage: 10,
  page: 0,
});

const statesSlice = createSlice({
  name: 'justGo/states',
  initialState,

  reducers: {
    resetStates: () => initialState,

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
    [getStatesThunk.pending]: state => {
      state.loading = true;
    },

    [getStatesThunk.fulfilled]: (state, action) => {
      const { totalElements, pageable, content } = action.payload;

      state.loading = false;
      state.total = totalElements;
      state.rowsPerPage = pageable.pageSize;
      state.page = pageable.pageNumber;

      statesAdapter.setAll(state, content);
    },

    [getStatesThunk.rejected]: state => {
      state.loading = false;
    },
  },
});

export const { selectAll: selectStates } = statesAdapter.getSelectors(
  ({ justGo }) => justGo.states
);

export const { resetStates, setSearchText, setRowsPerPage, setPage } = statesSlice.actions;

export const selectLoading = ({ justGo }) => justGo.states.loading;
export const selectSearchText = ({ justGo }) => justGo.states.searchText;
export const selectTotal = ({ justGo }) => justGo.states.total;
export const selectRowsPerPage = ({ justGo }) => justGo.states.rowsPerPage;
export const selectPage = ({ justGo }) => justGo.states.page;

export default statesSlice.reducer;
