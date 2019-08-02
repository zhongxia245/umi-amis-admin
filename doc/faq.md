# 常见问题

## 1. 图标不出现，并且页面样式错乱？

需要引入 font-awesome 和 bootstrap 的 css 文件，否则图标和一些组件样式存在错乱。

```html
<link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
<link href="https://cdn.bootcss.com/twitter-bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
```
> 经常尝试，这里必须使用特定版本的css 库，否则一些图标还是出不来。
