import { easeIn, motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import logo from "../assets/school-logo.svg";
import { useState, useEffect } from "react";
import { Menu, Search, X } from "lucide-react";

export default function Navbar(props) {
  const navLinks = [
    { name: "Home", href: "/#home", id: "home" },
    { name: "About", href: "/#about", id: "about" },
    { name: "Programs", href: "/#programs", id: "programs" },
    { name: "Contact", href: "/#contacts", id: "contacts" },
  ];

  const [activeMenu, setActiveMenu] = useState("Home");

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )[0];

        if (visibleSection) {
          const activeLink = navLinks.find(
            (link) => link.id === visibleSection.target.id
          );

          if (activeLink) {
            setActiveMenu(activeLink.name);

            // Update URL without reloading the page
            window.history.replaceState(
              null,
              "",
              activeLink.href
            );
          }
        }
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0.6 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 500,
        mass: 5,
      }}
      className="bg-[#F5C100] rounded-xs ml-0.5 mr-0.5 flex flex-row justify-between p-1 h-20 fixed left-0 right-0 z-70"
    >

      <motion.div
        whileHover={{ scale: 1.10 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "tween",
          duration: 0.3,
          ease: easeIn,
        }}
        className="basis-1/4 flex items-center justify-center"
      >
        <Link to="/" className="flex flex-row gap-1 items-center">
          <motion.img
            src={logo}
            alt="Technical College of Abeldarl logo"
            className="h-16 w-auto bg-[#F5C100] rounded-b-sm"
          />
        </Link>
      </motion.div>

      <div className="basis-2/4 hidden md:flex items-center gap-8 justify-center">
        <AnimatePresence>
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              className="relative flex flex-col items-center"
            >
              <Link
                to={link.href}
                onClick={() => {
                  setActiveMenu(link.name);
                }}
                className="flex flex-col items-center rounded-sm transition-colors duration-200 hover:text-cyan-700"
              >
                {link.name}
              </Link>

              {link.name === activeMenu && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="basis-1/4 flex justify-center items-center">

        <button
          className="hidden md:flex items-center border-2 border-black/25 h-9 w-16 rounded-b-md justify-center hover:border-black/50 hover:bg-amber-600/20"
          onClick={() => props.setIsSearchVisible(true)}
        >
          <Search className="text-black/55" />
        </button>

        <button
          className="md:hidden flex items-center border-2 h-9 w-16 rounded-b-md justify-center border-black/25 hover:border-black/50 hover:bg-amber-600/20"
          onClick={() =>
            props.setIsMenuBtnOn((prev) => !prev)
          }
        >
          {props.isMenuBtnOn ? (
            <X className="text-black/55" />
          ) : (
            <Menu className="text-black/55" />
          )}
        </button>

      </div>
    </motion.nav>
  );
}