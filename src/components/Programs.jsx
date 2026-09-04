import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import programs from "../programs";
import ProgramCard from "./ProgramCard";

export default function Programs() {

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section id="programs" className="min-h-screen relative flex flex-col items-center">
            <div className="text-center max-w-2xl mt-24 mx-auto mb-12 px-4" data-aos="fade-up">
                <h2 className="text-sm font-semibold tracking-widest text-amber-600 uppercase mb-3">
                    Our Programs
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Learn. Practice. Build your career.
                </h3>
                <p className="text-gray-600 text-base md:text-lg">
                    Explore practical, industry-focused programs designed
                    to equip you with valuable technical skills.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-16 max-w-6xl mx-auto">
                {Object.entries(programs).map(([key, program]) => (
                    <div
                        key={key}
                        data-aos="fade-up"
                    >
                        <ProgramCard
                            title={program.title}
                            description={program.description}
                            image={program.image}
                            courses={program.programs.map((course) => ({
                                label: course.course,
                                to: course.course
                                    .toLowerCase()
                                    .replace(/[/&]/g, "")
                                    .replace(/\s+/g, "-"),
                            }))}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}