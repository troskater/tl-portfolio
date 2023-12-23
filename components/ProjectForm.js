'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd, faRemove } from "@fortawesome/free-solid-svg-icons";
import { Input } from "./Input";
import { useState } from "react";
import { parseFormDataArrays } from "@/lib/helpers";
import { InputFields } from "@/lib/InputFields";

// get InputFields object
const fields = new InputFields('project')

// console.log(schema)
export default function ProjectForm() {
  const [total, setTotal] = useState(1)

  // handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // get form data
    const formData = parseFormDataArrays(new FormData(event.target));

    // format data
    formData.enabled = Boolean(formData.enabled)
    if (formData.year && formData.year.length > 0) formData.year.map((v, k) => formData.year[k] = Number(v))
    if (formData.images && formData.images.length > 0) {
      formData.images.map((v, k) => {
        formData.images[k]['sort_order'] = Number(v.sort_order)
        if (v.is_thumb) formData.images[k]['is_thumb'] = Boolean(v.is_thumb)
        if (v.is_logo) formData.images[k]['is_logo'] = Boolean(v.is_logo)
      })
    }

    // console.log(formData);

    // post to api
    const res = await fetch('/api/projects/new', {
      body: JSON.stringify(formData),
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
        {fields.length > 0 ? fields.map((f) => (
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
        )) : ''}
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