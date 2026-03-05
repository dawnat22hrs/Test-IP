import { WithdrawRequest } from '@/api/types';
import { getWithdrawal, postWithdrawal } from '@/api/withdraw';
import { formatError } from '@/utils/formatError';
import { retry } from '@/utils/retry';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postWithRetry = async (data: WithdrawRequest) => {
  return retry(() => postWithdrawal(data, crypto.randomUUID()));
};

export const submitWithdraw = createAsyncThunk<
  string,
  { amount: number; destination: string },
  { rejectValue: string }
>('withdraw/submit', async (data, { rejectWithValue }) => {
  try {
    const { id } = await postWithRetry(data);
    return id;
  } catch (err: any) {
    return rejectWithValue(formatError(err));
  }
});

export const fetchWithdrawal = createAsyncThunk(
  'withdraw/fetch',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await getWithdrawal(id);
      return data;
    } catch (err: any) {
      return rejectWithValue(formatError(err));
    }
  },
);
