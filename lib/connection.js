var Mysql = require('node-mysql-promise')

var Connection = function(){}

Connection.connect = function(options){
  options = options || parent.options
  this.Mysql = Mysql

  this.connectionObject = this.Mysql.createConnection(options)
}

module.exports = Connection