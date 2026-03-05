import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WithdrawState, WithdrawStatus } from './types';
import { STORAGE_KEY } from '@/constants';
import { loadLastWithdrawal } from '@/utils/loadLastWithdrawal';
import { fetchWithdrawal, submitWithdraw } from './thunks';

const initialState: WithdrawState = {
  amount: 0,
  destination: '',
  confirm: false,
  status: WithdrawStatus.Idle,
  lastWithdrawal: loadLastWithdrawal(),
};

const withdrawSlice = createSlice({
  name: 'withdraw',
  initialState,
  reducers: {
    setAmount(state, action: PayloadAction<number>) {
      state.amount = action.payload;
    },
    setDestination(state, action: PayloadAction<string>) {
      state.destination = action.payload;
    },
    setConfirm(state, action: PayloadAction<boolean>) {
      state.confirm = action.payload;
    },
    resetForm(state) {
      state.amount = 0;
      state.destination = '';
      state.confirm = false;
      state.status = WithdrawStatus.Idle;
      state.error = undefined;
      state.lastWithdrawal = undefined;

      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitWithdraw.pending, (state) => {
        state.status = WithdrawStatus.Loading;
        state.error = undefined;
      })
      .addCase(submitWithdraw.fulfilled, (state, action) => {
        state.status = WithdrawStatus.Success;
        state.lastWithdrawal = {
          id: action.payload,
          amount: state.amount,
          destination: state.destination,
          status: 'pending',
          timestamp: Date.now(),
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lastWithdrawal));
        }
      })
      .addCase(submitWithdraw.rejected, (state, action) => {
        state.status = WithdrawStatus.Error;
        state.error = action.payload as string;
      })
      .addCase(fetchWithdrawal.fulfilled, (state, action) => {
        state.lastWithdrawal = {
          ...action.payload,
          timestamp: Date.now(),
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lastWithdrawal));
        }
      })
      .addCase(fetchWithdrawal.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setAmount, setDestination, setConfirm, resetForm } = withdrawSlice.actions;
export default withdrawSlice.reducer;
