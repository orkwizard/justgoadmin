import { useDebounce } from '@fuse/hooks';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCountriesThunk,
  resetCountries,
  selectCountries,
  selectLoading,
  selectPage,
  selectRowsPerPage,
  selectSearchText,
  selectTotal,
  setPage,
  setRowsPerPage,
  setSearchText,
} from '../main/apps/store/countriesSlice';

const useCountries = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const loading = useSelector(selectLoading);
  const searchText = useSelector(selectSearchText);
  const total = useSelector(selectTotal);
  const rowsPerPage = useSelector(selectRowsPerPage);
  const page = useSelector(selectPage);

  const getCountries = useDebounce(params => {
    dispatch(getCountriesThunk(params));
  });

  return {
    countries,
    loading,
    searchText,
    total,
    rowsPerPage,
    page,
    getCountries,

    removeCountries: ids => {
      console.log('🚀 ~ useCountries.jsx', { ids });
    },

    resetCountries: useCallback(() => {
      dispatch(resetCountries());
    }, [dispatch]),

    setSearchText: useCallback(
      evt => {
        dispatch(setSearchText(evt));
        dispatch(setPage(0));
      },
      [dispatch]
    ),

    setRowsPerPage: useCallback(
      evt => {
        dispatch(setRowsPerPage(evt));
        dispatch(setPage(0));
      },
      [dispatch]
    ),

    setPage: useCallback(
      (event, value) => {
        dispatch(setPage(value));
      },
      [dispatch]
    ),
  };
};

export default useCountries;
