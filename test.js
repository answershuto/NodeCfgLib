import db from './src/mongodbLib'

db.setConfig('test',{a:1,b:2})
db.getConfig('test');