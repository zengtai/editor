export function searchData(data) {
  let games = [];
  let categories = [];

  data.forEach((game) => {
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
      // id: game.id,
      appid: appid,
      slug: toSlug(toTitle(appid)),
      title: toTitle(appid),
      category: category,
      // description: game.description,
      // creation_date: new Date(game.time).toISOString(),
    });
    // 写入分类数组
    categories.includes(category) ? null : categories.push(category);
  });

  return { games, categories };
}
