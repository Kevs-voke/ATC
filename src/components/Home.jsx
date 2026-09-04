import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Typewriter } from "react-simple-typewriter";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home(props) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionHeight = window.innerHeight;
      const fade = 1 - Math.min(scrollY / (sectionHeight * 0.8), 1);
      setOpacity(fade);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: "url('/hero-background.jpg')",
          opacity,
        }}
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20 transition-opacity duration-300 ease-out brightness-70"
      />

      <section id="home" className="min-h-screen relative flex flex-col gap-8">
        <div className="mt-48">
          <h1
            data-aos="fade-up"
            className="text-center text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tighter text-[#F5C100]"
          >
            TECHNICAL COLLEGE
            <span className="block text-[#F5C100] mt-3 md:mt-4">OF</span>
            <span className="block text-[#F5C100] mt-3 md:mt-4">ABELDARL</span>
          </h1>
        </div>

        <div className="py-8 flex items-center">
          <div className="w-full max-w-3xl mx-auto">
            <div
              className="inline-block text-left
                min-w-70
                sm:min-w-105
                md:min-w-145
                lg:min-w-170"
            >
              <span
                className="bg-linear-to-r from-cyan-600 via-white to-[#F5C100]
                   bg-clip-text text-transparent
                   text-[19px] sm:text-2xl md:text-4xl
                   font-semibold tracking-tight leading-tight"
              >
                <Typewriter
                  words={[
                    "Empowering Talent Through Training",
                    "Modern Skills for Modern Careers",
                    "Turning Passion Into Profession",
                    "Your Future Starts Here",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={40}
                  delaySpeed={2000}
                />
              </span>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6"
        >
          <Link
            to="/enroll"
            className="w-full sm:w-auto text-center px-8 py-3.5 rounded-full
              bg-[#F5C100] text-stone-900 font-semibold text-base
              hover:bg-yellow-400/70 active:scale-95
              transition-all duration-200 shadow-lg shadow-amber-500/30"
          >
            Apply Now
          </Link>
          <Link
            to="/#contacts"
            className="w-full sm:w-auto text-center px-8 py-3.5 rounded-full
    bg-transparent text-white font-semibold text-base
    border-2 border-white/60
    hover:bg-white/15 hover:border-white active:scale-95
    transition-all duration-200"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}