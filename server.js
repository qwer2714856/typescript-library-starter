const Express = require("express");

const webpack = require("webpack");

const wpkDev = require("webpack-dev-middleware");

const wpkHotMid = require("webpack-hot-middleware");

const bodyParser = require("body-parser");

const App = Express();

const RouterTree = require("./api");

// 加载webpack配置文件
const webpackConfig = require("./wpk.conf");

const compiler = webpack(webpackConfig);

// 加载webpack dev middle
App.use(wpkDev(compiler, {
    publicPath: '/build/',
    stats:{
        colors: true,
        chunks: false
    }
}))

// 启动热更新
App.use(wpkHotMid(compiler));

// 解析body 为json
App.use(bodyParser.json());

// 静态文件
App.use(Express.static(__dirname));

// API 路由
App.use('/api', RouterTree);

// extended - 当设置为false时，会使用querystring库解析URL编码的数据；当设置为true时，会使用qs库解析URL编码的数据。后没有指定编码时，使用此编码。默认为true
App.use(bodyParser.urlencoded({extended: true}));

const PORT = process.argv[2] || 8010;

// 监控
App.listen(PORT, "0.0.0.0", ()=>{
    console.log(`node server started on ${PORT} please use localhost:${PORT}`);
})