// ES6 config lib

import cfg from './cfg'              

let mongoose = require('mongoose');
let db = mongoose.connect(cfg.mongodb);
/*笔记表*/
let Schema = new mongoose.Schema({
	name: String,
	config: Object
})

let mgCfg = mongoose.model('config', Schema);


let DBoperation = (function(){
	return {
		test(){
			console.log('mongoDB operation lib test');
		}
	}
})();

export default DBoperation;