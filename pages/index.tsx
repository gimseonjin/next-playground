import type { GetStaticProps } from "next";
import Head from "next/head";
import homeStyle from "../styles/Home.module.css";
import { getSortedPostsData } from "../lib/post";
import Link from "next/link";

const Home = ({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) => {
  return (
    <div>
      <Head>
        <title>Kerrys Blog</title>
      </Head>

      <section className={homeStyle.headingMd}>
        <p>Hi! My name is Kerry! theses days, I am on studying about nextjs </p>
        <p>This is my web site</p>
      </section>

      <section className={`${homeStyle.headingMd} ${homeStyle.padding1px}`}>
        <h2 className={homeStyle.headingLg}>Blog</h2>
        <ul className={homeStyle.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={homeStyle.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className={homeStyle.lightText}>{date}</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
