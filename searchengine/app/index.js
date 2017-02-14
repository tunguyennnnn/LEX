const Provider = require('./mongoprovider')

console.log('hello searchengine')

// replace 'mongo' by localhost if developing locally
const provider = new Provider('mongo', 27017)
