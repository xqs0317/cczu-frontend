import axios from "axios";
//自定义axios
const myAxios = axios.create({
    //每次发请求axios会拼接baseURL
    baseURL: 'http://101.43.95.213:8080/api',
    //发请求时可以携带headers
    headers: {'X-Custom-Header': 'foobar'},
    //跨域时携带请求cookie
    withCredentials: true
});
// 添加一个请求拦截器
myAxios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log("我要发请求了")
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 添加一个响应拦截器
myAxios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log("收到响应了")
    if(response.data.code===40100){
        location.href='/user/login'
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

//暴露给外部文件引用
export default myAxios
