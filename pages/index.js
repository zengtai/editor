import Head from "next/head";
import Image from "next/image";
import { CMS_API, getOrginalData, UPTAP_API } from "../lib/api/v1";
import { IMAGE_FORMAT, IMAGE_PATH } from "../lib/constants";

import SearchPanel from "../components/SearchPanel";

export default function Home({ data, originalData }) {
  console.log("data: ", data);
  console.log("originalData: ", originalData.length);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>{" "}
      <SearchPanel data={data} />
      <div className="bg-slate-50 flex flex-col min-h-screen">
        <header className="site-header">
          <div className="container mx-auto"></div>
        </header>
        <main className="grow">
          <div className="container mx-auto">
            <div className="section-head">
              <h2>API Information</h2>
            </div>
            <div className="section-body">
              <p>Original &gt; {UPTAP_API}</p>
              <p>CMS &gt; {CMS_API}</p>
            </div>
            <div className="section-body">
              <select name="api" id="">
                <option value="">Original</option>
                <option value="">CMS</option>
              </select>
              <input type="text" />
              <button>Fetch</button>
            </div>
            <div className="section-head">
              <h2>All Categories</h2>
            </div>
            <ul className="category-list">
              {data.categories.map((cat) => (
                <li className="list-item" key={cat}>
                  {cat}
                </li>
              ))}
            </ul>
            <div className="section-head">
              <h2>All Games</h2>
              <span>Total: {data.games.length}</span>
            </div>
            <ul className="game-list">
              {data.games.map((game) => (
                <li className="list-item" key={game.id}>
                  <Image
                    src={
                      IMAGE_PATH +
                      IMAGE_FORMAT +
                      `/` +
                      game.appid +
                      `.` +
                      IMAGE_FORMAT
                    }
                    width={100}
                    height={100}
                    alt={game.title}
                  />
                  <div className="meta">
                    <h3>{game.title}</h3>
                    <span className="category">{game.category}</span>
                  </div>
                  <div className="meta">
                    <span className="rating bg-star">
                      {/* {(Math.random() * 9 + 1).toFixed(1)} */}
                    </span>
                    <span className="played">
                      {/* {(Math.random() * 100 + 10.1).toFixed(1) + `k played`} */}
                    </span>
                  </div>
                  <div className="play">
                    <span>Play</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
        <footer className="site-footer">
          <div className="container mx-auto"></div>
        </footer>
      </div>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const data = await getOrginalData();
  const games = data.games;
  const categories = data.categories;
  return {
    props: {
      data: {
        games,
        categories,
      },
      originalData: [...data.original_data],
    },
  };
};
