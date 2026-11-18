import { createClient } from 'redis'
import { Schema, Repository, EntityId } from 'redis-om'
import { singularize, toJSON } from './helpers'

// init config
const useRemote = process.env.NODE_ENV == "production" || process.env.REDIS_ENV == 'remote'
const config = useRemote ? { url: process.env.PROD_DATABASE_REDIS_URL, socket: { connectTimeout: 5000 } } : {}

// connect to client
// shortcut: connect() keeps retrying while Redis is down, so requests hang until the platform timeout; cap reconnectStrategy if that bites
export const redis = await createClient(config)
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect()
// await redis.quit()

// class repo
export class Table {
  // tables by name, so save() can reach child tables (e.g. images) without importing db
  static all = {}

  // json encode and return, exposes Symbols
  fetchFilter = toJSON

  constructor(name, schema) {
    this.name = name
    this.schema = schema
    Table.all[name] = this
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
    // only schema fields are kept, so a fetched item (with _entityId, slug, thumb...) can be posted back
    const data = {}
    for (const [key, { type }] of Object.entries(this.schema)) {
      let value = itemRaw[key]
      if (value === undefined) continue

      // child objects in an array are saved to their own table and replaced by their id
      if (['string[]', 'number[]'].includes(type) && value && value.length > 0) {
        value = await Promise.all(value.map(async (v) =>
          typeof v === 'object' ? (await Table.all[singularize(key)].save(v))[EntityId] : v
        ))
      }

      data[key] = value
    }

    // save item
    return newId ? this.repo.save(newId, data) : this.repo.save(data) // [EntityId]
  }

  // fetch
  async get(id) {
    const item = await this.repo.fetch(id)
    return this.#filterItem(item, { getSiblings: true })
  }

  // remove
  async delete(id) {
    return await this.repo.remove(id)
  }

  // search
  async search(q) { // q is obj with fields to query as keys
    // use * for wildcards, where().not.eq for not, 
    const items = await this.#parseSearchQuery(q)

    return items && items.length > 0 ? await Promise.all(items.map((item) => this.#filterItem(item))) : []
  }

  async createIndex() {
    return await this.repo.createIndex()
  }
}