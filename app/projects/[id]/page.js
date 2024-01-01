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
      .then((project) => {
        // console.log('setting projects', data)
        // reverse due to reversed flexbox order to expand first row items
        setProject(project)
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

  return <main>
    {isLoading
      ? <Loader text="Loading project.." />
      : <div className="project">
        <nav>
          {project.prev ? <Link href={"/projects/" + project.prev._entityId}>
            <FontAwesomeIcon icon={faBackward} title={project.prev.title} />
          </Link> : <Link href="/projects">
            <FontAwesomeIcon icon={faTable} title="Back to Projects" />
          </Link>}
          {project.next ? <Link href={"/projects/" + project.next._entityId}>
            <FontAwesomeIcon icon={faForward} title={project.next.title} />
          </Link> : <Link href="/projects">
            <FontAwesomeIcon icon={faTable} title="Back to Projects" />
          </Link>}
        </nav>
        <Img src={project.thumb ? "projects/" + project.thumb.src : ''} className="white-fade" fit={project.thumb.src.includes('logo') ? 'contain' : ''} priority={true}>
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