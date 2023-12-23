import Link from "next/link";
import { Special_Elite } from 'next/font/google'
import SkillLink from "./SkillLink";

const font = Special_Elite({ subsets: ['latin'], weight: '400', })

export default function Skills() {
  return (
    <div>
      <div className="skills">
        <h3 className={font.className}>Languages</h3>
        <h4>(I’m most proficient in)</h4>
        <div className="icons">
          <SkillLink skill="html" />
          <SkillLink skill="css" />
          <SkillLink skill="php" />
          <SkillLink skill="javascript" />
          <SkillLink skill="c" />
          <SkillLink skill="csharp" />
        </div>
      </div>
      <div className="skills">
        <h3 className={font.className}>Frameworks</h3>
        <h4>(I’m most familiar with)</h4>
        <div className="icons">
          <SkillLink skill="wordpress" />
          <SkillLink skill="woocommerce" />
          <SkillLink skill="jquery" />
          <SkillLink skill="laravel" />
          <SkillLink skill="lumen" />
          <SkillLink skill="opencart" />
          <SkillLink skill="nextjs" />
          <SkillLink skill="react" />
          <SkillLink skill="vue" />
          <SkillLink skill="angular" />
        </div>
      </div>
      <div className="skills">
        <h3 className={font.className}>Libraries</h3>
        <h4>(I’ve spent the most time with)</h4>
        <div className="icons">
          <SkillLink skill="mysql" />
          <SkillLink skill="mariadb" />
          <SkillLink skill="git" />
          <SkillLink skill="less" />
          <SkillLink skill="sass" />
          <SkillLink skill="tailwind" />
          <SkillLink skill="bootstrap" />
          <SkillLink skill="redis" />
          <SkillLink skill="graphql" />
        </div>
      </div>
      <div className="skills">
        <h3 className={font.className}>Tools</h3>
        <h4>(I utilize the most)</h4>
        <div className="icons">
          <SkillLink skill="vscode" />
          <SkillLink skill="photoshop" />
          <SkillLink skill="illustrator" />
          <SkillLink skill="docs" />
          <SkillLink skill="sheets" />
          <SkillLink skill="jira" />
          <SkillLink skill="teams" />
          <SkillLink skill="figma" />
          <SkillLink skill="docker" />
          <SkillLink skill="firebase" />
        </div>
      </div>
    </div>
  );
}