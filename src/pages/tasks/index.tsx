import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

import style from "./styles.module.scss";
import { RiAddCircleFill } from "react-icons/ri";
import { FiCalendar, FiEdit2, FiTrash, FiClock } from "react-icons/fi";
import { SupportButton } from "../../components/SupportButton/index";

export default function Tasks() {
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
        <form>
          <input type="text" placeholder="Nova tarefa" />
          <button type="submit">
            <RiAddCircleFill size={25} color="#1fd486" />
          </button>
        </form>

        <h1>Voce tem 2 tarefas</h1>

        <section>
          <article className={style.taskList}>
            <p>Aprender a criar projetos em Nextjs e fire base como back</p>
            <div className={style.actions}>
              <div>
                <div>
                  <FiCalendar size={20} color="#1fd486" />
                  <time>17 junho 2021</time>
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

  console.log(session.user);
  return {
    props: {},
  };
};
