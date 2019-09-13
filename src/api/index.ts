import Axios, { AxiosInstance } from 'axios';
import { message, notification } from 'antd';

const axiosInstance: AxiosInstance = Axios.create();

axiosInstance.interceptors.response.use(resp => {
  let result = resp.data;
  if (result.status === 0 || result.success) {
    return result.data;
  } else {
    let msg = result.msg || result.message || `接口请求错误:${resp.status}`;
    notification.error({ message: '接口请求报错', description: msg });
    return Promise.reject(resp);
  }
});

const BASE_URL = 'https://api.izhongxia.com';

export const getApp = () => {
  return axiosInstance.get(`${BASE_URL}/api/v1/app`);
};

export const getAppById = (id: any) => {
  return axiosInstance.get(`${BASE_URL}/api/v1/app/${id}`);
};

export const getService = () => {
  return axiosInstance.get(`${BASE_URL}/api/v1/service`);
};

export const getGroup = () => {
  return axiosInstance.get(`${BASE_URL}/api/v1/group`);
};

export const deleteGroup = (id: string) => {
  return axiosInstance.delete(`${BASE_URL}/api/v1/group/${id}`);
};

export const addOrUpdateGroup = (data: any) => {
  if (data._id) {
    return axiosInstance.post(`${BASE_URL}/api/v1/group/${data._id}`, data);
  } else {
    return axiosInstance.post(`${BASE_URL}/api/v1/group`, data);
  }
};

export const createOrUpdateApp = (data: IAppConfig) => {
  if (data._id) {
    const id = data._id;
    delete data._id;
    axiosInstance.post(`${BASE_URL}/api/v1/app/${id}`, data);
  } else {
    return axiosInstance.post(`${BASE_URL}/api/v1/app`, data);
  }
};
