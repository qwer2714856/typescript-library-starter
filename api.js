const Express = require("express");
const Router = Express.Router();


Router.use((req,res,next)=>{
    console.log('in child router');
    next();
});

Router.get('/', (req, res) => {
    res.json({
        a:1
    })
});

module.exports = Router;