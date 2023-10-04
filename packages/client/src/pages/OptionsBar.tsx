import { Listbox, Transition } from "@headlessui/react";
import { useState } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

export default function OptionsBar() {
  const [isOpen, setIsOpen] = useState(false);
  const roles: Array<string> = [ // temporary
    "Philosopher",
    "Angry Drunk",
    "Conspiracy Theorist",
    "Cowboy",
    "Pirate",
    "Valley Girl",
    "Shakespearean Bard",
    "Hyperactive Dog That Can Talk",
    "Mime",
    "Professional Rapper That Rhymes Everything",
    "Caveman",
    //Character From Media (that we may or may not be allowed to use)
    "Super Mario",
    "Yoda",
  ];
  const [selectedRoleFor, setSelectedRoleFor] = useState(roles[0]);
  const [selectedRoleAgainst, setSelectedRoleAgainst] = useState(roles[0]);

  return (
    <>
      <div className="flex lg:flex-row flex-col sticky top-0 justify-between space-x-2 align-start">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex absolute left-2 top-4 align-center justify-center bg-opacity-20 text-sm dark:text-gray-300 hover:bg-opacity-30 focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 px-0 py-0 w-9 h-9"
        >
          <Cog6ToothIcon className="w-9 h-9" title="Options" />
        </button>
        <Transition
          appear
          show={isOpen}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="lg:space-x-2 lg:space-y-0 space-y-2 p-2 flex flex-col lg:flex-row absolute lg:top-2 top-16 lg:right-8 right-0 lg:justify-between lg:w-[90%] w-full md:h-[15vh] lg:h-14 rounded-lg bg-white/90 dark:bg-gray-800/90"
        >
          <Listbox value={selectedRoleAgainst} onChange={setSelectedRoleAgainst}>
            <div className="flex lg:flex-row flex-col lg:space-x-2">
              <Listbox.Label className="dark:text-white font-bold sm:pl-0 pl-2 sm:pb-0 pb-1">
                Against:
              </Listbox.Label>
              <Listbox.Button className="bg-sky-200 text-black text-sm">
                {selectedRoleAgainst}
              </Listbox.Button>
            </div>
            <Transition
              appear
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute px-4 py-2 lg:space-y-1 space-y-3 lg:mt-12 z-40 left-0 max-h-56 w-full lg:w-[50%] rounded-md overflow-y-auto bg-white">
                {roles.map((role) => (
                  <Listbox.Option className="cursor-pointer" value={role}>
                    {role}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
          <Listbox value={selectedRoleFor} onChange={setSelectedRoleFor}>
            <div className="flex lg:flex-row flex-col lg:space-x-2 lg:absolute lg:right-2 lg:top-2">
              <Listbox.Label className="dark:text-white font-bold text-end sm:pr-0 pr-2 sm:pb-0 pb-1">
                For:
              </Listbox.Label>
              <Listbox.Button className="bg-sky-200 text-black text-sm">
                {selectedRoleFor}
              </Listbox.Button>
            </div>
            <Transition
              appear
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute px-4 py-2 lg:space-y-1 space-y-3 lg:mt-12 z-40 right-0 max-h-56 w-full lg:w-[50%] rounded-md overflow-y-auto bg-white">
                {roles.map((role) => (
                  <Listbox.Option className="cursor-pointer" value={role}>
                    {role}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </Transition>
      </div>
    </>
  );
}
