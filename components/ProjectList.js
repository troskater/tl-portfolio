'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ProjectItem from "@/components/ProjectItem";
import { useEffect, useState } from "react"
import Loader from './Loader';

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
const endpoint = '/api/projects'

export default function ProjectList() {
  const [query, setQuery] = useState({
    title: '',
    sortBy: 'sort_order',
    sort: 'ASC',
    tags: []
  });
  const [showFilters, setShowFilters] = useState(false)
  const [projects, setProjects] = useState([])
  const [isLoading, setLoading] = useState(true)

  // load projects
  useEffect(() => {
    // init
    setLoading(true)
    let params = {}

    // check for query
    params = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    }

    // set request
    fetch(endpoint, params)
      // get response
      .then((res) => res.json())
      // set
      .then((data) => {
        // console.log('setting projects', data)
        // use data.reverse() if flexbox order is reversed to expand first row items
        setProjects(data.reverse())
        setLoading(false)
      })
      // check for errors
      .catch(error => {
        if (error.status === 404) {
          // handle 404 error
          console.log('Error 404: "' + endpoint + '" not found')
          setLoading(false)
        } else {
          // handle other errors
          console.log('error', error)
          setLoading(false)
        }
      })
  }, [query])

  return (<>
    <div className="search-bar">
      <FontAwesomeIcon icon={faFilter} onClick={() => setShowFilters(!showFilters)} title="Filters" />
      <input onChange={e => setQuery({ ...query, 'title': e.target.value })} type="text" placeholder="Search projects.." />
    </div>
    <div className="filters" style={{ height: (showFilters ? '50px' : '0') }}>
      <select onChange={e => {
        setQuery({ ...query, 'sortBy': e.target.value.split(',')[0], 'sort': e.target.value.split(',')[1] })
      }}>
        <option value="sort_order,ASC">Default</option>
        <option value="year,DESC">Most Recent</option>
        <option value="year,ASC">Oldest</option>
      </select>
      {skills.map((skill) => (<button key={skill} onClick={e => {
        query.tags.includes(skill) ? setQuery({ ...query, 'tags': [] }) : setQuery({ ...query, 'tags': [skill] })
      }} className={query.tags.includes(skill) ? 'active' : ''}>{skill}</button>))}
    </div>
    <div className="project-list">
      {isLoading && projects.length <= 0 ? <Loader text="Loading projects.." /> :
        projects ? projects.map((project) => (<ProjectItem key={project._entityId} project={project} />)) : 'No results found.'
      }
    </div>
  </>);
}