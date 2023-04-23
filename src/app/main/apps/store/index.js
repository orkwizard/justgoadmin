import { combineReducers } from '@reduxjs/toolkit';
import destination from './destinationSlice';
import destinations from './destinationsSlice';

const reducer = combineReducers({
  destinations,
  destination,
});

export default reducer;
