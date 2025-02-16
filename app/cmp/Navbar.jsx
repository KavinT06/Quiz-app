"use client";
import React, { useState } from "react";
import Coins from "./Coins";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="w-full max-w-fullxl mx-auto flex flex-wrap items-center justify-between p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
                            Quiz App
                        </span>
                    </a>

                    {/* Hamburger Button */}
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded={menuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        {menuOpen ? (
                            <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        )}
                    </button>

                    {/* Menu Items */}
                    <div
                        className={`${
                            menuOpen ? "block" : "hidden"
                        } w-full md:block md:w-auto`}
                        id="navbar-default"
                    >
                        {/* <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li className="flex items-center">
                                <Coins />
                                <p className="block py-2 px-3 text-gray-900 rounded-sm md:border-0 md:p-0 dark:text-white text-lg ml-2 mr-10">
                                    Points : 100
                                </p>
                            </li>
                        </ul> */}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
