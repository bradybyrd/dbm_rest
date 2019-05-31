module.exports = {
  "### Instructions ###": "Enter the local settings items for your installation",
    "general" : {
      "java_cmd" : "java -jar \"C:\\Program Files (x86)\\DBmaestro\\TeamWork\\TeamWorkOracleServer\\Automation\\DBmaestroAgent.jar\"",
      "staging_path" : "C:\\pipelinescript\\MP",
      "server" : "dbmtemplate",
  	  "username" : "dbmguest@dbmaestro.com",
  	  "token" : "2BqDtNyL7gQjp6J0Kp7HNHbB5P0WayH0"
    },
    "connections" : {
      "repository" : {
        "user" : "twmanagedb",
        "password" : "manage#2009",
        "connect" : "dbmtemplate:1521/orcl"
      }
    },
    "commands" : {
      "base" : ["action", "server", "auth_type", "username", "token"],
      "optional" : ["use_ssl"],
      "validate" : ["project_name", "environment", "package_name"],
      "upgrade" : ["project_name", "environment", "package_name"],
      "package" : ["project_name"],
      "refresh" : ["project_name", "dev_environment"]
      
    }

};