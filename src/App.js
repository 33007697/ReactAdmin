//引入react，component
import React,{Component} from "react";
//引入router组件，使用路由
import { BrowserRouter,Switch,Route } from "react-router-dom";
// 引入路由组件
import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";
// 引入内存文件和localStorage文件
import infoUtils from "./utils/infoUtils";
import storeUtils from "./utils/storeUtils";
// 引入和风天气样式
import './assets/some/font/qweather-icons.css'

// 获取storeUtils中的user数据，保存到infoUtils中的user中
// 这个就是登录状态持久化保存
const user = storeUtils.getUser()
infoUtils.user = user

//页面
export default class App extends Component{
    render() {
        return (
            // 使用路由器
            <BrowserRouter>
                <Switch>
                    {/* 路由，登录页面和主页 */}
                    <Route path='/login' component={Login}/>  
                    <Route path='/' component={Admin}/> 
                </Switch>
            </BrowserRouter>
        )
    }
}