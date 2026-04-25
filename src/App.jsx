import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaGithub, FaEnvelope } from "react-icons/fa";

const profile = "/profile.jpeg";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

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

    window.addEventListener("mousemove", (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden">

      {/* Cursor Glow */}
      <div
        className="cursor-glow"
        style={{ left: mouse.x, top: mouse.y }}
      />

      {/* Scroll Bar */}
      <div style={{ width: `${scroll * 100}%` }} className="scroll-bar" />

      {/* NAV */}
      <nav className="nav">
        <h1 className="logo">Deswanth.dev</h1>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="title">
            Hi, I'm <span>Deswanth</span>
          </h1>

          <p className="typing">
            {text} <Cursor />
          </p>

          <p className="desc">
            I build fast, scalable, real-world applications.
          </p>

          <div className="buttons">
            <a href="#projects" className="btn">View Work</a>
            <a href="/Deswanth_CV.pdf" className="btn-outline">Download CV</a>
          </div>

          <div className="icons">
            <a href="https://github.com/deswanth12"><FaGithub /></a>
            <a href="mailto:kdeswanth@gmail.com"><FaEnvelope /></a>
          </div>
        </motion.div>

        <motion.img
          src={profile}
          className="profile"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        />
      </section>

      {/* SKILLS */}
      <section className="section">
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
            <motion.div
              key={i}
              className="card"
              whileHover={{ rotateX: 5, rotateY: 5 }}
            >
              <img src={img} />
              <h3>{title}</h3>
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

      <footer className="footer">© 2026 Deswanth</footer>
    </div>
  );
}