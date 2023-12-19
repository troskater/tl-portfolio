import Img from "@/lib/Img";

export default function About() {
  return (
    <div className="about">
      <section>
        <Img src="PXL_20231127_214820021.jpg" src2="IMG_0882.jpg" className="desktop-only" />
        <div className="text">
          <p>With over 12 years in full-stack web development and nearly 20 years building websites, I began with personal projects and transitioned to custom sites for small to medium businesses, enhancing automation and workflow.</p>
          <Img src="PXL_20231127_214820021.jpg" src2="IMG_0882.jpg" className="mobile-only" />
          <p>Although I specialize in the LAMP stack for backend development, I'm also skilled in frontend frameworks including jQuery, Next.js, Angular, and Vue. Additionally, I have experience creating custom themes and plugins for WordPress/WooCommerce, developing OpenCart extensions, and crafting custom Laravel sites with Lumen APIs.</p>
        </div>
      </section>
      <section>
        <div className="text">
          <Img src="PXL_20231211_224952055.jpg" className="mobile-only" />
          <p>Beyond coding, I have a knack for web design, video editing, and animation, mastering tools in the Adobe suite. Outside of work, I enjoy skateboarding, quality time with family and friends, and tinkering with cars, retro games, and electronics.</p>
        </div>
        <Img src="PXL_20231211_224952055.jpg" className="desktop-only" />
      </section>
    </div>
  );
}