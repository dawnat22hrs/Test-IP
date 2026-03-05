import { MAX_AGE_MS, STORAGE_KEY } from '@/constants';
import { WithdrawState } from '@/store/types';

export const loadLastWithdrawal = (): WithdrawState['lastWithdrawal'] | undefined => {
  if (typeof window === 'undefined') return undefined;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return undefined;

    const parsed = JSON.parse(stored) as WithdrawState['lastWithdrawal'] | undefined;
    if (!parsed) return undefined;

    return Date.now() - (parsed.timestamp || 0) <= MAX_AGE_MS ? parsed : undefined;
  } catch {
    return undefined;
  }
};
