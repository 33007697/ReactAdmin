import {AppstoreOutlined,
    BarsOutlined,
    ShoppingOutlined,
    FileTextOutlined,
    UserOutlined,
    AuditOutlined,
    RadarChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

// 将菜单项配置，单独提取出来，放到一个配置文件中

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    // 菜单中的每一项
    /*
        key:菜单的每一项的唯一标识
        icon：菜单每一项都icon图标
        label：菜单的名称，可以使用<标签></标签>组件，也可使用路由链接标签、
        children：当前菜单项的子项，其为一个数组，数组中的每一个子项都是一个对象
    */ 
  {
    key:'/home',
    title:'首页',
    icon:<AppstoreOutlined />,
    label:(
      // 路由入口，使用Link标签
      <Link to='/home'>首页</Link>
    )
  },
  {
    key:'/products',
    title:'商品',
    icon:<BarsOutlined />,
    label:'商品',
    // 菜单中的每一项都子项
    children:[
      {
        key:'/category',
        title:'商品分类',
        icon:<ShoppingOutlined />,
        label:(<Link to='/category'>商品分类</Link>)
      },
      {
        key:'/product',
        title:'商品管理',
        icon:<FileTextOutlined />,
        label:(<Link to='/product'>商品管理</Link>)
      }
    ]
  },
  {
    key:'/user',
    title:'用户管理',
    icon:<UserOutlined />,
    label:(<Link to="/user">用户管理</Link>)
  },
  {
    key:'/role',
    title:'角色管理',
    icon:<AuditOutlined />,
    label:(<Link to="/role">角色管理</Link>)
  },
  {
    key:"/charts",
    title:'统计图表',
    icon:<RadarChartOutlined />,
    label:"统计图表",
    children:[
        {
            key:'/charts/bar',
            title:'柱形图',
            icon:<BarChartOutlined />,
            label:(<Link to='/charts/bar'>柱形图</Link>)
        },
        {
            key:'/charts/line',
            title:'折线图',
            icon:<LineChartOutlined />,
            label:(<Link to='/charts/line'>折线图</Link>)
        },
        {
            key:'/charts/pie',
            title:'饼图',
            icon:<PieChartOutlined />,
            label:(<Link to='/charts/pie'>饼图</Link>)
        }
    ]
  }
]