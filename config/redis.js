import redis from 'redis'
import { logger } from '../helpers/utils'

const {
  DEV_REDISTOGO_URL,
} = process.env

export default (ENV) => {
  let client

  switch (ENV) {
    case 'development':
      client = redis.createClient(DEV_REDISTOGO_URL)
      break
    case 'production':
      client = redis.createClient(PROD_REDISTOGO_URL)
      break
    default:
      return null
  }

  if (client) {
    client.on('ready', () => {
      logger.info('Redis connection established.')
    })
      .on('end', () => {
        logger.warn('Redis connection closed.')
      })
      .on('error', (err) => {
        logger.debug('Redis connection error:', err, err.stack)
      })
  }
}
