import Head from "../../node_modules/next/head";
import { GetStaticProps } from "next";

import style from "../styles/styles.module.scss";

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#1fd486",
        height: "100vh",
        minHeight: "800px",
        minWidth: "420px",
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
          <h1>O melhor gerenciador de tarefas para organizar seu dia</h1>
          <span>
            <p>100% Online e Gratis</p>
          </span>
        </section>

        <div className={style.apoiadores}>
          <p>Apoiadores: </p>
          <div className={style.doadores}>
            <img
              src="https://avatars.githubusercontent.com/u/29111363?v=4"
              alt="user1"
            />
            <img
              src="https://avatars.githubusercontent.com/u/95226258?v=4"
              alt="user1"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60, // atualiza a pagina a cada hora,  60 segundos vezes 60 segundos
  };
};
