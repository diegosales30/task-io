import { signIn, signOut, useSession } from "next-auth/client";

import styles from "./styles.module.scss";
import { FaGithub, FaFacebook } from "react-icons/fa";
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
          display: "webKitBox",
          textOverflow: "ellipsis",
          width: "110px",
          whiteSpace: "nowrap",
          overflow: "hidden",

          //webkitLineClamp: "11",
        }}
      >
        {session.user && session.user.name}
      </span>
      <FiLogOut color="#1fd486" className={styles.logoutIcon} />
    </button>
  ) : (
    <div className={styles.containerButton}>
      <p>Entrar com </p>

      <button
        type="button"
        className={styles.signButton}
        onClick={() => signIn("github")}
      >
        <FaGithub color="#fafdfc" />
      </button>
      <button
        type="button"
        className={styles.signButton}
        onClick={() => signIn("facebook")}
      >
        <FaFacebook color="#2578e4" />
      </button>
    </div>
  );
}
