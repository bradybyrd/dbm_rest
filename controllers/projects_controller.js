const projects = require('../models/projects.js');

async function get(req, res, next) {
	try {
		const context = {};
				
		if (req.params.id) {
  		context.id = parseInt(req.params.id, 10);
  		const rows = await projects.find(context);
			if ( rows.length === 1) {
				res.status(200).json(rows[0]);
			} else {
				res.status(404).end();
			}
    } else if(req.query.name){
  		context.name = req.query.name;
  		const rows = await projects.find_by_name(context);
      
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
		if (req.params.id) {
  		context.id = parseInt(req.params.id, 10);
  		const rows = await projects.find(context);
			if ( rows.length === 1) {
				res.status(200).json(rows[0]);
			} else {
				res.status(404).end();
			}
    } else if(req.query.name){
  		context.name = req.query.name;
  		const rows = await projects.find_by_name(context);
		} else {
			res.status(200).json(rows);
		}
	} catch(err) {
		next(err);
	}
}

module.exports.post = post;
module.exports.get = get;
