var rp = require('request-promise')
const httpStatus = require('http-status')

const config = require('../../config/env')

const logger = require('../../config/winston')

function progress (req, res, next) {
  const options = {
    method: 'GET',
    uri: `${config.transcriberBaseUrl}/videos`,
    json: true
  }
  rp(options)
      .then((body) => {
        res.status(httpStatus.OK).json(body)
      })
      .catch((err) => {
        logger.error(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
      })
}

function transcribeVideo (req, res, next) {
  logger.log(res.body)
  const options = {
    method: 'POST',
    uri: `${config.transcriberBaseUrl}/videos`,
    body: res.body,
    json: true
  }
  rp(options)
      .then((body) => {
        res.status(httpStatus.CREATED).json(body)
      })
      .catch((err) => {
        logger.error(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
      })
}

module.exports = { progress, transcribeVideo }
