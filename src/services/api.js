import Vue from 'vue'
import axios from 'axios'
import {store} from '../store/store.js'

export const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 30000,
  headers: {'Access-Control-Allow-Origin': 'true'}
});

Vue.prototype.$http = api;

api.interceptors.request.use(
  config => {
    const accessToken = store.state.auth.access_token;
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  }
);

export const rasterMS = axios.create({
  baseURL: 'https://rasters.lakeer.org/',
  timeout: 40000,
  headers: {'Access-Control-Allow-Origin': 'true'}
});
