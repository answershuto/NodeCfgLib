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
let defaultCfgModel = mongoose.model('myDefaultConfig', Schema);

let $empty = function(){}

let consoleErr = function(err){
	console.log('Node config lib err:'+err);
}

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

	let findDefaultPro = function(name = 'defaultConfig'){
		return new Promise(function(resolve, reject){
			defaultCfgModel.find({name},function(err,doc){
				if (err) reject(err);
				resolve(doc || {});
			})
		});
	}

	let saveDefaultPro = function(name = 'defaultConfig', config = {}){
		return new Promise(function(resolve, reject){
			let modelObj = new defaultCfgModel({
				name,
				config
			});

			modelObj.save(function(err){
				if (err) reject(err);
				resolve();
			})
		})
	}

	let callBackFuncsMap = new Map();

	let VeritycallBackFuncsMap = new Map();

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

		* @param callBack 	callBack function

		* @return 

		*/
		async setConfig(name = 'defaultConfig', config = {}, callBack = $empty){
			let f1 = await findPro(name);  

			if(typeof VeritycallBackFuncsMap.get(name) === 'function' && !VeritycallBackFuncsMap.get(name)(config)){
				return;
			}

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

			callBackFuncsMap.has(name) && [...callBackFuncsMap.get(name)].forEach((item, index) => (typeof item === 'function' && item(config)));

			callBack();
		},

		/** get configuration 

		* @param name	config name

		* @return

		*/
		async getConfig(name = 'defaultConfig', callBack = $empty){
			let f1 = await findPro(name); 
			callBack(f1[0].config);
		},

		/** Submit default configuration 

		* @param name	default config name

		* @param config		defult config

		* @return 

		*/
		async setDefault(name = 'defaultConfig', config = {}, callBack = $empty){
			let f1 = await findDefaultPro(name);  

			if(f1.length === 0) {
				await saveDefaultPro(name, config); 
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

		/** get default configuration 

		* @param name	config name

		* @return

		*/
		async getDefault(name = 'defaultConfig', callBack = $empty){
			let f1 = await findDefaultPro(name); 
			callBack(f1[0].config);
		},

		/** attach config callback function

		* @param name	config name

		* @param callBack	callBack function                                       

		* @return

		*/
		attach(name = 'defaultConfig', callBack = $empty){
			if (callBackFuncsMap.has(name)) {
				let szFuncs = callBackFuncsMap.get(name);
				szFuncs.add(callBack);//Set has unique data
			}
			else{
				callBackFuncsMap.set(name, new Set([callBack]));
			}

			return true;
		},

		/** detach config callback function

		* @param name	config name

		* @param callBack	callBack function  

		* @return 

		*/
		detach(name = 'defaultConfig', callBack = $empty){
			if (callBackFuncsMap.has(name)) {
				return callBackFuncsMap.get(name).delete(callBack)
			}
			else{
				return false;
			}
		},

		/** attach verity config callback function 

		* @param name	config name

		* @param callBack	config name

		* @return 

		*/
		attachVerity(name = 'defaultConfig', callBack = $empty){
			VeritycallBackFuncsMap.set(name, callBack);
		},

		/** detach verity config callback function  

		* @param name	config name

		* @return 

		*/
		detachVerity(name = 'defaultConfig'){
			delete VeritycallBackFuncsMap[name];
		},

		/** Restore default configuration 

		* @param name	config name

		* @return 

		*/
		restore(name = 'defaultConfig'){
			if(typeof name) name = [name];
			name.forEach(function(item,index){
				async function setDefaultToCfg(){
					let f1 = await findDefaultPro(item);  
					let g1 = await findPro(item); 
					if (f1.length !== 0 && g1.length !== 0) {
						g1[0].config = f1[0].config;
						g1[0].save(function(err){
							if(err) consoleErr(err);
						})
					};
				}

				setDefaultToCfg();
			})
		},
	}
})();

export default DBoperation;