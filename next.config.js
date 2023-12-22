/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // db schema
    dbSchema: {
      project: {
        title: { type: 'text' },
        year: { type: 'number[]' },
        url: { type: 'string' },
        headline: { type: 'string' },
        description: { type: 'string' },
        roles: { type: 'string[]' },
        tags: { type: 'string[]' },
        src: { type: 'string[]', path: '$.images[*].src' },
        sort_order: { type: 'number[]', path: '$.images[*].sort_order' },
        is_thumb: { type: 'number[]', path: '$.images[*].is_thumb' },
        is_logo: { type: 'number[]', path: '$.images[*].is_logo' },
        caption: { type: 'string[]', path: '$.images[*].caption' },
        type: { type: 'string' }, // [detailed | simple]
        enabled: { type: 'boolean' }
      }
    },

    // form schema
    formSchema: {
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
  }
}

module.exports = nextConfig
