import React, { Component } from 'react'
// 引入prop-types
import PropType from 'prop-types'
// 引入antd
import { Form,Input } from "antd";


export default class FormUpdate extends Component {
  static porpType = {
    setForm:PropType.func.isRequired,
    selectObj:PropType.object.isRequired
  }
  formRef = React.createRef()
  componentDidMount(){
    const {setForm} = this.props
    setForm(this.formRef.current)
  }
  render() {
    // 获取父组件传递过来的选中对象
    const {selectObj} = this.props
    console.log(selectObj)
    return (
      <div>
        <Form ref={this.formRef} initialValues={{remember: true}} >
            <Form.Item name='categoryname' initialValue={selectObj.name} label='分类名称' rules={[
                {required:true,message:'分类名称不能为空'},
            ]}>
                <Input placeholder='请输入分类名称'></Input>
            </Form.Item>
        </Form>
      </div>
    )
  }
}
