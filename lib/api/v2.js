export const CMS_API = `https://cms.uptapgame.com/`; // POST
export const CMS_API_V2 = `http://43.156.149.150:8055`; // POST

// POST
async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${CMS_API_V2}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PUBLIC_NEXT_CMS_API_V2_TOKEN}`,
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

// 获取首页数据

export const getDataForHome = async (limit) => {
  const data = await fetchAPI(
    `
    query getGamesForHome ($where: Int) {
      games (sort: "-creation_date", limit: $where) {
        title
        slug
        icon_url
        category {
          name
        }
        rating
      }
    }
  `,
    {
      variables: {
        where: limit ? 10 : 1000,
      },
    }
  );

  return data?.games;
};

// 获取全部游戏

export const getAllGamesWithSlug = async () => {
  const data = await fetchAPI(
    `
    query getAllGamesWithSlug  {
      games (sort: "-creation_date") {
        slug
      }
    }
  `
  );

  return data?.games;
};

// 获取分类游戏

export const getGamesByCategory = async (category) => {
  const data = await fetchAPI(
    `
    query getGamesByCategorySlug ($where: String)  {
      games (filter: { category: { name: { _eq: $where }  } }) {
        title
        category {
          name
          slug
        }
        description
        game_url
        icon_url
      }
    }
  `,
    {
      variables: {
        where: category,
      },
    }
  );

  return data?.games;
};

// 获取游戏详情 + 相关游戏

export const getGamesBySlug = async (slug, limit) => {
  const data = await fetchAPI(
    `
    query getGameBySlug ($where: String, $limit: Int)  {
      game: games (filter: { slug: { _eq: $where } }) {
        title
        category {
        name
        slug
        }
        description
      },
      related: games (filter: { slug: { _neq: $where} }, limit: $limit) {
        title
        category {
            name
            slug
        }
        slug
      }
    }
  `,
    {
      variables: {
        where: slug,
        limit: limit ? limit : 10,
      },
    }
  );

  return { game: data?.game, related: data?.related };
};

/* 提交游戏 */

// 对比源数据和CMS数据，显示差异，等待进步一操作

// 1. 获取分类数据，取id、名称、slug

export const getCategories = async () => {
  const data = await fetchAPI(
    `
    query getCategories {
      Categories {
        id
        name
        slug
      }
    }
  `
  );

  return data?.Categories;
};

// 2. 获取游戏数据，取appid

export const getGamesWithAppid = async () => {
  const data = await fetchAPI(
    `
    query getGamesWithAppid {
      Games {
        appid
      }
    }
  `
  );

  return data?.Games;
};

// 3. 写入分类数据

export const postCategories = (data) => {
  // data 需为数组，包含如：[{name: `Puzzle`,slug: `puzzle`}]
  fetchAPI(
    `
    mutation ($where: String) {
      create_Categories_items (
        data: $where
      )
    }
  `,
    {
      variables: {
        where: data,
      },
    }
  );
};

// 4. 写入游戏数据

export const postGames = async (data) => {
  // data 需为数组
  const post = await fetchAPI(
    `
    mutation ($where: [create_Games_input!]) {
      create_Games_items (
        data: $where
      ) {appid,title,slug,description,creation_date,featured,category {id},rating, played}
    }
  `,
    {
      variables: {
        where: data,
      },
    }
  );

  return post?.data;
};

async function dataForPost(data) {
  let tmp = [];
  data.games.map(async (i) => {
    let catId = await getCategories().filter(
      (cat) => cat.name === i.category
    )[0].id;
    tmp.push({
      appid: i.appid,
      title: i.title,
      slug: i.slug,
      description: i.description,
      creation_date: i.creation_date,
      category: catId,
    });
  });

  console.log(`处理后数据：`, tmp);
}
