export enum WithdrawStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export interface WithdrawState {
  amount: number;
  destination: string;
  confirm: boolean;
  status: WithdrawStatus;
  error?: string;
  lastWithdrawal?: {
    id: string;
    status: string;
    amount: number;
    destination: string;
    timestamp?: number;
  };
}
