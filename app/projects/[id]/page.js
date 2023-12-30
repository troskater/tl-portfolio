'use client'

import Img from "@/components/Img"
import { Special_Elite } from 'next/font/google'
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward, faTable } from "@fortawesome/free-solid-svg-icons";

const font = Special_Elite({ subsets: ['latin'], weight: '400', })
const endpoint = '/api/projects'

export default function Page({ params }) {
  const [isLoading, setLoading] = useState(true)
  const [project, setProject] = useState(null)
  const [nextProject, setNextProject] = useState(null)
  const [prevProject, setPrevProject] = useState(null)

  useEffect(() => {
    // init
    setLoading(true)

    // load project
    fetch(endpoint + '/' + params.id)
      // get response
      .then((res) => res.json())
      // set
      .then((data) => {
        // console.log('setting projects', data)
        // reverse due to reversed flexbox order to expand first row items
        setProject(data)
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
  }, [params])

  useEffect(() => {
    // get prev project
    if (project) fetch(endpoint + '/prev', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sort_order: project.sort_order
      })
    })
      // get response
      .then((res) => res.json())
      // set
      .then((data) => {
        // console.log('setting projects', data)
        // reverse due to reversed flexbox order to expand first row items
        setPrevProject(data)
      })
      // check for errors
      .catch(error => {
        if (error.status === 404) {
          // handle 404 error
          console.log('Error 404: "' + endpoint + '" not found')
        } else {
          // handle other errors
          console.log('error', error)
        }
      })
  }, [project])

  useEffect(() => {
    // get next project
    if (project) fetch(endpoint + '/next', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sort_order: project.sort_order
      })
    })
      // get response
      .then((res) => res.json())
      // set
      .then((data) => {
        // console.log('setting projects', data)
        // reverse due to reversed flexbox order to expand first row items
        setNextProject(data)
      })
      // check for errors
      .catch(error => {
        if (error.status === 404) {
          // handle 404 error
          console.log('Error 404: "' + endpoint + '" not found')
        } else {
          // handle other errors
          console.log('error', error)
        }
      })
  }, [project])

  return <main>
    {isLoading
      ? <Loader text="Loading project.." />
      : <div className="project">
        <nav>
          {prevProject ? <Link href={"/projects/" + prevProject._entityId}>
            <FontAwesomeIcon icon={faBackward} title={prevProject.title} />
          </Link> : <Link href="/projects">
            <FontAwesomeIcon icon={faTable} title="Back to Projects" />
          </Link>}
          {nextProject ? <Link href={"/projects/" + nextProject._entityId}>
            <FontAwesomeIcon icon={faForward} title={nextProject.title} />
          </Link> : <Link href="/projects">
            <FontAwesomeIcon icon={faTable} title="Back to Projects" />
          </Link>}
        </nav>
        <Img src={project.thumb ? "projects/" + project.thumb.src : ''} className={"white-fade" + (project.thumb.src.includes('logo') ? ' contain' : '')}>
          <aside>
            <p>{project.year}</p>
            <a href={'http://' + project.url} target="_blank">{project.url}</a>
          </aside>
          <h3 className={font.className}>{project.title}</h3>
          <p>{project.headline}</p>
        </Img>
        <div className="meta">
          <div className="roles">{project.roles.map(role => (
            <span key={role} className="role">{role}</span>
          ))}</div>
          <span className="tags">{project.tags.map(tag => (
            <button key={tag} className="tag" disabled>{tag}</button>
          ))}</span>
        </div>
        <div className="images">
          {project.additionalImages.map(img => (
            <Img key={img._entityId} src={"projects/" + img.src} className="white-content-box" showDialog>
              <p>{img.caption}</p>
            </Img>
          ))}
        </div>
        <article className="description">
          <p>{project.description}
          </p>
        </article>
      </div>
    }
  </main>
}