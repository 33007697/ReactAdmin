/*
简化请求信息的发送，就是将ajax再包装一层
*/ 
// 引入ajax文件
import ajax from "./ajax";
// 引入jsonp文件
import jsonp from "jsonp";
// 引入antd
import { message } from "antd";
import store from "store";

const HEF_KEY = 'S2MLe2vZs6Y69NO8z'
const BASE = ''


// 发送请求前，需要开启代理服务器
// 开发环境中开启代理在package.json中配置proxy配置项，其值为代理服务器地址

// 分别暴露请求信息接口
// 登录接口
export const reqLogin = (username,password) => ajax(BASE+'/login',{username,password},'POST')

// 获取天气信息接口
export const reqTianQi = async (city="30.29:114.24") =>{
    let results = await ajax('https://api.seniverse.com/v3/weather/now.json',{key:HEF_KEY,location:city,language:'zh-Hans',unit:'c'},'GET')
    store.set('tq',results.results[0])
}
// 获取商品分类信息接口
export const reqCategorys = (parentId) => ajax(BASE+'/manage/category/list',{parentId})
// 添加商品分类接口
export const reqAddCategory = (parentId,categoryName) => ajax(BASE+'/manage/category/add',{parentId,categoryName},"POST")
// 更新商品分类信息接口
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax(BASE+'/manage/category/update',{categoryId,categoryName},'POST')
// 设定一个jsonp的请求，使用promise对象

export const reqJsonp = (city='114.24,30.29') =>{
    // 使用promise是为了统一处理错误信息
    return new Promise((resolve,reject)=>{
        jsonp(`https://devapi.qweather.com/v7/weather/now?key=${HEF_KEY}&location=${city}`,{},(err,data)=>{
            // 如果err为空,并且data.status的值为success，表示请求成功
            if(!err){
                // 请求成功，结构赋值，获取需要的数据
                console.log(data)
                // 将数据返回出去
                resolve(data)
            }else{
                // 统一报出错误信息
                message.error('获取天气信息失败！')
            }
        })
    })
}