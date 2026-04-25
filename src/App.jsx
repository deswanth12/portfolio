import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaGithub, FaEnvelope } from "react-icons/fa";

const profile = "/profile.jpeg";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(0);

  const [text] = useTypewriter({
    words: ["Full Stack Developer", "React Developer", "Python Developer"],
    loop: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);

    const onScroll = () => {
      const sc =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      setScroll(sc);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white font-sans">

      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-1 bg-purple-500 z-50"
        style={{ width: `${scroll * 100}%` }}
      />

      {/* NAVBAR */}
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

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="title">
            Building real-world software
            <br />
            <span>with clean UI & logic</span>
          </h1>

          <p className="typing">
            {text} <Cursor />
          </p>

          <p className="sub">
            3+ systems built • Python + React • Focus on performance
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

        <motion.img
          src={profile}
          className="profile"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        />
      </section>

      {/* DIVIDER */}
      <div className="divider"></div>

      {/* SKILLS */}
      <section className="section">
        <h2>Skills</h2>

        {[
          ["HTML", 90],
          ["CSS", 85],
          ["JavaScript", 65],
          ["React", 80],
          ["Python", 85],
          ["LLMs (ChatGPT, Prompting)", 70],
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

      {/* DIVIDER */}
      <div className="divider"></div>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <h2>Projects</h2>

        <div className="grid">
          {[
            ["Student Database", "/assets/student.png", "studentdatabase"],
            ["Staff Management", "/assets/staff.png", "staffdatamanagement"],
            ["Library System", "/assets/library.png", "Library-data-management-system"],
          ].map(([title, img, repo], i) => (
            <motion.div key={i} className="card" whileHover={{ scale: 1.04 }}>
              <img src={img} />
              <h3>{title}</h3>

              <p className="tech">
                Python • SQLite • Tkinter
              </p>

              <a href={`https://github.com/deswanth12/${repo}`}>
                GitHub →
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="divider"></div>

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