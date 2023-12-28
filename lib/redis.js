import { createClient } from 'redis'
import { Schema, Repository, EntityId } from 'redis-om'
import { singularize, toJSON } from './helpers'
import { dbSchemas } from './schemas'

// connect to client
const redis = await createClient({ url: process.env.RedisUri })
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
    this.searchQuery = (q, items) => items
  }

  // filter data
  #filterItem(item) {
    return this.fetchFilter(item)
  }

  // set search query
  async #parseSearchQuery(q) {
    const items = this.repo.search()

    return await this.searchQuery(q, items).return.all()
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
}

// define db
export const db = {}
for (const [k, v] of Object.entries(dbSchemas)) {
  db[k] = new Table(k, v)
}

// overrides
db.project.fetchFilter = async (item) => {
  // load project images
  item.additionalImages = []
  if (item.images && item.images.length > 0) for (const k in item.images) {
    const id = item.images[k]
    const img = await db.image.get(id)
    if (img.is_thumb) item.thumb = img
    if (img.is_logo) item.logo = img
    if (!img.is_logo && !img.is_thumb) item.additionalImages.push(img)
  }
  // console.log(project)

  // json encode and return
  return toJSON(item)
}

db.project.searchQuery = (q, items) => {
  // get all items
  items.where('enabled').true()
  // console.log(q)
  // search
  if (q) {
    if (q.title) {
      items.and('title').match(q.title, { fuzzyMatching: true, levenshteinDistance: 2 }) // .match
    }

    if (q.year) {
      items.and('year').gt(q.year) // is.greaterThan, between, lte
    }

    if (q.tags && q.tags.length > 0) {
      const tags = q.tags.map(tag => tag
        // tag input filtering
        .toLowerCase()
        .replace('.', '')
        .replace('javascript', 'js')
      )
      items.and('tags').containOneOf(...tags)
    }

    // sorting
    if (q.sortBy && q.sort) {
      items.sortBy(q.sortBy, q.sort)
    }
  } else {
    items.sortAscending('sort_order')
  }

  return items
}

// export default function redis() { }