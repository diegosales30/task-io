import styles from "./styles.module.scss";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import firebase from "../../services/firebaseConnection";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
//client id = ASiWxmFSmYLAY2wrr_DwrbTmk9YlcsnJKTuoEC3w3ll6pI2c0DApOga7ber2ti71qhSGnrxk9dTkl2hV
//<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
interface DonateProps {
  user: {
    nome: string;
    id: string;
    image: string;
  };
}

export default function Donate({ user }: DonateProps) {
  const [vip, setVip] = useState(false);

  async function handleDonate() {
    await firebase
      .firestore()
      .collection("users")
      .doc(user.id)
      .set({
        donate: true,
        lasteDonate: new Date(),
        image: user.image,
      })
      .then(() => {
        setVip(true);
      });
  }

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

        {vip && (
          <div className={styles.vip}>
            <img src={user.image} alt="foto de perfil do usuario" />
            <span>Parabéns, você é um novo apoiador</span>
          </div>
        )}

        <h1>Contribua com este projeto! 🏆</h1>
        <h3>
          Apoie com apenas <span>R$ 1,00</span>
          <strong>Funcionalidades exclusivas para apoiadores</strong>
        </h3>

        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "1",
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const name = details.payer.name.given_name;
              console.log(`Transaction completed by ${name}`);
              handleDonate();
            });
          }}
        />
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
