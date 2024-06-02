import React, { Component } from 'react'
// 引入路由器
import { Switch,Route,Redirect } from 'react-router-dom'

// 引入路由组件
import AddUpdateProduct from './add-product'
import HomeProduct from './home-product'
import Detail from './detail'

export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path='/product' component={HomeProduct} exact/>
        <Route path='/product/addupdate' component={AddUpdateProduct}/>
        <Route path='/product/detail' component={Detail} />
        <Redirect to='/product'/>
      </Switch>
    )
  }
}
