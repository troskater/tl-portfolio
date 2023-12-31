// convert object to json and retain symbols
export function toJSON(obj) {
  return obj ? {
    ...Object.getOwnPropertyNames(obj).reduce((a, b) => {
      a[b] = obj[b]
      return a
    }, {}), ...Object.getOwnPropertySymbols(obj).reduce((a, b) => {
      a['_' + b.description] = obj[b]
      return a
    }, {})
  } : null
}

export function uc(word) {
  return word.charAt(0).toUpperCase()
    + word.slice(1)
}

export const singularize = (word) => {
  const rules = [
    [/(ss)es$/, '$1'],
    [/([^s])s$/, '$1'],
  ];

  for (const [pattern, replacement] of rules) {
    if (pattern.test(word)) {
      return word.replace(pattern, replacement)
    }
  }

  return word
}

// parse arrays
export function parseFormDataArrays(formData) {
  const parsed = {};

  // Iterate over the entries of the formData object
  for (const [key, value] of formData.entries()) {
    // Check if the key contains square brackets, indicating a multidimensional array
    if (key.includes('[')) {
      // comma separated value array inputs
      if (value.includes(',')) {
        parsed[key.replace('[]', '')] = value.split(',')
      } else {
        // Split the key into parts based on square brackets
        const keys = key.split('[').map(k => k.replace(']', ''))
        let obj = parsed

        // Iterate over the keys to build the nested object structure
        for (let i = 0; i < keys.length - 1; i++) {
          const currentKey = keys[i]
          const nextKey = keys[i + 1]

          // Determine whether the current key should be an object or an array
          if (!obj[currentKey]) {
            obj[currentKey] = isNaN(Number(nextKey)) ? {} : []
          }

          // Traverse deeper into the object structure
          obj = obj[currentKey]
        }

        // Assign the value to the final key in the nested structure
        obj[keys[keys.length - 1]] = value

      }
    } else {
      // If the key does not contain square brackets, simply assign the value
      parsed[key] = value
    }
  }

  return parsed
}

export function importImgDir(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item).default
  });
  return images;
}