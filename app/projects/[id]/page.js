'use client'

import Img from "@/components/Img"
import { Special_Elite } from 'next/font/google'
import Loader from "@/components/Loader";
import ProjectItem from "@/components/ProjectItem";
import { useEffect, useState } from "react";

const font = Special_Elite({ subsets: ['latin'], weight: '400', })
const endpoint = '/api/projects'

export default function Page({ params }) {
  const [isLoading, setLoading] = useState(true)
  const [project, setProject] = useState(null)

  // load projects
  useEffect(() => {
    // init
    setLoading(true)

    // set request
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

  return <main>
    {isLoading
      ? <Loader text="Loading project.." />
      : <div className="project">
        <Img src={project.thumb ? "projects/" + project.thumb.src : ''} className={"white-fade" + (project.thumb.src.includes('logo') ? ' contain' : '')}>
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
            <Img key={img._entityId} src={"projects/" + img.src} className="white-fade" showDialog>
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