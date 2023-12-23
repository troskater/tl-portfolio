'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ProjectItem from "@/components/ProjectItem";
import { useEffect, useState } from "react"

const skills = [
  'HTML',
  'CSS',
  'PHP',
  'JavaScript',
  'Wordpress',
  'WooCommerce',
  'Laravel',
  'Lumen',
  'OpenCart',
  'Next.js',
]
const endpoint = 'api/projects'

export default function ProjectList() {
  const [query, setQuery] = useState(false);
  const [showFilters, setShowFilters] = useState(false)
  const [projects, setProjects] = useState([])
  const [isLoading, setLoading] = useState(true)

  // load projects
  useEffect(() => {
    // init
    setLoading(true)
    let params = {}

    // check for query
    if (query.length > 2) {
      params = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: query,
        })
      }
    }

    // set request
    fetch(endpoint, params)
      // get response
      .then((res) => res.json())
      // set
      .then((data) => {
        // console.log('setting projects', data)
        setProjects(data)
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
      <FontAwesomeIcon icon={faFilter} onClick={() => setShowFilters(!showFilters)} />
      <input onChange={e => setQuery(e.target.value)} type="text" placeholder="Search projects.." />
    </div>
    <div className="filters" style={{ height: (showFilters ? '50px' : '0') }}>
      <select name="order-by">
        <option value="">Most Recent</option>
        <option value="">Oldest</option>
      </select>
      {skills.map((skill) => (<button key={skill}>{skill}</button>))}
    </div>
    <div className="project-list">
      {isLoading ? 'Loading projects..' :
        projects ? projects.map((project) => (<ProjectItem key={project._entityId} project={project} />)) : 'No results found.'
      }
    </div>
  </>);
}