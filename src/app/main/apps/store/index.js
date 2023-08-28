import { combineReducers } from '@reduxjs/toolkit';
import destination from './destinationSlice';
import destinations from './destinationsSlice';
import states from './statesSlice';

const reducer = combineReducers({
  destinations,
  destination,
  states,
});

export default reducer;
