import axios from '../api/axios.js';

const changePassword = async (data, token) => {
  const resp = await axios.post('', data, {
    headers: {
      token: `${token}`,
    },
  });
  return resp.data;
};

const getMe = async (token) => {
  const resp = await axios.get('', {
    headers: {
      token: `${token}`,
    },
  });
  return resp.data;
};

const login = async (data) => {
  const resp = await axios.post('', data);
  return resp.data;
};

const register = async (data) => {
  const resp = await axios.post('', data);
  return resp.data;
};

export { changePassword, getMe, register, login };