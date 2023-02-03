import { Dialog, Combobox, Transition } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { IMAGE_FORMAT, IMAGE_PATH } from "../lib/constants";
import { toSlug, toTitle } from "../lib/api/v1";

export default function SearchPanel({ data }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let btn = document.querySelector(`.search-btn`);

    function onKeydown(event) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen);
      }
    }

    function handleClick() {
      setIsOpen(!isOpen);
    }

    window.addEventListener(`keydown`, onKeydown);

    btn && btn.addEventListener(`click`, handleClick);
    return () => {
      window.removeEventListener(`keydown`, onKeydown);
      btn && btn.removeEventListener(`click`, handleClick);
    };
  }, [isOpen]);

  let names = data;

  // let names = data.map((i) => ({
  //   id: i.id,
  //   category: i.category,
  //   name: toTitle(i.id),
  //   slug: toSlug(toTitle(i.id)),
  // }));

  // let categories = data.categories.map((i) => i.toLowerCase());

  const filteredGames = query
    ? //
      names
        .filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => (a.name < b.name ? 1 : -1))
        .sort((a, b) =>
          a.name.toLowerCase().indexOf(query.toLowerCase()) >
          b.name.toLowerCase().indexOf(query.toLowerCase())
            ? 1
            : -1
        )
    : [];

  // console.log(`data: `, data);
  return (
    <Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery("")}>
      <Dialog
        // open={isOpen}
        onClose={setIsOpen}
        className="fixed inset-0 top-0 z-10 p-4 pt-[25vh]  overflow-y-auto"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            onChange={(game) => {
              setIsOpen(false);
              // setQuery("");
              // `/game/${game.name}`
              // window.location.href = `/game/${game}`;
              router.push(`/game/${game}`);
            }}
            as="div"
            className="relative overflow-hidden bg-white max-w-xl mx-auto rounded-xl shadow-2xl ring-1 ring-black/5 text-gray-800 placeholder-gray-400 divide-y"
          >
            <div className="flex items-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <Combobox.Input
                onChange={(event) => {
                  //
                  setQuery(event.target.value);
                }}
                className="w-full bg-transparent border-0 p-4 focus:ring-0 focus:border-0 focus:outline-none"
                placeholder="Search..."
              />
            </div>
            {filteredGames.length > 0 && (
              <Combobox.Options static className="py-4 text-sm max-h-96 overflow-y-auto">
                {filteredGames.map((game) => (
                  <Combobox.Option key={game.id} value={game.slug}>
                    {({ active }) => (
                      <div
                        className={`flex items-center px-4 py-2 space-x-1 ${
                          active ? `bg-indigo-600` : `bg-white`
                        }`}
                      >
                        <Image
                          className="mr-2"
                          src={IMAGE_PATH + IMAGE_FORMAT + `/` + game.id + `.` + IMAGE_FORMAT}
                          width={30}
                          height={30}
                          alt={``}
                        />
                        <span className={`font-medium  ${active ? `text-white` : `text-gray-900`}`}>
                          {game.name}
                        </span>
                        <span className={active ? "text-indigo-200" : "text-gray-400"}>
                          in {game.category}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && filteredGames.length === 0 && (
              <p className="p-4 text-sm text-gray-500">No results found.</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
