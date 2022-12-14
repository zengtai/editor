import Layout from "@/components/Layout";
import { getCategories, getDataForHome } from "@/lib/api/v2";

import Image from "next/image";
import getImageUrl from "utils/getImageUrl";

export default function Home({ data }) {
  return (
    <>
      <Layout title={`Home`}>
        <div className="section-head">
          <h2>API Information</h2>
        </div>
        <div className="section-body">
          <div>
            <button className="rounded-xl bg-lime-500 p-4 font-bold text-lime-900 shadow-md shadow-lime-500/50">
              Post Games
            </button>
          </div>
        </div>
        <div className="section-head">
          <h2>All Categories</h2>
        </div>
        <ul className="category-list">
          <li className="current list-item">All</li>
          {data.categories.map((cat) => (
            <li className="list-item" key={cat.slug}>
              {cat.name}
            </li>
          ))}
        </ul>
        <div className="section-body mt-2">
          <ul className="grid grid-cols-2 gap-4 xl:grid-cols-12 xl:gap-6">
            {data.games.map((game) => (
              <li key={game.slug}>
                <Image
                  src={getImageUrl({ appid: game.appid })}
                  alt={game.title}
                  width={100}
                  height={100}
                />
                <h4 className="my-2 text-center text-xs">{game.title}</h4>
              </li>
            ))}
          </ul>
          <div></div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const categories = await getCategories();
  const games = await getDataForHome(24);
  return {
    props: {
      data: {
        games,
        categories,
      },
    },
  };
};
