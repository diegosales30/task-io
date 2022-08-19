import Link from "../../../node_modules/next/link";
import style from "./styles.module.scss";

export function SupportButton() {
  return (
    <div className={style.donateButton}>
      <Link href="/donate">
        <button>apoiar</button>
      </Link>
    </div>
  );
}
