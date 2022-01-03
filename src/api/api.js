import axios from 'axios';
import { API, token } from '../config/config';
axios.defaults.baseURL = API;
  axios.defaults.headers.common['Authorization'] = `bearer ${token}`;

export const getAxios = (path) => {
  return axios.get(`${path}`)
}

export const postAxios = (path, data) => {
  return axios.post(`${path}`, data)
}

export const patchAxios = (path, data) => {
  return axios.patch(`${path}`, data)
}

export const deleteAxios = (path, data) => {
  return axios.delete(`${path}`, data)
}