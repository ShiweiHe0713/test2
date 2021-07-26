import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import router from '@/router/index'
axios.defaults.withCredentials = true
const codeMessage = {
 200: '服务器成功返回请求的数据。',
 201: '新建或修改数据成功。',
 202: '一个请求已经进入后台排队（异步任务）。',
 204: '删除数据成功。',
 400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
 401: '用户没有权限（令牌、用户名、密码错误）。',
 403: '用户得到授权，但是访问是被禁止的。',
 404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
 406: '请求的格式不可得。',
 410: '请求的资源被永久删除，且不会再得到的。',
 422: '当创建一个对象时，发生一个验证错误。',
 500: '服务器发生错误，请检查服务器。',
 502: '网关错误。',
 503: '服务不可用，服务器暂时过载或维护。',
 504: '网关超时。',
};
const errorHandler = (error) => {
 const { response } = error;


 return Promise.reject(error)
}

axios.interceptors.request.use(config => {
 if (!config.timeout) {
  config.timeout = 60 * 1000
 }
 config.retry = 2
 config.retryDelay = 1000

 config.withCredentials = true
 config.credentials = true
 return config
})

axios.interceptors.response.use(response => {
 const responseData = response.data

 return responseData
}, errorHandler)
//const baseUrl = 'http://47.92.74.29:8088/biapi'
const baseUrl = ''
export default function request (options) {

 let oriUrl = baseUrl + options.url
 const method =
  (options && options.method && options.method.toLowerCase()) || 'get'
 let params = {}
 if (method === 'get') {
  if (options.params) {
   params = {
    params: options.params
   }
  }

 } else {
  if (options.data) {
   params = options.data
  }
 }
 return axios[method](oriUrl, params)
  .then(res => res)
  .catch(err => Promise.reject(err))
}
export {
 baseUrl
}
