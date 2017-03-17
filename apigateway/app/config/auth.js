const jwt = require('express-jwt')

const authCheck = jwt({
  secret: process.env.AUTH0_SECRET,
  audience: process.env.AUTH0_AUDIENCE
})

module.exports = authCheck
