import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const profile = "/profile.jpeg";

export default function App() {
  return (
    <div className="bg-[#0b0f19] text-white font-sans overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-5 md:px-10 py-4 sticky top-0 bg-[#0b0f19]/80 backdrop-blur z-50">
        <h1 className="text-lg md:text-xl font-bold text-purple-500">Deswanth</h1>
      </nav>

      {/* HERO */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-center px-5 md:px-10 py-16 gap-10">

        <div className="text-center md:text-left max-w-xl">
          <p className="text-purple-400 mb-2 text-sm">Full Stack Developer</p>

          <h1 className="text-3xl md:text-5xl font-bold">
            I build real-world web apps
          </h1>

          <p className="text-gray-400 mt-4">
            Diploma CSE student. Built 3 management systems using Python and databases.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="#projects" className="bg-purple-600 px-6 py-2 rounded-lg text-center">
              View Work
            </a>

            <a href="/Deswanth_CV.pdf" download className="border px-6 py-2 rounded-lg text-center">
              Download CV
            </a>
          </div>
        </div>

        <motion.img
          src={profile}
          className="w-40 h-40 md:w-80 md:h-80 object-cover rounded-full md:rounded-xl border-4 border-purple-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      </section>

      {/* PROOF */}
      <section className="px-5 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          ["3+", "Projects"],
          ["Python", "Core"],
          ["SQLite", "DB"],
          ["React", "Frontend"],
        ].map(([n, l], i) => (
          <div key={i} className="bg-[#111827] p-4 rounded-xl">
            <h3 className="text-xl font-bold text-purple-500">{n}</h3>
            <p className="text-gray-400 text-sm">{l}</p>
          </div>
        ))}
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-5 md:px-10 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {[
            {
              name: "Library Management",
              img: "/assets/library.png",
              desc: "Built full CRUD system with issue/return tracking and SQLite database.",
              link: "https://github.com/deswanth12/Library-data-management-system"
            },
            {
              name: "Student Database",
              img: "/assets/student.png",
              desc: "Developed system to manage student records with search and database storage.",
              link: "https://github.com/deswanth12/studentdatabase"
            },
            {
              name: "Staff Management",
              img: "/assets/staff.png",
              desc: "Created employee management system with CRUD operations and secure storage.",
              link: "https://github.com/deswanth12/staffdatamanagement"
            }
          ].map((p, i) => (
            <div key={i} className="bg-[#111827] p-4 rounded-xl">
              <img src={p.img} className="rounded-lg mb-3" />
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-gray-400 text-sm mt-2">{p.desc}</p>

              <a href={p.link} target="_blank" className="text-purple-400 text-sm mt-3 inline-flex items-center gap-2">
                <FaGithub /> GitHub
              </a>
            </div>
          ))}

        </div>
      </section>

      {/* SKILLS */}
      <section className="px-5 md:px-10 py-16 bg-[#0f172a]">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Skills
        </h2>

        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            ["HTML", "90%"],
            ["CSS", "85%"],
            ["JavaScript", "60%"],
            ["React", "80%"],
            ["Python", "85%"],
          ].map(([n, v], i) => (
            <div key={i}>
              <div className="flex justify-between text-sm">
                <span>{n}</span>
                <span>{v}</span>
              </div>

              <div className="bg-gray-700 h-2 rounded">
                <motion.div
                  className="bg-purple-500 h-2 rounded"
                  initial={{ width: 0 }}
                  whileInView={{ width: v }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESUME */}
      <section className="text-center py-12">
        <h2 className="text-xl font-bold mb-4">Ready to Work</h2>
        <a href="/Deswanth_CV.pdf" download className="bg-purple-600 px-6 py-2 rounded-lg">
          Download Resume
        </a>
      </section>

      {/* CONTACT */}
      <section className="text-center py-12">
        <h2 className="text-xl font-bold mb-4">Contact</h2>
        <p>📞 8374646073</p>
        <p>✉️ kdeswanth@gmail.com</p>
        <a href="https://github.com/deswanth12" className="text-purple-400">
          GitHub Profile
        </a>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500">
        © 2026 Deswanth
      </footer>

    </div>
  );
}