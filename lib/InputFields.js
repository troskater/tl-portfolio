import { formSchemas } from "./schemas"

export class InputFields {
  fields = []

  constructor(name) {
    for (const [k, v] of Object.entries(formSchemas[name])) {
      this.generateInputData(k, v)
    }
    return this.fields
  }

  generateInputData(key, field, parent) {
    let type = 'text'
    let name = key
    let label = parent ? parent._key + '.' + key : key
    let isArray = false
    switch (field.type) {
      case 'boolean':
        type = 'checkbox'
        break
      case 'number':
        type = 'number'
        break
      case 'number[]':
      case 'string[]':
        label = label + ' (comma separated)'
        isArray = true
        break
    }

    if (isArray) {
      name = name + '[]'
    }

    let f = {
      '_key': key,
      'type': type,
      'name': name,
      'label': label,
      'isArray': isArray,
      'children': []
    }

    if (field.params) {
      for (const [k, v] of Object.entries(field.params)) {
        this.generateInputData(k, v, f)
      }
    }

    if (parent) parent.children.push(f)
    else this.fields.push(f)
  }
}