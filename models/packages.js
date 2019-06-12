const database = require('../services/database.js');
 
const baseQuery = 
 `select id,
  name,
  pipeline_id,
  ver_state_id,
  is_manual_order,
  is_enabled,
  pre_label_id,
  post_label_id,
  uniq_name,
  type_id,
  was_deployed,
  test_results,
  target_type_id
  from TBL_SMG_VERSION`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {}; 
  if (context.id) {
    binds.id = context.id; 
    query += `\nwhere id = :id`;
  } 
  const result = await database.simpleExecute(query, binds); 
  return result.rows;
}

async function finder(ftype, context) {
  let query = baseQuery;
  const binds = {};
  if (ftype === "by_name") {
    console.log("Packages by pipeline name")
    binds.name = context.name;
    binds.pipeline_id = context.project_id;
	query += `\nwhere pipeline_id = :pipeline_id and name = ':name'`;
  }else if (ftype === "by_project"){
	console.log("Packages by pipeline_id")
    binds.pipeline_id = context.project_id;
	//binds.id = 18;
    query += `\nwhere pipeline_id = :pipeline_id`;
  }else if (ftype === "by_id"){
    console.log("Packages by pipeline_id and package_id")
    binds.id = context.id;  
    binds.pipeline_id = context.project_id;
    query += `\nwhere  pipeline_id = :pipeline_id AND id = :id`;
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
module.exports.find_by_name = find;
