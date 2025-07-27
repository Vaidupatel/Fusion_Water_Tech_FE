import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", to: "#home" },
  { name: "Services", to: "#services" },
  { name: "Why Choose Us", to: "#why-choose-us" },
  { name: "Rental & AMC", to: "#rental-amc" },
  { name: "Contact", to: "#contact" },
];

const FloatingNavbar = ({ className }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((link) => link.to);
      let current = "#home";

      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
          }
        }
      }

      window.history.replaceState(null, "", current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious();
      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={`
          fixed inset-x-4 top-6 z-[5000] 
          backdrop-blur-lg rounded-full 
          transition-all duration-300
          flex justify-center items-center
          ${
            scrolled
              ? "bg-slate-900/90 border border-cyan-400/30 shadow-2xl shadow-cyan-500/10"
              : "bg-slate-900/60 border border-cyan-500/20 shadow-lg"
          }
          ${className}
        `}
      >
        <div className="overflow-x-auto">
          <ul className="flex flex-row items-center space-x-1 sm:space-x-3 md:space-x-6 lg:space-x-8 px-2 sm:px-2 md:px-6 lg:px-8 py-2 sm:py-3">
            {navItems.map((navItem, idx) => (
              <li key={idx} className="flex-shrink-0">
                <a
                  href={navItem.to}
                  className="
                    flex items-center space-x-1
                    rounded-lg transition-all duration-200
                    text-[10px] sm:text-xs md:text-sm lg:text-base
                    px-2 sm:px-3 md:px-4 py-1 sm:py-2
                    text-cyan-100 hover:text-cyan-300 hover:bg-cyan-500/5
                  "
                >
                  <span className="inline-block">
                    {navItem.name === "Home" ? <FaHome size={16} /> : null}
                  </span>
                  <span>{navItem.name === "Home" ? null : navItem.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNavbar;
