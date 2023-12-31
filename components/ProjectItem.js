import Img from "@/components/Img"
import { Special_Elite } from 'next/font/google'
import Link from "next/link";

const font = Special_Elite({ subsets: ['latin'], weight: '400', })

export default function ProjectItem({ project }) {
  // console.log(key, project)
  return (
    <Link href={'/projects/' + project._entityId} className={"item " + project.type}>
      <Img src={project.thumb ? "projects/" + project.thumb.src : ''} className="white-fade" fit={project.thumb.src.includes('logo') ? 'contain' : ''}>
        <h3 className={font.className}>{project.title}</h3>
        <p>{project.headline}</p>
      </Img>
    </Link>
  );
}