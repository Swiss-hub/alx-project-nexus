

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";

export default function NavBar() {
    const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    return (
        <Navbar fluid rounded className="bg-black/80 border-b border-gray-800 px-2 sm:px-6 dark:bg-gray-900 dark:border-gray-700">
            <NavbarBrand>
                <Link to="/" className="flex items-center gap-2 text-primary text-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary" tabIndex={0} aria-label="Go to home page">
                    <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
                    MovieApp
                </Link>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
                <Link to="/" className="hover:text-primary block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" tabIndex={0} aria-label="Home page">
                    Home
                </Link>
                <Link to="/favorites" className="hover:text-primary block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" tabIndex={0} aria-label="Favorites page">
                    Favorites
                </Link>
                <Link to="/search" className="hover:text-red-400 block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" tabIndex={0} aria-label="Search page">
                    Search
                </Link>
                <button
                    onClick={() => setDark((d) => !d)}
                    className="ml-4 px-3 py-1 rounded bg-gray-700 text-white hover:bg-primary transition dark:bg-gray-600 dark:hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {dark ? "🌙" : "☀️"}
                </button>
            </NavbarCollapse>
        </Navbar>
    );
}

