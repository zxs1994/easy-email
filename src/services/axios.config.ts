import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { UserStorage } from '@demo/utils/user-storage'
import { Message } from '@arco-design/web-react'
// console.log(import.meta.env.VITE_BASE_API)
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
})

axiosInstance.interceptors.request.use(async function (config) {
  try {
    const token = await UserStorage.getToken()
    if (!config.headers) {
      config.headers = {}
    }
    // config.headers.token = token || '';
    config.headers.token = localStorage.getItem('token') || ''
  } catch (error) {
    // window.location.assign(LOGIN_ADDRESS);
  } finally {
    return config
  }
})

axiosInstance.interceptors.response.use(
  function <T>(res: AxiosResponse<T>) {
    return new Promise((resolve, reject) => {
      // console.log(res)
      const data: any = res.data || {}
      if (!/^(0|200)$/.test(data.code)) {
        Message.warning(data.msg)
      }
      return resolve(res)
    })
  },
  error => {
    throw {
      ...error,
      message: error?.response?.data?.message || error?.message || error,
    }
  }
)

export declare interface Response<T = any> {
  code: number
  msg: string
  result: T
}
export const request = {
  get: async function <T>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<Response<T>> {
    return axiosInstance.get<Response<T>>(url, config).then(data => data.data)
  },
  post: async function <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ): Promise<Response<T>> {
    return axiosInstance
      .post<Response<T>>(url, data, config)
      .then(data => data.data)
  },
}
