// ES6 config lib

import sysCfg from './cfg'              

let mongoose = require('mongoose');
let db = mongoose.connect(sysCfg.mongodb);

/*配置表*/
let Schema = new mongoose.Schema({
	name: String,
	config: Object
})

let cfgModel = mongoose.model('config', Schema);


let DBoperation = (function(){
	return {
		/** test 

		* @param 

		* @return 

		*/
		test(){
			console.log('mongoDB operation lib test');
		}

		/** Submit configuration 

		* @param 

		* @return 

		*/
		setConfig(name = 'defaultConfig', config = {}){
			let modelObj = new cfgModel({
				name,
				config
			});

			modelObj,save(function(err){
				
			})
		}
	}
})();

export default DBoperation;