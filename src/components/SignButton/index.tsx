import { signIn, signOut, useSession } from "next-auth/client";

import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX, FiLogOut } from "react-icons/fi";

export function SignButton() {
  const [session] = useSession();

  //const session = false;
  return session ? (
    <button
      type="button"
      className={styles.signButton}
      onClick={() => signOut()}
    >
      <img src={session.user && session.user.image} alt="foto de perfil" />
      Olá,
      <span
        style={{
          display: "wbekitBox",
          textOverflow: "clip",
          width: "98px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          webkitLineClamp: "10",
        }}
      >
        {session.user && session.user.name}
      </span>
      <FiLogOut color="#1fd486" className={styles.logoutIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signButton}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#1fd486" />
      Logar com Github
    </button>
  );
}
