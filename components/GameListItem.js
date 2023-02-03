import Image from "next/image";
import Link from "next/link";
import { IMAGE_PATH, IMAGE_FORMAT } from "../lib/constants";
export default function GameListItem({ data }) {
  return (
    <>
      {data.map((game) => (
        <li className="list-item" key={game.slug}>
          <Link href={`/game/${game.slug}`}>
            <div className="info">
              <Image
                className="rounded-lg mx-auto"
                src={IMAGE_PATH + IMAGE_FORMAT + `/` + game.appid + `.` + IMAGE_FORMAT}
                width={100}
                height={100}
                alt={game.title}
              />
              <div className="meta">
                <h3>{game.title}</h3>
                <span className="category">{game.category}</span>
              </div>
              <div className="meta">
                <span className="rating bg-star">{/* {(Math.random() * 2 + 3).toFixed(1)} */}</span>
                <span className="played">
                  {/* {(Math.random() * 100 + 10.1).toFixed(1) + `k played`} */}
                </span>
              </div>
              <div className="play">
                <span>Play</span>
              </div>
            </div>
            <div className="description" title={game.description && game.description}>
              {game.description &&
                (game.description.length < 200
                  ? game.description
                  : game.description.slice(0, 200) + ` ...`)}
            </div>
          </Link>
        </li>
      ))}
    </>
  );
}
