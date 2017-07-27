export const signInValidate = (values) => {
  let error = '';

  if (values.name.length === 0) {
    error = 'Enter username';
  } else if (values.name.length < 3) {
    error = 'Username must contain at least 3 characters';
  } else if (!/^[A-Za-z0-9-_.]+$/.test(values.name)) {
    error = 'Username can only contain A-Z characters a-z _ -. 1-9';
  } else if (values.password.length === 0) {
    error = 'Enter password';
  } else if (values.password.length < 6) {
    error = 'Password must contain at least 6 characters';
  }

  return error;
};

export const signUpValidate = (values) => {
  let error = '';

  if (values.name.length === 0) {
    error = 'Enter username';
  } else if (values.name.length < 3) {
    error = 'Username must contain at least 3 characters';
  } else if (!/^[A-Za-z0-9-_.]+$/.test(values.name)) {
    error = 'Username can only contain A-Z characters a-z _ -. 1-9';
  } else if (values.email.length === 0) {
    error = 'Enter email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error = 'Wrong email address';
  } else if (values.password === undefined) {
    error = 'Enter password';
  } else if (values.password.length === 0) {
    error = 'Enter password';
  } else if (values.password.length < 6) {
    error = 'Password must contain at least 6 characters';
  }

  return error;
};

export const updateUserValidate = (values) => {
  let error = '';

  if (values.name.length === 0) {
    error = 'Enter username';
  } else if (values.name.length < 3) {
    error = 'Username must contain at least 3 characters';
  } else if (!/^[A-Za-z0-9-_.]+$/.test(values.name)) {
    error = 'Username can only contain A-Z characters a-z _ -. 1-9';
  } else if (values.email.length === 0) {
    error = 'Enter email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error = 'Wrong email address';
  } else if (values.isChange === true && values.password === undefined) {
    error = 'Enter password';
  } else if (values.isChange === true && values.password.length === 0 && values.password === undefined) { // eslint-disable-line
    error = 'Enter password';
  } else if (values.isChange === true && values.password.length < 6) {
    error = 'Password must contain at least 6 characters';
  }

  return error;
};
