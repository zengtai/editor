/* 数据抓取 */

export const UPTAP_API = `https://uptapapi.uptap.com/h5Game/?type=GameList&platform=uptapgame0120&token=dXB0YXBnYW1l572R56uZ55So`; // GET
export const CMS_API = `https://cms.uptapgame.com/`; // POST

// Basic fetcher
async function fetcher(URL) {
  const res = await fetch(URL)
    .then((res) => res.json())
    .catch((e) => {
      console.error(`Error: `, e);
    });

  return res;
}

// 1. 从原始API抓取数据,按日期保存?

export const getOrginalData = async () => {
  const original_data = await fetcher(UPTAP_API).then((res) => res.gamelist);

  let games = [];
  let categories = [];

  original_data.forEach((game) => {
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
      category: category,
      description: game.description,
      creation_date: new Date(game.time).toISOString(),
    });
    // 写入分类数组
    categories.includes(category) ? null : categories.push(category);
  });

  return { original_data, games, categories };
};

// 2. 处理保存到本地

// 2.1 读取本地数据,存在则比对和更新数据,不存在则采用远程数据

// 3 与CMS对比,没有的话写入一些假数据并更新到CMS
