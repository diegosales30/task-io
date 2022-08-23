import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import firebase from "../../services/firebaseConnection";
import { format } from "date-fns";

import Head from "next/head";
import styles from "./task.module.scss";

import { FiCalendar } from "react-icons/fi";

type Task = {
  id: string;
  created: string | Date;
  createdFormat?: string;
  tarefa: string;
  userId: string;
  nome: string;
};
interface TaskListProps {
  data: string;
}

export default function DetailsTask({ data }: TaskListProps) {
  const task = JSON.parse(data) as Task;
  return (
    <>
      <Head>
        <title>details</title>
      </Head>
      <article className={styles.container}>
        <div className={styles.actions}>
          <div>
            <FiCalendar size={"1.5rem"} color="#1fd486" />
            <span>tarefa criada: </span>
            <time>{task.createdFormat}</time>
          </div>
        </div>
        <p>{task.tarefa}</p>
      </article>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { id } = params;
  const session = await getSession({ req });

  //somente vips podem acessar details
  if (!session?.vip) {
    return {
      redirect: {
        destination: "/tasks",
        permanent: false,
      },
    };
  }

  const data = await firebase
    .firestore()
    .collection("tarefas")
    .doc(String(id))
    .get()
    .then((snapshot) => {
      const data = {
        id: snapshot.id,
        created: snapshot.data().created,
        createdFormat: format(snapshot.data().created.toDate(), "dd MMMM yyyy"),
        tarefa: snapshot.data().tarefa,
        userId: snapshot.data().userId,
        nome: snapshot.data().nome,
      };

      return JSON.stringify(data); //firebase nao retorna um Json, por isso transformo em Json em json
    })
    .catch(() => {
      return {};
    });

  if (Object.keys(data).length === 0) {
    return {
      redirect: {
        destination: "/tasks",
        permanent: false,
      },
    };
  }
  return {
    props: {
      data,
    },
  };
};
