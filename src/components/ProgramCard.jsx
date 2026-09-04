import { Link } from "react-router-dom";

export default function ProgramCard({
    title,
    description,
    image,
    courses = [],
}) {
    return (
        <div className="w-80 rounded-2xl bg-amber-50/70 border border-amber-200/60 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            {image && (
                <div className="relative h-48 w-full">
                    <img
                        className="object-cover object-top w-full h-full"
                        src={image}
                        alt={title}
                    />

                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                            className="relative block h-8 w-[calc(100%+2px)]"
                        >
                            <path
                                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                                className="fill-amber-50"
                            />
                        </svg>
                    </div>
                </div>
            )}

            <div className="px-5 pb-5 space-y-4">
                <div>
                    <h3 className="font-serif text-xl font-bold text-stone-800">
                        {title}
                    </h3>

                    <p className="text-stone-600 text-sm leading-relaxed mt-1">
                        {description}
                    </p>
                </div>

                {courses.length > 0 && (
                    <div>
                        <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-2">
                            Courses
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {courses.map(({ label, to }) => (
                                <Link
                                    key={to}
                                    to={`/programs/${encodeURIComponent(title)}/${to}`}
                                    className="text-xs font-medium px-3 py-1 rounded-full bg-amber-200/60 text-amber-800 border border-amber-300/50 hover:bg-amber-200 hover:text-amber-900 transition-colors duration-150"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}