export interface WithdrawalDto {
  id: string;
  status: string;
  amount: number;
  destination: string;
}

export interface WithdrawRequest {
  amount: number;
  destination: string;
}

export interface WithdrawResponse {
  id: string;
}
