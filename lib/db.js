import { redis, Table } from './redis'
import { dbSchemas } from './schemas'
import { kebabCase, titleCase, toJSON } from './helpers'

// define db
export const db = {}
for (const [k, v] of Object.entries(dbSchemas)) {
  db[k] = new Table(k, v)
}

// overrides
db.project.fetchFilter = async (item, params) => {
  if (item) {
    // set slug
    item.slug = kebabCase(item.title)

    // load project images
    item.additionalImages = []
    if (item.images && item.images.length > 0) for (const k in item.images) {
      const id = item.images[k]
      const img = await db.image.get(id)
      if (img.is_thumb) item.thumb = img
      if (img.is_logo) item.logo = img
      if (!img.is_logo && !img.is_thumb) item.additionalImages.push(img)
    }

    // get prev/next
    if (item.sort_order && params?.getSiblings) {
      item.prev = await db.project.getPrev({ sort_order: item.sort_order })
      item.next = await db.project.getNext({ sort_order: item.sort_order })
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

    if (q.tag) {
      const tag = q.tag
        // tag input filtering
        .toLowerCase()
        .replace('.', '')
        .replace('javascript', 'js')

      query.and('tags').contain(tag)
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

// custom methods
db.project.getPrev = async (q) => { // q is obj with fields to query as keys
  if (!redis.isReady) return []

  // find
  const query = db.project.repo.search()
    .where('enabled').true()
    .where('sort_order').lt(q.sort_order)
    .sortDescending('sort_order')

  // return
  const item = await query.return.first()

  return db.project.fetchFilter(item)
}

db.project.getNext = async (q) => { // q is obj with fields to query as keys
  if (!redis.isReady) return []

  // find
  const query = db.project.repo.search()
    .where('enabled').true()
    .where('sort_order').gt(q.sort_order)
    .sortAscending('sort_order')

  // return
  const item = await query.return.first()

  return db.project.fetchFilter(item)
}

db.project.getBySlug = async (slug) => {
  if (!redis.isReady) return []

  // find
  const query = db.project.repo.search()
    .where('title').match(titleCase(slug))

  // return
  const item = await query.return.first()

  return db.project.fetchFilter(item, { getSiblings: true })
}