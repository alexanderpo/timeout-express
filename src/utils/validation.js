export function signInValidate (values) {
  let error = '';

  if (values.name.length === 0) {
    error = 'Введите имя пользователя';
  } else if (values.name.length < 3) {
    error = 'Имя пользователя должно содержать не менее 3 символов';
  } else if (!/^[A-Za-z0-9-_.]+$/.test(values.name)) {
    error = 'Имя пользователя может содержать только символы A-Z a-z _ - . 1-9';
  } else if (values.password.length === 0) {
    error = 'Введите пароль';
  } else if (values.password.length < 6) {
    error = 'Пароль должен содержать не менее 6 символов';
  }

  return error;
}

export function signUpValidate (values) {
  let error = '';

  if (values.name.length === 0) {
    error = 'Введите имя пользователя';
  } else if (values.name.length < 3) {
    error = 'Имя пользователя должно содержать не менее 3 символов';
  } else if (!/^[A-Za-z0-9-_.]+$/.test(values.name)) {
    error = 'Имя пользователя может содержать только символы A-Z a-z _ - . 1-9';
  } else if (values.email.length === 0) {
    error = 'Введите email адрес';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error = 'Неправильный email адрес';
  } else if (values.password.length === 0) {
    error = 'Введите пароль';
  } else if (values.password.length < 6) {
    error = 'Пароль должен содержать не менее 6 символов';
  }

  return error;
}
