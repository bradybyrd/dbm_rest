const database = require('../services/database.js');
 
const baseQuery = 
 `select proj.flowid "id",
  proj.flowname "name",
  proj.description,
  s.SCRIPTOUTPUTFOLDER "staging_path",
  s.SEPARATESCRIPTFOREACHTARGET "is_version"
  from tbl_flow proj inner join tbl_flow_settings s ON s.flowid = proj.flowid`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
  if (context.id) {
    binds.id = context.id; 
    query += `\nwhere proj.flowid = :id`;
  } 
  const result = await database.simpleExecute(query, binds);
  return result.rows;
}

async function find_by_name(context) {
  let query = baseQuery;
  const binds = {}; 
  if (context.name) {
    binds.name = context.name; 
    query += `\nwhere proj.flowname = ':name'`;
  } 
  const result = await database.simpleExecute(query, binds); 
  return result.rows[0];
}
 
module.exports.find_by_name = find_by_name;
module.exports.find = find;
