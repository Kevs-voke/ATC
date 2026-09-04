import { useState, useEffect, useActionState } from "react";
import { motion, AnimatePresence } from "motion/react";

import {
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePhoneNumber,
} from "../Utilites/enrolValidations";

import programs from "../programs";

const SLIDE_DISTANCE = 60;

const variants = {
    enter: (direction) => ({
        x: direction > 0 ? SLIDE_DISTANCE : -SLIDE_DISTANCE,
        opacity: 0,
    }),

    center: {
        x: 0,
        opacity: 1,
    },

    exit: (direction) => ({
        x: direction > 0 ? -SLIDE_DISTANCE : SLIDE_DISTANCE,
        opacity: 0,
    }),
};

const initialState = {
    success: false,
    errors: {},
    message: "",
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedDocumentTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
];

const courses = Object.values(programs).flatMap((department) =>
    department.programs.map((course) => ({
        ...course,
        department: department.title,
    }))
);

function validateFile(file, label) {
    if (!file || file.size === 0) {
        return `${label} is required`;
    }

    if (!allowedDocumentTypes.includes(file.type)) {
        return `${label} must be a PDF, JPG or PNG file`;
    }

    if (file.size > MAX_FILE_SIZE) {
        return `${label} must not exceed 5MB`;
    }

    return null;
}

function validatePassportPhotos(files) {
    if (!files || files.length === 0) {
        return "A passport photo is required";
    }

    for (const file of files) {
        const error = validateFile(file, "Passport photo");

        if (error) {
            return error;
        }
    }

    return null;
}

function validateCourse(course) {
    if (!course || !course.trim()) {
        return "Please select a course";
    }

    return null;
}

const STEPS = [
    {
        title: "Your details",
        fields: [
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "course",
        ],
        validate: (values) => {
            const errors = {};

            const firstNameError = validateFirstName(values.firstName);

            if (firstNameError) {
                errors.firstName = firstNameError;
            }

            const lastNameError = validateLastName(values.lastName);

            if (lastNameError) {
                errors.lastName = lastNameError;
            }

            const emailError = validateEmail(values.email);

            if (emailError) {
                errors.email = emailError;
            }

            const phoneError = validatePhoneNumber(values.phoneNumber);

            if (phoneError) {
                errors.phoneNumber = phoneError;
            }

            const courseError = validateCourse(values.course);

            if (courseError) {
                errors.course = courseError;
            }

            return errors;
        },
    },

    {
        title: "Admission documents",
        fields: [
            "kcseCertificate",
            "identityDocument",
            "passportPhotos",
        ],
        validate: (values) => {
            const errors = {};

            const kcseError = validateFile(
                values.kcseCertificate,
                "KCPE or KCSE certificate"
            );

            if (kcseError) {
                errors.kcseCertificate = kcseError;
            }

            const identityError = validateFile(
                values.identityDocument,
                "National ID or birth certificate"
            );

            if (identityError) {
                errors.identityDocument = identityError;
            }

            const passportError = validatePassportPhotos(
                values.passportPhotos
            );

            if (passportError) {
                errors.passportPhotos = passportError;
            }

            return errors;
        },
    },

    {
        title: "Review",
        fields: [],
        validate: () => ({}),
    },
];

