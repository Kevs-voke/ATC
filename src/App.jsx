import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/NavBar";
import SearchPage from "./components/SearchPage";
import Home from "./components/Home";
import About from "./components/About";
import Programs from "./components/Programs";
import MobileNav from "./components/MobileNav";
import Admission from "./components/Admission";
import Enroll from "./components/Enroll";
import CourseDetail from "./components/CourseDetails";
import Contacts from "./components/Contacts";

import program from "./programs";

function MainPage() {
  return (
    <>
      <Home />
      <About />
      <Programs />
      <Admission />
      <Contacts />
    </>
  );
}

function App() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuBtnOn, setIsMenuBtnOn] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const location = useLocation();

  const isEnrollPage =
    location.pathname === "/enroll" ||
    location.pathname.startsWith("/programs/");

  useEffect(() => {
    function handleKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchVisible(true);
      }

      if (e.key === "Escape") {
        setIsSearchVisible(false);
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.substring(1);
    const element = document.getElementById(id);

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 0);
    }
  }, [location.hash]);

  return (
    <>
      {!isEnrollPage && (
        <>
          <Navbar
            setIsSearchVisible={setIsSearchVisible}
            setIsMenuBtnOn={setIsMenuBtnOn}
            isMenuBtnOn={isMenuBtnOn}
          />

          <MobileNav
            isMenuBtnOn={isMenuBtnOn}
            setIsMenuBtnOn={setIsMenuBtnOn}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </>
      )}

      {isSearchVisible && !isEnrollPage && (
        <SearchPage
          data={program}
          setIsSearchVisible={setIsSearchVisible}
        />
      )}

      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/enroll" element={<Enroll />} />

        <Route
          path="/programs/:program/:slug"
          element={<CourseDetail />}
        />
      </Routes>
    </>
  );
}

export default App;