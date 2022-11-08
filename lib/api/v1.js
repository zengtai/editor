/* 数据抓取 */

const UPTAP_API = `https://uptapapi.uptap.com/h5Game/?type=GameList&platform=uptapgame0120&token=dXB0YXBnYW1l572R56uZ55So`; // GET
const CMS_API = `https://cms.uptapgame.com/`; // POST

async function fetcher(URL) {
  const res = await fetch(URL)
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });

  return res;
}

// 1. 从原始API抓取数据,按日期保存?

const getGames = async () => {
  const data = await fetcher(UPTAP_API);

  return data;
};

// 2. 处理保存到本地

// 2.1 读取本地数据,存在则比对和更新数据,不存在则采用远程数据

// 3 与CMS对比,没有的话写入一些假数据并更新到CMS
