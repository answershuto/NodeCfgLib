import db from './src/mongodbLib'

db.test();
db.setConfig('test6',{a:33,b:2})
db.getConfig('test6', function(d){
	console.log(d)
})