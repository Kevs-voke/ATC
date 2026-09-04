import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

const DEPARTMENTS = [
  {
    title: "Admissions Office",
    body: "Applications, intake dates, fee structure.",
    phone: "+254 700 000 001",
    email: "admissions@aberdarltc.ac.ke",
    accent: "border-l-amber-500",
  },
  {
    title: "Student Affairs",
    body: "Enrolled students, welfare, discipline.",
    phone: "+254 700 000 002",
    email: "studentaffairs@aberdarltc.ac.ke",
    accent: "border-l-yellow-600",
  },
  {
    title: "Academic Registrar",
    body: "Transcripts, certification, exam records.",
    phone: "+254 700 000 003",
    email: "registrar@aberdarltc.ac.ke",
    accent: "border-l-orange-400",
  },
];

export default function Contacts() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacts" className="space-y-10 px-4 py-8 max-w-5xl mx-auto">
      <div className="space-y-4 mt-7">
        <p
          data-aos="fade-up"
          className="text-xs font-semibold tracking-widest uppercase text-amber-700"
        >
          TVET Institution · Nyahururu, Laikipia County
        </p>
        <h1
          data-aos="fade-up"
          className="font-serif text-4xl font-bold leading-snug text-stone-800"
        >
          Get in{" "}
          <span className="italic font-normal text-amber-700">touch</span>
        </h1>
        <p data-aos="fade-up" className="text-stone-600 leading-relaxed max-w-2xl">
          Whether you're applying, already enrolled, or need a document from
          the registrar, the fastest route is usually a direct call or email
          to the right office below rather than the general line.
        </p>
      </div>

      <hr className="border-amber-300/60" />

      <div>
        <h2
          data-aos="fade-up"
          className="font-serif text-3xl font-bold text-stone-800 mb-6"
        >
          Reach the right office
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {DEPARTMENTS.map(({ title, body, phone, email, accent }, i) => (
            <div
              data-aos="fade-left"
              data-aos-delay={i * 100}
              key={title}
              className={`rounded-2xl bg-amber-50/70 border border-amber-200/60 p-6 border-l-4 ${accent} shadow-sm hover:shadow-md hover:bg-amber-50 transition-all duration-200`}
            >
              <h3 className="font-semibold text-stone-800 text-base mb-2">{title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{body}</p>
              <div className="mt-4 space-y-1 text-sm">
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="block font-medium text-amber-700 hover:underline"
                >
                  {phone}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="block font-medium text-amber-700 hover:underline"
                >
                  {email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-5">
        <form
          onSubmit={handleSubmit}
          data-aos="fade-up"
          className="md:col-span-3 space-y-5 rounded-2xl bg-amber-50/70 border border-amber-200/60 p-6 md:p-8 shadow-sm"
        >
          <h2 className="font-serif text-2xl font-bold text-stone-800">
            Send a message
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="text-stone-600">Full name</span>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-stone-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
                placeholder="Jane Wanjiru"
              />
            </label>
            <label className="block text-sm">
              <span className="text-stone-600">Email</span>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-stone-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
                placeholder="jane@example.com"
              />
            </label>
          </div>

          <label className="block text-sm">
            <span className="text-stone-600">Subject</span>
            <input
              required
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-stone-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
              placeholder="Application status for Diploma in Electrical Engineering"
            />
          </label>

          <label className="block text-sm">
            <span className="text-stone-600">Message</span>
            <textarea
              required
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-stone-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
              placeholder="Tell us what you need help with"
            />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center rounded-full bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "sent" && (
            <p className="text-sm font-medium text-amber-700">
              Message sent. A member of staff will reply within two working days.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-red-600">
              Something went wrong. Please try again or email us directly.
            </p>
          )}
        </form>

        <div data-aos="fade-up" data-aos-delay="150" className="md:col-span-2 space-y-6">
          <div className="rounded-2xl bg-amber-100/60 border border-amber-300/50 p-6">
            <h3 className="font-serif text-lg font-bold text-stone-800 mb-2">
              Campus address
            </h3>
            <p className="text-stone-600 leading-relaxed text-sm">
              Technical College of Aberdarl
              <br />
              Nyahururu, Laikipia County
              <br />
              Kenya
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

          <div className="rounded-2xl bg-amber-50/70 border border-amber-200/60 p-6 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-stone-800 mb-2">
              Office hours
            </h3>
            <dl className="space-y-1 text-sm text-stone-600">
              <div className="flex justify-between">
                <dt>Monday – Friday</dt>
                <dd className="font-medium text-stone-800">8:00 AM – 5:00 PM</dd>
              </div>
              <div className="flex justify-between">
                <dt>Saturday</dt>
                <dd className="font-medium text-stone-800">9:00 AM – 1:00 PM</dd>
              </div>
              <div className="flex justify-between">
                <dt>Sunday</dt>
                <dd className="font-medium text-stone-800">Closed</dd>
              </div>
            </dl>
          </div>

          <div className="overflow-hidden rounded-2xl border border-amber-200/60 shadow-sm">
            <iframe
              title="Technical College of Aberdarl map"
              className="h-48 w-full"
              loading="lazy"
              src="https://www.google.com/maps?q=Nyahururu%2C+Laikipia+County%2C+Kenya&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}