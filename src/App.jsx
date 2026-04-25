import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaGithub, FaEnvelope } from "react-icons/fa";

const profile = "/profile.jpeg";

export default function App() {
  const [loading, setLoading] = useState(true);

  const [text] = useTypewriter({
    words: ["Full Stack Developer", "React Developer", "Python Developer", "LLMs Explorer"],
    loop: true,
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="nav">
        <h1 className="logo">Deswanth.dev</h1>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">

        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1>
            Hi, I'm <span>Deswanth</span>
          </h1>

          <p className="typing">
            {text} <Cursor />
          </p>

          <p className="desc">
            I build modern, scalable, high-performance web applications.
          </p>

          <div className="buttons">
            <a href="#projects" className="btn">View Work</a>
            <a href="/Deswanth_CV.pdf" download className="btn-outline">
              Download CV
            </a>
          </div>

          <div className="icons">
            <a href="https://github.com/deswanth12"><FaGithub /></a>
            <a href="mailto:kdeswanth@gmail.com"><FaEnvelope /></a>
          </div>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img src={profile} alt="profile" />
        </motion.div>

      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <h2>Skills</h2>

        {[
          ["HTML", 90],
          ["CSS", 85],
          ["JavaScript", 65],
          ["React", 80],
          ["Python", 85],
          ["LLMs", 70],
        ].map(([name, val], i) => (
          <div key={i} className="skill">
            <div className="skill-top">
              <span>{name}</span>
              <span>{val}%</span>
            </div>

            <div className="skill-bar">
              <motion.div
                className="skill-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${val}%` }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <h2>Projects</h2>

        <div className="grid">
          {[
            ["Student DB", "/assets/student.png", "studentdatabase"],
            ["Staff System", "/assets/staff.png", "staffdatamanagement"],
            ["Library System", "/assets/library.png", "Library-data-management-system"],
          ].map(([title, img, repo], i) => (
            <motion.div key={i} className="card" whileHover={{ scale: 1.05 }}>
              <img src={img} />
              <h3>{title}</h3>
              <p>Python • SQLite • Tkinter</p>

              <a href={`https://github.com/deswanth12/${repo}`}>
                GitHub →
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section center">
        <h2>Contact</h2>
        <p>📞 8374646073</p>
        <p>📧 kdeswanth@gmail.com</p>
      </section>

      <footer>© 2026 Deswanth</footer>

    </div>
  );
}