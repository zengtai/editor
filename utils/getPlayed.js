// 玩家数，一定程度上依据发行时间
export default function getPlayed(creation_date, appid) {
  const now = new Date();
  const create_date = new Date(creation_date);
  let base = ((now - create_date) / (1000 * 60 * 60 * 24)).toFixed(1); // 返回发布至今天数
  let isFeatured = topgames.includes(appid);
  let max = base * (isFeatured ? 5000 : 500);
  let min = base * (isFeatured ? 1000 : 100);
  return Math.floor(Math.random() * (max - min)) + min;
}
