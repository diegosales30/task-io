import { useState, FormEvent } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { format } from "date-fns";
import Link from "next/link";

import style from "./styles.module.scss";
import { RiAddCircleFill } from "react-icons/ri";
import { FiCalendar, FiEdit2, FiTrash, FiClock, FiX } from "react-icons/fi";
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
  const [taskEdit, setTaskEdit] = useState<TasksList | null>(null);

  async function handleAddTask(event: FormEvent) {
    event.preventDefault();
    if (tasks === "") {
      alert("Preencha o campo de tarefa");
      return;
    }

    if (taskEdit) {
      await firebase
        .firestore()
        .collection("tarefas")
        .doc(taskEdit.id)
        .update({
          tarefa: tasks,
        })
        .then(() => {
          let data = newTask;
          let taskIndex = newTask.findIndex((task) => task.id === taskEdit.id);
          data[taskIndex].tarefa = tasks;

          setNewTask(data);
          setTaskEdit(null);
          setTasks("");
        });
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

  async function handleDeleteTask(id: string) {
    firebase
      .firestore()
      .collection("tarefas")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Tarefa deletada com sucesso");
        setNewTask(newTask.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.log("erro ao deletar tarefa ", error);
      });
  }

  async function handleEditTask(task: TasksList) {
    setTaskEdit(task);
    setTasks(task.tarefa);
  }

  function handleCancelEdit() {
    setTaskEdit(null);
    setTasks("");
  }

  return (
    <div className={style.containerPrincipal}>
      <Head>
        <title>Minhas tarefas - Tasks</title>
      </Head>
      <main className={style.container}>
        {taskEdit && (
          <span className={style.warnTask}>
            <p>cancelar edição? </p>
            <button onClick={handleCancelEdit}>
              <FiX color="#ff3638" />
            </button>
          </span>
        )}
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

        <h3>
          Voce tem <span>{newTask.length}</span>{" "}
          {newTask.length === 1 ? "tarefa!" : "tarefas!"}
        </h3>

        <section>
          {newTask.map((task) => (
            <article key={task.id} className={style.taskList}>
              <Link href={`/tasks/${task.id}`}>
                <p>{task.tarefa}</p>
              </Link>
              <div className={style.actions}>
                <div>
                  <div>
                    <FiCalendar size={"0.9rem"} color="#1fd486" />
                    <time>{task.createdFormat}</time>
                  </div>
                  <button onClick={() => handleEditTask(task)}>
                    <FiEdit2 size={"0.9rem"} color="#1fd486" />
                    <span>Editar</span>
                  </button>
                </div>

                <button onClick={() => handleDeleteTask(task.id)}>
                  <FiTrash size={"1.2rem"} color="#ff3638" />
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
      <div className={style.vipContainer}>
        <h3>Obrigado por apoiar esse projeto</h3>
        <div>
          <div>
            <FiClock size={"1rem"} color="#1fd486" />
            <time>Ultima doação foi a 5 dias</time>
          </div>
        </div>
      </div>
      <div className={style.containerButton}>
        <SupportButton />
      </div>
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
    .orderBy("created", "desc")
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

  //console.log(session?.vip);

  const user = {
    nome: session?.user.name,
    id: session?.id,
    // vip: session?.vip,
    // lastDonate: session?.lastDonate,
  };

  return {
    props: {
      user,
      data,
    },
  };
};
