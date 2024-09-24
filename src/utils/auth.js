export const BASE_URL = 'https://register.nomoreparties.co';
const ERROR_INVALID_DATA = 400;
const ERROR_NOT_FOUND = 401;

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((res) =>
      res
        .status(ERROR_INVALID_DATA)
        .send({ message: 'Uno de los campos se completó incorrectamente.'})
    );
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
    })
    .catch((err, res) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_INVALID_DATA)
          .send({ message: 'Uno de los campos se completó incorrectamente.' });
      } else {
        res.status(ERROR_NOT_FOUND).send({
          message: 'Usuario con correo electrónico especificado no encontrado',
        });
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err, res) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_INVALID_DATA).send({
          message: 'Token no proporcionado o proporcionado en formato incorrecto',
        });
      } else {
        res.status(ERROR_NOT_FOUND).send({
          message: 'El token proporcionado no es válido',
        });
      }
    });
};
