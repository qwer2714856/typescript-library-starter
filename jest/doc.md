# jest 配置
 "jest": {
    "transform": {
      ".(ts|tsx)": "ts-jest" // 把所有的ts 和 tsx 文件都转换成javascript 因为我们是用ts编写的代码node不认识ts,所以我们需要配置这个转化器。
    },
    "testEnvironment": "node", // 测试的宿主环境是node， 如果是jsdom表示是浏览器的一个宿主环境，我们可以使用浏览器的一些API。
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$", // 哪些文件要测试的一个正则表达式。 所有以__tests__目录扩展名包括xxx的进行测试。只要匹配就需要跑测试
    "moduleFileExtensions": [ // 模块文件扩展名，当我们引入某个模块不写扩展名默认就匹配这些，类似webpack.
      "ts",
      "tsx",
      "js"
    ],
    "coveragePathIgnorePatterns": [ // 哪些目录中的内容排除测试
      "/node_modules/",
      "/test/"
    ],
    "coverageThreshold": { // 测试覆盖率阈值设定，当我们测试覆盖率达不到阈值测试失败
      "global": { // 全局的代码
        "branches": 90, // 分支的代码 90% 这个分支是代码分支不是git的
        "functions": 95, // 方法覆盖率 95%
        "lines": 95, // 代码行数覆盖率 95%
        "statements": 95 // 声明覆盖率 95%
      }
    },
    "collectCoverageFrom": [ // 收集指定文件的测试覆盖率，即使你没有为这些文件设置这些文件的编写测试 收集就是在未来的表中显示，不写测试用例覆盖率就是0
      "src/*.{js,ts}" // 收集src目录下的js 和 ts的测试覆盖率。
    ], 
    // setupFilesAfterEnv 测试框架安装后立即执行的代码文件列表，每次跑代码之前会先运行指定代码
    "setupFilesAfterEnv" 这个key不存在用"setupFiles":[
        "<rootDir>/test/boot.ts" // <rootDir> 表示当前项目的根目录
    ]
}

// 编写测试的顺序
/**
* 1、先为一个库的辅助代码编写测试。
* 2、编写测试用例不要考虑它的实现从用法的角度出发。
* 3、测试驱动开发，先写测试用例在开发。
Test Suites: 1 passed, 1 total 多少测试模块
Tests:       1 passed, 1 total 通过多少测试用例
截图表格中
uncovered line xxx
里面的数字代码那额行测试没有覆盖。
breanch 代表业务分支  比如函数调用。
super 测试用例的坑 如果构造器里面 new (a?string):xx 如果只走了传值的部分没有走不传值的部分就会出现50%的覆盖率 如果父类是这种可传可不传的构造器那么super只能50%的覆盖率。也没啥影响

*/ 

## 请求模块单元测试
jasmine-ajax 它会根据规范根据请求定义出假的响应。 它依赖于jasmine-core 以及 @types/jasmine-ajax