function CourseSelect({ value, onChange, error }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredCourses = courses.filter((course) =>
        `${course.course} ${course.department}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const selectedCourse = courses.find(
        (course) => course.course === value
    );

    return (
        <div className="relative">
            <label className="mb-2 block text-sm font-semibold text-[#2d2926]">
                Course
            </label>

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`
                    flex w-full items-center justify-between
                    rounded-lg border bg-white px-4 py-3
                    text-left outline-none transition
                    ${error
                        ? "border-red-500"
                        : "border-[#d8cfae]"
                    }
                `}
            >
                <div>
                    {selectedCourse ? (
                        <>
                            <p className="font-medium text-[#2d2926]">
                                {selectedCourse.course}
                            </p>

                            <p className="text-xs text-[#665e55]">
                                {selectedCourse.department}
                            </p>
                        </>
                    ) : (
                        <span className="text-[#8b8175]">
                            Select a course
                        </span>
                    )}
                </div>

                <span className="text-[#665e55]">
                    {open ? "▲" : "▼"}
                </span>
            </button>

            {open && (
                <div
                    className="
                        absolute left-0 right-0 top-full z-50 mt-2
                        overflow-hidden rounded-lg
                        border border-[#d8cfae]
                        bg-white shadow-xl
                    "
                >
                    <div className="border-b border-[#eee5c5] p-3">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search course..."
                            autoFocus
                            className="
                                w-full rounded-md
                                border border-[#d8cfae]
                                px-3 py-2
                                text-sm text-[#2d2926]
                                outline-none
                                focus:border-[#ffc400]
                            "
                        />
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                                <button
                                    key={`${course.department}-${course.course}`}
                                    type="button"
                                    onClick={() => {
                                        onChange(course);
                                        setOpen(false);
                                        setSearch("");
                                    }}
                                    className="
                                        w-full px-4 py-3
                                        text-left
                                        transition
                                        hover:bg-[#fff8df]
                                    "
                                >
                                    <p className="font-medium text-[#2d2926]">
                                        {course.course}
                                    </p>

                                    <p className="mt-0.5 text-xs text-[#665e55]">
                                        {course.department}
                                    </p>

                                    <div className="mt-1 flex gap-3 text-xs text-[#8b8175]">
                                        <span>
                                            {course.duration}
                                        </span>

                                        <span>
                                            KES{" "}
                                            {Number(
                                                course.feePerMonth
                                            ).toLocaleString()}
                                            /month
                                        </span>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-6 text-center text-sm text-[#665e55]">
                                No courses found.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

function Field({
    label,
    name,
    type = "text",
    value,
    onChange,
    error,
    placeholder,
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-semibold text-[#2d2926]"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
                    w-full rounded-lg border
                    bg-white px-4 py-3
                    text-[#2d2926]
                    outline-none transition
                    ${error
                        ? "border-red-500"
                        : "border-[#d8cfae]"
                    }
                    focus:border-[#ffc400]
                `}
            />

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

function SelectedFile({ file, onRemove }) {
    const [previewUrl, setPreviewUrl] = useState(null);

    const isImage = file.type.startsWith("image/");
    const isPdf = file.type === "application/pdf";

    useEffect(() => {
        if (!isImage) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(file);

        setPreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file, isImage]);

    const fileSize =
        file.size >= 1024 * 1024
            ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
            : `${(file.size / 1024).toFixed(0)} KB`;

    return (
        <div className="flex items-center gap-3 rounded-xl border border-[#eee5c5] bg-[#fff8df] p-3">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                {isImage && previewUrl ? (
                    <img
                        src={previewUrl}
                        alt={file.name}
                        className="h-full w-full object-cover"
                    />
                ) : isPdf ? (
                    <div className="flex h-full w-full items-center justify-center bg-red-50 text-xs font-bold text-red-500">
                        PDF
                    </div>
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white text-xl">
                        📄
                    </div>
                )}
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#2d2926]">
                    {file.name}
                </p>

                <div className="mt-1 flex items-center gap-2 text-xs text-[#665e55]">
                    <span>
                        {isImage
                            ? "Image"
                            : isPdf
                                ? "PDF document"
                                : "Document"}
                    </span>

                    <span>•</span>

                    <span>{fileSize}</span>
                </div>

                <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600">
                    <span>✓</span>
                    <span>Selected</span>
                </div>
            </div>

            <button
                type="button"
                onClick={onRemove}
                className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-full
                    text-lg text-[#665e55]
                    transition
                    hover:bg-white
                    hover:text-red-500
                "
                aria-label={`Remove ${file.name}`}
            >
                ×
            </button>
        </div>
    );
}

function FileField({
    label,
    name,
    multiple = false,
    onChange,
    error,
    files,
}) {
    const [isDragging, setIsDragging] = useState(false);

    const fileList = multiple
        ? files || []
        : files
            ? [files]
            : [];

    const handleFiles = (selectedFiles) => {
        if (!selectedFiles?.length) {
            return;
        }

        if (multiple) {
            onChange(Array.from(selectedFiles));
        } else {
            onChange(selectedFiles[0]);
        }
    };

    const handleInputChange = (event) => {
        handleFiles(event.target.files);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        handleFiles(event.dataTransfer.files);
    };

    const removeFile = (index) => {
        if (multiple) {
            const updatedFiles = fileList.filter(
                (_, fileIndex) => fileIndex !== index
            );

            onChange(updatedFiles);
        } else {
            onChange(null);
        }
    };

    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-semibold text-[#2d2926]"
            >
                {label}
            </label>

            <label
                htmlFor={name}
                onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`
                    flex cursor-pointer flex-col
                    items-center justify-center
                    rounded-xl border-2 border-dashed
                    px-6 py-8 text-center
                    transition
                    ${isDragging
                        ? "border-[#ffc400] bg-[#fff8df]"
                        : error
                            ? "border-red-400 bg-red-50"
                            : "border-[#d8cfae] bg-white hover:border-[#ffc400] hover:bg-[#fffdf3]"
                    }
                `}
            >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#fff8df] text-xl text-[#2d2926]">
                    ↑
                </div>

                <p className="font-semibold text-[#2d2926]">
                    {isDragging
                        ? "Drop your file here"
                        : "Choose a file or drag it here"}
                </p>

                <p className="mt-1 text-xs text-[#8b8175]">
                    PDF, JPG or PNG · Maximum 5MB
                </p>

                <input
                    id={name}
                    name={name}
                    type="file"
                    multiple={multiple}
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleInputChange}
                    className="hidden"
                />
            </label>

            {fileList.length > 0 && (
                <div className="mt-3 space-y-3">
                    {fileList.map((file, index) => (
                        <SelectedFile
                            key={`${file.name}-${file.lastModified}-${index}`}
                            file={file}
                            onRemove={() => removeFile(index)}
                        />
                    ))}
                </div>
            )}

            {error && (
                <p className="mt-2 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

export default function MultiStepForm({
    selectedCourse = "",
    selectedDepartment = "",
}) {
    const [currentStep, setCurrentStep] = useState(0);

    const [direction, setDirection] = useState(1);

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        course: selectedCourse,
        department: selectedDepartment,
        kcseCertificate: null,
        identityDocument: null,
        passportPhotos: [],
    });

    const [errors, setErrors] = useState({});

    const [serverState, submitAction, isPending] =
        useActionState(
            async (previousState, formData) => {
                try {
                    const response = await fetch(
                        "/api/admissions",
                        {
                            method: "POST",
                            body: formData,
                        }
                    );

                    const data = await response.json();

                    if (!response.ok) {
                        return {
                            success: false,
                            errors: data.errors || {},
                            message:
                                data.message ||
                                "Something went wrong.",
                        };
                    }

                    return {
                        success: true,
                        errors: {},
                        message:
                            data.message ||
                            "Application submitted successfully.",
                    };
                } catch (error) {
                    return {
                        success: false,
                        errors: {},
                        message:
                            "Unable to submit your application. Please try again.",
                    };
                }
            },
            initialState
        );

    const updateValue = (name, value) => {
        setValues((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: undefined,
        }));
    };

    const handleCourseChange = (course) => {
        setValues((previous) => ({
            ...previous,
            course: course.course,
            department: course.department,
        }));

        setErrors((previous) => ({
            ...previous,
            course: undefined,
        }));
    };

    const goNext = () => {
        const step = STEPS[currentStep];

        const stepErrors = step.validate(values);

        setErrors(stepErrors);

        if (Object.keys(stepErrors).length > 0) {
            return;
        }

        setDirection(1);

        setCurrentStep((previous) =>
            Math.min(previous + 1, STEPS.length - 1)
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const goBack = () => {
        setDirection(-1);

        setCurrentStep((previous) =>
            Math.max(previous - 1, 0)
        );

        setErrors({});

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    const handleFormAction = () => {
        const formData = new FormData();

        formData.set("firstName", values.firstName);
        formData.set("lastName", values.lastName);
        formData.set("email", values.email);
        formData.set("phoneNumber", values.phoneNumber);
        formData.set("course", values.course || "");
        formData.set(
            "department",
            values.department || ""
        );

        if (values.kcseCertificate) {
            formData.append(
                "kcseCertificate",
                values.kcseCertificate
            );
        }

        if (values.identityDocument) {
            formData.append(
                "identityDocument",
                values.identityDocument
            );
        }

        values.passportPhotos.forEach((file) => {
            formData.append(
                "passportPhotos",
                file
            );
        });

        submitAction(formData);
    };

    const selectedCourseData = courses.find(
        (course) => course.course === values.course
    );

    if (serverState.success) {
        return (
            <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffc400]">
                    <span className="text-2xl">
                        ✓
                    </span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#2d2926]">
                    Application Submitted
                </h2>

                <p className="mt-3 text-[#665e55]">
                    {serverState.message}
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {STEPS.map((step, index) => (
                        <div
                            key={step.title}
                            className="flex flex-1 items-center"
                        >
                            <div className="flex flex-col items-center">
                                <div
                                    className={`
                                        flex h-9 w-9
                                        items-center justify-center
                                        rounded-full text-sm
                                        font-bold
                                        ${index <= currentStep
                                            ? "bg-[#ffc400] text-[#2d2926]"
                                            : "bg-[#eee5c5] text-[#8b8175]"
                                        }
                                    `}
                                >
                                    {index + 1}
                                </div>

                                <span
                                    className={`
                                        mt-2 hidden text-xs
                                        font-medium sm:block
                                        ${index === currentStep
                                            ? "text-[#2d2926]"
                                            : "text-[#8b8175]"
                                        }
                                    `}
                                >
                                    {step.title}
                                </span>
                            </div>

                            {index < STEPS.length - 1 && (
                                <div
                                    className={`
                                        mx-2 h-1 flex-1 rounded
                                        ${index < currentStep
                                            ? "bg-[#ffc400]"
                                            : "bg-[#eee5c5]"
                                        }
                                    `}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {serverState.message &&
                !serverState.success && (
                    <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                        {serverState.message}
                    </div>
                )}

            <form action={handleFormAction}
                onSubmit={(e) => {
                    if (currentStep < STEPS.length - 1) {
                        e.preventDefault();
                    }
                }}
            >
                <AnimatePresence
                    mode="wait"
                    custom={direction}
                >
                    <motion.div
                        key={currentStep}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            duration: 0.25,
                        }}
                    >
                        {currentStep === 0 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="font-serif text-2xl font-bold text-[#2d2926]">
                                        Your details
                                    </h2>

                                    <p className="mt-1 text-sm text-[#665e55]">
                                        Tell us a little about
                                        yourself.
                                    </p>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <Field
                                        label="First name"
                                        name="firstName"
                                        value={
                                            values.firstName
                                        }
                                        onChange={(e) =>
                                            updateValue(
                                                "firstName",
                                                e.target.value
                                            )
                                        }
                                        error={
                                            errors.firstName
                                        }
                                        placeholder="John"
                                    />

                                    <Field
                                        label="Last name"
                                        name="lastName"
                                        value={
                                            values.lastName
                                        }
                                        onChange={(e) =>
                                            updateValue(
                                                "lastName",
                                                e.target.value
                                            )
                                        }
                                        error={
                                            errors.lastName
                                        }
                                        placeholder="Doe"
                                    />
                                </div>

                                <Field
                                    label="Email address"
                                    name="email"
                                    type="email"
                                    value={
                                        values.email
                                    }
                                    onChange={(e) =>
                                        updateValue(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                    error={
                                        errors.email
                                    }
                                    placeholder="john@example.com"
                                />

                                <Field
                                    label="Phone number"
                                    name="phoneNumber"
                                    type="tel"
                                    value={
                                        values.phoneNumber
                                    }
                                    onChange={(e) =>
                                        updateValue(
                                            "phoneNumber",
                                            e.target.value
                                        )
                                    }
                                    error={
                                        errors.phoneNumber
                                    }
                                    placeholder="0712 345 678"
                                />

                                <CourseSelect
                                    value={
                                        values.course
                                    }
                                    onChange={
                                        handleCourseChange
                                    }
                                    error={
                                        errors.course
                                    }
                                />

                                {selectedCourseData && (
                                    <div className="rounded-xl border border-[#eee5c5] bg-[#fff8df] p-5">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-[#8b8175]">
                                            Selected course
                                        </p>

                                        <h3 className="mt-1 text-lg font-bold text-[#2d2926]">
                                            {
                                                selectedCourseData.course
                                            }
                                        </h3>

                                        <p className="mt-1 text-sm text-[#665e55]">
                                            {
                                                selectedCourseData.department
                                            }
                                        </p>

                                        <div className="mt-4 grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-xs text-[#8b8175]">
                                                    Duration
                                                </p>

                                                <p className="font-semibold text-[#2d2926]">
                                                    {
                                                        selectedCourseData.duration
                                                    }
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-[#8b8175]">
                                                    Fee
                                                </p>

                                                <p className="font-semibold text-[#2d2926]">
                                                    KES{" "}
                                                    {Number(
                                                        selectedCourseData.feePerMonth
                                                    ).toLocaleString()}
                                                    /month
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="font-serif text-2xl font-bold text-[#2d2926]">
                                        Admission documents
                                    </h2>

                                    <p className="mt-1 text-sm text-[#665e55]">
                                        Upload the required
                                        documents.
                                    </p>
                                </div>

                                <FileField
                                    label="KCPE or KCSE certificate"
                                    name="kcseCertificate"
                                    files={
                                        values.kcseCertificate
                                    }
                                    onChange={(file) =>
                                        updateValue(
                                            "kcseCertificate",
                                            file
                                        )
                                    }
                                    error={
                                        errors.kcseCertificate
                                    }
                                />

                                <FileField
                                    label="National ID or birth certificate"
                                    name="identityDocument"
                                    files={
                                        values.identityDocument
                                    }
                                    onChange={(file) =>
                                        updateValue(
                                            "identityDocument",
                                            file
                                        )
                                    }
                                    error={
                                        errors.identityDocument
                                    }
                                />

                                <FileField
                                    label="Passport photo"
                                    name="passportPhotos"
                                    multiple
                                    files={
                                        values.passportPhotos
                                    }
                                    onChange={(files) =>
                                        updateValue(
                                            "passportPhotos",
                                            files
                                        )
                                    }
                                    error={
                                        errors.passportPhotos
                                    }
                                />
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="font-serif text-2xl font-bold text-[#2d2926]">
                                        Review your application
                                    </h2>

                                    <p className="mt-1 text-sm text-[#665e55]">
                                        Check your details before
                                        submitting.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-[#eee5c5] p-5">
                                    <h3 className="font-semibold text-[#2d2926]">
                                        Personal details
                                    </h3>

                                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <p className="text-xs text-[#8b8175]">
                                                Name
                                            </p>

                                            <p className="font-medium text-[#2d2926]">
                                                {
                                                    values.firstName
                                                }{" "}
                                                {
                                                    values.lastName
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-[#8b8175]">
                                                Phone
                                            </p>

                                            <p className="font-medium text-[#2d2926]">
                                                {
                                                    values.phoneNumber
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-[#8b8175]">
                                                Email
                                            </p>

                                            <p className="font-medium text-[#2d2926]">
                                                {
                                                    values.email
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-[#eee5c5] bg-[#fff8df] p-5">
                                    <h3 className="font-semibold text-[#2d2926]">
                                        Course
                                    </h3>

                                    <p className="mt-2 text-lg font-bold text-[#2d2926]">
                                        {values.course}
                                    </p>

                                    <p className="text-sm text-[#665e55]">
                                        {
                                            values.department
                                        }
                                    </p>

                                    {selectedCourseData && (
                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-[#8b8175]">
                                                    Duration
                                                </p>

                                                <p className="font-semibold text-[#2d2926]">
                                                    {
                                                        selectedCourseData.duration
                                                    }
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-[#8b8175]">
                                                    Monthly fee
                                                </p>

                                                <p className="font-semibold text-[#2d2926]">
                                                    KES{" "}
                                                    {Number(
                                                        selectedCourseData.feePerMonth
                                                    ).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="rounded-xl border border-[#eee5c5] p-5">
                                    <h3 className="font-semibold text-[#2d2926]">
                                        Documents
                                    </h3>

                                    <div className="mt-4 space-y-3">
                                        {values.kcseCertificate && (
                                            <SelectedFile
                                                file={
                                                    values.kcseCertificate
                                                }
                                                onRemove={() =>
                                                    updateValue(
                                                        "kcseCertificate",
                                                        null
                                                    )
                                                }
                                            />
                                        )}

                                        {values.identityDocument && (
                                            <SelectedFile
                                                file={
                                                    values.identityDocument
                                                }
                                                onRemove={() =>
                                                    updateValue(
                                                        "identityDocument",
                                                        null
                                                    )
                                                }
                                            />
                                        )}

                                        {values.passportPhotos.map(
                                            (file, index) => (
                                                <SelectedFile
                                                    key={`${file.name}-${index}`}
                                                    file={file}
                                                    onRemove={() =>
                                                        updateValue(
                                                            "passportPhotos",
                                                            values.passportPhotos.filter(
                                                                (
                                                                    _,
                                                                    fileIndex
                                                                ) =>
                                                                    fileIndex !==
                                                                    index
                                                            )
                                                        )
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center justify-between border-t border-[#eee5c5] pt-6">
                    {currentStep > 0 ? (
                        <button
                            type="button"
                            onClick={goBack}
                            className="
                                rounded-lg border
                                border-[#d8cfae]
                                px-5 py-3
                                font-semibold
                                text-[#2d2926]
                                transition
                                hover:bg-[#fff8df]
                            "
                        >
                            Back
                        </button>
                    ) : (
                        <div />
                    )}

                    {currentStep < STEPS.length - 1 ? (
                        <button
                            type="button"
                            onClick={goNext}
                            className="
                                rounded-lg
                                bg-[#ffc400]
                                px-6 py-3
                                font-semibold
                                text-[#2d2926]
                                transition
                                hover:brightness-95
                            "
                        >
                            Continue
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isPending}
                            className="
                                rounded-lg
                                bg-[#ffc400]
                                px-6 py-3
                                font-semibold
                                text-[#2d2926]
                                transition
                                hover:brightness-95
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            {isPending
                                ? "Submitting..."
                                : "Submit Application"}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}