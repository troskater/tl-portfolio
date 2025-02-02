'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const skills = [
  // 'HTML',
  // 'CSS',
  // 'PHP',
  // 'JavaScript',
  'Wordpress',
  'WooCommerce',
  'Laravel',
  'Lumen',
  'OpenCart',
  'Next.js',
]

export default function ProjectFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (<>
    <section className="search-bar">
      <FontAwesomeIcon icon={faFilter} onClick={() => setShowFilters(!showFilters)} title="Filters" />
      <input onChange={e =>
        router.replace(pathname + '?' + createQueryString('title', e.target.value))
      } type="text" placeholder="Search projects.." />
    </section>
    <section className="filters" style={{ height: (showFilters ? '50px' : '0') }}>
      <select onChange={e => {
        router.replace(pathname + '?' + createQueryString('sort', e.target.value))
      }}>
        <option value="sort_order,ASC">Default</option>
        <option value="year,DESC">Most Recent</option>
        <option value="year,ASC">Oldest</option>
      </select>
      {skills.map((skill) => (<button key={skill} onClick={e => {
        router.replace(pathname + '?' + createQueryString('tag', searchParams.get('tag') == skill ? '' : skill))
      }} className={searchParams.get('tag') == skill ? 'active' : ''}
      >{skill}</button>))}
    </section>
  </>);
}