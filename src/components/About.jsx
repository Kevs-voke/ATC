import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export default function About() {
    const features = [
        {

            title: "Practical Training",
            body: "Learn through hands-on experience using modern workshops and industry-standard equipment.",
            accent: "border-l-amber-500",
        },
        {

            title: "High Employability",
            body: "Our graduates possess skills that are highly valued by employers across Kenya.",
            accent: "border-l-yellow-600",
        },
        {

            title: "Accredited Certifications",
            body: "Earn qualifications recognized by KNEC, CDACC, NITA, and ICM.",
            accent: "border-l-orange-400",
        },
        {

            title: "Industry-Relevant Courses",
            body: "Study programs designed to meet the demands of today's job market and industries.",
            accent: "border-l-amber-600",
        },
        {
            title: "Expert Instructors",
            body: "Learn from experienced trainers with both academic and industry expertise.",
            accent: "border-l-yellow-500",
        },
        {

            title: "Affordable Education",
            body: "Benefit from flexible payment options and available scholarship opportunities.",
            accent: "border-l-orange-500",
        },
    ];
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);


    return (
        <section id="about" className="space-y-10 px-4 py-8 max-w-5xl mx-auto">
            <div className="space-y-4 mt-7">
                <p
                    data-aos="fade-up"
                    className="text-xs font-semibold tracking-widest uppercase text-amber-700">
                    TVET Institution · Nyahururu, Laikipia County
                </p>
                <h1
                    data-aos="fade-up"
                    className="font-serif text-4xl font-bold leading-snug text-stone-800">
                    Technical College{" "}
                    <span className="italic font-normal text-amber-700">of Aberdarl</span>
                </h1>
                <p
                    data-aos="fade-up"
                    className="text-stone-600 leading-relaxed max-w-2xl">
                    A leading Technical and Vocational Education and Training (TVET)
                    institution in Nyahururu, Laikipia County, dedicated to transforming
                    lives through practical, industry-relevant skills.
                </p>
                <p
                    data-aos="fade-up"
                    className="text-stone-600 leading-relaxed max-w-2xl">
                    We don't just teach theory — we equip you with real hands-on
                    competencies that prepare you for immediate employment, successful
                    entrepreneurship, or further studies.
                </p>
            </div>

            <hr className="border-amber-300/60" />


            <div>
                <h2
                    data-aos="fade-up"
                    className="font-serif text-3xl font-bold text-stone-800 mb-6">
                    Why Choose Technical College of Aberdarl?
                </h2>
                <div

                    className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {features.map(({ icon, title, body, accent }) => (
                        <div
                            data-aos="fade-left"
                            key={title}
                            className={`rounded-2xl bg-amber-50/70 border border-amber-200/60 p-6 border-l-4 ${accent} shadow-sm hover:shadow-md hover:bg-amber-50 transition-all duration-200`}
                        >
                            <div className="text-2xl mb-3">{icon}</div>
                            <h3 className="font-semibold text-stone-800 text-base mb-2">
                                {title}
                            </h3>
                            <p className="text-stone-600 text-sm leading-relaxed">{body}</p>
                        </div>
                    ))}
                </div>
            </div>


            <div
                data-aos="fade-up"
                className="rounded-2xl bg-amber-100/60 border border-amber-300/50 p-8 flex gap-5 items-start">

                <div>
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-3">
                        Our Commitment
                    </h2>
                    <p className="text-stone-600 leading-relaxed">
                        Located in Nyahururu, Laikipia County, we provide a conducive
                        learning environment with convenient access to transport,
                        accommodation, and urban amenities, ensuring students can focus on
                        achieving their academic and career goals.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {["Nyahururu", "Laikipia County", "Transport links", "Accommodation nearby"].map(
                            (tag) => (
                                <span
                                    key={tag}
                                    className="text-xs font-medium px-3 py-1 rounded-full bg-amber-200/60 text-amber-800 border border-amber-300/50"
                                >
                                    {tag}
                                </span>
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}