import { motion } from "framer-motion";

const profile = "/profile.jpeg";

export default function App() {
  const skills = [
    { name: "HTML", value: 90 },
    { name: "CSS", value: 85 },
    { name: "JavaScript", value: 70 },
    { name: "React", value: 80 },
    { name: "Python", value: 85 },
  ];

  const projects = [
    {
      title: "Student Database",
      desc: "Manage student records with search, update, delete",
      link: "https://github.com/deswanth12/studentdatabase",
    },
    {
      title: "Staff Management",
      desc: "Employee data system with SQLite",
      link: "https://github.com/deswanth12/staffdatamanagement",
    },
    {
      title: "Library System",
      desc: "Book tracking and management system",
      link: "https://github.com/deswanth12/Library-data-management-system",
    },
  ];

  return (
    <div className="bg-black text-white">

      {/* HERO */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <p className="text-purple-400 mb-3">Full Stack Developer</p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Hi, I'm <span className="text-purple-500">Deswanth</span>
          </h1>

          <h2 className="text-xl md:text-2xl mt-3 text-gray-300">
            I build modern web applications.
          </h2>

          <p className="mt-4 text-gray-400">
            I create clean, fast, and user-friendly systems using React and Python.
          </p>

          <div className="flex gap-4 mt-6">
            <a href="#projects" className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700">
              View Work
            </a>

            <a href="/cv.pdf" className="px-6 py-3 border border-gray-500 rounded-lg">
              Download CV
            </a>
          </div>
        </motion.div>

        <motion.img
          src={profile}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-64 h-64 md:w-80 md:h-80 mt-10 md:mt-0 object-cover rounded-full border-4 border-purple-500 shadow-[0_0_40px_#a855f7]"
        />
      </section>

      {/* ABOUT */}
      <section className="px-6 md:px-20 py-20 bg-[#0a0a0a]">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>

        <p className="text-gray-400 mb-4">
          I am a passionate Full Stack Developer with strong knowledge in React and Python.
          I enjoy building real-world applications that solve problems and improve user experience.
        </p>

        <p className="text-gray-400">
          I have built multiple projects including student, staff, and library management systems.
          I continuously learn new technologies to improve my development skills.
        </p>
      </section>

      {/* SKILLS */}
      <section className="px-6 md:px-20 py-20 bg-black">
        <h2 className="text-3xl font-bold mb-10">Skills</h2>

        {skills.map((skill, i) => (
          <div key={i} className="mb-6">
            <div className="flex justify-between">
              <span>{skill.name}</span>
              <span>{skill.value}%</span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded">
              <div
                className="bg-purple-500 h-2 rounded"
                style={{ width: `${skill.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-6 md:px-20 py-20 bg-[#0a0a0a]">
        <h2 className="text-3xl font-bold mb-10">Projects</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <a
              key={i}
              href={p.link}
              target="_blank"
              className="p-6 border border-gray-700 rounded-xl hover:border-purple-500 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-gray-400 mt-2">{p.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 md:px-20 py-20 bg-black">
        <h2 className="text-3xl font-bold mb-6">Contact</h2>

        <p>📞 8374646073</p>
        <p>📧 kdeswanth@gmail.com</p>
        <p>
          🔗{" "}
          <a href="https://github.com/deswanth12" className="text-purple-400">
            GitHub Profile
          </a>
        </p>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500 bg-[#0a0a0a]">
        © 2026 Deswanth. All rights reserved.
      </footer>

    </div>
  );
}