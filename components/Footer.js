import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-right">
      <span>Built from scratch.</span>
      <a href="#">View Source</a>
      <span className="copy">&copy;{currentYear} Troy L.</span>
    </footer>
  );
}