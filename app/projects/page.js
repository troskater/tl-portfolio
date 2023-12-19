'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ProjectItem from "@/lib/ProjectItem";
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

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // load projects
  useEffect(() => {
    const url = 'api/projects'
    setLoading(true)

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const pd = JSON.parse(data)
        // console.log('setting projects', pd)
        setProjects(pd)
        setLoading(false)
      })
      .catch(error => {
        if (error.status === 404) {
          // handle 404 error
          console.log('Error 404: "' + url + '" not found')
          setLoading(false)
        } else {
          // handle other errors
          console.log('error', error)
          setLoading(false)
        }
      })
  }, [])

  return (
    <main>
      <div className="search-bar">
        <FontAwesomeIcon icon={faFilter} onClick={() => setShowFilters(!showFilters)} />
        <input placeholder="Search projects.." />
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
          projects ? projects.map((project) => (<ProjectItem key={project.EntityId} project={project} />)) : 'No results found.'
        }
      </div>
    </main >
  )
}
