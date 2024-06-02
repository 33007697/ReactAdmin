import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
// 引入图标图片
import logo from './images/logo.png'
// 引入样式
import './login.css'
// 引入antdUI组件
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
// 引入接口文件
import { reqLogin } from '../../api';
// 引入内存文件和localStorage文件
import infoUtils from '../../utils/infoUtils'
import storeUtils from '../../utils/storeUtils';

export default class Login extends Component {
    // 使用async和await使用异步请求，让其看起来像是同步代码
    handlefrom = async (values) => {
        // 发送登录请求
        const result = await reqLogin(values.username,values.password)
        // 获取到返回数据后进行判断
        if(result.status === 0){
            // 登录成功后将user信息放到内存和loaclStorage中保存
            infoUtils.user = result.data
            storeUtils.setUser(result.data)
            // status为0表示登录成功
            message.success('登录成功！')
            // 登录成功后跳转页面,跳转到"/"主页，使用路由组件的history功能函数中的replace跳转
            this.props.history.replace('/')
        }else{
            // status为1表示用户名或密码错误
            message.error(result.msg)
        }
    }
    render() {
        // 获取用户登录信息
        const user = infoUtils.user
        // 判断一下user中是否有值
        if(user && user._id){
            // user中有值，表示已经登录了，直接转跳到主页面
            return <Redirect to='/' />
        }
        return (
            <div className='login'>
                <header className='login-header'>
                    {/* 图片需要引入才可以使用，不能使用相对路径 */}
                    <img src={logo} alt="logo" />
                    <h1>React:谷粒后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    {/* Form组件中的onFinish事件只有在有提交按钮的时候才能生效，其会收集Form组件中所有的Input类型的数据 */}
                    <Form onFinish={this.handlefrom} className='login-form'>
                        {/* 使用Form.Item包裹每一项Input标签，在From.Item中的rules中写入验证规则 */}
                        <Form.Item name='username' className='login-form-item' rules={[
                            {required:true,message:'用户名必须输入'},
                            {max:12,message:'用户名最多12位'},
                            {min:4,message:'用户名最少4位'},
                            {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名只能是大写字母、小写字母、数字和下划线组成'}
                        ]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        {/* Form.Item中必须指定name属性，其是收集数据必备的key */}
                        <Form.Item name='password' className='login-form-item' rules={[
                            {required:true,message:'密码必须输入'},
                            {max:16,message:"密码最多16位"},
                            {min:5,message:'密码最少5位'},
                            {pattern:/^[a-zA-Z0-9_]+$/,message:'密码只能是大写字母、小写字母、数字和下划线组成'},
                        ]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="密码" type='password' />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
