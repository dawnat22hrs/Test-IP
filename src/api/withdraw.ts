import { api } from './api';
import { WithdrawalDto, WithdrawRequest } from './types';

export const postWithdrawal = async (
  data: WithdrawRequest,
  idempotencyKey: string,
): Promise<WithdrawalDto> => {
  const { data: withdrawal } = await api.post<WithdrawalDto>('/withdrawals', data, {
    headers: { 'Idempotency-Key': idempotencyKey },
  });
  return withdrawal;
};

export const getWithdrawal = async (id: string) => {
  const response = await api.get(`/withdrawals/${id}`);
  return response.data;
};
