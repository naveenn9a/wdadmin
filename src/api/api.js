import axios from 'axios';
import { API } from '../config/config';
axios.defaults.baseURL = API;

axios.interceptors.request.use((config) => {
  let authObj = localStorage.getItem('token') || {}
  try {
    authObj = JSON.parse(localStorage.getItem('token')) || {}
  } catch (e) {
    authObj = {}
  }

  // add token to request headers
  config.headers['Authorization'] = `bearer ${authObj.token}`;
  return config;
});

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