const mysql = require('mysql2/promise')
const sinonTest = require('sinon-test')
const sinon = require('sinon')
const test = sinonTest(sinon)
const dbConnection = require('../../src/db/dbConnection')

describe('[dbConnection]', () => {

  describe('connect', () => {

    const connectOpts = {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'example'
    }

    it('creates a singular connection if limit is not provided', test(function() {
      this.stub(mysql, 'createConnection')
      dbConnection.connect({})
      sinon.assert.calledOnce(mysql.createConnection)
    }))

    it('creates a connection with arguments', test(function() {
      this.stub(mysql, 'createConnection')
      
      dbConnection.connect({
        limit: 1,
        ...connectOpts
      })
      sinon.assert.calledOnceWithExactly(mysql.createConnection, connectOpts)
    }))

    it('creates a connection pool with arguments', test(function() {
      this.stub(mysql, 'createPool')
      dbConnection.connect({
        limit: 2,
        ...connectOpts
      })
      sinon.assert.calledOnceWithExactly(mysql.createPool, {
        connectionLimit: 2,
        ...connectOpts
      })
    }))

  })

})