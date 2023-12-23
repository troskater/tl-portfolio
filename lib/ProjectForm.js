'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd, faRemove } from "@fortawesome/free-solid-svg-icons";
import { uc } from "./helpers"
import { Input } from "./Input";
import { useState } from "react";
import { formSchemas } from "./schemas";

const fields = []
for (const [k, v] of Object.entries(formSchemas.project)) {
  parseFields(k, v)
}
// console.log(fields)

function parseFields(key, field, parent) {
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

  if (isArray && field.params) {
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
      parseFields(k, v, f)
    }
  }

  if (parent) parent.children.push(f)
  else fields.push(f)
}


// console.log(schema)
export default function ProjectForm() {
  const [total, setTotal] = useState(1)

  // handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // get form data
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    // format data
    formData.enabled = Boolean(formData.enabled)

    // parse arrays
    const parsed = {};
    for (const [key, value] of Object.entries(formData)) {
      if (key.includes('[')) {
        if (value.includes(',')) {
          parsed[key] = value.split(',');

          // number array
          if ('year' == key) parsed[key].map((v, k) => parsed[key][k] = Number(v))
        } else {
          const keys = key.split('[').map(k => k.replace(']', ''));
          let obj = parsed;

          for (let i = 0; i < keys.length - 1; i++) {
            const currentKey = keys[i];
            const nextKey = keys[i + 1];

            if (!obj[currentKey]) {
              obj[currentKey] = isNaN(Number(nextKey)) ? {} : [];
            }

            obj = obj[currentKey];
          }

          obj[keys[keys.length - 1]] = value;

        }
      } else {
        parsed[key] = value;
      }
    }

    parsed.images.map((v, k) => {
      parsed.images[k]['sort_order'] = Number(v.sort_order)
      if (v.is_thumb) parsed.images[k]['is_thumb'] = Number(v.is_thumb)
      if (v.is_logo) parsed.images[k]['is_logo'] = Number(v.is_logo)
    })

    console.log(parsed);

    // post to api
    const res = await fetch('/api/projects/new', {
      body: JSON.stringify(parsed),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    // get result
    const result = await res.json();
    // console.log(result)
  };
  // console.log(fields)

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h3>Add Project</h3>
      <div className="fields">
        {fields.map((f) => (
          f.children.length > 0 ? (
            <div key={f._key} className="children">
              {/* loop total amount of times */}
              {total ? [...Array(total)].map((e, i) => (
                <div key={i} className="child">
                  {/* output child fields */}
                  {f.children.map((c) => (
                    <Input key={f._key + '_' + c._key + '_' + i} {...c} parent={f} index={i} />
                  ))}
                  {total > 1 && i == (total - 1) ? <div className="remove">
                    <FontAwesomeIcon icon={faRemove} onClick={() => setTotal(total - 1)} />
                  </div> : ''}
                </div>
              )) : ''}
              <div className="add" onClick={() => setTotal(total + 1)}>
                Add <FontAwesomeIcon icon={faAdd} />
              </div>
            </div>
          ) : <Input key={f._key} {...f} />
        ))}
        {/* <input name="title" type="text" placeholder="Title" />
      <input name="desc" type="text" placeholder="Desc" />
      <input name="screenshot" type="text" placeholder="Screenshot" />
      <input name="logo" type="text" placeholder="Logo" />
      <input name="year" type="number" placeholder="Year" />
      <input name="enabled" type="hidden" value="true" /> */}
        {/* tags */}
      </div>

      <button type="submit">Add Project</button>
    </form>
  );
}