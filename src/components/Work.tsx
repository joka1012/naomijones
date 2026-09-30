import gsap from "gsap";
import styles from "./Work.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function Work() {
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".fade-in").forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
        },
      });
    });
  });

  return (
    <div className={styles.workContainer}>
      <div className={styles.workContent}>
        <h1 className="fade-in">
          I didn't bother supplying any details about my work
        </h1>
        <section className="fade-in">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem magnam
            non iusto impedit illum perferendis sed doloribus accusamus optio
            autem iste, sint temporibus eum. Necessitatibus corporis voluptas
            cum vel quam! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Nostrum voluptatem consequuntur architecto reiciendis nisi
            facere fugit eius ipsa cum eaque ipsam, dolorum totam deserunt
            labore maiores commodi quia, provident culpa.
          </p>
        </section>
        <section className="fade-in">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem magnam
            non iusto impedit illum perferendis sed doloribus accusamus optio
            autem iste, sint temporibus eum. Necessitatibus corporis voluptas
            cum vel quam!
          </p>
        </section>
        <section className="fade-in">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem magnam
            non iusto impedit illum perferendis sed doloribus accusamus optio
            autem iste, sint temporibus eum. Necessitatibus corporis voluptas
            cum vel quam!
          </p>
        </section>
        <section className="fade-in">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem magnam
            non iusto impedit illum perferendis sed doloribus accusamus optio
            autem iste, sint temporibus eum. Necessitatibus corporis voluptas
            cum vel quam!
          </p>
        </section>
        <section className="fade-in">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem magnam
            non iusto impedit illum perferendis sed doloribus accusamus optio
            autem iste, sint temporibus eum. Necessitatibus corporis voluptas
            cum vel quam!
          </p>
        </section>
      </div>
    </div>
  );
}

export default Work;
