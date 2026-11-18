'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const frameworks = [
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
  const searchTimer = useRef(null)

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
      {/* wait for a pause in typing, each change is a server render and a Redis query */}
      <input defaultValue={searchParams.get('title') ?? ''} onChange={e => {
        const value = e.target.value
        clearTimeout(searchTimer.current)
        searchTimer.current = setTimeout(() => router.replace(pathname + '?' + createQueryString('title', value)), 300)
      }} type="text" placeholder="Search projects.." />
    </section>
    <section className="filters" style={{ height: (showFilters ? '50px' : '0') }}>
      <select defaultValue={searchParams.get('sort') ?? ''} onChange={e => {
        router.replace(pathname + '?' + createQueryString('sort', e.target.value))
      }}>
        <option value="">Default</option>
        <option value="year,DESC">Most Recent</option>
        <option value="year,ASC">Oldest</option>
      </select>
      {frameworks.map((framework) => (<button key={framework} onClick={() => {
        router.replace(pathname + '?' + createQueryString('tag', searchParams.get('tag') == framework ? '' : framework))
      }} className={searchParams.get('tag') == framework ? 'active' : ''}
      >{framework}</button>))}
    </section>
  </>);
}