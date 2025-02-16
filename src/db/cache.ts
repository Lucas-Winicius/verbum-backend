/* eslint-disable @typescript-eslint/no-unused-vars */
import { Redis } from 'ioredis'

class Cache {
  private client: Redis
  private isConnected: boolean = false

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_URL,
      retryStrategy: function (times) {
        const delay = Math.min(times * 2, 2000)
        return delay
      },
    })

    this.client.on('connect', () => (this.isConnected = true))
    this.client.on('error', () => console.log('Redis Client Error'))
    this.client.on('ready', () => console.log('Redis Ready'))
  }

  async get(key: string) {
    try {
      const result = await this.client.get(key)
      return result ? result.toString() : null
    } catch (err) {
      console.error('Error getting Redis key:', err)
      return null
    }
  }

  async set(key: string, value: string | number) {
    try {
      await this.client.set(key, value, 'EX', 7200, 'NX')
    } catch (err) {
      console.error('Error setting Redis key:', err)
    }
  }

  async ping() {
    try {
      const pingResponse = await this.client.ping()
      return pingResponse === 'PONG'
    } catch (err) {
      return false
    }
  }

}

export default new Cache()
