// ES6 config lib

import sysCfg from './cfg'      
require('babel-core/register');        

let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let db = mongoose.connect(sysCfg.mongodb);

/*配置表*/
let Schema = new mongoose.Schema({
	name: String,
	config: Object
})

let cfgModel = mongoose.model('myConfig', Schema);

let $empty = function(){}

let DBoperation = (function(){

	let findPro = function(name = 'defaultConfig'){
		return new Promise(function(resolve, reject){
			cfgModel.find({name},function(err,doc){
				if (err) reject(err);
				resolve(doc || {});
			})
		});
	}

	let savePro = function(name = 'defaultConfig', config = {}){
		return new Promise(function(resolve, reject){
			let modelObj = new cfgModel({
				name,
				config
			});

			modelObj.save(function(err){
				if (err) reject(err);
				resolve();
			})
		})
	}

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
		async setConfig(name = 'defaultConfig', config = {}, callBack = $empty){
			let f1 = await findPro(name);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
			if(f1.length === 0) {
				await savePro(name, config); 
			}
			else{
				let s = function(config){
					return new Promise(function(resolve, reject){
						f1[0].config = config;
						f1[0].save(function(err){
							if (err) reject(err);
							resolve();
						})
					})
				}

				await s(config);
			}

			callBack();
		},

		/** get configuration 

		* @param name	config name

		* @return config

		*/
		async getConfig(name = 'defaultConfig', callBack = $empty){
			let f1 = await findPro(name); 
			callBack(f1);
		}
	}
})();

export default DBoperation;