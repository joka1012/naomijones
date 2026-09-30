import type { NavOptions } from "../NavOptions";
import styles from "./index.module.scss";
import { motion } from "motion/react";

const anim = {
  initial: {
    opacity: 1,
  },
  open: (i: number) => ({
    opacity: 1,
    transition: { duration: 0, delay: 0.03 * i },
  }),
  closed: (i: number) => ({
    opacity: 0,
    transition: { duration: 0, delay: 0.03 * i },
  }),
};

const colors = {
  home: "#ffffff",
  work: "#9ea8c7",
  about: "#c8ccd9",
  contact: "#7b89b7",
};

type Props = {
  menuIsActive: boolean;
  navOption: NavOptions;
};

export default function index({ menuIsActive, navOption }: Props) {
  const shuffle = (a: number[]): number[] => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };
  const getBlocks = (indexOfColumn: number) => {
    const { innerWidth, innerHeight } = window;
    const blockSize = innerWidth * 0.05;
    const amountOfBlocks = Math.ceil(innerHeight / blockSize);
    const delays = shuffle([...Array(amountOfBlocks)].map((_, i) => i));
    return delays.map((randomDelay, i) => {
      return (
        <motion.div
          className={styles.block}
          variants={anim}
          initial={false}
          animate={menuIsActive ? "open" : "closed"}
          custom={indexOfColumn + randomDelay}
        ></motion.div>
      );
    });
  };
  return (
    <div
      className={styles.pixelBackground}
      style={
        {
          "--pixel-color": colors[navOption],
        } as React.CSSProperties
      }
    >
      {[...Array(20)].map((_, i) => {
        return <div className={styles.column}>{getBlocks(i)}</div>;
      })}
    </div>
  );
}
