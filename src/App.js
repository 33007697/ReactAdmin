//引入react，component
import React,{Component} from "react";
//使用antdUI组件库
import { Calendar, theme } from 'antd';
const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};
const { token } = theme.useToken();
const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
};
//页面
export default class App extends Component{
    render() {
        return (
            <div>
                <div>App</div>
                <div style={wrapperStyle}>
                    <Calendar fullscreen={false} onPanelChange={onPanelChange}/>
                </div>
            </div>
        )
    }
}