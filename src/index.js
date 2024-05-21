/*
引入react，和component
* */
import React from "react";
//引入reactDom
import ReactDOM from 'react-dom/client'
//引入app组件
import App from "./App";


//渲染APP页面
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <App/>
)