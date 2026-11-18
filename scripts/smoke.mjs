// Smoke test for a running site, no dependencies.
// Usage: npm test [-- <base url>]   (default http://localhost:3000, e.g. `npm run dev` or a preview deployment)
import assert from 'node:assert/strict'

const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')

const get = async (path, init) => {
  const res = await fetch(base + path, init)
  return { status: res.status, html: await res.text() }
}
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"')
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// every project card on a list page: [{ slug, title }]
const cards = (html) => [...html.matchAll(/href="\/projects\/([^"]+)"[\s\S]*?<h3[^>]*>([^<]*)<\/h3>/g)]
  .map(([, slug, title]) => ({ slug, title: decode(title) }))

const tests = []
const test = (name, fn) => tests.push([name, fn])

test('every project on /projects opens and shows its own title', async () => {
  const list = cards((await get('/projects')).html)
  assert.ok(list.length > 0, 'no projects listed')

  for (const { slug, title } of list) {
    const page = await get('/projects/' + slug)
    assert.equal(page.status, 200, `${slug} answered ${page.status}`)
    assert.match(decode(page.html), new RegExp('<h3[^>]*title[^>]*>' + escapeRe(title) + '<'), `${slug} does not show "${title}"`)
  }
})

// the response is streamed (loading.js), so the status is already 200; Next marks it noindex instead
test('an unknown slug shows not-found, not an error', async () => {
  const { html } = await get('/projects/does-not-exist')
  assert.match(html, /name="robots" content="noindex"/)
  assert.doesNotMatch(html, /Something went wrong/)
})

test('a bad sort value falls back to the default order', async () => {
  const order = async (path) => cards((await get(path)).html).map((c) => c.slug)
  assert.deepEqual(await order('/projects?sort=foo,bar'), await order('/projects'))
})

test('a repeated query param does not break the list', async () => {
  for (const q of ['sort=a&sort=b', 'tag=a&tag=b', 'title=a&title=b']) {
    assert.match((await get('/projects?' + q)).html, /class="item|No results found\./, q)
  }
})

test('"Most Recent" and "Oldest" sort by year the way they are labelled', async () => {
  const years = async (sort) => {
    const slugs = cards((await get('/projects?sort=' + sort)).html).map((c) => c.slug)
    return Promise.all(slugs.map(async (s) => Number((await get('/projects/' + s)).html.match(/class="year">(\d+)</)[1])))
  }
  const newest = await years('year,DESC')
  const oldest = await years('year,ASC')
  assert.deepEqual(newest, [...newest].sort((a, b) => b - a), 'Most Recent is not newest first')
  assert.deepEqual(oldest, [...oldest].sort((a, b) => a - b), 'Oldest is not oldest first')
})

test('the old write API is gone', async () => {
  for (const path of ['/api/projects/new', '/api/images/new']) {
    const { status } = await get(path, { method: 'POST', body: '{}', headers: { 'content-type': 'application/json' } })
    assert.ok(status >= 400, `${path} answered ${status}`)
  }
})

let failed = 0
for (const [name, fn] of tests) {
  try {
    await fn()
    console.log('PASS', name)
  } catch (e) {
    failed++
    console.log('FAIL', name, '\n    ' + e.message)
  }
}
process.exit(failed ? 1 : 0)
