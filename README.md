# 一个基于MongoDB的NodeJs系统配置操作库。



## 使用

配置MongDB数据库。

```javascript
import db from './src/mongodbLib'
```
注：本库使用ES6语法以及async，请使用babel。



## 接口

setConfig		保存（修改）配置	

```javascript
db.setConfig('test',{a:111,b:222}, function(){})})
```

getConfig		获取当前配置

```javascript
db.getConfig('test', function(d){
	console.log('getConfig',d);
})
```

setDefault		设置默认配置

```javascript
db.setDefault('test',{a:333,b:555}, function(){})
```

getDefault		获取默认配置

```javascript
db.getDefault('test', function(d){
	console.log('default',d);
}
```

attach			注册配置回调函数（保存成功后回调）

```javascript
db.attach('test', function(config){console.log('cfg', confiqg)})                                 
```

detach			注销配置回调函数

```javascript
db.detach('test');
```

attachVerity		注册配置钩子函数（在保存之前检测配置的数据的钩子函数，如果该函数返回false则不继续保存该配置）

```javascript
db.attachVerity('test', function(d){return true;})
```

detachVerity		注销配置钩子函数

```javascript
db.detachVerity('test', function(){})
```

restore			将默认配置设置给当前配置

```javascript
db.restore('test')
```