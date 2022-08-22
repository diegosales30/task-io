import styles from "./styles.module.scss";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

interface DonateProps {
  user: {
    nome: string;
    id: string;
    image: string;
  };
}

export default function Donate({ user }: DonateProps) {
  return (
    <>
      <Head>
        <title>Contribua como nosso trabalho</title>
      </Head>
      <main className={styles.container}>
        <img
          className={styles.gif}
          src="/images/donation.gif"
          alt="seja apoiador"
        />

        <div className={styles.vip}>
          <img src={user.image} alt="foto de perfil do usuario" />
          <span>Parabéns, você é um novo apoiador</span>
        </div>

        <h1>Contribua com este projeto! 🏆</h1>
        <h3>
          Apoie com apenas <span>R$ 1,00</span>
          <strong>Funcionalidades exclusivas para apoiadores</strong>
        </h3>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  //se o usuario NÃO estiver logando, nao poderar acessar a /donate, se
  //tentar, sera redirecionado para o /home
  if (!session?.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = {
    nome: session?.user.name,
    id: session?.id,
    image: session?.user.image,
  };

  return {
    props: {
      user,
    },
  };
};
