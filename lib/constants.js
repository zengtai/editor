/* 网站基本信息 */
export const SITE_META = {
  NAME: ``, // 网站名称
  URL: ``, // 网站主网址
  DOMAIN: ``, // 网站域名
};

/* 数据获取设置 */
export const RENEW_DATA = false; // 设置为 true 强制获取最新数据

/* 统计信息 */
export const GA_ID = ``; // Google Analytics ID

/* 广告信息 / 设置 */
export const DEV_MODE = process.env.NODE_ENV === "development" || true; // 开发环境下默认设置 data-adtest="on", 测试环境设置为 true, 生产环境设置为 false

export const ADSENSE_ID = ``; // Google AdSense ID,必须与域名匹配
export const ADS_SLOT_ID = {
  HOME: ``, // 首页广告ID
  CATEGORY: ``, // 分类页(含全部游戏页)广告ID
  DETAIL: ``, // 详情页广告ID
};

/* 游戏链接参数 */
export const CHANNEL = ``; // 渠道参数
export const GAME_DOMAIN = ``; // 游戏域名
export const GAME_PATH = GAME_DOMAIN + ``; // 游戏路径

/* 游戏图片参数 */
export const IMAGE_PATH = `https://cdn.iwantalipstick.com/gameicon2/`; // 图片基础域名+路径
export const IMAGE_FORMAT = `jpg`; // 图片默认格式,目前支持jpg/png/webp/avif

/* 游戏选项 */
export const SELECTED_GAMES = []; // 选取游戏
export const EXCLUDED_GAMES = []; // 排除游戏
export const FEATURED_GAMES = []; // 推荐游戏
export const TOP_GAMES = []; // 首推游戏
