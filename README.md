# 一个基于MongoDB的NodeJs系统配置操作库。

NodeCfgLib是一个基于MongoDB的Node.js系统配置库。

可以方便地设置存储系统相关配置，以配置名-配置（JSON）的形式存储。



## Import

安装及配置MongDB数据库。

将src下面的文件放入你的工程，将package.json中依赖的选项合并到你的工程。

```javascript
import db from './src/mongodbLib'
```
注：本库使用ES6语法以及ES7中的async特性，请使用babel。



## API

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
let func = function(config){console.log('cfg1', config)}
db.attach('test', func);                             
```

detach			注销配置回调函数

```javascript
db.detach('test', func);
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