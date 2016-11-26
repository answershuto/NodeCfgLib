// ES6 config lib

import sysCfg from './cfg'              

let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let db = mongoose.connect(sysCfg.mongodb);

/*配置表*/
let Schema = new mongoose.Schema({
	name: String,
	config: Object
})

let cfgModel = mongoose.model('myConfig', Schema);


let DBoperation = (function(){
	return {
		/** test 

		* @param 

		* @return 

		*/
		test(){
			console.log('mongoDB operation lib test');
		},

		/** Submit configuration 

		* @param name	config name

		* @param config		config

		* @return 

		*/
		setConfig(name = 'defaultConfig', config = {}){
			let modelObj = new cfgModel({
				name,
				config
			});

			modelObj.save(function(err){

			})
		},

		/** get configuration 

		* @param name	config name

		* @return config

		*/
		getConfig(name = 'defaultConfig'){
			cfgModel.find({name},function(err,doc){
				if (err) {
					return next(err);
				};
				console.log(doc)
			})
		}
	}
})();

export default DBoperation;