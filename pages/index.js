import Head from "next/head";

import { CMS_API, getOrginalData, UPTAP_API } from "../lib/api/v1";

import SearchPanel from "../components/SearchPanel";

import GameListItem from "../components/GameListItem";

export default function Home({ data, originalData }) {
  console.log("data: ", data);
  console.log("originalData: ", originalData.length);
  let dataForSearch = data.games.map((i) => ({
    id: i.appid,
    category: i.category,
    name: i.title,
    slug: i.slug,
  }));
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <SearchPanel data={dataForSearch} />
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
              <p>Original API &gt; {UPTAP_API}</p>
              <p>CMS API &gt; {CMS_API}</p>
            </div>
            <div className="section-body">
              <div className="flex space-x-2">
                <select name="api" id="">
                  <option value="">Original</option>
                  <option value="">CMS</option>
                  <option value="">Custom</option>
                </select>
                <input className="grow" type="text" />
                <button
                  className="px-4 bg-green-500 border border-green-600 text-white h-full p-2"
                  type="submit"
                >
                  Fetch
                </button>
              </div>
              <textarea
                className="w-full mt-4"
                placeholder="Result"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="section-head">
              <h2>Custom URL</h2>
            </div>
            <div className="section-body space-y-2">
              <div className="flex space-x-2 items-center">
                <label htmlFor="">Game Link &gt; https://</label>
                <input className="grow" type="url" placeholder="domain" />
                <label htmlFor="">/newgames/minigame.html?platform=</label>
                <input type="text" placeholder="channel" />
                <label htmlFor="">&appid=</label>
                <input type="text" placeholder="name" />
              </div>
              <h3 className="font-bold">Static HTML</h3>
              <div className="flex space-x-2 items-center">
                <label htmlFor="">Home Link &gt; https://</label>
                <input className="grow" type="url" placeholder="domain" />
                <label htmlFor="">/</label>
                <input className="grow" type="text" placeholder="path" />
                <label htmlFor="">/index.html</label>
              </div>
              <div className="flex space-x-2 items-center">
                <label htmlFor="">Category Link &gt; https://</label>
                <input className="grow" type="url" placeholder="domain" />
                <label htmlFor="">/</label>
                <input className="grow" type="text" placeholder="path" />
                <label htmlFor="">/category.html?name=</label>
                <input type="text" placeholder="Puzzle etc." />
              </div>
              <div className="flex space-x-2 items-center">
                <label htmlFor="">Detail Link &gt; https://</label>
                <input className="grow" type="url" placeholder="domain" />
                <label htmlFor="">/</label>
                <input className="grow" type="text" placeholder="path" />
                <label htmlFor="">/game.html?appid=</label>
                <input type="text" placeholder="FireTheGun etc." />
              </div>
              <h3 className="font-bold">Next.js</h3>
              <div className="flex space-x-2 items-center">
                <label htmlFor="">Home Link &gt; https://</label>
                <input className="grow" type="url" placeholder="domain" />
                <label htmlFor="">/</label>
                <input className="grow" type="text" placeholder="path" />
                <label htmlFor="">/index.html</label>
              </div>
              <div className="flex space-x-2 items-center">
                <label htmlFor="">Category Link &gt; https://</label>
                <input className="grow" type="url" placeholder="domain" />
                <label htmlFor="">/</label>
                <input className="grow" type="text" placeholder="path" />
                <label htmlFor="">/category/</label>
                <input type="text" placeholder="match-3 etc." />
              </div>
              <div className="flex space-x-2 items-center">
                <label htmlFor="">Detail Link &gt; https://</label>
                <input className="grow" type="url" placeholder="domain" />
                <label htmlFor="">/</label>
                <input className="grow" type="text" placeholder="path" />
                <label htmlFor="">/game/</label>
                <input type="text" placeholder="fire-the-gun etc." />
              </div>
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
              <div className="flex items-center space-x-2">
                <h2>All Games</h2>
                <button className="search-btn rounded-lg bg-slate-400 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
                <span>
                  Press<kbd>ctrl</kbd>+<kbd>k</kbd>or<kbd>⌘</kbd>+<kbd>k</kbd>
                </span>
              </div>
              <span>Total: {data.games.length}</span>
            </div>
            <ul className="game-list">
              <GameListItem data={data.games} />
            </ul>
          </div>
        </main>
        <footer className="site-footer">
          <div className="container mx-auto">
            <p className="text-center py-4">
              Ver. {new Date().getFullYear()}.11.09-0.1.0
            </p>
          </div>
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
