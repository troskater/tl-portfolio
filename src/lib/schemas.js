export const dbSchemas = {
  project: {
    title: { type: 'text', sortable: true },
    year: { type: 'number', sortable: true }, // number[] not working correctly
    url: { type: 'string' },
    headline: { type: 'string' },
    description: { type: 'string' },
    roles: { type: 'string[]' },
    tags: { type: 'string[]' },
    images: { type: 'string[]' },
    type: { type: 'string' }, // [detailed | simple]
    enabled: { type: 'boolean' },
    sort_order: { type: 'number', sortable: true }
  },
  image: {
    src: { type: 'string' },
    sort_order: { type: 'number', sortable: true },
    is_thumb: { type: 'boolean' },
    is_logo: { type: 'boolean' },
    caption: { type: 'string' },
  }
}

export const formSchemas = {
  project: {
    ...dbSchemas.project,
    images: {
      type: 'string[]', params: {
        src: { type: 'string' },
        sort_order: { type: 'number' },
        is_thumb: { type: 'boolean' },
        is_logo: { type: 'boolean' },
        caption: { type: 'string' }
      }
    }
  },
  image: dbSchemas.image
}