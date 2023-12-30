import Image from "next/image";
import Link from "next/link";

function getImage(skill) {
  const img = {
    'wordpress': 'Wordpress-Logo',
    'illustrator': 'Adobe_Illustrator_CC_icon',
    'photoshop': 'Adobe_Photoshop_CC_icon',
    'angular': 'Angular_full_color_logo',
    'bootstrap': 'bootstrap-svgrepo-com',
    'c': 'C_Programming_Language',
    'css': 'CSS3_logo',
    'docker': 'docker-svgrepo-com',
    'figma': 'Figma-logo',
    'firebase': 'firebase-svgrepo-com',
    'git': 'Git_icon',
    'docs': 'Google_Docs_logo_(2014-2020)',
    'sheets': 'Google_Sheets_logo_(2014-2020)',
    'graphql': 'GraphQL_Logo',
    'html': 'HTML5_Badge',
    'mariadb': 'https___mariadb.com_wp-content_uploads_2019_11_mariadb-logo-vertical_blue',
    'jira': 'jira-svgrepo-com',
    'jquery': 'jquery-icon',
    'laravel': 'laravel',
    'less': 'less-svgrepo-com',
    'csharp': 'Logo_C_sharp',
    'lumen': 'lumen-svgrepo-com',
    'teams': 'Microsoft_Office_Teams_(2018–present)',
    'mysql': 'mysql-logo-svgrepo-com',
    'nextjs': 'Nextjs-logo',
    'nodejs': 'nodejs',
    'opencart': 'OpenCart_icon',
    'php': 'php-logo',
    'react': 'React-icon',
    'redis': 'redis-logo-svgrepo-com',
    'sass': 'Sass_Logo_Color',
    'slack': 'Slack_icon_2019',
    'tailwind': 'Tailwind_CSS_Logo',
    'javascript': 'Unofficial_JavaScript_logo_2',
    'vegas': 'Vegas_Pro_14',
    'vscode': 'Visual_Studio_Code_1.35_icon',
    'vue': 'Vue.js_Logo_2',
    'woocommerce': 'WooCommerce_logo'
  }
  return img[skill]
}

export default function SkillLink(props) {
  const label = props.skill
  const icon = getImage(props.skill)

  return (
    <Link href="/projects" className="skill">
      {(icon ? <Image
        src={'/img/skills/' + icon + '.svg'}
        width={48}
        height={48}
        sizes="3rem"
        style={{ width: '100%', height: 'auto' }}
        alt={label}
      /> : '')}
    </Link>
  );
}