var QueryInterface = function(connection, tableName){
  this.connection = connection
  this.tableName  = tableName
  return this
}

QueryInterface.prototype.findAll = function() {
  return this.connection.table(this.tableName).select()
}

QueryInterface.prototype.findById = function(recordId) {
  return this.connection.table(this.tableName).where({id: recordId}).select()
}

QueryInterface.prototype.where = function(query) {
  return this.connection.table(this.tableName).where(query).select()
}

QueryInterface.prototype.aggregate = function(operation, fieldName){
  return this.connection.table(this.tableName)[operation](fieldName)
}

QueryInterface.prototype.distinct = function(fieldName){
  return this.connection.table(this.tableName).distinct(fieldName)
}

QueryInterface.prototype.executeQuery = function(query) {
  return this.connection
    .table(this.tableName)
    .where(query.query)
    .field(query.onlyFields)
    .order(query.order)
    .group(query.group)
    .limit(query.skip, query.limit)
    .select()
}

module.exports = QueryInterface