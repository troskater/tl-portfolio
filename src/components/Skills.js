import { Special_Elite } from 'next/font/google'
import SkillLink from "./SkillLink";

const font = Special_Elite({ subsets: ['latin'], weight: '400', })

export default function Skills() {
  return (
    <section>
      <div className="skills">
        <h3 className={font.className}>Languages</h3>
        <h4>(I&apos;m most proficient in)</h4>
        <div className="icons">
          <SkillLink skill="html" label="HTML/XML" />
          <SkillLink skill="css" label="CSS/LESS/SASS" />
          <SkillLink skill="php" label="PHP" />
          <SkillLink skill="javascript" label="JavaScript/NodeJS" />
          <SkillLink skill="c" label="C" />
          <SkillLink skill="csharp" label="C#" />
        </div>
      </div>
      <div className="skills">
        <h3 className={font.className}>Frameworks</h3>
        <h4>(I&apos;m most familiar with)</h4>
        <div className="icons">
          <SkillLink skill="wordpress" label="Wordpress/WooCommerce" />
          <SkillLink skill="jquery" label="jQuery/jQuery UI" />
          <SkillLink skill="laravel" label="Laravel/Lumen" />
          <SkillLink skill="opencart" label="OpenCart" />
          <SkillLink skill="react" label="React/NEXT.JS" />
          <SkillLink skill="webpack" label="webpack" />
        </div>
      </div>
      <div className="skills">
        <h3 className={font.className}>Libraries</h3>
        <h4>(I&apos;ve spent the most time with)</h4>
        <div className="icons">
          <SkillLink skill="mysql" label="MySQL/MariaDB" />
          <SkillLink skill="git" label="GIT" />
          <SkillLink skill="tailwind" label="Tailwind" />
          <SkillLink skill="bootstrap" label="Bootstrap" />
          <SkillLink skill="redis" label="Redis" />
        </div>
      </div>
      <div className="skills">
        <h3 className={font.className}>Tools</h3>
        <h4>(I utilize the most)</h4>
        <div className="icons">
          <SkillLink skill="vscode" label="VSCode" />
          <SkillLink skill="photoshop" label="Adobe Suite" />
          <SkillLink skill="docs" label="Google Docs/Sheets" />
          <SkillLink skill="jira" label="Jira" />
          <SkillLink skill="figma" label="Figma" />
          <SkillLink skill="docker" label="Docker" />
        </div>
      </div>
    </section>
  );
}