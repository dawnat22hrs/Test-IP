import { submitWithdraw } from '@/store/thunks';
import { createTestStore } from './testUtils/mockStore';
import { postWithdrawal } from '@/api/withdraw';

jest.mock('@/api/withdraw');

describe('withdraw flow', () => {
  const mockedPost = postWithdrawal as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('happy path submit', async () => {
    const store = createTestStore();

    mockedPost.mockResolvedValue({
      id: 'withdraw123',
    });

    await store.dispatch(submitWithdraw({ amount: 100, destination: 'wallet' }) as any);

    const state = store.getState().withdraw;

    expect(state.status).toBe('success');
    expect(state.lastWithdrawal?.id).toBe('withdraw123');
  });

  test('API error', async () => {
    const store = createTestStore();

    mockedPost.mockRejectedValue({
      response: { status: 500 },
      message: 'Server error',
    });

    await store.dispatch(submitWithdraw({ amount: 100, destination: 'wallet' }) as any);

    const state = store.getState().withdraw;

    expect(state.status).toBe('error');
    expect(state.error).toBeDefined();
  });

  test('double submit protection (409)', async () => {
    const store = createTestStore();

    mockedPost.mockRejectedValue({
      response: { status: 409 },
    });

    await store.dispatch(submitWithdraw({ amount: 100, destination: 'wallet' }) as any);

    const state = store.getState().withdraw;

    expect(state.error).toBe('Заявка уже существует.');
    expect(state.error).toMatch(/заявка уже существует/i);
  });
});
