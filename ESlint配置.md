## ESlint加入项目
* eslint是前端项目的代码规范，高效的使用eslint可以让自己的代码更具有可读性，方便维护，而且最主要的是好看
* 下面就是eslint加入项目的具体步骤
* 第一步先安装eslint依赖包
> 这里使用的是-dev 因为上线之后就不需要用到了，只在开发环境下使用
```
npm install eslint --save-dev
```
* 然后在package.json文件中修改script属性
> 注意 其中lint命令中的.js.jsx 是表示需要自动修复的文件后缀， src表示需要自动修复的文件夹
> --fix 则是自动修复命令，当lint配置好之后可以使用npm run lint进行自动修复
```
"scripts": {
    "test": "react-scripts test --env=jsdom",
    "lint": "eslint --ext .js,.jsx src --fix",
    "lint:create": "eslint --init"
}
```
* 然后使用eslint初始化命令 eslint --init
* 这个脚本命令会让你自动生成一个.eslintrc.js文件，所有的代码规范都会写在这个文件里
```
npm run lint:create
```
* 启动了命令之后会有很多选项供你选择，很多都是默认即可
> 这个要看着来，因为版本不一样 选择也不一样
```
? How would you like to configure ESLint? Answer questions about your style // 以问答的形式创建配置文件
? Are you using ECMAScript 6 features? Yes      // 是否校验 Es6 语法
? Are you using ES6 modules? Yes                // 是否校验 Es6 模块语法
? Where will your code run? Browser             // 代码运行环境，Browser 指浏览器
? Do you use CommonJS? Yes                      // 是否校验 CommonJs 语法
? Do you use JSX? Yes                           // 是否校验 JSX 语法
? Do you use React? Yes                         // 是否校验 React 语法
? What style of indentation do you use? Tabs    // 首行空白选择 Tab 键还是 Space
? What quotes do you use for strings? Double    // 字符串使用单引号 'string' 还是双引号 "string"
? What line endings do you use? Windows         // 操作系统
? Do you require semicolons? Yes                // 每行代码结尾是否校验加分号 ;
? What format do you want your config file to be in? JavaScript     // 以 .js 格式生成配置文件
Installing eslint-plugin-react@latest   // 因为要校验 Reac 语法，所以这里需要下载一个 React 语法规则的包
```
* 创建好了之后会发现根目录多了一个.eslintrc.js文件
* 这个时候开始补充这个文件的一些规范即可
```
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: false,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: [
    "react"
  ],
  root: true,
  rules: {
    'accessor-pairs': [
      'error',
      {
        getWithoutSet: false,
        setWithoutGet: true,
      },
    ],
    'array-bracket-newline': 'off',
    'array-bracket-spacing': [
      'error',
      'never',
    ],
    'array-callback-return': 'error',
    'array-element-newline': 'off',
    'arrow-body-style': 'warn',
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
    'arrow-spacing': [
      'error',
      {
        after: true,
        before: true,
      },
    ],
    'block-scoped-var': 'error',
    'block-spacing': [
      'error',
      'always',
    ],
    'brace-style': ['error', '1tbs'],
    'callback-return': 'off',
    camelcase: 'off',
    'capitalized-comments': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    'comma-spacing': [
      'error',
      {
        after: true,
        before: false,
      },
    ],
    'comma-style': [
      'error',
      'last',
    ],
    'comment-ratio': 'off',
    complexity: [
      'error',
      {
        max: 20,
      },
    ],
    'computed-property-spacing': [
      'error',
      'never',
    ],
    'consistent-return': 'off',
    'consistent-this': 'off',
    'constructor-super': 'error',
    curly: [
      'error',
      'multi-line',
      'consistent',
    ],
    'default-case': 'off',
    'dot-location': [
      'error',
      'property',
    ],
    'dot-notation': 'off',
    'eol-last': ['error', 'always'],
    eqeqeq: "off",
    'for-direction': 'error',
    'func-call-spacing': [
      'error',
      'never',
    ],
    'func-id-match': 'off',
    'func-name-matching': [
      'error',
      'always',
      {
        includeCommonJSModuleExports: false,
      },
    ],
    'func-names': 'off',
    'func-style': 'off',
    'generator-star-spacing': [
      'error',
      {
        after: true,
        before: false,
      },
    ],
    'getter-return': [
      'error',
      {
        allowImplicit: false,
      },
    ],
    'global-require': 'off',
    'guard-for-in': 'off',
    'handle-callback-err': 'off',
    'id-blacklist': 'off',
    'id-length': 'off',
    'id-match': 'off',
    'init-declarations': 'off',
    'jsx-quotes': [
      'error',
      'prefer-double',
    ],
    'key-spacing': [
      'error',
      {
        afterColon: true,
        beforeColon: false,
        mode: 'strict',
      },
    ],
    'keyword-spacing': [
      'error',
      {
        after: true,
        before: true,
      },
    ],
    license: 'off',
    'line-comment-position': 'off',
    'linebreak-style': 'off',
    'lines-around-comment': 'off',
    'max-depth': [
      'error',
      5,
    ],
    'max-len': ['error', { code: 200 }],
    'max-lines': 'off',
    'max-nested-callbacks': [
      'error',
      3,
    ],
    'max-params': [
      'error',
      7,
    ],
    'max-statements': 'off',
    'max-statements-per-line': 'off',
    'multiline-ternary': 'off',
    'new-cap': [
      'error',
      {
        capIsNew: false,
        newIsCap: true,
        properties: true,
      },
    ],
    'new-parens': 'error',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'no-alert': 'off',
    'no-array-constructor': 'error',
    'no-await-in-loop': 'off',
    'no-bitwise': 'off',
    'no-buffer-constructor': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-catch-shadow': 'off',
    'no-class-assign': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': [
      'error',
      'except-parens',
    ],
    'no-confusing-arrow': 'error',
    'no-console': 'off',
    'no-const-assign': 'error',
    'no-constant-condition': [
      'error',
      {
        checkLoops: false,
      },
    ],
    'no-continue': 'off',
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-delete-var': 'error',
    'no-div-regex': 'off',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'off',
    'no-else-return': ['error',
      {
        allowElseIf: false,
      },
    ],
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'no-empty-character-class': 'error',
    'no-empty-function': [
      'error',
      {
        allow: [
          'functions',
          'arrowFunctions',
        ],
      },
    ],
    'no-empty-pattern': 'error',
    'no-eq-null': 'off',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'off',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-label': 'error',
    'no-extra-parens': 'off',
    'no-extra-semi': 'off',
    'no-fallthrough': 'error',
    'no-floating-decimal': 'error',
    'no-func-assign': 'error',
    'no-global-assign': 'error',
    'no-implicit-coercion': 'off',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'semi':'off',
    'no-inline-comments': 'off',
    'no-inner-declarations': [
      'error',
      'both',
    ],
    'no-invalid-regexp': 'error',
    'no-invalid-this': 'off',
    'no-irregular-whitespace': [
      'error',
      {
        skipComments: false,
        skipRegExps: true,
        skipStrings: true,
        skipTemplates: true,
      },
    ],
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'off',
    'no-loop-func': 'error',
    'no-magic-numbers': 'off',
    'no-mixed-operators': 'off',
    'no-mixed-requires': 'off',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-assign': 'error',
    'no-multi-spaces': [
      'error',
      {
        exceptions: {
          BinaryExpression: false,
          ImportDeclaration: true,
          Property: true,
          VariableDeclarator: true,
        },
        ignoreEOLComments: true,
      },
    ],
    'no-multi-str': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 3,
        maxBOF: 1,
        maxEOF: 1,
      },
    ],
    'no-negated-condition': 'off',
    'no-nested-ternary': 'off',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-require': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'off',
    'no-path-concat': 'error',
    'no-plusplus': 'off',
    'no-process-env': 'off',
    'no-process-exit': 'off',
    'no-proto': 'error',
    'no-prototype-builtins': 'off',
    'no-redeclare': 'error',
    'no-regex-spaces': 'error',
    'no-restricted-globals': 'off',
    'no-restricted-imports': 'off',
    'no-restricted-modules': 'off',
    'no-restricted-properties': 'off',
    'no-restricted-syntax': "off",
    'no-return-assign': [
      'error',
      'always',
    ],
    'no-return-await': 'error',
    'no-script-url': 'off',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow': "off",
    'no-shadow-restricted-names': 'error',
    'no-sparse-arrays': 'error',
    'no-sync': 'off',
    'no-tabs': 'off',
    'no-template-curly-in-string': 'error',
    'no-ternary': 'off',
    'no-this-before-super': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef': 'off',
    'no-undef-init': 'error',
    'no-undefined': 'off',
    'no-underscore-dangle': 'warn',
    'no-unexpected-multiline': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': 'off',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTaggedTemplates: true,
        allowTernary: true,
      },
    ],
    'no-unused-labels': 'error',
    'no-unused-vars': "off",
    'no-use-before-define': [
      'error',
      {
        classes: false,
        functions: false,
        variables: false,
      },
    ],
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'off',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'off',
    'no-var': 'error',
    'no-void': 'error',
    'no-warning-comments': 'off',
    'no-whitespace-before-property': 'error',
    'no-with': 'error',
    'nonblock-statement-body-position': [
      'error',
      'beside',
      {
        overrides: {
          while: 'below',
        },
      },
    ],
    'object-curly-newline': [
      'error',
      {
        consistent: true,
        multiline: true,
      },
    ],
    'object-curly-spacing': [
      'error',
      'always',
      {
        arraysInObjects: true,
        objectsInObjects: false,
      },
    ],
    'object-property-newline': 'off',
    'object-shorthand': 'warn',
    'one-var': [
      'error',
      'never',
    ],
    'one-var-declaration-per-line': [
      'error',
      'always',
    ],
    'operator-assignment': 'off',
    'operator-linebreak': ['error', 'before'],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': 'off',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'warn',
    'prefer-numeric-literals': 'off',
    'prefer-promise-reject-errors': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'off',
    'prefer-template': 'error',
    'quote-props': ['error', 'as-needed'],
    quotes: 0,
    radix: 'off',
    'require-await': 'off',
    'require-jsdoc': 'off',
    'require-yield': 'error',
    'rest-spread-spacing': [
      'error',
      'never',
    ],
    semi: [
      'error',
      'always',
      {
        omitLastInOneLineBlock: true,
      },
    ],
    'semi-spacing': [
      'error',
      {
        after: true,
        before: false,
      },
    ],
    'semi-style': [
      'error',
      'last',
    ],
    'sort-imports': 'off',
    'sort-keys': 'off',
    'sort-vars': 'off',
    'space-before-blocks': [
      'error',
      'always',
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'ignore',
        asyncArrow: 'always',
        named: 'never',
      },
    ],
    'space-in-parens': [
      'error',
      'never',
    ],
    indent: [2, 2],
    'space-indent': 'off',
    'space-infix-ops': 'error',
    'space-unary-ops': [
      'error',
      {
        nonwords: false,
        words: true,
      },
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        block: {
          balanced: true,
          exceptions: [
            '*',
          ],
        },
      },
    ],
    strict: [
      'error',
      'never',
    ],
    'switch-colon-spacing': [
      'error',
      {
        after: true,
        before: false,
      },
    ],
    'symbol-description': 'error',
    'template-curly-spacing': [
      'error',
      'never',
    ],
    'template-tag-spacing': [
      'error',
      'never',
    ],
    'unicode-bom': [
      'error',
      'never',
    ],
    'use-isnan': 'error',
    'valid-jsdoc': 'off',
    'valid-typeof': 'error',
    'vars-on-top': 'off',
    'wrap-iife': [
      'error',
      'inside',
      {
        functionPrototypeMethods: true,
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'wrap-regex': 'off',
    'yield-star-spacing': [
      'error',
      'after',
    ],
    yoda: [
      'error',
      'never',
      {
        onlyEquality: true,
      },
    ],
  },
};
```
* 最后 你的项目每次编写完毕 都可以使用npm run lint进行编译然后再上传到git上面
* 这时候还没完，因为如果这样配置只会识别eslint规则，在开发的过程中如果涉及到eslint规则的限制会很难受
* 所以这个时候还需要在package.json中配置以下代码，关闭提示
```
"eslintConfig": {
    "extends": "react-app",
    "rules": {
      "no-undef": "off",
      "no-restricted-globals": "off",
      "no-unused-vars": "off"
    }
}
```
* 最后重启项目 npm start