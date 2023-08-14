import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDestinations,
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

  return {
    destinations,
    loading,
    searchText,
    total,
    rowsPerPage,
    page,

    getDestinations: useCallback(() => {
      dispatch(getDestinations());
    }, [dispatch]),

    removeDestinations: ids => {
      console.log('🚀 ~ useDestinations.jsx', { ids });
    },

    setSearchText: useCallback(
      evt => {
        dispatch(setSearchText(evt));
      },
      [dispatch]
    ),

    setRowsPerPage: useCallback(
      evt => {
        dispatch(setRowsPerPage(evt));
      },
      [dispatch]
    ),

    setPage: useCallback(
      newPage => {
        dispatch(setPage(newPage));
      },
      [dispatch]
    ),
  };
};

export default useDestinations;
