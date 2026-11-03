import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    decrement(state) {
      state.value -= 1;
    },
    increment(state) {
      state.value += 1;
    },
    reset(state) {
      state.value = 0;
    },
  },
});

export const { decrement, increment, reset } = counterSlice.actions;
export default counterSlice.reducer;
