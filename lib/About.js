import Img from "@/lib/Img";

export default function About() {
  return (
    <div className="about">
      <section>
        <Img src="PXL_20231127_214820021.jpg" src2="IMG_0882.jpg" className="desktop-only" />
        <div className="text">
          <p>I have over 12 years experience working as a full stack web developer, and I&apos;ve been building websites for almost 20. I started off working on my own personal projects and moved on to creating full custom and turn-key websites for small to medium sized businesses, helping them automate processes and streamline their workflow.</p>
          <Img src="PXL_20231127_214820021.jpg" src2="IMG_0882.jpg" className="mobile-only" />
          <p>I&apos;ve primarily worked with the LAMP stack backend development architecture, however I&apos;m also quite comfortable using frontend frameworks such as jQuery, Next.js, Angular, and Vue. I have extensive experience developing custom themes and plugins for wordpress/woocommerce sites, extensions for OpenCart, as well as full custom Laravel sites and Lumen APIs.</p>
        </div>
      </section>
      <section>
        <div className="text">
          <p>Although web development is my forte, I also have a background in web design, video editing, and animation. I&apos;m quite proficient using the Adobe suite, and have always had an interest in the visual side of things.</p>
          <Img src="PXL_20231211_224952055.jpg" className="mobile-only" />
          <p>When I&apos;m not working I love to skateboard, and like to spend my free time with family and friends, or tinkering with cars and retro games and electronics.</p>
        </div>
        <Img src="PXL_20231211_224952055.jpg" className="desktop-only" />
      </section>
    </div>
  );
}