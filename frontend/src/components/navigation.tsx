import React, { useState, useEffect } from "react";
import Logo from "../images/padei_logo.png";
import { Link, NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  // Auto-navigate to dashboard when wallet connects
  useEffect(() => {
    if (isConnected) {
      navigate("/dashboard");
    }
  }, [isConnected, navigate]);

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

        {/* Desktop Connect Button */}
        <div className="hidden md:flex">
          <ConnectButton />
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
                <div className="pt-4">
                  <ConnectButton />
                </div>
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
