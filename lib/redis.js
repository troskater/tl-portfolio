import { createClient } from 'redis'
import { Schema, Repository, EntityId } from 'redis-om'
import { singularize, toJSON } from './helpers'
import { dbSchemas } from './schemas'

// init config
const config = process.env.NODE_ENV == "development" ?
  {
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_URI,
      port: process.env.REDIS_PORT
    }
  }
  :
  {
    url: process.env.REDIS_DEV_URI
  }

// connect to client
const redis = await createClient(config)
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect()
// await redis.quit()

// class repo
class Table {
  // json encode and return, exposes Symbols
  fetchFilter = toJSON

  constructor(name, schema) {
    this.name = name
    this.schema = schema
    this.repo = new Repository(new Schema(this.name, this.schema), redis)
    this.searchQuery = (q, query) => query
  }

  // filter data
  #filterItem(item) {
    return this.fetchFilter(item)
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
    return this.#filterItem(item)
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

  //
  async getPrev(q) { // q is obj with fields to query as keys
    if (!redis.isReady) return []

    // find
    const query = this.repo.search()
      .where('enabled').true()
      .where('sort_order').lt(q.sort_order)
      .sortDescending('sort_order')

    // return
    const item = await query.return.first()

    return this.#filterItem(item)
  }

  async getNext(q) { // q is obj with fields to query as keys
    if (!redis.isReady) return []

    // find
    const query = this.repo.search()
      .where('enabled').true()
      .where('sort_order').gt(q.sort_order)
      .sortAscending('sort_order')

    // return
    const item = await query.return.first()

    return this.#filterItem(item)
  }
}

// define db
export const db = {}
for (const [k, v] of Object.entries(dbSchemas)) {
  db[k] = new Table(k, v)
}

// overrides
db.project.fetchFilter = async (item) => {
  // load project images
  if (item) {
    item.additionalImages = []
    if (item.images && item.images.length > 0) for (const k in item.images) {
      const id = item.images[k]
      const img = await db.image.get(id)
      if (img.is_thumb) item.thumb = img
      if (img.is_logo) item.logo = img
      if (!img.is_logo && !img.is_thumb) item.additionalImages.push(img)
    }
  }
  // console.log(item)

  // json encode and return
  return toJSON(item)
}

db.project.searchQuery = (q, query) => {
  // get all items
  query.where('enabled').true()
  // console.log(q)
  // search
  if (q) {
    if (q.title) {
      query.and('title').match(q.title, { fuzzyMatching: true, levenshteinDistance: 2 }) // .match
    }

    if (q.year) {
      query.and('year').gt(q.year) // is.greaterThan, between, lte
    }

    if (q.tags && q.tags.length > 0) {
      const tags = q.tags.map(tag => tag
        // tag input filtering
        .toLowerCase()
        .replace('.', '')
        .replace('javascript', 'js')
      )
      query.and('tags').containOneOf(...tags)
    }

    // sorting
    if (q.sortBy && q.sort) {
      query.sortBy(q.sortBy, q.sort)
    }
  } else {
    query.sortAscending('sort_order')
  }

  return query
}

// export default function redis() { }