import { Dialog, Switch, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import "../index.css";

export default function OptionsModal() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-end justify-end">
        <button
          type="button"
          onClick={openModal}
          className="justify-self-center bg-opacity-20 text-sm dark:text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 px-2"
        >
          <Cog6ToothIcon className="w-6" title="Options" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                className="divide-y"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-sky-950 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl mb-4 font-medium leading-6 text-white"
                  >
                    Bot Options
                  </Dialog.Title>
                  <div className="py-4 flex">
                    <MyToggle />
                    <p className="text-sm text-white ml-2">Make Evil</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-sky-200 mt-4 px-4 py-2 font-medium hover:bg-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Apply
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
  function MyToggle() {
    const [enabled, setEnabled] = useState(false);

    return (
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? "bg-sky-300" : "bg-gray-400"
        } relative inline-flex h-6 w-11 p-0 items-center rounded-full`}
      >
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    );
  }
}
