import { useDebounce } from '@fuse/hooks';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStatesThunk,
  selectLoading,
  selectPage,
  selectRowsPerPage,
  selectSearchText,
  selectStates,
  selectTotal,
  setPage,
  setRowsPerPage,
  setSearchText,
} from '../main/apps/store/statesSlice';

const useStates = () => {
  const dispatch = useDispatch();
  const states = useSelector(selectStates);
  const loading = useSelector(selectLoading);
  const searchText = useSelector(selectSearchText);
  const total = useSelector(selectTotal);
  const rowsPerPage = useSelector(selectRowsPerPage);
  const page = useSelector(selectPage);

  const getStates = useDebounce(params => {
    dispatch(getStatesThunk(params));
  }, 300);

  return {
    states,
    loading,
    searchText,
    total,
    rowsPerPage,
    page,

    getStates,

    removeStates: ids => {
      console.log('🚀 ~ useStates.jsx', { ids });
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

export default useStates;
