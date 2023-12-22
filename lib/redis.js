import { createClient } from 'redis'
import { Schema, Repository, EntityId } from 'redis-om'
import { toJSON } from './helpers'

// connect to client
const redis = await createClient({ url: process.env.RedisUri })
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect()
// await redis.quit()

// define schemas
let schemas = {}
for (const [k, v] of Object.entries(process.env.dbSchema)) {
  schemas[k] = new Schema(k, v)
  // ,{dataStructure: 'JSON',}
}

// define repos
const projectRepository = new Repository(schemas.project, redis)

// init project obj
// let project = {
//   title: "Test Project",
//   year: 2016,
//   tags: [ 'html', 'php' ],
//   enabled: true
// }

// filter project data
function filterProject(project) {
  // assign thumb/logo
  if (project.images && project.images.length > 0) project.images.map((img) => {
    if (img.is_thumb) project.thumb = img
    if (img.is_logo) project.logo = img
  })
  // console.log(project)

  // json encode and return
  return toJSON(project)
}

// insert
export async function saveProject(project, newId) {
  if (!redis.isReady) return false
  project = await projectRepository.save(/* '{newId}', */project)
  return project // [EntityId] 
}

// fetch
export async function getProject(id) {
  if (!redis.isReady) return false
  const project = await projectRepository.fetch(id)
  return filterProject(project)
}

// remove
export async function deleteProject(id) {
  if (!redis.isReady) return false
  return await projectRepository.remove(id)
}

// get all
export async function getProjects() {
  if (!redis.isReady) return []
  const projects = await projectRepository.search().return.all() // or .count() instead of all for total

  return projects.map((project) => filterProject(project))
}

// search
export async function searchProjects(q) { // q is obj with fields to query as keys
  if (!redis.isReady) return []

  // use * for wildcards, where().not.eq for not, 
  const projects = await projectRepository.search()
    .where('enabled').true()
    .and('title').matches(q.title, { fuzzyMatching: true, levenshteinDistance: 1 }) // .match('test', { fuzzyMatching: true, levenshteinDistance: 3 }), matchExact for phrase
    // .and('year').gt(q.year) // is.greaterThan, between, lte
    // tags: contain(''), containOneOf('', '')
    // .sortAscending('year'), .sortBy('title', 'DESC')
    .return.all()

  return projects.map((project) => filterProject(project))
}

export async function createProjectIndex() {
  if (!redis.isReady) return false
  return await projectRepository.createIndex()
}

// export default function redis() { }