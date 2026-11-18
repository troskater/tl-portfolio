'use server'

import { db } from '@/lib/db'

// Server actions are public POST endpoints, so the guard lives here, not only on the page.
// Writes are dev-only (previews run as production too).
function devOnly() {
  if (process.env.NODE_ENV !== 'development') throw new Error('forbidden')
}

export async function addProject(data) {
  devOnly()
  await db.project.save(data)
}

// run after changing dbSchemas
// shortcut: redis-om 0.4.7 throws on a brand-new Redis 8 database (SEARCH_INDEX_NOT_FOUND), create the first index by hand
export async function reindex() {
  devOnly()
  for (const table of Object.values(db)) await table.createIndex()
}
