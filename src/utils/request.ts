import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL
// const baseUrl = import.meta.env.LOCAL_URL

// 创建 Axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

let accessToken: string | null = null;

// 保存登录后的访问令牌
const setAccessToken = (token: string) => {
  accessToken = token;
};

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 302) {
        const newLocation = error.response.headers.location;
        if (typeof window!== 'undefined') {
          window.location.href = newLocation;
        } else {
          // 如果是在服务器端环境，可能需要进行其他处理，比如记录错误或返回特定的响应给客户端
          console.error('302跳转在服务器端环境可能需要特殊处理');
        }
      } else {
        // 处理其他状态码的错误响应
        switch (status) {
          case 401:
            // 未授权，可进行重定向到登录页等操作
            break;
          case 403:
            // 禁止访问，可提示用户无权限等
            break;
          case 404:
            // 资源未找到，可提示用户等
            break;
          default:
            break;
        }
      }
    } else if (error.request) {
      console.error('请求未发送，可能是网络问题');
    } else {
      console.error('发生了未知错误：', error.message);
    }
    return Promise.reject(error);
  }
);


const request = {
  get: (url: string, config?: AxiosRequestConfig) => instance.get(url, config),
  post: (url: string, data?: any, config?: AxiosRequestConfig) => instance.post(url, data, config),
  put: (url: string, data?: any, config?: AxiosRequestConfig) => instance.put(url, data, config),
  delete: (url: string, config?: AxiosRequestConfig) => instance.delete(url, config),
};

// 假设的刷新令牌函数
const refreshToken = () => {
  // 这里实现刷新令牌的逻辑，返回一个 Promise
  return new Promise((resolve, reject) => {
    // 例如：调用刷新令牌的 API
    // axios.post('/refresh-token', { /* 可能需要的参数 */ })
    //  .then(response => {
    //     setAccessToken(response.data.newAccessToken);
    //     resolve();
    //   })
    //  .catch(error => {
    //     reject(error);
    //   });
  });
};

export { setAccessToken,request };