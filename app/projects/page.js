'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ProjectItem from "@/lib/ProjectItem";
import { useEffect, useState } from "react"

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [isLoading, setLoading] = useState(true)

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
      <div className="filter-bar">
        <FontAwesomeIcon icon={faFilter} />
        <input className="search-box" placeholder="Search projects.." />
      </div>
      {isLoading ? 'Loading..' :
        <div className="project-list">
          {projects ? projects.map((project) => (<ProjectItem key={project.EntityId} project={project} />)) : 'No results found.'}
        </div>
      }
    </main>
  )
}
