const Db = require('mongodb').Db
const Connection = require('mongodb').Connection
const Server = require('mongodb').Server
const BSON = require('mongodb').BSON
const ObjectID = require('mongodb').ObjectID

class Provider {
  constructor (host, port) {
    this.db = new Db('lex', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}))
    this.db.open(function () {})
  }
}

module.exports = Provider

