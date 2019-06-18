const database = require('../services/database.js');

const baseQuery =
 `select env.lsid "id",
  env.flowid "pipeline_id",
  env.lsname "name",
  env.ENV_TYPE "type_id",
  typ.NAME "environment_type",
  db.DBCNAME "schema",
  db.MONITOREDDATABASEID "managed"
  from tbl_ls env JOIN TBL_LS_DBC_MAPPING mp ON mp.lsid = env.LSID JOIN tbl_dbc db on mp.DBCID = db.DBCID
  JOIN TBL_SMG_ENV_TYPES typ ON env.ENV_TYPE = typ.ID`;

async function find(context) {
  let query = baseQuery;
  const binds = {};
   if (context.id) {
    binds.employee_id = context.id;
     query += `\nwhere env.lsid = :id`;
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
	query += `\nwhere env.flowid = :pipeline_id and lsname = ':name'`;
  }else if (ftype === "by_project"){
	  console.log("Environments by pipeline_id")
    binds.pipeline_id = context.project_id;
	//binds.id = 18;
    query += `\nwhere env.flowid = :pipeline_id`;
  }else if (ftype === "by_id"){
    console.log("Environments by pipeline_id and package_id")
    binds.id = context.id;
    binds.pipeline_id = context.project_id;
    query += `\nwhere  env.flowid = :pipeline_id AND lsid = :id`;
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
