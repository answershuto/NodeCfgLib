import db from './src/mongodbLib'

db.test();

let func = function(config){console.log('cfg1', config)}
let func2 = function(config){console.log('cfg2', config)}
db.attach('test6', func)
db.attach('test6', func2)
db.attach('test6', func)

console.log(db.detach('test6', func))

//db.attachVerity('test6', function(d){return true;})

db.setConfig('test6',{a:111,b:222}, function(){db.getConfig('test6', function(d){console.log('config',d);})})

//db.getConfig('test6', function(d){console.log(d);})

//db.detach('test6');

//db.setDefault('test6',{a:333,b:555}, function(){db.getDefault('test6', function(d){console.log('default',d);})})

//db.restore('test6')

//db.getConfig('test6', function(d){console.log('config',d);})