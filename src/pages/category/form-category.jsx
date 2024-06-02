import React, { Component } from 'react'
// 引入antd
import { Form,Input,Select } from "antd";

export default class FormCategory extends Component {
  formRef = React.createRef()
  componentDidMount(){
    const {setForm} = this.props
    setForm(this.formRef.current)
  }
  render() {
    // 获取父组件传递过来的一级分类列表
    const {categorys,parentId} = this.props
    // 新建一个数组，其中添加一对默认数据
    const selectArr = [{value:'0',label:'商品一级分类'}]
    // 循环遍历一级分类列表，将其中的数据进行处理
    categorys.forEach(item => {
      if(item.parentId === '0'){
        // 然后将处理后的数据放到新建的数组中
        selectArr.push({value:item._id,label:item.name})
      }
    });
    return (
      <div>
        <Form ref={this.formRef} initialValues={{remember: true,}}>
            <Form.Item initialValue={parentId} name='categoryId' label='一级分类'>
                <Select options={selectArr}></Select>
            </Form.Item>
            <Form.Item label="分类名称" name='categoryname' rules={[
                {required:true,message:'分类名称不能为空'},
            ]}>
                <Input placeholder='请输入分类名称'></Input>
            </Form.Item>
        </Form>
      </div>
    )
  }
}
