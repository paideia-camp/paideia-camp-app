import React, { useState, useEffect } from "react";
import Logo from "../images/padei_logo.png";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/how-it-works", label: "How it works" },
    { to: "/about", label: "About Paideia" },
  ];

  return (
    <>
      <nav className="bg-[#E2BFBF] flex items-center justify-between px-4 py-4 fixed top-0 left-0 right-0 z-50 rounded-br-2xl rounded-bl-2xl">
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="logo"
            className="w-[31px] h-[36px] rounded-[999px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <RouterNavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `hover:text-red-600 transition-colors ${
                  isActive ? "text-red-600 font-bold" : ""
                }`
              }
            >
              {link.label}
            </RouterNavLink>
          ))}
        </div>

        {/* Desktop Sign Up Button */}
        <div className="hidden md:flex">
          <Link
            to="/auth/signup"
            className="py-2 px-6 rounded-full border-b-2 border-r-2 border-black relative overflow-hidden font-semibold text-black text-center hover:shadow-lg hover:shadow-red-500 hover:font-extrabold bg-orange-400 transition-all"
          >
            <span className="relative z-10 text-nowrap flex justify-center items-center">
              Sign Up With Camp
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10.605"
                height="15.555"
                className="animate-pulse mx-2"
              >
                <path d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <RouterNavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `text-lg hover:text-red-600 transition-colors ${
                        isActive ? "text-red-600 font-bold" : ""
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </RouterNavLink>
                ))}
                <Link
                  to="/auth/signup"
                  className="py-2 px-4 rounded-full border-b-2 border-r-2 border-black font-semibold text-black bg-orange-400 text-center hover:shadow-lg hover:shadow-red-500 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up With Camp
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      {/* Scroll Progress Bar */}
      <div className="fixed top-16 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-red-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </>
  );
};

export default Navigation;
