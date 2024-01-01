import ProjectItem from "@/components/ProjectItem";
import Loader from './Loader';
import { db } from '@/lib/db';

export default async function ProjectList(params) {
  const projects = await db.project.search(params.q)

  return (<section className="project-list">
    {
      projects && projects.length > 0 ? projects.reverse().map((project) => (<ProjectItem key={project._entityId} project={project} />)) : 'No results found.'
    }
  </section>);
}