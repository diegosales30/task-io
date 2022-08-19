import Head from "../../node_modules/next/head";

import style from "../styles/styles.module.scss";

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#3ad586",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Head>
        <title>Home</title>
      </Head>

      <main className={style.contentContainer}>
        <img
          className={style.imgHome}
          src="/images/gifLanding.gif"
          alt="home"
        />
        <section className={style.callToAction}>
          <h1>Organize seu dia com seu gerenciador de tarefas</h1>
          <p>
            <span>Gratis</span> e online
          </p>
        </section>

        <div className={style.doadores}>
          <img
            src="https://avatars.githubusercontent.com/u/95250284?v=4"
            alt="user1"
          />
          <img
            src="https://avatars.githubusercontent.com/u/95250284?v=4"
            alt="user1"
          />
          <img
            src="https://avatars.githubusercontent.com/u/95250284?v=4"
            alt="user1"
          />
        </div>
      </main>
    </div>
  );
}
