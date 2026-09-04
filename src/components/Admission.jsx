import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admission() {
    const navigate = useNavigate();

    const requirements = [
        {
            title: "KCPE or KCSE Certificate",
            body: "A copy of your KCPE or KCSE result slip/certificate. Most short courses have no minimum grade requirement.",
            accent: "border-l-amber-500",
        },
        {
            title: "National ID or Birth Certificate",
            body: "A valid copy of your National ID (or birth certificate for applicants under 18).",
            accent: "border-l-yellow-600",
        },
        {
            title: "Passport Photos",
            body: "Two recent passport-size photographs for your student file and ID card.",
            accent: "border-l-orange-400",
        },
        {
            title: "Minimum Age",
            body: "Applicants should be at least 16 years old. Some technical courses may set a higher minimum age.",
            accent: "border-l-amber-600",
        },
        {
            title: "Registration Fee",
            body: "A one-time, non-refundable registration fee payable upon confirmation of admission.",
            accent: "border-l-yellow-500",
        },
        {
            title: "Course-Specific Requirements",
            body: "Select programs (e.g. Drone Piloting) may carry extra regulatory requirements — our admissions team will guide you.",
            accent: "border-l-orange-500",
        },
    ];

    const steps = [
        {
            number: "01",
            title: "Choose Your Course",
            body: "Browse our programs and pick the course that matches your interests and career goals.",
        },
        {
            number: "02",
            title: "Submit Your Application",
            body: "Fill in the online enrollment form with your personal details and preferred intake date.",
        },
        {
            number: "03",
            title: "Get Contacted",
            body: "Our admissions team reviews your application and reaches out via phone or email.",
        },
        {
            number: "04",
            title: "Confirm & Report",
            body: "Pay your registration fee, receive your admission letter, and report on your intake date.",
        },
    ];

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section id="admissions" className="space-y-10 px-4 py-8 max-w-5xl mx-auto">
            <div className="space-y-4 mt-20">
                <p
                    data-aos="fade-up"
                    className="text-xs font-semibold tracking-widest uppercase text-amber-700">
                    Admissions · Technical College of Aberdarl
                </p>
                <h1
                    data-aos="fade-up"
                    className="font-serif text-4xl font-bold leading-snug text-stone-800">
                    Join Technical College{" "}
                    <span className="italic font-normal text-amber-700">of Aberdarl</span>
                </h1>
                <p
                    data-aos="fade-up"
                    className="text-stone-600 leading-relaxed max-w-2xl">
                    Starting your journey with us is simple. Review what you'll need
                    below, then apply online in just a few minutes — no queuing, no
                    paperwork trips required.
                </p>
            </div>

            <hr className="border-amber-300/60" />

            <div>
                <h2
                    data-aos="fade-up"
                    className="font-serif text-3xl font-bold text-stone-800 mb-6">
                    Admission Requirements
                </h2>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {requirements.map(({ title, body, accent }) => (
                        <div
                            data-aos="fade-left"
                            key={title}
                            className={`rounded-2xl bg-amber-50/70 border border-amber-200/60 p-6 border-l-4 ${accent} shadow-sm hover:shadow-md hover:bg-amber-50 transition-all duration-200`}
                        >
                            <h3 className="font-semibold text-stone-800 text-base mb-2">
                                {title}
                            </h3>
                            <p className="text-stone-600 text-sm leading-relaxed">{body}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2
                    data-aos="fade-up"
                    className="font-serif text-3xl font-bold text-stone-800 mb-6">
                    How to Apply
                </h2>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map(({ number, title, body }) => (
                        <div
                            data-aos="fade-up"
                            key={number}
                            className="rounded-2xl bg-white border border-amber-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            <span className="font-serif text-3xl font-bold text-amber-300">
                                {number}
                            </span>
                            <h3 className="font-semibold text-stone-800 text-base mt-2 mb-2">
                                {title}
                            </h3>
                            <p className="text-stone-600 text-sm leading-relaxed">{body}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div
                data-aos="fade-up"
                className="rounded-2xl bg-amber-100/60 border border-amber-300/50 p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
            >
                <div>
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-3">
                        Ready to Get Started?
                    </h2>
                    <p className="text-stone-600 leading-relaxed max-w-xl">
                        Applications are open for our upcoming intake. Choose a course
                        and submit your application online — it only takes a few
                        minutes.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {["Rolling Intakes", "Flexible Payment Plans", "No Hidden Fees"].map(
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
                <button
                    onClick={() => navigate("/enroll")}
                    className="shrink-0 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 shadow-sm"
                >
                    Apply now
                </button>
            </div>
        </section>
    );
}