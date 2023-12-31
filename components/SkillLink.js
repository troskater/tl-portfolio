import { importImgDir } from "@/lib/helpers";
import Image from "next/image";
import Link from "next/link";

// import images
const images = importImgDir(require.context('../public/img/skills', false, /\.(png|jpe?g|svg|js)$/));

export default function SkillLink(props) {
  const label = props.skill
  const icon = images[props.skill + '.svg']

  return (
    <Link href="/projects" className="skill">
      {(icon ? <Image
        src={icon}
        width={48}
        height={48}
        sizes="3rem"
        style={{ width: '100%', height: 'auto' }}
        alt={label}
      /> : '')}
    </Link>
  );
}