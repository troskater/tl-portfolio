import Img from "@/components/Img"
import { Special_Elite } from 'next/font/google'

const font = Special_Elite({ subsets: ['latin'], weight: '400', })

export default function ProjectItem({ project }) {
  // console.log(key, project)
  return (
    <div className="item">
      {project.thumb ? <Img src={"projects/" + project.thumb.src} /> : ''}
      <h3 className={font.className}>{project.title}</h3>
      <p>{project.headline}</p>
    </div>
  );
}