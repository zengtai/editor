/* 1. 网站基本信息 */
export const SITE_META = {
  NAME: `Editor`, // 网站名称
  URL: ``, // 网站主网址
  DOMAIN: ``, // 网站域名
};

/* 2. 数据获取设置 */
export const RENEW_DATA_FROM_REMOTE = false; // 设置为 true 强制获取远程源最新数据。需要获取远程数据时使用
export const RENEW_DATA_LOCAL = false; // 设置为 true 强制更新本地数据。需要修改本地数据时使用

/* 3. 统计参数 */
export const GA_ID = ``; // Google Analytics ID

/* 4. 广告参数 / 设置 */
export const DEV_MODE = true; // 设置 data-adtest="on"

export const ADSENSE_ID = `ca-pub-9209477879340784`; // Google AdSense ID,必须与域名匹配
// 广告ID
export const ADS_SLOT_ID = {
  HOME: ``, // 首页广告ID
  CATEGORY: ``, // 分类页(含全部游戏页)广告ID
  DETAIL: ``, // 详情页广告ID
};

/* 5. 游戏链接参数 */
export const CHANNEL = `uptapgame`; // 渠道参数
export const GAME_DOMAIN = `https://cdn.uptapgame.com`; // 游戏域名
export const GAME_PATH =
  GAME_DOMAIN + `/newgames/minigame.html?platform=` + CHANNEL + `&appid=`; // 游戏路径

/* 6. 游戏图片参数 */
export const IMAGE_PATH = `https://cdn.iwantalipstick.com/gameicon2/`; // 图片基础域名+路径
export const IMAGE_FORMAT = `jpg`; // 图片默认格式,目前支持jpg/png/webp/avif

/* 7. 游戏选项 */
export const SELECTED_GAMES = []; // 选取游戏
export const EXCLUDED_GAMES = []; // 排除游戏
// 推荐游戏
export const FEATURED_GAMES = [];
export const TOP_GAMES = [
  { appid: `JumpSmash`, order: 1 },
  { appid: `BoardTheTrain`, order: 2 },
  { appid: `TrafficRun`, order: 3 },
  { appid: `LostInLust`, order: 4 },
  { appid: `MyHome`, order: 5 },
  { appid: `CrazyKnife`, order: 6 },
  { appid: `RoofRunner`, order: 7 },
  { appid: `CrazyMoto`, order: 8 },
  { appid: `PowerShooter`, order: 9 },
  { appid: `FireTheGun`, order: 10 },
  { appid: `ZombieSurvival`, order: 11 },
  { appid: `ColorBall3D`, order: 12 },
  { appid: `FeverRacing`, order: 13 },
  { appid: `SpinTheMaze`, order: 14 },
  { appid: `MrBullet`, order: 15 },
]; // 首推游戏

/* 8. A/B测试选项 */
export const TEST_GAMES = [
  {
    appid: `LostInLust`,
    options: [
      `${IMAGE_PATH + IMAGE_FORMAT + `/` + `PATH1` + `.` + IMAGE_FORMAT}`,
      `${IMAGE_PATH + IMAGE_FORMAT + `/` + `PATH2` + `.` + IMAGE_FORMAT}`,
    ],
  },
];
