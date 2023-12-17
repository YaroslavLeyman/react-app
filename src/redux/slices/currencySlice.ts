import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number ;
}

const initialState: CurrencyState = {
  fromCurrency: 'EUR',
  toCurrency: 'USD',
  amount: 1,
  result: 0,
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setFromCurrency: (state, action: PayloadAction<string>) => {
      state.fromCurrency = action.payload;
    },
    setToCurrency: (state, action: PayloadAction<string>) => {
      state.toCurrency = action.payload;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setResult: (state, action: PayloadAction<number>) => {
      state.result = action.payload;
    },
  },
});

export const { setFromCurrency, setToCurrency, setAmount, setResult } = currencySlice.actions;

export default currencySlice.reducer;