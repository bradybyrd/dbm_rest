const database = require('../services/database.js');
 
const baseQuery = 
 `select lsid "id",
  flowid "pipeline_id",
  lsname "name",
  is_rmsource "is_rs"
  from tbl_ls`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
   if (context.id) {
    binds.employee_id = context.id;
     query += `\nwhere lsid = :id`;
  }
  const result = await database.simpleExecute(query, binds);
  return result.rows;
}

async function finder(ftype, context) {
  let query = baseQuery;
  const binds = {};
  if (ftype === "by_name") {
    console.log("Environments by environment name")
    binds.name = context.name;
    binds.pipeline_id = context.project_id;
	query += `\nwhere flowid = :pipeline_id and lsname = ':name'`;
  }else if (ftype === "by_project"){
	console.log("Packages by pipeline_id")
    binds.pipeline_id = context.project_id;
	//binds.id = 18;
    query += `\nwhere flowid = :pipeline_id`;
  }else if (ftype === "by_id"){
    console.log("Packages by pipeline_id and package_id")
    binds.id = context.id;  
    binds.pipeline_id = context.project_id;
    query += `\nwhere  flowid = :pipeline_id AND lsid = :id`;
  }
  const result = await database.simpleExecute(query, binds); 
  return result.rows;
}

async function find_by_name(context) {
  const ftype = "by_name";
  return finder(ftype, context);
}

async function find_by_project(context) {
  const ftype = "by_project";
  return finder(ftype, context);
}
 
module.exports.find = find;
module.exports.finder = finder;
module.exports.find_by_name = find_by_name;
module.exports.find_by_project = find_by_project;