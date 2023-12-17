import { createClient } from 'redis'
import { Schema, Repository, EntityId } from 'redis-om'

// connect to client
const redis = createClient({ url: process.env.RedisUri })
redis.on('error', (err) => console.log('Redis Client Error', err));
// await redis.connect()
// await redis.quit()

// define scemas
const projectSchema = new Schema('project', {
  title: { type: 'text' },
  desc: { type: 'text' },
  screenshot: { type: 'string' },
  logo: { type: 'string' },
  year: { type: 'number' },
  tags: { type: 'string[]' },
  enabled: { type: 'boolean' }
})
// ,{dataStructure: 'JSON',}

// define repos
const projectRepository = new Repository(projectSchema, redis)

// init project obj
// let project = {
//   title: "Test Project",
//   year: 2016,
//   tags: [ 'html', 'php' ],
//   enabled: true
// }

// insert
export async function saveProject(project, newId) {
  project = await projectRepository.save(/* '{newId}', */project)
  return project // [EntityId]
}

// fetch
export async function getProject(id) {
  return await projectRepository.fetch(id)
}

// remove
export async function deleteProject(id) {
  return await projectRepository.remove(id)
}

// get all
export async function getProjects() {
  return JSON.stringify([{
    'EntityId': '1',
    'title': 'Project Name',
    'desc': 'desc..',
    'screenshot': 'Screenshot 2023-12-08 130050.png',
  }, {
    'EntityId': '2',
    'title': 'Project Name2',
    'desc': 'desc..',
    'screenshot': 'Screenshot 2023-12-08 130050.png',
  }, {
    'EntityId': '3',
    'title': 'Project Name3',
    'desc': 'desc..',
    'screenshot': 'Screenshot 2023-12-08 130050.png',
  }, {
    'EntityId': '4',
    'title': 'Project Name4',
    'desc': 'desc..',
    'screenshot': 'Screenshot 2023-12-08 130050.png',
  }])
  // return await projectRepository.search().return.all() // or .count() instead of all for total
}

// search
export async function searchProjects(q) { // q is obj with fields to query as keys
  // use * for wildcards, where().not.eq for not, 
  return await projectRepository.search()
    .where('enabled').true()
    .and('title').matches(q.title, { fuzzyMatching: true, levenshteinDistance: 1 }) // .match('test', { fuzzyMatching: true, levenshteinDistance: 3 }), matchExact for phrase
    // .and('year').gt(q.year) // is.greaterThan, between, lte
    // tags: contain(''), containOneOf('', '')
    // .sortAscending('year'), .sortBy('title', 'DESC')
    .return.all()
}

export async function createProjectIndex() {
  await projectRepository.createIndex()
}

// export default function redis() { }