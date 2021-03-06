import React from "react";
import Link from "next/link";
import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
const navigation = ["Dashboard", "Team", "Projects", "Calendar", "Reports"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  return (
    <Fragment>
      <Disclosure
        as="nav"
        className="bg-indigo-100 backdrop-filter drop-shadow-sm fixed w-full blur-lg top-0 z-10 md:mb-10"
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 md:py-6 sm:py-4 backdrop-filter drop-shadow-sm backdrop-blur-lg">
              <div className="flex items-center justify-between h-16">
                <Link href="/">
                  <a>
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <img
                          className="h-20 w-40 md:w-64 md:h-32"
                          src="/songish-logo.png"
                          alt="Workflow"
                        />
                      </div>
                    </div>
                  </a>
                </Link>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6 space-x-16">
                    <Link href="/">
                      <a className="text-gray-700  bg-gradient-to-r from-blue-200 to-green-400 text-xl  p-3 rounded-2xl ">
                        Home
                      </a>
                    </Link>
                    <Link href="/new">
                      <a className="text-gray-700 p-3 rounded-2xl text-xl bg-gradient-to-r from-blue-200 to-green-400 ">
                        Create Song
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gradient-to-r from-blue-200 to-green-400 inline-flex items-center justify-center p-2 rounded-md text-green-900 hover:text-white hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-400 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden ">
              <div className="px-2 pt-2 pb-3 sm:px-3 flex flex-col justify-center items-center space-y-7 my-6 border-gray-500">
                <Link href="/">
                  <a className="text-gray-700 bg-gradient-to-r from-blue-200 to-green-400 p-3 rounded-full text-lg ">
                    Home
                  </a>
                </Link>
                <Link href="/new">
                  <a className="text-gray-700 bg-gradient-to-r from-blue-200 to-green-400 p-3 rounded-full text-lg ">
                    Create Song
                  </a>
                </Link>
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://pbs.twimg.com/profile_images/1271543395694108672/x3dN4sWs_400x400.jpg"
                      alt=""
                    />
                  </div>
                  <div className="ml-6 flex flex-col justify-center items-left space-y-1">
                    <div className="text-base font-medium leading-none text-gray-700">
                      Turhan Sel
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-700">
                      turhansel@gmail.com
                    </div>
                  </div>
                  <button className="ml-auto bg-gray-500 flex-shrink-0 p-1 rounded-full text-green-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </Fragment>
  );
};

export default Header;
