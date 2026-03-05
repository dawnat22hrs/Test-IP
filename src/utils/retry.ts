import { formatError } from './formatError';

export const retry = async <T>(fn: () => Promise<T>, maxRetries = 2, delayMs = 200): Promise<T> => {
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      return await fn();
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 409) {
        throw err;
      }

      if (status >= 500 && attempt < maxRetries) {
        attempt++;
        await new Promise((r) => setTimeout(r, delayMs));
        continue;
      }

      if (!err.response && attempt < maxRetries) {
        attempt++;
        await new Promise((r) => setTimeout(r, delayMs));
        continue;
      }

      throw err;
    }
  }

  throw new Error('Неизвестная ошибка');
};
