const Provider = require('./mongoprovider')

console.log('hello searchengine on port', process.env.PORT)

// replace 'mongo' by localhost if developing locally
const provider = new Provider('mongo', 27017)
