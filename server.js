const Express = require("express");
const App = Express();
const Wserver = require("webpack-dev-middleware");
const conf = require("./webpack.config");
const Wpk = require("webpack");
const BodyParser = require("body-parser");
const WsHotMiddler = require("webpack-hot-middleware");
const Cookie = require("cookie-parser");

// 获取编译后的文件
let compiler = Wpk(conf);
App.use(Wserver(compiler, {
    publicPath: '/serverdist/', // 和webpack中的output publicPath定义一定相同
    stats: {
        colors: true, // 控制台输出是否彩色
        chunks: false // false输出是缩减的提示
    },
})
)

// 热更新
App.use(WsHotMiddler(compiler));

// 静态
App.use(Express.static(__dirname));

App.use(BodyParser.json());

App.use(BodyParser.urlencoded({ extended: true }));

// cookie parser
App.use(Cookie());

// 路由
const router = Express.Router();

// 路由条目
// demo 1
router.get('/demo1', (req, res) => {
    // 设置是否运行客户端设置 withCredentials
    // 即在不同域名下发出的请求也可以携带 cookie
    res.header("Access-Control-Allow-Credentials",true)
    // 第二个参数表示允许跨域的域名，* 代表所有域名  
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS') // 允许的 http 请求的方法
    // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
   console.log(req.cookies);
    res.json(req.cookies)
});

router.get('/params', (req,res) => {
    res.json(req.query)
});

router.post('/data', (req,res) => {
    
    setTimeout(()=>{
    res.status(200);
    res.json(req.body);
},1000)
})

App.use(router);

const port = process.env.PORT || 8080;
module.exports = App.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
});