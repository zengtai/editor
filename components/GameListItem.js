import Image from "next/image";
import Link from "next/link";
import { IMAGE_PATH, IMAGE_FORMAT, GAME_PATH } from "../lib/constants";
export default function GameListItem({ data }) {
  return (
    <>
      {data.map((game) => (
        <li className="list-item" key={game.id}>
          <Image
            src={
              IMAGE_PATH + IMAGE_FORMAT + `/` + game.appid + `.` + IMAGE_FORMAT
            }
            width={100}
            height={100}
            alt={game.title}
          />
          <div className="meta">
            <h3>{game.title}</h3>
            <span className="category">{game.category}</span>
          </div>
          <div className="meta">
            <span className="rating bg-star">
              {/* {(Math.random() * 9 + 1).toFixed(1)} */}
            </span>
            <span className="played">
              {/* {(Math.random() * 100 + 10.1).toFixed(1) + `k played`} */}
            </span>
          </div>
          <div className="play">
            <Link href={GAME_PATH + game.appid}>
              <span>Play</span>
            </Link>
          </div>
        </li>
      ))}
    </>
  );
}
