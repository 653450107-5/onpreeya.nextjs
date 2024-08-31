import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to ONPREEYA Website</h1>
      <p className={styles.description}>This is the first page of my website. Explore and enjoy!</p>
    </div>
  );
}
