import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '.';

export const selectWithdraw = (state: RootState) => state.withdraw;

export const selectWithdrawForm = createSelector(
  selectWithdraw,
  ({ amount, destination, confirm }) => ({ amount, destination, confirm }),
);

export const selectWithdrawStatus = createSelector(
  selectWithdraw,
  ({ status, error, lastWithdrawal }) => ({ status, error, lastWithdrawal }),
);
