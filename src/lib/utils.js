'use strict'

const axios = require('axios')
const { Console } = require('console')
const constants = require('./constants')
const crypto = require('crypto')
const BitMartMissingKeyError = require('../error/missingKeyError')


const removeEmptyValue = obj => {
  if (!(obj instanceof Object)) return {}
  Object.keys(obj).forEach(key => isEmptyValue(obj[key]) && delete obj[key])
  return obj
}

const isEmptyValue = input => {
  /**
   * Scope of empty value: falsy value (except for false and 0),
   * string with white space characters only, empty object, empty array
   */
  return (!input && input !== false && input !== 0) ||
    ((typeof input === 'string' || input instanceof String) && /^\s+$/.test(input)) ||
    (input instanceof Object && !Object.keys(input).length) ||
    (Array.isArray(input) && !input.length)
}

const buildQueryString = params => {
  if (!params) return ''
  return Object.entries(params)
    .map(stringifyKeyValuePair)
    .join('&')
}

/**
 * NOTE: The array conversion logic is different from usual query string.
 * E.g. symbols=["BTCUSDT","BNBBTC"] instead of symbols[]=BTCUSDT&symbols[]=BNBBTC
 */
const stringifyKeyValuePair = ([key, value]) => {
  const valueString = Array.isArray(value) ? `["${value.join('","')}"]` : value
  return `${key}=${encodeURIComponent(valueString)}`
}

const getRequestInstance = (config) => {
  return axios.create({
    ...config
  })
}

const createRequest = (config) => {
  const { logger, baseURL, method, url, headers, timeout, data } = config
  logger.info(`url: ${baseURL + url}\nresponse: ${data}`);
  if(method === 'GET') {
    return getRequestInstance({
      baseURL,
      timeout,
      headers,
    }).request({
      method,
      url
    })
  } else {
    return getRequestInstance({
      baseURL,
      timeout,
      headers,
    }).request({
      method,
      url,
      data: data
    })
  }
  

}

const createSign = (timestamp, body, apiSecret, apiMemo) => {
  if(isEmptyValue(apiSecret)) {
    throw new BitMartMissingKeyError('your api secret is empty')
  }

  if(isEmptyValue(apiMemo)) {
    throw new BitMartMissingKeyError('your api memo is empty')
  }

  const queryString = timestamp + "#" + apiMemo + "#" + body;
  return crypto
    .createHmac('sha256', apiSecret)
    .update(queryString)
    .digest('hex')
}



const flowRight = (...functions) => input => functions.reduceRight(
  (input, fn) => fn(input),
  input
)

const defaultLogger = new Console({
  stdout: process.stdout,
  stderr: process.stderr
})


const Auth = {
  NONE: 0,
  KEYED: 1,
  SIGNED: 2
}


module.exports = {
  Auth,
  isEmptyValue,
  removeEmptyValue,
  buildQueryString,
  createRequest,
  createSign,
  flowRight,
  defaultLogger
}
