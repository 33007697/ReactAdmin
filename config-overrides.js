const { override, fixBabelImports,addLessLoader  } = require('customize-cra');

// 设置antd组件按需加载
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
);