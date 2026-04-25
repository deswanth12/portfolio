import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const profile = "/profile.jpeg";

const projects = [
  {
    title: "Student Database",
    desc: "CRUD system to manage student records with fast search.",
    tech: "Python • SQLite • Tkinter",
    img: "/assets/student.png",
    link: "https://github.com/deswanth12/studentdatabase",
  },
  {
    title: "Staff Management",
    desc: "Employee data system with secure storage and updates.",
    tech: "Python • SQLite",
    img: "/assets/staff.png",
    link: "https://github.com/deswanth12/staffdatamanagement",
  },
  {
    title: "Library System",
    desc: "Book tracking system with issue/return logic.",
    tech: "Python • SQLite",
    img: "/assets/library.png",
    link: "https://github.com/deswanth12/Library-data-management-system",
  },
];

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 65 },
  { name: "React", level: 80 },
  { name: "Python", level: 85 },
  { name: "SQLite", level: 75 },
  { name: "Git & GitHub", level: 80 },
  { name: "AI Tools (ChatGPT, Prompting)", level: 70 },
];

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* NAV */}
      <nav className="flex justify-between items-center px-4 md:px-10 py-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-purple-400">Deswanth.dev</h1>
        <a href="/Deswanth_CV.pdf" download className="btn">
          Download CV
        </a>
      </nav>

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-4 md:px-10 py-16">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Hi, I'm <span className="text-purple-500">Deswanth</span>
          </h1>

          <p className="mt-4 text-gray-400">
            Full Stack Developer
          </p>

          <p className="mt-2 text-gray-500">
            I build fast, scalable applications using React and Python.
          </p>

          <p className="mt-2 text-purple-400 text-sm">
            Available for opportunities
          </p>

          <div className="mt-6 flex gap-4">
            <a href="#projects" className="btn">View Work</a>
            <a href="#contact" className="btn-outline">Contact</a>
          </div>

          <div className="flex gap-4 mt-6 text-xl">
            <a href="https://github.com/deswanth12"><FaGithub /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="mailto:kdeswanth@gmail.com"><FaEnvelope /></a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center"
        >
          <img
            src={profile}
            className="w-40 md:w-60 h-40 md:h-60 rounded-full border-4 border-purple-500 shadow-glow object-cover"
          />
        </motion.div>
      </section>

      {/* ABOUT */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="px-4 md:px-10 py-10 max-w-4xl mx-auto text-center"
      >
        <h2 className="section-title">About Me</h2>

        <p className="text-gray-400 mt-4">
          I am a Computer Science diploma student focused on building real systems.
          I enjoy solving problems and creating clean, functional applications.
        </p>

        <p className="text-gray-400 mt-3">
          I have built student, staff, and library management systems.
          I also use AI tools to improve productivity and development speed.
        </p>
      </motion.section>

      {/* SKILLS */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="px-4 md:px-10 py-10 max-w-4xl mx-auto"
      >
        <h2 className="section-title">Skills</h2>

        <div className="mt-6 space-y-4">
          {skills.map((s, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm">
                <span>{s.name}</span>
                <span>{s.level}%</span>
              </div>

              <div className="w-full bg-gray-800 h-2 rounded">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  transition={{ duration: 1 }}
                  className="h-2 bg-purple-500 rounded shadow-glow"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* PROJECTS */}
      <section id="projects" className="px-4 md:px-10 py-10">
        <h2 className="section-title text-center">Projects</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="card"
            >
              <img src={p.img} className="rounded-lg mb-4" />
              <h3 className="text-lg font-semibold">{p.title}</h3>

              <p className="text-gray-400 text-sm mt-2">{p.desc}</p>

              <p className="text-purple-400 text-xs mt-2">{p.tech}</p>

              <a href={p.link} className="text-purple-400 mt-3 inline-block">
                GitHub →
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-4 md:px-10 py-10 text-center">
        <h2 className="section-title">Contact</h2>

        <p className="mt-4 text-gray-400">📞 8374646073</p>
        <p className="text-gray-400">📧 kdeswanth@gmail.com</p>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500">
        © 2026 Deswanth
      </footer>
    </div>
  );
}