const express = require('express')
const proxy = require('http-proxy-middleware')

const authCheck = require('../../config/auth')
const config = require('../../config/env')

// const logger = require('../../config/winston')

const router = express.Router()
router.all('*', authCheck)

function onProxyReq (proxyReq, req, res) {
  proxyReq.removeHeader('Authorization')
}

function logProvider (provider) {
  return require('winston')
}

const proxyOptions = {
  target: config.queueClientBaseUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api/queue/': '',
    '[\?,\&]token=([^\&]+)': ''
  },
  onProxyReq: onProxyReq,
  logProvider: logProvider
}

const queueProxy = proxy(proxyOptions)

router.use('/', queueProxy)

module.exports = router
