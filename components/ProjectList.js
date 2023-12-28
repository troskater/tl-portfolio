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
  const [query, setQuery] = useState(false);
  const [showFilters, setShowFilters] = useState(false)
  const [projects, setProjects] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('sort_order');
  const [sort, setSort] = useState('ASC');
  const [tags, setTags] = useState([]);

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
      body: JSON.stringify({
        title: query.length > 2 ? query : '',
        sortBy: sortBy,
        sort: sort,
        tags: tags,
      })
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
  }, [query, sortBy, sort, tags])

  return (<>
    <div className="search-bar">
      <FontAwesomeIcon icon={faFilter} onClick={() => setShowFilters(!showFilters)} title="Filters" />
      <input onChange={e => setQuery(e.target.value)} type="text" placeholder="Search projects.." />
    </div>
    <div className="filters" style={{ height: (showFilters ? '50px' : '0') }}>
      <select onChange={e => {
        setSortBy(e.target.value.split(',')[0])
        setSort(e.target.value.split(',')[1])
      }}>
        <option value="sort_order,ASC">Default</option>
        <option value="year,DESC">Most Recent</option>
        <option value="year,ASC">Oldest</option>
      </select>
      {skills.map((skill) => (<button key={skill} onClick={e => {
        tags.includes(skill) ? setTags([]) : setTags([skill])
        // tags.includes(skill) ? setTags(tags.filter((s) => s !== skill)) : setTags([...tags, skill])
      }} className={tags.includes(skill) ? 'active' : ''}>{skill}</button>))}
    </div>
    <div className="project-list">
      {isLoading && projects.length <= 0 ? <Loader text="Loading projects.." /> :
        projects ? projects.map((project) => (<ProjectItem key={project._entityId} project={project} />)) : 'No results found.'
      }
    </div>
  </>);
}