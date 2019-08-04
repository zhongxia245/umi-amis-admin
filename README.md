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

## TODO

- [ ] 添加应用
- [ ] 根据应用数据生成导航菜单
- [ ] 用户管理
