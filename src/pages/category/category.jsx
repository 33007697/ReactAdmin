import React, { Component } from 'react'
// 引入卡片组件
import { Card, Button, Modal, message } from 'antd'
import { PlusCircleOutlined, ArrowRightOutlined } from '@ant-design/icons'
// 引入表格组件
import { Table } from "antd";
// 引入接口文件
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api'

// 引入自定义组件
import LinkButton from '../../components/linkbutton'
import FormCategory from './form-category'
import FormUpdate from './form-update'



export default class Category extends Component {
  state = {
    categorys: [],  //商品一级分类列表
    subCategorys: [], //商品二级分类列表
    parentId: '0', //商品分类ID
    parentname: '',  //商品分类名称
    showStatus: 0,    //添加或修改modal是否需要显示
    loading: false,   //是否在加载中
    selectObj: {}    //当前选中的对象
  }

  componentDidMount() {
    // 请求分类列表数据
    this.getCategorys()
    // 分类列表数据表头
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: '_id',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={() => this.showUpdateCategory(category)}>修改分类</LinkButton>
            {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategory(category)}>查看子分类</LinkButton> : null}
          </span>
        )
      },
    ]
  }
  // 发送请求获取分类列表数据
  getCategorys = async (Id) => {
    // 请求前显示加载中
    this.setState({ loading: true })
    // 获取parentId的值
    const parentId = Id || this.state.parentId
    // 发送请求，获取分类列表，这个分类列表有可能是一级分类列表，也有可能是二级分类列表
    const result = await reqCategorys(parentId)
    // 请求完毕之后关闭加载中
    this.setState({ loading: false })
    // 判断一下是否成功请求到数据result
    if (result.status === 0) {
      // 判断一下parentId的值为一级分类还是二级分类
      if (parentId === '0') {
        // parentId为0，表示为一级分类列表，更新一级分类列表状态
        this.setState({
          categorys: result.data
        })
      } else {
        // parentId不为0，表示为二级分类列表，更新二级分类列表状态
        this.setState({
          subCategorys: result.data
        })
      }
    } else {
      // 没有请求成功，则提示错误信息
      message.error('请求分类列表失败！')
    }
  }
  showSubCategory = (category) => {
    // 修改parentId的值，和parentname的值为传递过来的参数category中的值
    this.setState({
      parentId: category._id,
      parentname: category.name
    }, () => {
      // 该回调函数会在this.setState()执行完毕后值，因为setState是异步执行的
      // 修改完毕后请求分类列表
      this.getCategorys()
    })

  }
  toCategorys = () => {
    // 清除二级分类列表中的数据
    this.setState({
      parentId: "0",
      parentname: '',
      subCategorys: []
    })
  }
  // 点击取消时，隐藏对话框
  handleCancel = () => {
    
    this.setState({
      showStatus: 0
    })
  }
  showAddCategory = () => {
    // 修改showStatus的值为1,显示添加分类对话框、
    this.setState({
      showStatus: 1
    })
  }
  // 添加分类
  addCategory = () => {
    // 使用form
    this.form.validateFields().then(async values=>{
      // 隐藏对话框
      this.setState({
        showStatus:0
      })
      const {parentId} = this.state
      // 获取输入的数据
      const {categoryId,categoryname} = values
      // 清除输入的数据
      this.form.resetFields()
      // 发送请求，添加数据
      const result = await reqAddCategory(categoryId,categoryname)
      if(result.status === 0){
        // 判断一下当前id是否等于0，等于0就是一级目录，一级目录只渲染，不改变parentId的值
        if(categoryId === '0'){
          this.getCategorys('0')
          // 判断一下当前id是否等于parentId
        }else if(parentId === categoryId){
          
          this.getCategorys()
        }
      }
    })
  }
  showUpdateCategory = (category) => {
    // 修改showStatus的值2，显示修改分类对话框
    this.setState({
      showStatus: 2,
      selectObj: category
    })
  }
  // 修改分类信息
  updateCategory = () => {
    this.form.validateFields().then(async (values) => {
      // 关闭对话框
      this.setState({
        showStatus: 0
      })
      // 获取parentId
      const { selectObj } = this.state
      // 获取输入的值
      const { categoryname } = values
      // 清除所有输入数据
      this.form.resetFields()
      // 发送请求
      const result = await reqUpdateCategory({ categoryId: selectObj._id, categoryName: categoryname })

      // 判断一下result是否成功
      if (result.status === 0) {
        // 成功则重新获取一下分类列表
        this.getCategorys()
      }
    }).catch(err=>{
      message.error('修改分类失败')
    })

  }
  render() {
    const { categorys, showStatus, parentId, subCategorys, parentname, loading } = this.state
    const title = parentId === '0' ? '商品一级分类列表' : (
      <span>
        <LinkButton style={{ fontSize: 16 }} onClick={this.toCategorys}>商品一级分类列表</LinkButton>
        <span><ArrowRightOutlined /> {parentname}</span>
      </span>
    )
    const extra = (<Button type='primary' icon={<PlusCircleOutlined />} onClick={this.showAddCategory}>添加</Button>)
    return (
      <div>
        <Card
          title={title}
          extra={extra}
          style={{
            width: "100%",
          }}
        >
          <Table loading={loading} dataSource={parentId === "0" ? categorys : subCategorys} columns={this.columns} bordered rowKey='_id' pagination={{ position: ['bottomRight'], showQuickJumper: true }} />;
          <Modal centered title="添加分类" open={showStatus === 1} onOk={this.addCategory} onCancel={this.handleCancel}>
            <FormCategory categorys={categorys} setForm={form => this.form = form} parentId={parentId}/>
          </Modal>
          <Modal centered title="修改分类" open={showStatus === 2} onOk={this.updateCategory} onCancel={this.handleCancel}>
            <FormUpdate selectObj={this.state.selectObj} setForm={form => this.form = form} />
          </Modal>
        </Card>
      </div>
    )
  }
}
