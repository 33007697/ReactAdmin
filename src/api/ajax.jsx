/*
创建一个发送ajax的函数
使用axios第三方库
    其返回的值就是promise对象，可以使用then方法和catch方法链式调用
还需要解决错误信息统一提示
    返回一个自己新建的promise对象，其resovle返回成功的数据，reject返回失败的数据
    使用antd中的message组件，不要使用reject()返回错误
*/ 


// 引入axios
import axios from "axios";
// 从antd中引入message
import { message } from "antd";

// 创建一个发送ajax的函数，并默认暴露出去
export default function ajax(url,data={},type="GET"){
    // 该函数返回一个新建的promise对象
    return new Promise((resovle,reject)=>{
        // 定义一个变量接收axios返回的数据
        let promise
        // 判断请求的类型
        if(type === 'GET'){
            // axios.get()返回的是promise对象，其参数可以通过配置对象中的params属性传入
            promise = axios.get(url,{params:data})
        }else{
            // axios.post()返回的时候promise对象，其携带的参数可以通过第二个参数直接传入
            promise = axios.post(url,data)
        }
        // 使用axios返回的值，操作外层promise请求成功的回调和失败的回调
        // 并解决错误信息统一报出来
        promise.then(response=>{
            // 请求成功的回调
            resovle(response.data)
        }).catch(error=>{
            // 请求失败的回调,将信息直接通过message组件报出去,不要使用reject()
            message.error(error.message)
        })
    })
}