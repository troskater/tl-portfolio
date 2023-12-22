// convert object to json and retain symbols
export function toJSON(obj) {
  return obj ? {
    ...Object.getOwnPropertyNames(obj).reduce((a, b) => {
      a[b] = obj[b];
      return a;
    }, {}), ...Object.getOwnPropertySymbols(obj).reduce((a, b) => {
      a['_' + b.description] = obj[b];
      return a;
    }, {})
  } : null
}

export function uc(word) {
  return word.charAt(0).toUpperCase()
    + word.slice(1)
}