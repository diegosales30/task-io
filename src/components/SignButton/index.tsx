import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX, FiLogOut } from "react-icons/fi";

export function SignButton() {
  const session = true;
  return session ? (
    <button type="button" className={styles.signButton} onClick={() => {}}>
      <img
        src="https://avatars.githubusercontent.com/u/95250284?v=4"
        alt="foto de perfil"
      />
      <FiLogOut color="#3ad586" className={styles.logoutIcon} />
    </button>
  ) : (
    <button type="button" className={styles.signButton} onClick={() => {}}>
      <FaGithub color="#3ad586" />
      Logar com Github
    </button>
  );
}
