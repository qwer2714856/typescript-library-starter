const fs = require("fs");
const path = require("path");
const webpack = require('webpack')

function getEntry(cpath = __dirname){
    return fs.readdirSync(cpath).reduce((entries, dirname)=>{
        const basePath = path.join(cpath, dirname);
        const currentFile = path.join(basePath, 'app.ts');
 
        // 如果目录和文件同时存在进行entry
        if(fs.statSync(basePath).isDirectory() && fs.existsSync(currentFile)){
            entries[dirname] = ['webpack-hot-middleware/client', currentFile]
        }

        return entries;
    }, {})
}


module.exports = {
    mode: 'development', 

    entry: getEntry(path.join(__dirname, 'ex')),
     
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        publicPath: '/build/',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader'
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
}