import db from './src/mongodbLib'

db.test();

db.attach('test6', function(config){console.log('cfg', config)})

db.setConfig('test6',{a:33,b:2}, function(){})

//db.getConfig('test6', function(d){console.log(d);})

db.detach('test6');