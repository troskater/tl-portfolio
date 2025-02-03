import Img from "@/components/Img"
import { Special_Elite } from 'next/font/google'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward, faTable } from "@fortawesome/free-solid-svg-icons";
import { db } from "@/lib/db";

const font = Special_Elite({ subsets: ['latin'], weight: '400', })

export default async function Page({ params }) {
  const p = await params
  const project = await db.project.getBySlug(p.slug)

  return <main>
    <article className="project">
      <nav>
        {project.prev ? <Link href={"/projects/" + project.prev.slug}>
          <FontAwesomeIcon icon={faBackward} title={project.prev.title} />
        </Link> : <Link href="/projects">
          <FontAwesomeIcon icon={faTable} title="Back to Projects" />
        </Link>}
        {project.next ? <Link href={"/projects/" + project.next.slug}>
          <FontAwesomeIcon icon={faForward} title={project.next.title} />
        </Link> : <Link href="/projects">
          <FontAwesomeIcon icon={faTable} title="Back to Projects" />
        </Link>}
      </nav>
      <Img src={project.thumb ? "projects/" + project.thumb.src : ''} className="white-fade" fit={project.thumb.src.includes('logo') ? 'contain' : ''} priority={true}>
        <aside>
          <p className="year">{project.year}</p>
          <a href={'http://' + project.url} target="_blank" className="url">{project.url}</a>
        </aside>
        <h3 className={font.className + ' title'}>{project.title}</h3>
        <p className="headline">{project.headline}</p>
      </Img>
      <section className="meta">
        <div className="roles">{project.roles.map(role => (
          <span key={role} className="role">{role}</span>
        ))}</div>
        <span className="tags">{project.tags.map(tag => (
          <button key={tag} className="tag" disabled>{tag}</button>
        ))}</span>
      </section>
      <section className="images">
        {project.additionalImages.map(img => (
          <Img key={img._entityId} src={"projects/" + img.src} className="white-content-box" showDialog>
            <p>{img.caption}</p>
          </Img>
        ))}
      </section>
      <section className="description">
        <p>{project.description}
        </p>
      </section>
    </article>
  </main>
}