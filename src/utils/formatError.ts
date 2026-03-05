export const formatError = (err: any): string => {
  if (!err) return 'Неизвестная ошибка.';

  if (err.response) {
    switch (err.response.status) {
      case 401:
        return 'Необходима авторизация.';
      case 403:
        return 'Неверный токен доступа.';
      case 409:
        return 'Заявка уже существует.';
      default:
        if (err.response.data?.message) return err.response.data.message;
        return 'Произошла ошибка. Попробуйте позже.';
    }
  }

  return 'Сетевая ошибка. Попробуйте еще раз.';
};
