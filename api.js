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

Router.post('/post', (req,res)=>{
    res.json(req.body)
});

Router.post('/chunk', (req, res)=>{
    let msg = Buffer.alloc(2);
    req.on('data', (chunk)=>{
        if(chunk){
            msg.push(chunk);
        }
    })
    req.on('end', ()=>{
        console.log(msg);

        res.json(msg.toJSON());
    })
})

module.exports = Router;