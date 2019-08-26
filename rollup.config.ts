import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

const pkg = require('./package.json')
 
const libraryName = 'axios' // 库的名字

export default {
  input: `src/index.ts`, // 库的入口
  output: [ // 库的输出
    // file 打包的文件、name 打包的文件名  format 打包的格式 可以生成umd amd等等 es是esmodule格式的文件
    { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true }, 
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  // 可以声明一些外部依赖。一些外部依赖不用打到我们包里、加入包引动loadash我们就要吧lodash放到这个包里
  external: [],
  watch: { // 可以监听文件变化
    include: 'src/**',
  },
  plugins: [ // 打包编译过程需要的一些依赖插件
    // Allow json resolution 
    json(),
    // Compile TypeScript files 编译typescript  useTsconfigDeclarationDir true 表示使用tsconfig配置文件中的"declarationDir": "dist/types", 指定的目录
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
}
