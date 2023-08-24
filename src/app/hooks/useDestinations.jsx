import { useDebounce } from '@fuse/hooks';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDestinationsThunk,
  selectDestinations,
  selectLoading,
  selectPage,
  selectRowsPerPage,
  selectSearchText,
  selectTotal,
  setPage,
  setRowsPerPage,
  setSearchText,
} from '../main/apps/store/destinationsSlice';

const useDestinations = () => {
  const dispatch = useDispatch();
  const destinations = useSelector(selectDestinations);
  const loading = useSelector(selectLoading);
  const searchText = useSelector(selectSearchText);
  const total = useSelector(selectTotal);
  const rowsPerPage = useSelector(selectRowsPerPage);
  const page = useSelector(selectPage);

  const getDestinations = useDebounce(params => {
    dispatch(getDestinationsThunk(params));
  }, 300);

  return {
    destinations,
    loading,
    searchText,
    total,
    rowsPerPage,
    page,

    getDestinations,

    removeDestinations: ids => {
      console.log('🚀 ~ useDestinations.jsx', { ids });
    },

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

export default useDestinations;
