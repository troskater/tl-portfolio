'use client'

import { useState } from 'react';

export default function SarchForm() {
  const [hits, setHits] = useState([]);

  const search = async (event) => {
    const q = event.target.value;

    if (q.length > 2) {
      const params = {
        title: q,
      }

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      const result = await res.json();
      // console.log(result);
      setHits(result);
    }
  };

  return (
    <div>
      <input onChange={search} type="text" placeholder="Search a project.." />

      <ul>
        {hits.map((hit) => (
          <li key={hit.entityId}>
            {hit.title} {hit.year}
          </li>
        ))}
      </ul>
    </div>
  );
}