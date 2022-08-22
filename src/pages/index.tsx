import { useState } from "react";

import Head from "../../node_modules/next/head";
import { GetStaticProps } from "next";

import firebase from "../services/firebaseConnection";

import style from "../styles/styles.module.scss";

type Data = {
  id: string;
  donate: boolean;
  lastDonate: Date;
  image: string;
};
interface HomeProps {
  data: string;
}

export default function Home({ data }: HomeProps) {
  const [donaters, setDonaters] = useState<Data[]>(JSON.parse(data));

  return (
    <div
      style={{
        backgroundColor: "#1fd486",
        //height: "100vh",
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
          {donaters.length !== 0 && <p>Apoiadores: </p>}
          <div className={style.doadores}>
            {donaters.map((item) => (
              <img key={item.image} src={item.image} alt="imagem do doador" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const donaters = await firebase.firestore().collection("users").get();

  const data = JSON.stringify(
    donaters.docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
      };
    })
  );
  return {
    props: {
      data,
    },
    revalidate: 60 * 60, // atualiza a pagina a cada hora,  60 segundos vezes 60 segundos
  };
};
