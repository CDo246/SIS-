import { useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CustomRoleDialog } from "./CustomRoleDialog";
import {
  Cog6ToothIcon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

export default function OptionsBar(props: {
  roles: string[] | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRoleAgainst: string;
  setSelectedRoleAgainst: React.Dispatch<React.SetStateAction<string>>;
  selectedRoleFor: string;
  setSelectedRoleFor: React.Dispatch<React.SetStateAction<string>>;
  messageCount: number;
  setMessageCount: React.Dispatch<React.SetStateAction<number>>;
  warningVisible: boolean;
  setWarningVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [dialogOpenState, setDialogOpenState] = useState<number>(0); // 0: closed, 1: Against, 2: For

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      // event.preventDefault();
      if (event.key === "Escape") {
        props.setIsOpen(false);
      }
    }
    addEventListener("keydown", handleEscape);
    return () => removeEventListener("keydown", handleEscape);
  }, [event]);

  useEffect(() => {
    if (props.selectedRoleAgainst == "Custom...") {
      setDialogOpenState(1);
    }
    if (props.selectedRoleFor == "Custom...") {
      setDialogOpenState(2);
    }
  }, [props.selectedRoleAgainst, props.selectedRoleFor]);
  return (
    <>
      <div
        className={`${
          !props.isOpen && "pointer-events-none"
        } flex fixed left-0 right-0 mx-auto lg:flex-row z-40 flex-col lg:w-[54%] w-screen lg:min-w-[825px] my-5 lg:my-2 lg:h-14 lg:items-center lg:space-x-4 lg:space-y-0 space-y-4 lg:justify-between justify-center align-start`}
      >
        <button
          type="button"
          onClick={() => props.setIsOpen(!props.isOpen)}
          className="pointer-events-auto bg-gray-100/90 dark:bg-gray-800/90 hover:text-white shadow-xl bg-opacity-20 text-sm dark:text-gray-300 hover:bg-opacity-30 focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 px-0 ml-8 lg:ml-0 py-0 w-fit"
        >
          {!props.isOpen ? (
            <div
              className="flex w-fit items-center justify-between min-w-[115px] max-w-[115px]"
              title="Options"
            >
              <Cog6ToothIcon className="w-9 h-9 text-sky-700 dark:text-gray-300 rounded-lg" />
              <span className="flex-grow text-lg px-2 text-center">
                Options
              </span>
            </div>
          ) : (
            <XMarkIcon
              className="w-9 h-9 dark:bg-gray-800/90 text-sky-700 dark:text-gray-300 rounded-lg"
              title="Close"
            />
          )}
        </button>
        {props.isOpen && (
          <div className="lg:space-y-0 lg:-mx-2 space-y-2 p-2 mx-auto lg:mx-[initial] flex flex-col lg:flex-row lg:justify-between lg:w-[100%] w-[85%] md:h-fit lg:h-14 lg:rounded-tr-lg rounded-lg lg:rounded-none bg-white/90 dark:bg-gray-800/90 shadow-lg">
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
                <Listbox.Button className="flex justify-between items-center text-left bg-sky-100 text-black hover:text-white text-sm lg:max-w-[75%] max-h-12 w-11/12 lg:p-1">
                  <span className="pl-2 overflow-hidden max-w-full overflow-y-auto">
                    {props.selectedRoleAgainst
                      ? props.selectedRoleAgainst
                      : "Debater"}
                  </span>
                  <ChevronDownIcon className="h-6 inline" />
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
                  <Listbox.Options className="lg:space-y-0 shadow-lg space-y-3 lg:mt-12 z-40 max-h-64 rounded-b-md overflow-y-auto bg-white">
                    {props.roles ? (
                      props.roles.map((role) => (
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
                      ))
                    ) : (
                      <div className="h-9 flex align-center overflow-hidden">
                        <ArrowPathIcon className="text-sky-700 w-9 mx-auto motion-safe:animate-spin" />
                      </div>
                    )}
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
                Message Count (1-4):
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
                onBlur={(e) => {
                  let inputValue = e.target.valueAsNumber;
                  inputValue = Math.max(1, Math.min(4, inputValue));
                  e.target.valueAsNumber = inputValue;
                  props.setMessageCount(inputValue);
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
                  <Listbox.Options className="lg:space-y-0 shadow-lg space-y-3 lg:mt-12 z-40 max-h-64 rounded-b-md overflow-y-auto bg-white">
                    {props.roles ? (
                      props.roles.map((role) => (
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
                      ))
                    ) : (
                      <div className="h-9 flex align-center overflow-hidden">
                        <ArrowPathIcon className="text-sky-700 w-9 mx-auto motion-safe:animate-spin" />
                      </div>
                    )}
                  </Listbox.Options>
                </Transition>
                <Listbox.Label className="dark:text-white font-bold sm:pb-0 text-end lg:mr-2">
                  For:
                </Listbox.Label>
                <Listbox.Button className="flex justify-between items-center text-left bg-sky-100 text-black hover:text-white text-sm lg:max-w-[75%] max-h-12 w-11/12 lg:p-1">
                  <span className="pl-2 overflow-hidden">
                    {props.selectedRoleFor ? props.selectedRoleFor : "Debater"}
                  </span>
                  <ChevronDownIcon className="h-6 inline" />
                </Listbox.Button>
              </div>
            </Listbox>
            {props.warningVisible && (
              <span className="fixed border-x-0 rounded-t-lg rounded-b-lg lg:rounded-none lg:top-36 sm:top-[23rem] top-[26rem] left-0 right-0 lg:left-[initial] lg:right-[initial] mx-auto lg:-ml-2 w-[85%] lg:w-[initial] p-2 text-[#9ca3af] dark:bg-gray-800/90 bg-white/90">
                These changes will take effect when a new debate is generated.
              </span>
            )}
          </div>
        )}
      </div>
      <CustomRoleDialog
        dialogOpenState={dialogOpenState}
        setDialogOpenState={setDialogOpenState}
        selectedRoleAgainst={props.selectedRoleAgainst}
        setSelectedRoleAgainst={props.setSelectedRoleAgainst}
        selectedRoleFor={props.selectedRoleFor}
        setSelectedRoleFor={props.setSelectedRoleFor}
      ></CustomRoleDialog>
    </>
  );
}
