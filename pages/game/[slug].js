import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import GameListItem from "../../components/GameListItem";
import { localCache } from "../../lib/api/v1";
import { IMAGE_PATH, IMAGE_FORMAT, TOP_GAMES } from "../../lib/constants";

export default function Game({ data }) {
  // console.log(`data: `, data);
  return (
    <>
      <Head>
        <title>{data.game.title}</title>
      </Head>
      <div className="container mx-auto">
        <div className="section-head">
          <h1>{data.game.title}</h1>
        </div>
        <div className="section-body">
          <div>
            <Image
              className="rounded-lg mx-auto"
              src={
                IMAGE_PATH +
                IMAGE_FORMAT +
                `/` +
                data.game.appid +
                `.` +
                IMAGE_FORMAT
              }
              alt={data.game.title}
              width={200}
              height={200}
            />
          </div>
          <div className="text-center py-4">
            <Link
              className="py-1 px-1.5 bg-slate-500 rounded-md text-white text-sm"
              href={`/`}
            >
              {data.game.category}
            </Link>
          </div>
          <div>{data.game.description}</div>
        </div>
        <div>
          <div className="section-head">
            <h2>Related Games</h2>
          </div>
          <ul className="game-list">
            <GameListItem data={data.related} />
          </ul>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const data = await localCache();
  const game = data.games.filter((game) => game.slug === ctx.params.slug)[0];

  let related = data.search.filter((game) => game.slug !== ctx.params.slug);
  // .sort(() => 0.5 - Math.random())

  let related_topgames = [];
  if (TOP_GAMES.length !== 0) {
    let topgames = TOP_GAMES.map((i) => i.appid);
    related_topgames = related.filter((game) => topgames.includes(game.appid));
    if (related_topgames.length < 10) {
      related_topgames = related_topgames.concat(
        related
          .filter((game) => !topgames.includes(game.appid))
          .slice(0, 10 - related_topgames.length)
      );
    }
  } else {
    related_topgames = related.slice(0, 10);
  }

  return {
    props: {
      data: {
        game,
        related: related_topgames,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const data = await localCache().then((res) => res.search);
  const paths = data.map((i) => ({
    params: {
      slug: i.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
