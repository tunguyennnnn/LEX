const jwt = require('express-jwt')

const authCheck = jwt({
  secret: process.env.AUTH0_SECRET,
  audience: process.env.AUTH0_AUDIENCE,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1]
    } else if (req.query && req.query.token) {
      console.log('token:', req.query.token)
      return req.query.token
    }
    return null
  }
})

module.exports = authCheck
