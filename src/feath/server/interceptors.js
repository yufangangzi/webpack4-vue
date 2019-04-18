import axios from 'axios'
// import {setCookie, getCookie} from '@/util/tool.js'
// import qs from 'qs'
export default () => {
  // 全局 axios 默认配置
  axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
  // axios.defaults.timeout = 5000;
  // axios.defaults.baseURL = 'http://localhost:8088/'
  // 拦截器 添加请求拦截器
  axios.interceptors.request.use((config) => {
    // 这里可添加全局loading
    // POST传参序列化
    // if(config.method  === 'post'){
    //     config.data = qs.stringify(config.data);
    // }
    // if (getCookie('userToken')) {
    // 存储个人信息token
    // config.headers['Authorization'] = getCookie('userToken')
    // }
    config.url = config.url + '?timer=' + Date.parse(new Date())
    return config
  }, (error) => {
    return Promise.reject(error)
  })
  // 返回状态判断
  axios.interceptors.response.use((res) => {
    // if (res.headers.token === 'false') {
    //   setCookie('userToken', '')
    //   window.location.replace('/')
    // }
    // if(!res.data.success){
    // return Promise.reject(res);
    // }
    return res
  }, (error) => {
    return Promise.reject(error)
  })
}