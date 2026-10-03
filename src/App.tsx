import {
  Routes,
  Route,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Work from "./components/Work";
import Home from "./components/Home";
import styles from "./App.module.css";
import { useEffect, useState } from "react";
import PixelBackground from "./components/pixelBackground";
import type { NavOptions } from "./components/NavOptions";

function App() {
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [navOption, setNavOption] = useState<NavOptions>("home");

  const location = useLocation();
  const navigate = useNavigate();
  let image;
  switch (location.pathname) {
    case "/work":
      image = "naomijones/layered-steps-haikei-work.svg";
      break;
    case "/about":
      image = "naomijones/layered-steps-haikei-about.svg";
      break;
    case "/contact":
      image = "naomijones/layered-steps-haikei-contact.svg";
      break;
  }

  useEffect(() => {
    setMenuIsActive(false);
  }, [location.pathname]);

  console.log(location.pathname, image);

  function navEvent(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    subdomain: string,
  ) {
    e.preventDefault();

    setMenuIsActive(true);
    switch (subdomain) {
      case "home":
        setNavOption("home");
        break;
      case "work":
        setNavOption("work");
        break;
      case "about":
        setNavOption("about");
        break;
      case "contact":
        setNavOption("contact");
        break;
      default:
        console.log("Unbekannt");
    }

    setTimeout(() => {
      navigate("/" + subdomain);
    }, 1300);
  }
  return (
    <>
      <PixelBackground menuIsActive={menuIsActive} navOption={navOption} />
      <div className={styles.container}>
        <nav className={styles.navcontainer}>
          <Link to="/" className={styles.navbtn}>
            Naomi Jones
          </Link>
          <div>
            <Link
              to="/work"
              onClick={(e) => {
                if (location.pathname !== "/work") {
                  navEvent(e, "work");
                }
              }}
              className={styles.navbtn}
            >
              Work
            </Link>
            <Link
              to="/about"
              onClick={(e) => {
                if (location.pathname !== "/about") {
                  navEvent(e, "about");
                }
              }}
              className={styles.navbtn}
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={(e) => {
                if (location.pathname !== "/contact") {
                  navEvent(e, "contact");
                }
              }}
              className={styles.navbtn}
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <div
        className={styles.spacer}
        style={{
          backgroundImage: image ? `url(/${image})` : "none",
        }}
      >
        {location.pathname !== "/" && (
          <div className={styles.socials}>
            <a className={styles.socialBtn}>LinkedIn</a>
            <a className={styles.socialBtn}>Instagram</a>
            <a className={styles.socialBtn}>naomijones@gmail.com</a>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
