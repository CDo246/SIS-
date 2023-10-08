import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  InformationCircleIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { SITE_NAME } from "client/constants.ts";

const navigation = [
  {
    name: "Explore",
    href: "#",
    src: (
      <MagnifyingGlassIcon
        className="block h-10 w-10"
        aria-hidden="true"
        title="Explore"
      />
    ),
    current: false,
  },
  {
    name: "About",
    href: "#",
    src: (
      <InformationCircleIcon
        className="block h-10 w-10"
        aria-hidden="true"
        title="Search"
      />
    ),
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function NavBar() {
  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 bg-gradient-to-r from-blue-200 to-sky-400 shadow-md"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      className="block h-6 w-6 text-black"
                      aria-hidden="true"
                    />
                  ) : (
                    <Bars3Icon
                      className="block h-6 w-6 text-black"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 justify-center sm:items-center">
                {/* Logo and links */}
                <a
                  className="flex text-blue-700 flex-shrink-0 items-center sm:mr-auto"
                  href="/"
                >
                  <div className="flex flex-shrink-0 items-center sm:mr-auto">
                    <ChatBubbleLeftRightIcon className="w-10 h-10 mr-1" />
                    <h1 className="font-bold text-3xl">{SITE_NAME}</h1>
                  </div>
                </a>
                <div className="hidden sm:inline self-stretch flex">
                  <div className="space-x-4 flex h-full grow sm:ml-auto">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? "bg-sky-800 text-white" : "text-black",
                          "flex items-center rounded-t-md px-3 text-lg font-medium hover:text-blue-700",
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <div className={item.src ? "pr-2" : ""}>{item.src}</div>
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute right-0 flex items-center pr-2 sm:static sm:inset-auto">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button
                      className="relative flex items-center px-3 text-lg hover:bg-sky-700 hover:text-white hover:shadow-xl"
                      title="My Account"
                    >
                      <span className="sr-only">Open user menu</span>
                      <UserCircleIcon
                        className="h-10 w-10 mr-2 rounded-full"
                        title="My Account"
                      />
                      <span className="hidden md:flex">My Account</span>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 space-y-2 md:w-[100%] w-[200%] origin-top rounded-b-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-md text-gray-700",
                            )}
                          >
                            Saved Debates
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-md text-gray-700",
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-md text-gray-700",
                            )}
                          >
                            Log out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-black hover:bg-gray-700 hover:text-white",
                    "flex items-center justify-center block rounded-md px-3 py-2 text-base font-medium",
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <div className={item.src ? "pr-2" : ""}>{item.src}</div>
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
