import Link from "../../../node_modules/next/link";
import styles from "./styles.module.scss";
import logo from "../../../public/images/logo.png";
import Image from "../../../node_modules/next/image";
import { SignButton } from "../SignButton/index";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <img src="../images/logo.png" alt="logo" />
        </Link>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/tasks">
            <a>My Tasks</a>
          </Link>
        </nav>
        <SignButton />
      </div>
    </header>
  );
}
