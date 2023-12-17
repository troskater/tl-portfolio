'use client'

import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export default function NavMenu() {
  const pathname = usePathname()

  return (
    <nav className="header-menu">
      <Link href="/" className={(pathname == "/" ? " active" : "")}><FontAwesomeIcon icon={faHome} /></Link>
      <Link href="/projects" className={(pathname == "/projects" ? " active" : "")}>Projects</Link>
      <a href="https://linkedin.com/in/troskater"><FontAwesomeIcon icon={faLinkedin} /></a>
      <a href="https://github.com/troskater"><FontAwesomeIcon icon={faGithub} /></a>
    </nav>
  );
}