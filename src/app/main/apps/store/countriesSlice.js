import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getCountries } from 'src/app/services/countries';

export const getCountriesThunk = createAsyncThunk(
  'justGo/countries/getCountries',
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
    const { searchText, page, rowsPerPage, data } = state.justGo.countries;

    let newData = data;
    if (!data.length) {
      const countries = await getCountries({ searchText, page: page + 1, rowsPerPage });
      newData = countries;
    }

    const text = `${searchText ?? ''}`.trim();
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const content = newData
      .filter(({ code }) => {
        if (!text.length) return true;

        return code.toLocaleLowerCase().includes(text.toLocaleLowerCase());
      })
      .slice(start, end);

    const totalPages = Math.ceil(content.length / rowsPerPage);
    return {
      data: newData,
      content,
      pageable: {
        sort: {
          sorted: false,
          unsorted: true,
          empty: true,
        },
        pageNumber: page,
        pageSize: rowsPerPage,
        offset: page * rowsPerPage,
        paged: true,
        unpaged: false,
      },
      last: page + 1 === totalPages,
      totalPages,
      totalElements: newData.length,
      first: page === 0,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true,
      },
      number: page,
      numberOfElements: rowsPerPage,
      size: rowsPerPage,
      empty: !content.length,
    };
  }
);

const countriesAdapter = createEntityAdapter({});

const initialState = countriesAdapter.getInitialState({
  loading: false,
  data: [],
  searchText: '',
  total: 0,
  rowsPerPage: 10,
  page: 0,
});

const countriesSlice = createSlice({
  name: 'justGo/countries',
  initialState,
  reducers: {
    resetCountries: () => initialState,

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
    [getCountriesThunk.pending]: state => {
      state.loading = true;
    },

    [getCountriesThunk.fulfilled]: (state, action) => {
      const { totalElements, pageable, content, data } = action.payload;

      state.data = data;
      state.loading = false;
      state.total = totalElements;
      state.rowsPerPage = pageable.pageSize;
      state.page = pageable.pageNumber;

      countriesAdapter.setAll(state, content);
    },

    [getCountriesThunk.rejected]: state => {
      state.loading = false;
    },
  },
});

export const { selectAll: selectCountries } = countriesAdapter.getSelectors(
  ({ justGo }) => justGo.countries
);

export const { resetCountries, setSearchText, setRowsPerPage, setPage } = countriesSlice.actions;

export const selectLoading = ({ justGo }) => justGo.countries.loading;
export const selectSearchText = ({ justGo }) => justGo.countries.searchText;
export const selectTotal = ({ justGo }) => justGo.countries.total;
export const selectRowsPerPage = ({ justGo }) => justGo.countries.rowsPerPage;
export const selectPage = ({ justGo }) => justGo.countries.page;

export default countriesSlice.reducer;
