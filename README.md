# 可视化后台

基于 开源的框架 AMIS 构建的可视化后台。

## 技术栈

1. 技术栈：`umi` + `react` + `amis` + `font-awesome` + `typescript`
2. 系统环境：MacOs
3. IDE：VsCode

[AMIS](https://github.com/baidu/amis)
[font-awesome](http://www.fontawesome.com.cn/faicons/)

## 开发

```bash
npm i
npm run dev 

# 访问 http://localhost:8000

# 启动后端接口服务
git clone https://github.com/zhongxia245/admin-server.git

cd admin-server

npm i 

npm run dev

# umi 会把前端的接口代理到 7001 服务
# 访问 http://localhost:7001
```

## 文档

1. [常见问题](./doc/faq.md)

## 效果

目前可以通过可视化后台配置出大概这样的功能（增删改查，基本表单组件都支持（富文本，json 编辑器，报图还不支持））

![not](https://user-images.githubusercontent.com/7597581/62820325-57426100-bb95-11e9-8ff1-4b3eb5cfaf57.png)

