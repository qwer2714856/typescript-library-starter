const Express = require("express");
const App = Express();
const Wserver = require("webpack-dev-middleware");
const conf = require("./webpack.config");
const Wpk = require("webpack");
const BodyParser = require("body-parser");
const WsHotMiddler = require("webpack-hot-middleware");

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

// 路由
const router = Express.Router();

// 路由条目
// demo 1
router.get('/demo1', (req, res) => {
    res.json({
        msg: `hello world`
    })
});

router.get('/params', (req,res) => {
    res.json(req.query)
});

router.post('/data', (req,res) => {
    res.status(200);
    res.json(req.body);
})

App.use(router);

const port = process.env.PORT || 8080;
module.exports = App.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
});