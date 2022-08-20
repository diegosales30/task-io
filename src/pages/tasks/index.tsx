import { useState, FormEvent } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { format } from "date-fns";
import Link from "next/link";

import style from "./styles.module.scss";
import { RiAddCircleFill } from "react-icons/ri";
import { FiCalendar, FiEdit2, FiTrash, FiClock } from "react-icons/fi";
import { SupportButton } from "../../components/SupportButton/index";

import firebase from "../../services/firebaseConnection";

type TasksList = {
  id: string;
  created: string | Date;
  createdFormat: string;
  tarefa: string;
  userId: string;
  nome: string;
};
interface TasksProps {
  user: {
    nome: string;
    id: string;
  };
  data: string;
}

export default function Tasks({ user, data }: TasksProps) {
  const [tasks, setTasks] = useState("");
  const [newTask, setNewTask] = useState<TasksList[]>(JSON.parse(data));

  async function handleAddTask(event: FormEvent) {
    event.preventDefault();
    if (tasks === "") {
      alert("Preencha o campo de tarefa");
      return;
    }

    await firebase
      .firestore()
      .collection("tarefas")
      .add({
        created: new Date(),
        tarefa: tasks,
        userId: user.id,
        nome: user.nome,
      })
      .then((doc) => {
        console.log("Tarefa adicionada com sucesso");
        let data = {
          id: doc.id,
          created: new Date(),
          createdFormat: format(new Date(), "dd MMMM yyyy"),
          tarefa: tasks,
          userId: user.id,
          nome: user.nome,
        };
        setNewTask([...newTask, data]);
        setTasks("");
      })
      .catch((error) => {
        console.log("erro ao add tarefa ", error);
      });
  }

  return (
    <div
      style={{
        backgroundColor: "#1fd486",
        height: "100vh",
        width: "100vw",
        padding: "20px",
      }}
    >
      <Head>
        <title>Minhas tarefas - Tasks</title>
      </Head>
      <main className={style.container}>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Nova tarefa"
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
          />
          <button type="submit">
            <RiAddCircleFill size={25} color="#1fd486" />
          </button>
        </form>

        <h1>
          Voce tem {newTask.length}{" "}
          {newTask.length === 1 ? "tarefa" : "tarefas"}
        </h1>

        <section>
          {newTask.map((task, index) => (
            <article key={index} className={style.taskList}>
              <Link href={`/tasks/${task.id}`}>
                <p>{task.tarefa}</p>
              </Link>
              <div className={style.actions}>
                <div>
                  <div>
                    <FiCalendar size={20} color="#1fd486" />
                    <time>{task.createdFormat}</time>
                  </div>
                  <button>
                    <FiEdit2 size={20} color="#1fd486" />
                    <span>Editar</span>
                  </button>
                </div>

                <button>
                  <FiTrash size={20} color="#ff3638" />
                  <span>Excluir</span>
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
      <div className={style.vipContainer}>
        <h3>Obrigado por apoiar esse projeto</h3>
        <div>
          <FiClock size={28} color="#1fd486" />
          <time>Ultima doação foi a 5 dias</time>
        </div>
      </div>

      <SupportButton />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.id) {
    //se o user não estiver logado, redireciona para a página de login
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const allTasks = await firebase
    .firestore()
    .collection("tarefas")
    .where("userId", "==", session?.id) //somente para o user logado com o mesmo id
    .orderBy("created", "asc")
    .get();

  const data = JSON.stringify(
    allTasks.docs.map((doc) => {
      return {
        id: doc.id,
        createdFormat: format(doc.data().created.toDate(), "dd MMMM yyyy"),
        ...doc.data(),
      };
    })
  );

  const user = {
    nome: session?.user.name,
    id: session?.id,
  };

  return {
    props: {
      user,
      data,
    },
  };
};
