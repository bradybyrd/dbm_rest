const webServerConfig = require('../config/web-server.js');
const cliConfig = require('../config/cli-config.json');
const packages = require('../models/packages.js');
const projects = require('../models/projects.js');
const dbmApi = require('./dbm-actions.js');
var fs = require("fs");
var path = require('path');
var async = require('async');
var cmd = require('node-cmd');
var util = require('util');
const cli = require('../services/cli-execute.js');

async function get(req, res, next) {
	// api/projects/:id/packages
	try {
		const context = {};
		context.project_id = parseInt(req.params.project_id, 10);
		if (req.params.id) {
			context.id = parseInt(req.params.id, 10);
			const rows = await packages.finder("by_id", context);
			if ( rows.length === 1) {
				res.status(200).json(rows[0]);
			} else {
				res.status(404).end();
			}
		} else {
			const rows = await packages.finder("by_project", context);
			res.status(200).json(rows);
		}
	} catch(err) {
		next(err);
	}
}

async function put(req, res, next) {
	try {
		const context = {};
		context.project_id = parseInt(req.params.project_id, 10);
		context.id = parseInt(req.params.id, 10);
		const rows = await packages.find(context);
		if (req.params.id) {
			if ( rows.length === 1) {
				res.status(200).json(rows[0]);
			} else {
				res.status(404).end();
			}
		} else {
			res.status(200).json(rows);
		}
	} catch(err) {
		next(err);
	}
}

async function post(req, res, next) {
	try {
		const context = {};
		context.project_id = parseInt(req.params.project_id, 10);
		context.id = parseInt(req.params.id, 10);
		const rows = await packages.find(context);
		if (req.params.id) {
			if ( rows.length === 1) {
				res.status(200).json(rows[0]);
			} else {
				res.status(404).end();
			}
		} else {
			res.status(200).json(rows);
		}
	} catch(err) {
		next(err);
	}
}

async function deploy(req, res, next) {
  //  POST: projects/:project_id/packages/:id/deploy {env_name: DEV, username: brady, token: blahfkgj4386jh4}
	try {
		const context = {};
		context.project_id = parseInt(req.params.project_id, 10);
		context.id = parseInt(req.params.id, 10);
		const rows = await packages.find(context);
		if (req.params.id) {
			if ( rows.length === 1) {
				//console.log("FullParams: ", req.body.environment, req.body.token, req.body.username, req.params.project_id, req.params.id)
        dbmApi.dbmApi("upgrade", req.body, {"projectId" : context.project_id, "packageId" : context.id})
				res.status(200).json(rows[0]);
			} else {
				res.status(404).end();
			}
		} else {
			res.status(200).json(rows);
		}
	} catch(err) {
		next(err);
	}
}

function upload(req, res, next) {
  //  POST: projects/:project_id/packages/upload (multipart){env_name: DEV, username: brady, token: blahfkgj4386jh4}
	try {
		const context = {};
		const restResult = {"action" : "PackageUpload"};
		context.project_id = parseInt(req.params.project_id, 10);
		var filesArray = req.files;
		context.id = context.project_id;
		restResult["project_id"] = context.project_id
		var proj = {};
		projectInfo(context.project_id).then(function(proj){
				console.log(`Project: ${util.inspect(proj, {showHidden: false, depth: null}) }`);
				var rs = {};
				rs = projects.releaseSource("cache", proj) ; //.then(function(result){
				//	rs = result;
				//});

				restResult["project_name"] = proj.name
				//async.each(filesArray,function(file,eachcallback){
				var file = filesArray[0];
			     //carry out your file operations here and pass callback at the end
			     console.log(`Processing File: ${util.inspect(file, {showHidden: false, depth: null}) }`);
					 var args = [
				 	'copy',
				 	`${webServerConfig.upload_dir}\\${file.filename}`,
				 	`${proj.staging_path}\\${rs.schema}\\${file.originalname}`
					];
					restResult["upload_file"] = file.originalname
					console.log(`Copy params: ${args}`);
					cli.cliExecute(args)
					.then(function(result){
							console.log(`Result: `, result.stdout);
							if(result.stderr){
								console.log(`stderr: ${result.stderr}`);
							}
							restResult["cliExecute"] = result;
					});
			   /*
			  },
					function(err){
			      if(err){
			          console.log("error ocurred in each",err);
			      }else{
			        console.log(`finished processing file: ${file.originalname}`);

			     }
					 */
			  //}); //filesArray
				console.log("Start Packaging Here")
					dbmApi.dbmApi("package", {}, {"projectId" : context.project_id}).then(function(result){
						try{
							console.log(`#=> PkgController-Result: ${util.inspect(result, {showHidden: false, depth: null}) }`);
							restResult.command = result.command;
							restResult.stdout = result.stdout;
							if(result.stderr){
								restResult.stderr = result.stderr;
							}
							res.status(200).json(restResult);
						} catch(err){
							console.log("error ocurred in API-Package",err);
							res.status(404).json(err);

						}

					});
			});
	} catch(err) {
		res.status(404).json(err);
		next(err);
	}
}

async function projectInfo(id) {
		const context = {};
		var answer = null;
		context.id = id;
		const rows = await projects.projectInfo(context);
		try{
			if ( rows.status === "SUCCESS") {
				return(rows);
			} else {
				return({"status" : "ERROR"});
			}
		}catch(err){
			console.log(err)
		}
}

module.exports.upload = upload;
module.exports.deploy = deploy;
module.exports.get = get;
module.exports.put = put;
module.exports.post = post;
