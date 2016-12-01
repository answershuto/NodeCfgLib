# 一个基于MongoDB的NodeJs系统配置操作库。



## 使用

配置MongDB数据库。

```javascript
import db from './src/mongodbLib'
```
注：本库使用ES6语法以及async，请使用babel。



## 接口

setConfig		保存（修改）配置	

getConfig		获取当前配置

setDefault		设置默认配置

getDefault		获取默认配置

attach			注册配置回调函数（保存成功后回调）

detach			注销配置回调函数

attachVerity		注册配置检测函数（返回false则不继续保存该配置）

detachVerity		主调配置检测函数

restore			将默认配置设置给当前配置