import * as fs from "fs";
import path from "path";

import { RENEW_DATA_FROM_REMOTE, RENEW_DATA_LOCAL } from "../constants";

/* 数据抓取 */

export const UPTAP_API = `https://uptapapi.uptap.com/h5Game/?type=GameList&platform=uptapgame0120&token=dXB0YXBnYW1l572R56uZ55So`; // GET

// UPTAP API Fetcher
async function fetcher(URL) {
  const res = await fetch(URL)
    .then((res) => res.json())
    .catch((e) => {
      console.error(`Error: `, e);
    });

  return res;
}

// CMS API Fetcher

async function CMS_fetcher(URL, query, { variables }) {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${process.env.PUBLIC_NEXT_CMS_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

// 一些字符处理函数

// 基于游戏appid生成title
export function toTitle(appid) {
  return appid
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/3 D/g, " 3D")
    .replace(/([A-Za-z])([0-9])/g, "$1 $2");
}

// 基于游戏title生成slug
export function toSlug(title) {
  return title.replace(/\s+/g, "-").toLowerCase();
}

// 获取原始数据
async function getRemoteData() {
  return await fetcher(UPTAP_API);
}

// 1. 从原始API抓取数据,按日期保存?

export const dataFormatter = async (data) => {
  const original = data.gamelist; // 获取远程数据

  const tmpData = original.slice();

  tmpData.sort((a, b) => (new Date(a.time) < new Date(b.time) ? 1 : -1));

  let games = [];
  let categories = [];
  let search = [];

  tmpData.forEach((game) => {
    // 修复原分类命名错误（拼写、大小写、前后空格）
    let category = game.category.trim().toLowerCase();

    if (category === "gril") {
      category = "Girl";
    } else if (category === "io") {
      category = ".IO";
    } else if (category === "match3") {
      category = "Match 3";
    } else if (category === "sport") {
      category = "Sports";
    }

    let appid = game.name === "LittelBoxer" ? "LittleBoxer" : game.name;

    category = category.replace(/^\S/, (s) => s.toUpperCase());

    // 写入游戏数组
    games.push({
      id: game.id,
      appid: appid,
      slug: toSlug(toTitle(appid)),
      title: toTitle(appid),
      category: category,
      description: game.description,
      creation_date: new Date(game.time).toISOString(),
    });

    // 写入分类数组
    categories.includes(category) ? null : categories.push(category);

    // 写入搜索结果数组
    search.push({
      appid: appid,
      slug: toSlug(toTitle(appid)),
      title: toTitle(appid),
      category: category,
    });
  });

  return { original, games, categories, search };
};

// 2. 获取本地数据
export const localCache = async (type) => {
  // 本地数据名称及路径
  const localDataInfo = [
    {
      name: `original`,
      path: path.join(process.cwd(), `/data/original.db`),
    }, // 原始数据
    { name: `games`, path: path.join(process.cwd(), `/data/games.db`) }, // 处理后的游戏数据
    {
      name: `categories`,
      path: path.join(process.cwd(), `/data/categories.db`),
    }, // 分类数据
    { name: `search`, path: path.join(process.cwd(), `/data/search.db`) }, // 搜索结果数据
  ];

  async function writeDataFromRemote() {
    // 读取远程数据并写入本地
    const remoteData = await getRemoteData();
    const data = await dataFormatter(remoteData);

    // 获取远程数据、处理数据、写入本地
    localDataInfo.forEach((i) => {
      fs.writeFile(i.path, JSON.stringify(data[`${i.name}`]), (e) => {
        console.error(`localDataInfo Error: `, e);
      });
      console.log(`local ${i.name} data updated`);
    });

    return data;
  }

  // 判断本地文件是否存在

  let filesExist = localDataInfo.map((i) => fs.existsSync(i.path));

  console.log(`filesExist: `, !filesExist);

  if (RENEW_DATA_FROM_REMOTE || !filesExist) {
    // 非强制更新远程数据模式；或本地不存在数据文件
    console.log(`Get data from remote`);
    return await writeDataFromRemote();
  } else {
    // 不存在本地数据，获取远程数据、处理数据、写入本地
    if (type) {
      // 若限定类型
      if (!fs.accessSync(type, fs.constants.F_OK)) {
        // 若不存在本地文件
        // 获取远程数据并写入本地，返回指定类型数据
        return await writeDataFromRemote().then((res) => res?.type);
      } else {
        // 若存在本地文件则读取
        const data = JSON.parse(
          await fs.readreadFileSyncile(
            path.join(process.cwd(), `/data/${type}.db`),
            (e) => {
              console.error(e);
            }
          )
        );
        return data;
      }
    } else {
      // 读取本地数据
      let tmpData = {};

      localDataInfo.forEach((i) => {
        tmpData[i.name] = JSON.parse(
          fs.readFileSync(i.path, (e) => {
            console.error(e);
          })
        );
      });

      return tmpData;
    }
  }
};

// 2.1 读取本地数据,存在则比对和更新数据,不存在则采用远程数据

// 3 与CMS对比,没有的话写入一些假数据并更新到CMS
