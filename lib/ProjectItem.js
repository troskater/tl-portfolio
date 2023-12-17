import Img from "@/lib/Img"
import { Special_Elite } from 'next/font/google'

const font = Special_Elite({ subsets: ['latin'], weight: '400', })

export default function ProjectItem({ project }) {
  // console.log(project)
  return (
    <div className="item">
      {project.screenshot ? <Img src={"projects/screenshots/" + project.screenshot} /> : ''}
      <h3 className={font.className}>{project.title}</h3>
      <p>{project.desc}</p>
    </div>
  );
}