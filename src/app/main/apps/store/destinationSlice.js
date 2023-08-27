/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getDestination = createAsyncThunk('justGo/getDestination', async destinationId => {
  const response = await axios.get(`/api/ecommerce/products/${destinationId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeDestination = createAsyncThunk(
  'justGo/removeDestination',
  async (val, { dispatch, getState }) => {
    const { id } = getState().justGo.destination;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

export const saveDestination = createAsyncThunk(
  'justGo/saveDestination',
  async (destinationData, { dispatch, getState }) => {
    const { id } = getState().justGo.destination;

    const response = await axios.put(`/api/ecommerce/products/${id}`, destinationData);

    const data = await response.data;

    return data;
  }
);

const destinationSlice = createSlice({
  name: 'justGo',
  initialState: null,
  reducers: {
    resetDestination: () => null,
    newDestination: {
      reducer: (state, action) => action.payload,
      prepare: event => ({
        payload: {
          id: FuseUtils.generateGUID(),
          name: '',
          handle: '',
          description: '',
          categories: [],
          tags: [],
          images: [],
          priceTaxExcl: 0,
          priceTaxIncl: 0,
          taxRate: 0,
          comparedPrice: 0,
          quantity: 0,
          sku: '',
          width: '',
          height: '',
          depth: '',
          weight: '',
          extraShippingFee: 0,
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getDestination.fulfilled]: (state, action) => action.payload,
    [saveDestination.fulfilled]: (state, action) => action.payload,
    [removeDestination.fulfilled]: (state, action) => null,
  },
});

export const { newDestination, resetDestination } = destinationSlice.actions;

export const selectDestination = ({ justGo }) => justGo.destination;

export default destinationSlice.reducer;
