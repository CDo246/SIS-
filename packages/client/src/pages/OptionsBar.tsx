import { Listbox, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  Cog6ToothIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { trpc } from "../utils/trpc";

export default function OptionsBar(props: {
  selectedRoleAgainst: string;
  setSelectedRoleAgainst: React.Dispatch<React.SetStateAction<string>>;
  selectedRoleFor: string;
  setSelectedRoleFor: React.Dispatch<React.SetStateAction<string>>;
  messageCount: number;
  setMessageCount: React.Dispatch<React.SetStateAction<number>>;
  warningVisible: boolean;
  setWarningVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const roles: string[] | undefined = trpc.roles.useQuery().data;

  return (
    <>
      <div
        className={`${
          !isOpen && "pointer-events-none"
        } flex fixed left-0 right-0 mx-auto lg:flex-row z-40 flex-col lg:w-[54%] w-screen lg:min-w-[825px] my-5 lg:my-2 lg:h-14 lg:items-center lg:space-x-4 lg:space-y-0 space-y-4 lg:justify-between justify-center align-start`}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex align-center pointer-events-auto shadow-xl justify-center bg-opacity-20 text-sm dark:text-gray-300 hover:bg-opacity-30 focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 px-0 ml-8 lg:ml-0 py-0 w-9"
        >
          {!isOpen && (
            <Cog6ToothIcon
              className="w-9 h-9 dark:bg-gray-800/90 bg-gray-100/90 text-sky-700 hover:text-sky-900 dark:text-gray-300 dark:hover:text-gray-400 rounded-lg"
              title="Options"
            />
          )}
          {isOpen && (
            <XMarkIcon
              className="w-9 h-9 dark:bg-gray-800/90 bg-gray-100/90 text-sky-700 hover:text-sky-900 dark:text-gray-300 dark:hover:text-gray-400 rounded-lg"
              title="Close"
            />
          )}
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
          className="lg:space-y-0 lg:-mx-2 space-y-2 p-2 mx-auto lg:mx-[initial] flex flex-col lg:flex-row lg:justify-between lg:w-[100%] w-[85%] md:h-fit lg:h-14 lg:rounded-tr-lg rounded-lg lg:rounded-none bg-white/90 dark:bg-gray-800/90 shadow-lg"
        >
          <Listbox
            value={props.selectedRoleAgainst}
            onChange={(e) => {
              props.setSelectedRoleAgainst(e);
              props.setWarningVisible(true);
            }}
          >
            <div className="flex lg:grow lg:basis-80 lg:mx-2 items-start lg:items-center relative lg:flex-row flex-col lg:space-y-0 lg:border-r lg:border-gray-500 pr-4">
              <Listbox.Label className="dark:text-white font-bold sm:pb-0 lg:mr-2">
                Against:
              </Listbox.Label>
              <Listbox.Button className="flex justify-between items-center text-left bg-sky-100 text-black text-sm lg:max-w-[75%] w-11/12 lg:p-1">
                <span className="pl-2">
                  {!props.selectedRoleAgainst && "Choose role..."}
                  {props.selectedRoleAgainst}
                </span>
                <ChevronDownIcon className="h-6 inline"></ChevronDownIcon>
              </Listbox.Button>
              <Transition
                appear
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute left-0 lg:-ml-4 top-16 lg:top-0 w-full z-40"
              >
                <Listbox.Options className="lg:space-y-0 space-y-3 lg:mt-12 z-40 max-h-56 rounded-b-md overflow-y-auto bg-white">
                  {roles &&
                    roles.map((role) => (
                      <Listbox.Option
                        key={role}
                        value={role}
                        className={({ active, selected }) =>
                          `${active && "bg-sky-100 rounded-md"} ${
                            selected && "bg-sky-200"
                          } p-1 pl-2 cursor-pointer`
                        }
                      >
                        {role}
                      </Listbox.Option>
                    ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <div className="flex grow basis-[12%] lg:mx-2 lg:order-2 order-last items-center lg:justify-center relative lg:flex-row flex-col lg:space-y-0">
            <label
              className="dark:text-white font-bold sm:pb-0 lg:mr-2"
              htmlFor="Message Count"
              title="Number of messages per debater"
            >
              Message Count:
            </label>
            <input
              onChange={(e) => {
                if (
                  (e.target.value as unknown as number) >= 1 &&
                  (e.target.value as unknown as number) <= 4
                )
                  props.setMessageCount(e.target.valueAsNumber);
                props.setWarningVisible(true);
              }}
              type="number"
              id="messageCount"
              name="Message Count"
              defaultValue={props.messageCount}
              min="1"
              max="4"
              className="w-16 p-1.5 text-center rounded-lg bg-sky-100"
            ></input>
          </div>
          <Listbox
            value={props.selectedRoleFor}
            onChange={(e) => {
              props.setSelectedRoleFor(e);
              props.setWarningVisible(true);
            }}
          >
            <div className="flex lg:grow lg:basis-80 lg:mx-2 pl-4 items-end lg:items-center lg:order-last order-2 relative lg:flex-row flex-col lg:space-y-0 lg:border-l lg:border-gray-500">
              <Transition
                appear
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute right-0 top-16 lg:top-0 w-full z-40"
              >
                <Listbox.Options className="lg:space-y-0 space-y-3 lg:mt-12 z-40 max-h-56 rounded-b-md overflow-y-auto bg-white">
                  {roles &&
                    roles.map((role) => (
                      <Listbox.Option
                        key={role}
                        value={role}
                        className={({ active, selected }) =>
                          `${active && "bg-sky-100 rounded-md"} ${
                            selected && "bg-sky-200"
                          } p-1 pl-2 cursor-pointer`
                        }
                      >
                        {role}
                      </Listbox.Option>
                    ))}
                </Listbox.Options>
              </Transition>
              <Listbox.Label className="dark:text-white font-bold sm:pb-0 text-end lg:mr-2">
                For:
              </Listbox.Label>
              <Listbox.Button className="flex justify-between items-center text-left bg-sky-100 text-black text-sm lg:max-w-[75%] w-11/12 lg:p-1">
                <span className="pl-2">
                  {!props.selectedRoleFor && "Choose role..."}
                  {props.selectedRoleFor}
                </span>
                <ChevronDownIcon className="h-6 inline"></ChevronDownIcon>
              </Listbox.Button>
            </div>
          </Listbox>
          {props.warningVisible && (
            <span className="fixed border-x-0 rounded-t-lg rounded-b-lg lg:rounded-none lg:top-36 sm:top-[23rem] top-[26rem] left-0 right-0 lg:left-[initial] lg:right-[initial] mx-auto lg:-ml-2 w-[85%] lg:w-[initial] p-2 text-[#9ca3af] dark:bg-gray-800/90 bg-white/90">
              These changes will take effect when a new debate is generated.
            </span>
          )}
        </Transition>
      </div>
    </>
  );
}
