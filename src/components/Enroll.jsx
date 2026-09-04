import { useLocation } from "react-router-dom";
import MultiStepForm from "./MultiStepForm";

export default function Enroll() {
    const location = useLocation();

    const selectedCourse = location.state?.course || "";
    const selectedDepartment = location.state?.department || "";

    return (
        <main className="min-h-screen bg-[#fff8df]">
            <section className="px-6 py-16">
                <div className="mx-auto max-w-3xl">

                    <div className="mb-8 text-center">
                        <span
                            className="
                                inline-block rounded-full
                                bg-[#ffc400]
                                px-4 py-1
                                text-sm font-semibold
                                text-[#2d2926]
                            "
                        >
                            Online Enrollment
                        </span>

                        <h1 className="mt-3 font-serif text-3xl font-bold text-[#2d2926]">
                            Enroll in a Short Course
                        </h1>

                        <p className="mt-2 text-[#665e55]">
                            Complete the form below to enroll in your selected
                            course.
                        </p>
                    </div>

                    <MultiStepForm
                        selectedCourse={selectedCourse}
                        selectedDepartment={selectedDepartment}
                    />

                </div>
            </section>
        </main>
    );
}