export const dbSchemas = {
  project: {
    title: { type: 'text' },
    year: { type: 'number[]' },
    url: { type: 'string' },
    headline: { type: 'string' },
    description: { type: 'string' },
    roles: { type: 'string[]' },
    tags: { type: 'string[]' },
    images: { type: 'string[]' },
    type: { type: 'string' }, // [detailed | simple]
    enabled: { type: 'boolean' }
  },
  image: {
    src: { type: 'string' },
    sort_order: { type: 'number' },
    is_thumb: { type: 'boolean' },
    is_logo: { type: 'boolean' },
    caption: { type: 'string' },
  }
}

export const formSchemas = {
  project: {
    title: { type: 'text' },
    year: { type: 'number[]' },
    url: { type: 'string' },
    headline: { type: 'string' },
    description: { type: 'string' },
    roles: { type: 'string[]' },
    tags: { type: 'string[]' },
    images: {
      type: 'string[]', params: {
        src: { type: 'string' },
        sort_order: { type: 'number' },
        is_thumb: { type: 'boolean' },
        is_logo: { type: 'boolean' },
        caption: { type: 'string' }
      }
    },
    type: { type: 'string' }, // [detailed | simple]
    enabled: { type: 'boolean' }
  }
}