import React, { PureComponent } from 'react'
// 引入样式
import './header.css'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
// import logo from '../../assets/logo.png'
import { reqTianQi } from '../../api/index'
// 引入格式化时间戳文件
import formatDate from '../../utils/formatDate'
// 引入内存文件
import infoUtils from '../../utils/infoUtils'
import storeUtils from '../../utils/storeUtils'
import menuConfig from '../../config/menuConfig'
import store from 'store'
// 引入自定义linkbutton组件

import LinkButton from '../linkbutton'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';

// 提示框
const { confirm } = Modal;

class Header extends PureComponent {
  state = {
    currentTime: formatDate(Date.now()),
    tq: store.get('tq')? store.get('tq'):{}
  }
  // 退出登录
  logout = () => {
    confirm({
      title: '确认退出登录吗？',
      icon: <ExclamationCircleOutlined />,
      onOk:()=>{
        // 清除所有用户数据
        infoUtils.user = {}
        storeUtils.removeUser()
        // 跳转到登录页面
        this.props.history.replace('/login')
      }
    });
  }
  // 获取页面名称
  getPageName = ()=>{
    // 获取页面path
    let path = this.props.location.pathname
    // 定义一个变量接收title值
    let title
    // 循环遍历查找符合条件的值
    menuConfig.forEach(item=>{
      // 判断item.key的值是否等于path
      if(item.key === path){
        // 等于则将title提取出来
        title = item.title
        // 再判断其是否有children属性
      }else if (item.children){
        // 有则查找key等于path的值
        const citem = item.children.find(citem => citem.key === path)
        // 判断一下citem是否有值
        if(citem){
          // 有则将title提取出来
          title = citem.title
        }
      }
    })
    // 最后将title值返回
    return title
  }
  componentDidMount() {
    // 获取天气信息
    reqTianQi()
    // 页面挂载完毕时，开启时间定时器
    this.intId = setInterval(() => {
      this.setState({ currentTime: formatDate(Date.now()) })
    }, 1000);
  }
  componentWillUnmount() {
    // 页面卸载时，取消定时器
    clearInterval(this.intId)
  }
  render() {
    // 获取username
    let username = infoUtils.user.username
    let tqText = this.state.tq.now? this.state.tq.now.text : ''
    return (
      <div className='header-component'>
        <div className="header-top">
          <span>欢迎，{username}</span>
          <LinkButton onClick={this.logout}>
            退出
          </LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            {this.getPageName()}
          </div>
          <div className="header-bottom-right">
            <span>
              {
                this.state.currentTime
              }
            </span>
            <i className='qi-101'></i>
            <span>{tqText}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)