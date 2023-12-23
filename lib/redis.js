import { createClient } from 'redis'
import { Schema, Repository, EntityId } from 'redis-om'
import { toJSON } from './helpers'
import { dbSchemas } from './schemas'

// connect to client
const redis = await createClient({ url: process.env.RedisUri })
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect()
// await redis.quit()

// class repo
class Table {
  constructor(name, schema) {
    this.schema = new Schema(name, schema)
    this.repo = new Repository(this.schema, redis)
  }

  // filter data
  _filterItem(item) {
    // json encode and return, exposes Symbols
    return toJSON(item)
  }

  // insert
  async save(itemRaw, newId) {
    if (!redis.isReady) return false
    item = await newId ? this.repo.save(newId, itemRaw) : this.repo.save(itemRaw)
    return item // [EntityId] 
  }

  // fetch
  async get(id) {
    if (!redis.isReady) return false
    const item = await this.repo.fetch(id)
    return this._filterItem(item)
  }

  // remove
  async delete(id) {
    if (!redis.isReady) return false
    return await this.repo.remove(id)
  }

  // get all
  async getAll() {
    if (!redis.isReady) return []
    const items = await this.repo.search().return.all() // or .count() instead of all for total

    return items && items.length > 0 ? items.map((item) => this._filterItem(item)) : []
  }

  // search
  async search(q) { // q is obj with fields to query as keys
    if (!redis.isReady) return []

    // use * for wildcards, where().not.eq for not, 
    const items = await this.repo.search()
      .where('enabled').true()
      .and('title').matches(q, { fuzzyMatching: true, levenshteinDistance: 1 }) // .match('test', { fuzzyMatching: true, levenshteinDistance: 3 }), matchExact for phrase
      // .and('year').gt(q.year) // is.greaterThan, between, lte
      // tags: contain(''), containOneOf('', '')
      // .sortAscending('year'), .sortBy('title', 'DESC')
      .return.all()

    return items && items.length > 0 ? items.map((item) => this._filterItem(item)) : []
  }

  async createIndex() {
    if (!redis.isReady) return false

    return await this.repo.createIndex()
  }
}

// define db
export const db = {}
for (const [k, v] of Object.entries(dbSchemas)) {
  db[k] = new Table(k, v)
}

// override project item filter
db.project.filterItem = (item) => {
  // assign thumb/logo
  if (item.images && item.images.length > 0) item.images.map((img) => {
    if (img.is_thumb) item.thumb = img
    if (img.is_logo) item.logo = img
  })
  // console.log(project)

  // json encode and return
  return toJSON(item)
}

// export default function redis() { }