import Head from "next/head";

import { CMS_API, localCache, UPTAP_API } from "../lib/api/v1";

import SearchPanel from "../components/SearchPanel";

import GameListItem from "../components/GameListItem";
import { useEffect, useState } from "react";
import { getCategories, getGamesWithAppid, postGames } from "../lib/api/v2";

import { TOP_GAMES } from "../lib/constants";

export default function Home({ data, originalData }) {
  const [gameData, setGameData] = useState(``);

  console.log("data: ", data.tmp);
  console.log("games: ", data.games);
  console.log("appids: ", data.appids);
  // console.log("originalData: ", originalData.length);

  let topgames = TOP_GAMES.map((i) => i.appid);

  let gamesDataToPost = [];

  // 玩家数，一定程度上依据发行时间
  function getPlayed(creation_date, appid) {
    const now = new Date();
    const create_date = new Date(creation_date);
    let base = ((now - create_date) / (1000 * 60 * 60 * 24)).toFixed(1); // 返回发布至今天数
    let isFeatured = topgames.includes(appid);
    let max = base * (isFeatured ? 5000 : 500);
    let min = base * (isFeatured ? 1000 : 100);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // 评分，推荐游戏特殊处理
  function getRating(appid) {
    let isFeatured = topgames.includes(appid);
    let max = isFeatured ? 5 : 4.4;
    let min = isFeatured ? 4.4 : 2.9;
    return (Math.random() * (max - min) + min).toFixed(1);
  }

  async function postGamesData() {
    // 查询是否已存在appid
    // 1. 获取现有的appid用于比对；2. 每更新一条数据查询一次服务器；3. 啥也不管，直接提交，返回出错信息（因重复而提交失败）
    // let appids = data.appids;

    // 写数据
    data.games.map((game) => {
      let id = data.tmp.find((i) => i.name === game.category)?.id;

      gamesDataToPost.push({
        appid: game.appid,
        title: game.title,
        slug: game.slug,
        category: { id: id },
        description: game.description.trim(),
        rating: getRating(game.appid) * 1,
        played: `${getPlayed(game.creation_date, game.appid)}`,
        creation_date: game.creation_date,
        featured: topgames.includes(game.appid) ? true : false,
      });
    });

    // Post 游戏数据

    setGameData(JSON.stringify(gamesDataToPost));

    try {
      await postGames(gamesDataToPost);
    } catch (e) {
      console.error(`postGames() Error: `, e);
    }
  }

  let dataForSearch = data.games.map((i) => ({
    id: i.appid,
    category: i.category,
    name: i.title,
    slug: i.slug,
  }));

  useEffect(() => {
    let result = document.querySelector("#result");
    result.value = gameData;
  }, [gameData]);

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
                id="result"
                className="w-full mt-4 text-xs font-mono"
                placeholder="Result"
                name=""
                cols="30"
                rows="10"
              ></textarea>
              <div>
                <button
                  onClick={postGamesData}
                  className="px-4 bg-sky-500 border border-sky-600 text-white h-full p-2 shadow-lg shadow-sky-200"
                >
                  Post Games
                </button>
              </div>
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
  // const data = await getOrginalData();
  const data = await localCache();
  const games = data.games;
  const categories = data.categories;
  const search = data.search;

  const tmp = await getCategories(); // 获取CMS分类数据

  const appids = await getGamesWithAppid();

  return {
    props: {
      data: {
        games,
        categories,
        search,
        tmp,
        appids,
      },
      originalData: [...data.original],
    },
  };
};
