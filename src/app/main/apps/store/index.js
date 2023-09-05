import { combineReducers } from '@reduxjs/toolkit';
import destination from './destinationSlice';
import destinations from './destinationsSlice';
import states from './statesSlice';
import countries from './countriesSlice';

const reducer = combineReducers({
  destinations,
  destination,
  states,
  countries,
});

export default reducer;
