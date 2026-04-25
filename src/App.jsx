import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaGithub, FaEnvelope } from "react-icons/fa";

const profile = "/profile.jpeg";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("home");
  const [scroll, setScroll] = useState(0);

  const [text] = useTypewriter({
    words: ["Full Stack Developer", "React Developer", "Python Developer"],
    loop: true,
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);

    window.addEventListener("scroll", () => {
      const sc = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setScroll(sc);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white font-sans">

      {/* Scroll Bar */}
      <div style={{ width: `${scroll * 100}%` }} className="h-1 bg-purple-500 fixed top-0 left-0 z-50"></div>

      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-black/70 backdrop-blur flex justify-between px-4 md:px-10 py-4 border-b border-gray-800">
        <h1 className="text-purple-400 font-bold">Deswanth.dev</h1>
        <div className="flex gap-5 text-sm">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-20">

        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl md:text-6xl font-bold">
            Hi, I'm <span className="text-purple-500">Deswanth</span>
          </h1>

          <p className="mt-4 text-gray-400">
            {text} <Cursor />
          </p>

          <p className="text-gray-500 mt-2">
            I build fast, clean, real-world applications.
          </p>

          <div className="mt-6 flex gap-4">
            <a href="#projects" className="btn">View Work</a>
            <a href="/Deswanth_CV.pdf" download className="btn-outline">Download CV</a>
          </div>

          <div className="flex gap-4 mt-6 text-xl">
            <a href="https://github.com/deswanth12"><FaGithub /></a>
            <a href="mailto:kdeswanth@gmail.com"><FaEnvelope /></a>
          </div>
        </motion.div>

        <motion.img
          src={profile}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-40 md:w-64 rounded-full border-4 border-purple-500 shadow-glow"
        />
      </section>

      {/* SKILLS */}
      <section className="px-6 md:px-20 py-16 max-w-4xl mx-auto">
        <h2 className="section-title">Skills</h2>

        {[
          ["HTML", 90],
          ["CSS", 85],
          ["JavaScript", 65],
          ["React", 80],
          ["Python", 85],
          ["LLMs", 70],
        ].map(([name, val], i) => (
          <div key={i} className="mt-4">
            <div className="flex justify-between text-sm">
              <span>{name}</span>
              <span>{val}%</span>
            </div>

            <div className="bg-gray-800 h-2 rounded">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${val}%` }}
                className="bg-purple-500 h-2 rounded"
              />
            </div>
          </div>
        ))}
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-6 md:px-20 py-16">
        <h2 className="section-title text-center">Projects</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            ["Student DB", "/assets/student.png", "studentdatabase"],
            ["Staff System", "/assets/staff.png", "staffdatamanagement"],
            ["Library System", "/assets/library.png", "Library-data-management-system"],
          ].map(([title, img, repo], i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="card">
              <img src={img} className="rounded-lg mb-3" />
              <h3>{title}</h3>
              <a href={`https://github.com/deswanth12/${repo}`} className="text-purple-400 text-sm mt-2 inline-block">
                GitHub →
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="text-center py-16">
        <h2 className="section-title">Contact</h2>
        <p className="mt-3">📞 8374646073</p>
        <p>📧 kdeswanth@gmail.com</p>
      </section>

      <footer className="text-center py-6 text-gray-500">
        © 2026 Deswanth
      </footer>
    </div>
  );
}