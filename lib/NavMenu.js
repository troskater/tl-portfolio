import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function NavMenu() {
  return (
    <nav className="header-menu">
      <Link href="/"><FontAwesomeIcon icon={faHome} /></Link>
      <Link href="/projects">Projects</Link>
      <a href=""><FontAwesomeIcon icon={faLinkedin} /></a>
      <a href=""><FontAwesomeIcon icon={faGithub} /></a>
    </nav>
  );
}