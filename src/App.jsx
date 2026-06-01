import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const profile = "/profile.jpeg";

const fadeUp = {
hidden: { opacity: 0, y: 40 },
show: {
opacity: 1,
y: 0,
transition: { duration: 0.7 }
}
};

export default function App() {
  return (
    <div>

      {/* NAVBAR */}
      <nav className="nav">
    <div className="container nav-inner">
      <h1 className="logo">Deswanth.dev</h1>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </nav>

  {/* HERO */}
  <section id="home" className="container hero">

    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
    >
      <p className="tag">
        Full Stack Developer • Python Developer • Cyber Security Enthusiast
      </p>

      <h1 className="title">
        Building real-world software
        <br />
        <span>with clean UI & logic</span>
      </h1>

      <p className="desc">
        I build desktop applications, web applications, AI tools, and
        cybersecurity software using Python, React, SQLite, and modern
        technologies.
      </p>

      <div className="btns">
        <a href="#projects" className="btn">
          View Work
        </a>

        <a
          href="/Deswanth_CV.pdf"
          download
          className="btn-outline"
        >
          Download CV
        </a>
      </div>

      <div className="icons">
        <a
          href="https://github.com/deswanth12"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>

        <a href="mailto:kdeswanth@gmail.com">
          <FaEnvelope />
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
      </div>
    </motion.div>

    <motion.div
      className="image-wrap"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <img src={profile} alt="Deswanth" />
    </motion.div>

  </section>

  {/* ABOUT */}
  <section id="about" className="container section">

    <motion.h2
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
    >
      About Me
    </motion.h2>

    <motion.p variants={fadeUp}>
      I am a passionate Full Stack Developer focused on building
      real-world applications using Python and React.
    </motion.p>

    <motion.p variants={fadeUp}>
      I have built projects including a Cyber Security Toolkit,
      Student Database System, Staff Management System, and
      Library Management System.
    </motion.p>

  </section>

  {/* SKILLS */}
  <section id="skills" className="container section">

    <h2>Skills</h2>

    {[
      ["HTML", 90],
      ["CSS", 85],
      ["JavaScript", 70],
      ["React", 80],
      ["Python", 90],
      ["SQLite", 85],
      ["Cyber Security", 75],
      ["LLMs", 70]
    ].map(([name, val], i) => (

      <motion.div
        key={name}
        className="skill"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        transition={{ delay: i * 0.1 }}
      >
        <div className="skill-top">
          <span>{name}</span>
          <span>{val}%</span>
        </div>

        <div className="bar">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: val + "%" }}
            transition={{ duration: 1 }}
          />
        </div>
      </motion.div>

    ))}

  </section>

  {/* PROJECTS */}
  <section id="projects" className="container section">

    <h2>Projects</h2>

    <div className="grid">

      {[
        {
          img: "/assets/cybertoolkit.png",
          title: "Cyber Security Toolkit",
          tech: "Python • SQLite • Networking • Cyber Security",
          link: "https://github.com/deswanth12/Cyber-Security-Toolkit"
        },

        {
          img: "/assets/student.png",
          title: "Student Database System",
          tech: "Python • SQLite • Tkinter",
          link: "https://github.com/deswanth12/studentdatabase"
        },

        {
          img: "/assets/staff.png",
          title: "Staff Management System",
          tech: "Python • SQLite • Tkinter",
          link: "https://github.com/deswanth12/staffdatamanagement"
        },

        {
          img: "/assets/library.png",
          title: "Library Management System",
          tech: "Python • SQLite • Tkinter",
          link: "https://github.com/deswanth12/Library-data-management-system"
        }
      ].map((p, i) => (

        <motion.a
          key={i}
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="card"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          transition={{ delay: i * 0.2 }}
        >

          <div className="card-img">
            <img src={p.img} alt={p.title} />

            <div className="overlay">
              <span>View Project →</span>
            </div>
          </div>

          <h3>{p.title}</h3>
          <p>{p.tech}</p>

        </motion.a>

      ))}

    </div>

  </section>

  {/* CONTACT */}
  <section id="contact" className="container section center">

    <h2>Contact</h2>

    <p>📞 8374646073</p>
    <p>📧 kdeswanth@gmail.com</p>

  </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 Deswanth. All Rights Reserved.
      </footer>

    </div>
  );
}
