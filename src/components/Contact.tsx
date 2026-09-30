import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
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
    <div className={styles.contactContainer}>
      <div className={styles.contactContentContainer}>
        <h1 className="fade-in">Let's work together!</h1>
        <div className={styles.contactContent}>
          <form>
            <input
              placeholder="Your name"
              className={`fade-in ${styles.input}`}
            ></input>
            <input
              placeholder="Your email"
              className={`fade-in ${styles.input}`}
            ></input>
            <textarea
              placeholder="Your message.."
              className={`fade-in ${styles.input}`}
            ></textarea>
            <button type="submit" className={`fade-in ${styles.submitBtn}`}>
              Send
            </button>
          </form>
          <div className={styles.contactInfoContainer}>
            <h5 className="fade-in">Contact details</h5>
            <a className={`fade-in ${styles.contactInfo}`}>
              naomijones@gmail.com
            </a>
            <a className={`fade-in ${styles.contactInfo}`}>+49 123 4567890</a>
            <a className={`fade-in ${styles.contactInfo}`}>Cologne/Germany</a>
            <h5 className="fade-in">Socials</h5>
            <a className={`fade-in ${styles.contactInfo}`}>LinkedIn</a>
            <a className={`fade-in ${styles.contactInfo}`}>Instagram</a>
            <a className={`fade-in ${styles.contactInfo}`}>Twitter</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
