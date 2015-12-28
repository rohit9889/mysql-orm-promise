var Mysql               = require('node-mysql-promise')
var QueryInterface      = require('./query-interface')
var ValidationInterface = require('./validation-interface')

var modelScaffold = function(tableName, connection){
  var queryInterface      = new QueryInterface(connection, tableName)
  var validationInterface = new ValidationInterface()

  var scaffold  = function(attr){
    this.attributes = attr
    return this
  }

  scaffold.initializeObjectFromArray = function(dataArray){
    var dataInstances = dataArray.map(function(dataObject){
      return new scaffold(dataObject)
    })

    return dataInstances
  }

  scaffold.find = scaffold.where = function(query){
    this.query = query
    return this
  }

  scaffold.findById = function(recordId){
    this.query = this.query || {}
    this.query.id = recordId
    return this
  }

  scaffold.all = scaffold.findAll = function(){
    this.query = {}
    return this
  }

  scaffold.only = function(fieldsArray){
    this.onlyFields = fieldsArray ? fieldsArray.join(',') : ''
    return this
  }

  scaffold.limit = function(limit){
    this.limitTo = limit || 100
    return this
  }

  scaffold.skip = function(skip){
    this.skipTo = skip || 0
    return this
  }

  scaffold.orderBy = function(fieldName, descending){
    this.order = fieldName + ' ' + (!!descending ? 'DESC' : 'ASC')
    return this
  }

  scaffold.groupBy = function(fieldName){
    this.group = fieldName
    return this
  }

  scaffold.in = function(fieldName, valuesArray){
    this.query = this.query || {}
    this.query[fieldName] = ['IN', valuesArray.join(',')]
    return this
  }

  scaffold.notIn = function(fieldName, valuesArray){
    this.query = this.query || {}
    this.query[fieldName] = ['NOT IN', valuesArray.join(',')]
    return this
  }

  scaffold.between = function(fieldName, valuesArray){
    this.query = this.query || {}
    this.query[fieldName] = ['BETWEEN', valuesArray.join(',')]
    return this
  }

  scaffold.distinct = function(fieldName){
    return queryInterface.distinct(fieldName)
  }

  scaffold.aggregate = function(operation, fieldName){
    return queryInterface.aggregate(operation, fieldName)
  }

  scaffold.count = function(fieldName){
    return this.aggregate('count', fieldName)
  }

  scaffold.sum = function(fieldName){
    return this.aggregate('sum', fieldName)
  }

  scaffold.max = scaffold.maximum = function(fieldName){
    return this.aggregate('max', fieldName)
  }

  scaffold.min = scaffold.minimum = function(fieldName){
    return this.aggregate('min', fieldName)
  }

  scaffold.avg = scaffold.average = function(fieldName){
    return this.aggregate('avg', fieldName)
  }



  scaffold.exec = scaffold.execute = function(){
    var that = this
    var fullQuery = {}

    fullQuery.query      = that.query      || {}
    fullQuery.onlyFields = that.onlyFields || ''
    fullQuery.limitTo    = that.limitTo    || 50
    fullQuery.skipTo     = that.skipTo     || 0
    fullQuery.order      = that.order      || ''
    fullQuery.group      = that.group      || ''

    return queryInterface.executeQuery(fullQuery)
    .then(function(dataArray){
      that.query = {}
      return that.initializeObjectFromArray(dataArray)
    })
  }

  return scaffold
}

var modelInitiator = function(tableName){
  this.tableName = tableName
  return modelScaffold(tableName, this.connection.connectionObject)
}

module.exports = modelInitiator