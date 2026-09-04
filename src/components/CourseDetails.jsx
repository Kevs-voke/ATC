import { useParams, useNavigate, Link } from "react-router-dom";
import programs from "../programs";
import { slugify } from "../Utilites/slugify";

export default function CourseDetail() {
    const { program, slug } = useParams();
    const navigate = useNavigate();

    const programTitle = decodeURIComponent(program);

    const category = Object.values(programs).find(
        (p) => p.title === programTitle
    );

    const course = category?.programs.find(
        (c) => slugify(c.course) === slug
    );

    if (!category || !course) {
        return (
            <section className="min-h-screen bg-[#FFF8DC] flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#FFF1B8] flex items-center justify-center">
                        <span className="text-lg">!</span>
                    </div>

                    <h1 className="text-2xl font-bold text-stone-900 mb-2">
                        Course not found
                    </h1>

                    <p className="text-sm text-stone-600 mb-5">
                        We couldn't find that course. It may have been moved
                        or renamed.
                    </p>

                    <Link
                        to="/#programs"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5C100] text-sm font-semibold text-stone-900 hover:bg-[#eab900] transition"
                    >
                        ← Back to Programs
                    </Link>
                </div>
            </section>
        );
    }

    const handleApplyNow = () => {
        navigate("/enroll", {
            state: {
                course: course.course,
                department: category.title,
            },
        });
    };

    return (
        <main className="min-h-screen bg-[#FFF8DC] px-4 sm:px-6 pt-16 sm:pt-18 pb-10">

            <div className="max-w-4xl mx-auto mb-3">
                <Link
                    to="/#programs"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#C94F00] hover:text-[#9F3E00] transition"
                >
                    <span className="text-base">←</span>
                    Back to Programs
                </Link>
            </div>

            <div className="max-w-4xl mx-auto">
                <article className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(120,80,20,0.08)] border border-[#F1E5BD]">
                    {course.image && (
                        <div className="relative h-40 sm:h-48 lg:h-52 overflow-hidden">

                            <img
                                src={course.image}
                                alt={course.course}
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-4">
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-xs font-semibold text-[#C94F00] shadow-sm">
                                    {category.title}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="p-4 sm:p-5 lg:p-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-stone-900 leading-tight">
                                {course.course}
                            </h1>

                            <p className="mt-1.5 text-sm font-semibold text-[#C94F00]">
                                {category.title}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-5">
                            <div className="rounded-xl bg-[#FFF8DC] border border-[#F3E7B7] p-3">
                                <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-500">
                                    Duration
                                </p>

                                <p className="mt-0.5 text-sm sm:text-base font-bold text-stone-900">
                                    {course.duration}
                                </p>
                            </div>
                            <div className="rounded-xl bg-[#FFF8DC] border border-[#F3E7B7] p-3">
                                <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-500">
                                    Tuition
                                </p>

                                <p className="mt-0.5 text-sm sm:text-base font-bold text-stone-900">
                                    KES {course.feePerMonth.toLocaleString()}
                                </p>

                                <p className="text-[10px] text-stone-500">
                                    per month
                                </p>
                            </div>

                            <div className="hidden sm:block rounded-xl bg-[#FFF8DC] border border-[#F3E7B7] p-3">
                                <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-500">
                                    Training
                                </p>

                                <p className="mt-0.5 text-sm sm:text-base font-bold text-stone-900">
                                    Practical
                                </p>

                                <p className="text-[10px] text-stone-500">
                                    skills focused
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 max-w-3xl">
                            <h2 className="text-base font-bold text-stone-900 mb-1.5">
                                About this course
                            </h2>

                            <p className="text-sm text-stone-600 leading-6">
                                {course.description}
                            </p>
                        </div>

                        <div className="mt-5 rounded-xl bg-[#FFF3C4] border border-[#F5DE79] p-4">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                                <div>
                                    <h3 className="text-sm sm:text-base font-bold text-stone-900">
                                        Ready to start your training?
                                    </h3>

                                    <p className="text-xs text-stone-600 mt-0.5">
                                        Apply now and take the next step toward
                                        building your skills.
                                    </p>
                                </div>

                                <button
                                    onClick={handleApplyNow}
                                    className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#F5C100] text-sm text-stone-900 font-bold shadow-[0_5px_14px_rgba(245,193,0,0.2)] hover:bg-[#EAB900] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                                >
                                    Apply Now
                                    <span>→</span>
                                </button>

                            </div>
                        </div>

                    </div>
                </article>
            </div>
        </main>
    );
}