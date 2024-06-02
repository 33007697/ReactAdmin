import React, { Component } from 'react'
// 引入内存文件
import infoUtils from '../../utils/infoUtils'
// 引入路由组件
import { Redirect, Link,Switch,Route } from 'react-router-dom'
// 引入组件
import Header from '../../components/header/header';
// 引入图片
import logo from '../login/images/logo.png'
// 引入样式
import './admin.css'
// 引入antd
import { Layout } from 'antd';
// 引入路由组件
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Home from '../home/home';
// 引入antd组件
import { Menu } from 'antd';
// 引入menuConfig文件
import menuList from '../../config/menuConfig'
const { Footer, Sider, Content } = Layout;


export default class Admin extends Component {
  render() {
    // 获取内存中的用户信息
    const user = infoUtils.user
    // 判断一下user是否有值,如果没有值
    if (!user || !user._id) {
      // 没有值，则跳转到登录界面, 在render中，return后面就是需要渲染的组件
      return <Redirect to='/login' />
    }
    // 获取到当前访问的路由地址
    let path = this.props.location.pathname
    // 获取到当前的路由地址是否在子菜单中，如果在则展开所在菜单
    const newList = menuList.filter(item => item.children).filter(items =>{
      // 匹配条件是当前路由地址是否在当前item中的children子菜单中
      return items.children.find(i => path === i.key)
    })
    // 判断一下newList中是否有值
    let selectKey;
    if(newList.length){
      // 如果有值则获取到其中的key
      selectKey = newList[0].key?newList[0].key:''
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider width="20%" >
          <header>
            <Link to='/home'>
              <div className='sider-header'>
                <img src={logo} alt="logo" />
                <h1>谷粒后台</h1>
              </div>
            </Link>
          </header>
          {/*selectedKeys控制菜单当前选项是否选中，defaultOpenKeys控制菜单是否自动展开  */}
          <Menu
              selectedKeys={[path]}
              defaultOpenKeys={[selectKey]}
              mode="inline"
              theme="dark"
              items={menuList}
            />
        </Sider>
        <Layout>
          <Header />
          <Content style={{ margin:20,backgroundColor:'white' }}>
            {/* 路由出口，使用switch搭配Route */}
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#ccc' }}>请使用谷歌浏览器，会有更好的体验，兼容性更好</Footer>
        </Layout>
      </Layout>
    )
  }
}
