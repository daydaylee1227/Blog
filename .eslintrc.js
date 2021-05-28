module.exports = {
    parser: 'babel-eslint',
    plugins: [ 'react' ],
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    globals: {
        document: true,
        localStorage: true,
        window: true,
        process: true,
        console: true,
        navigator: true,
        fetch: true,
        URL: true
    },
    rules: {
        'no-console': 'off',
        'no-alert': 0, //禁止使用alert confirm prompt
        'no-var': 0, //禁用var，用let和const代替
        'no-catch-shadow': 2, //禁止catch子句参数与外部作用域变量同名
        'default-case': 2, //switch语句最后必须有default
        'dot-notation': [ 0, { allowKeywords: true } ], //避免不必要的方括号
        'no-constant-condition': 2, //禁止在条件中使用常量表达式 if(true) if(1)
        'no-dupe-args': 2, //函数参数不能重复
        'no-inline-comments': 0, //禁止行内备注
        'no-unreachable': 2, //不能有无法执行的代码
        'no-unused-vars': [ 2, { vars: 'all', args: 'after-used' } ], //不能有声明后未被使用的变量或参数
        'no-unused-expressions': 2, //禁止无用的表达式 | 短路求值和三目运算都允许 0 | 2 都不允许
        // 'no-unused-expressions': [
        //   2,
        //   { allowShortCircuit: false, allowTernary: true },
        // ], // 允许三目，不允许短路：
        'no-mixed-spaces-and-tabs': [ 2, false ], //禁止混用tab和空格
        'linebreak-style': [ 0, 'windows' ], //换行风格
        'no-multiple-empty-lines': [ 1, { max: 2 } ], //空行最多不能超过2行
        'no-extra-semi': 2, //禁止多余的冒号
        'no-debugger': 2, //禁止使用debugger
        // 'space-before-function-paren': [2, { anonymous: 'never', named: 'never' }], // 函数名后面加空格
        // 'space-before-function-paren': ['error', 'always'],
        // or
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'always',
                asyncArrow: 'always'
            }
        ],
        'eol-last': 0, //文件以单一的换行符结束
        // eqeqeq: true, //必须使用全等 如果是true，则要求在所有的比较时使用===和!==
        // eqnull: true, // 如果是true，则允许使用== null
        'lines-around-comment': 0, //行前/行后备注
        'operator-linebreak': [ 2, 'after' ], //换行时运算符在行尾还是行首
        'prefer-const': 0, //首选const
        quotes: [ 1, 'single' ], //引号类型 `` "" ''
        'id-match': 0, //命名检测
        'array-bracket-spacing': [ 2, 'always' ], // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        quotes: [ 2, 'single' ], // 全部单引号
        // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
        // always-multiline：多行模式必须带逗号，单行模式不能带逗号
        'comma-dangle': [ 2, 'never' ],
        'computed-property-spacing': [ 2, 'never' ], // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
        semi: [ 2, 'never' ], //语句强制分号结尾  不要分号
        'eol-last': 2, // 文件末尾强制换行
        'semi-spacing': [ 0, { before: false, after: true } ], //分号前后空格
        'arrow-body-style': 0, // 不禁止箭头函数直接return对象
        strict: 2, //使用严格模式
        'use-isnan': 2, //禁止比较时使用NaN，只能用isNaN()
        'valid-typeof': 2, //必须使用合法的typeof的值
        'space-in-parens': [ 0, 'always' ],
        'template-curly-spacing': [ 2, 'always' ],
        'array-bracket-spacing': [ 2, 'always' ],
        'object-curly-spacing': [ 2, 'always' ],
        'computed-property-spacing': [ 2, 'always' ],
        'no-multiple-empty-lines': [ 2, { max: 1, maxEOF: 0, maxBOF: 0 } ],
        quotes: [ 1, 'single', 'avoid-escape' ],
        'no-use-before-define': [ 2, { functions: false } ],
        semi: [ 0, 'never' ],
        'prefer-const': 1,
        'react/prefer-es6-class': 0,
        'react/jsx-filename-extension': 0,
        'react/jsx-curly-spacing': [ 2, 'always' ],
        'react/jsx-indent': [ 2, 2 ],
        'react/prop-types': [ 1 ],
        'react/no-array-index-key': [ 1 ],
        'class-methods-use-this': 'off',
        'no-undef': [ 1 ],
        'no-case-declarations': [ 1 ],
        'no-return-assign': [ 1 ],
        'no-param-reassign': [ 1 ],
        'no-shadow': [ 1 ],
        camelcase: [ 1 ],
        'no-unused-vars': 'off',
        'no-underscore-dangle': [ 0, 'always' ]
    }
}
