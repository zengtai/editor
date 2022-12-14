import GameListItem from "./GameListItem";

export default function AllGames({ data }) {
  return (
    <>
      <div className="section-head">
        <div className="flex items-center space-x-2">
          <h2>All Games</h2>
          <button className="search-btn rounded-lg bg-slate-400 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
          <span>
            Press<kbd>ctrl</kbd>+<kbd>k</kbd>or<kbd>⌘</kbd>+<kbd>k</kbd>
          </span>
        </div>
        <span>Total: {data.games.length}</span>
      </div>
      <ul className="game-list">
        <GameListItem data={data.games} />
      </ul>
    </>
  );
}
