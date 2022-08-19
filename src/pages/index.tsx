import Head from "../../node_modules/next/head";

import style from "../styles/styles.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Task io</title>
      </Head>

      <div>
        <h1 className={style.title}>
          ola
          <span>mundo</span>
        </h1>
      </div>
    </>
  );
}
