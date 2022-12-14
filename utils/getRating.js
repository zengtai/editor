// 评分，推荐游戏特殊处理
export default function getRating(appid) {
  let isFeatured = topgames.includes(appid);
  let max = isFeatured ? 5 : 4.4;
  let min = isFeatured ? 4.4 : 2.9;
  return (Math.random() * (max - min) + min).toFixed(1);
}
