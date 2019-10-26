# vueshop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#public 放一些静态资源
index.html

src:
assets 资源文件
components 公共组件
views 视图模块
App.vue 应用程序入口
main.js 程序入口
router.js 路由


组件 vue

# 安装element ui组件
```
npm i element-ui -S
```
2.数据校验
1.：rules="rules" 家在form
2.在data中定义规则:
rules:{
    username:[{required:true,message:"请输入用户名",trigger:"blur"}]
}
3.le-form-item
添加prop
4.数据中添
//数据校验
this.$refs.form.validate(valid=>{
    if(valid){}
}
