## wechat-mini-template
微信小程序模版

### 目录结构
```
_template
  --component       // 组件模版
  --page            // 页面模版 
common
  --common.wxss     // 自定义的基础样式
  --flex.wxss       // flex布局常用样式
  --io-context.js   // 封装的请求
components          // 小程序自定义组件目录
  --add-todo-input  // 这里我们定义了一个叫add-todo-input的组件
  --mod             // 这里我们定义了一个叫mod的组件
config
  --config.js       // 定义好的一些全局变量
images              // 存放图片资源
libs
  --runtime.js      // 因为微信小程序不支持 async/await 引入该js
pages               // 小程序里面包含的所有的页面都放在pages下面，一个页面一个文件夹
  --mod-demo        // 小程序页面
  --todo-list       // 小程序页面
utils
  --util.js         // 一些工具函数
app.js              // 这里配置了小程序的一些全局业务逻辑，比如全局方法，全局变量
app.wxss            // 全局样式配置，这里的样式在每一个页面都可以生效
app.json            // 配置小程序页面一些基础配置信息，比如页面路径
```

### _template
> component & page 为对应的组件和页面模版，可根据自己喜好自定义修改

```
component
  --_template.js
  --_template.json
  --_template.wxml
  --_template.wxss
page
  --_template.js
  --_template.json
  --_template.wxml
  --_template.wxss
  --io.js
```

### common

#### common.wxss 
> font-size/padding/margin/omit

#### flex.wxss 
> flex布局常用的class名

#### io-context
> 封装的wx.request 支持 async/await

### components

> 自定义组件集合，统一在app.json下注册

### config

config.js -- 一些配置变量的集合

> 通过 mode 和 prefix 配置不同环境

### images
> 图片资源

### libs

> runtime.js -- 因微信小程序不支持 async/await，所以引入该库，直接 在需要用到的js 直接引入 require。本项目在各页面的js 内 require。

### pages

> 各页面集合
> 每个page目录下新增 io.js 管理页面请求。
> 在[页面名].js 头部添加使用
```
const app = getApp()
const regeneratorRuntime = require(`${app.RUNTIME}`)
import io from 'io.js'
```

### utils

> util.js -- 工具函数集合

### app.js

> 小程序全局变量和函数集合，这里把config.js 的值 全部引入。在各page的js内通过以下方式调用 
```
const app = getApp()
app.X 
```

### app.json

> 小程序的配置文件

### app.wxss 

> 小程序的全局样式。引入common.wxss 和 flex.wxss
