import Axios, { AxiosInstance } from 'axios';
import { message } from 'antd';

const axiosInstance: AxiosInstance = Axios.create();

axiosInstance.interceptors.response.use(resp => {
  if (resp.data.status === 0) {
    return resp.data.data;
  } else {
    message.error('接口请求报错');
    return Promise.reject(resp);
  }
});

export const getApp = () => {
  return axiosInstance.get(`/api/v1/app`);
};

export const getAppById = (id: any) => {
  return axiosInstance.get(`/api/v1/app/${id}`);
};

export const getService = () => {
  return axiosInstance.get('/api/v1/service');
};

export const getGroup = () => {
  return axiosInstance.get('/api/v1/group');
};

export const deleteGroup = (id: string) => {
  return axiosInstance.delete(`/api/v1/group/${id}`);
};

export const addOrUpdateGroup = (data: any) => {
  if (data._id) {
    return axiosInstance.post(`/api/v1/group/${data._id}`, data);
  } else {
    return axiosInstance.post('/api/v1/group', data);
  }
};

export const createOrUpdateApp = (data: IAppConfig) => {
  if (data._id) {
    const id = data._id;
    delete data._id;
    axiosInstance.post(`/api/v1/app/${id}`, data);
  } else {
    return axiosInstance.post('/api/v1/app', data);
  }
};
