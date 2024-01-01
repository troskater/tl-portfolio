import { createClient } from 'redis'
import { Schema, Repository, EntityId } from 'redis-om'
import { singularize, toJSON } from './helpers'

// init config
const useRemote = process.env.NODE_ENV == "production" || process.env.REDIS_ENV == 'remote'
const config = useRemote ? {
  socket: {
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
  },
  password: process.env.REDIS_PASSWORD
} : {}

// connect to client
export const redis = await createClient(config)
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect()
// await redis.quit()

// class repo
export class Table {
  // json encode and return, exposes Symbols
  fetchFilter = toJSON

  constructor(name, schema) {
    this.name = name
    this.schema = schema
    this.repo = new Repository(new Schema(this.name, this.schema), redis)
    this.searchQuery = (q, query) => query
  }

  // filter data
  #filterItem(item, params) {
    return this.fetchFilter(item, params)
  }

  // set search query
  async #parseSearchQuery(q) {
    const query = this.repo.search()

    return await this.searchQuery(q, query).return.all()
    // or .count() instead of all for total
    // .where('enabled').true()
    // .and('title').matches(q, { fuzzyMatching: true, levenshteinDistance: 1 }) // .match('test', { fuzzyMatching: true, levenshteinDistance: 3 }), matchExact for phrase
    // .and('year').gt(q.year) // is.greaterThan, between, lte
    // tags: contain(''), containOneOf('', '')
    // .sortAscending('year'), .sortBy('title', 'DESC')
  }

  // insert
  async save(itemRaw, newId) {
    if (!redis.isReady) return false

    // loop through input data
    for (const [key, value] of Object.entries(itemRaw)) {
      let type = this.schema[key].type

      // make sure value is an array and loop through items
      if (
        ['string[]', 'number[]'].includes(type)
        && value && value.length > 0
      ) for (const k in value) {
        const v = value[k]

        // check for child objects
        if (typeof v === 'object') {
          // save child
          let child = await db[singularize(key)].save(v)

          // replace child with object id
          itemRaw[key][k] = child[EntityId]
        }
      }
    }

    // save item
    const item = await newId ? this.repo.save(newId, itemRaw) : this.repo.save(itemRaw)
    return item // [EntityId] 
  }

  // fetch
  async get(id) {
    if (!redis.isReady) return false
    const item = await this.repo.fetch(id)
    return this.#filterItem(item, { getSiblings: true })
  }

  // remove
  async delete(id) {
    if (!redis.isReady) return false
    return await this.repo.remove(id)
  }

  // get all
  async getAll() {
    if (!redis.isReady) return []
    const items = await this.#parseSearchQuery()

    return items && items.length > 0 ? await Promise.all(items.map((item) => this.#filterItem(item))) : []
  }

  // search
  async search(q) { // q is obj with fields to query as keys
    if (!redis.isReady) return []

    // use * for wildcards, where().not.eq for not, 
    const items = await this.#parseSearchQuery(q)

    return items && items.length > 0 ? await Promise.all(items.map((item) => this.#filterItem(item))) : []
  }

  async createIndex() {
    if (!redis.isReady) return false

    return await this.repo.createIndex()
  }
}