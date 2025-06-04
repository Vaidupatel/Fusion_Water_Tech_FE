import { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { FaArrowDown } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past threshold
      setIsScrolled(currentScrollY > 50);

      // Detect scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services", hasDropdown: true },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed h-[10vh] flex items-center justify-center top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-white shadow-lg backdrop-blur-sm"
            : "bg-transparent border-b border-[#FFFFFF] border-dotted"
        } ${
          scrollDirection === "down" && isScrolled
            ? "transform -translate-y-full"
            : "transform translate-y-0"
        }`}
      >
        <div className="w-full mx-auto px-8">
          <div className="container flex items-center justify-between h-full p-4 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="#"
                className={`text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                YourLogo
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <a
                      href={item.href}
                      className={`px-3 py-2 text-xl font-medium transition-colors duration-300 flex items-center hover:scale-105 transform ${
                        isScrolled
                          ? "text-gray-700 hover:text-blue-600"
                          : "text-white hover:text-blue-200"
                      }`}
                    >
                      {item.name}
                      {item.hasDropdown && (
                        <FaArrowDown
                          className={`ml-1 h-4 w-4 transition-transform group-hover:rotate-180 ${
                            isScrolled ? "text-gray-700" : "text-white"
                          }`}
                        />
                      )}
                    </a>

                    {/* Dropdown Menu */}
                    {item.hasDropdown && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                        <div className="py-1">
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            Web Design
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            Development
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            Consulting
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md transition-colors duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
              >
                {isMobileMenuOpen ? (
                  <MdClose className="h-6 w-6" />
                ) : (
                  <CiMenuFries className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden  transition-all duration-300 ease-in-out overflow-hidden ${
              isMobileMenuOpen
                ? "absolute top-[10vh] left-0 w-full opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div
              className={`px-2 pt-2 pb-3 space-y-1 ${
                isScrolled ? "bg-white" : "bg-[#00000040]"
              }`}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-300 rounded-md ${
                    isScrolled
                      ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      : "text-white hover:text-blue-200 hover:bg-white hover:bg-opacity-10"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
