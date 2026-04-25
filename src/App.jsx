import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";

const profile = "/profile.jpeg";

export default function App() {
  return (
    <div className="bg">

      {/* NAVBAR */}
      <nav className="nav">
        <div className="container nav-inner">
          <h1 className="logo">Deswanth.dev</h1>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="container hero">
        <div className="hero-left">
          <p className="tag">Full Stack Developer</p>

          <h1 className="title">
            Building real-world software <br />
            <span>with clean UI & logic</span>
          </h1>

          <p className="desc">
            I build fast, scalable applications using Python and React.
            Focused on performance and usability.
          </p>

          <div className="btns">
            <a href="#projects" className="btn">View Work</a>
            <a href="/Deswanth_CV.pdf" download className="btn-outline">
              Download CV
            </a>
          </div>

          <div className="icons">
            <a href="https://github.com/deswanth12" target="_blank">
              <FaGithub />
            </a>
            <a href="mailto:kdeswanth@gmail.com">
              <FaEnvelope />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="image-wrap">
            <img src={profile} alt="profile" />
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="container section">
        <h2>Skills</h2>

        {[
          ["HTML", 90],
          ["CSS", 85],
          ["JavaScript", 65],
          ["React", 80],
          ["Python", 85],
          ["LLMs", 70],
        ].map(([name, val]) => (
          <div key={name} className="skill">
            <div className="skill-top">
              <span>{name}</span>
              <span>{val}%</span>
            </div>
            <div className="bar">
              <div style={{ width: val + "%" }} />
            </div>
          </div>
        ))}
      </section>

      {/* PROJECTS */}
      <section id="projects" className="container section">
        <h2>Projects</h2>

        <div className="grid">

          <a href="https://github.com/deswanth12/studentdatabase" target="_blank" className="card">
            <div className="card-img">
              <img src="/assets/student.png" />
              <div className="overlay"><span>View Project →</span></div>
            </div>
            <h3>Student DB</h3>
            <p>Python • SQLite • Tkinter</p>
          </a>

          <a href="https://github.com/deswanth12/staffdatamanagement" target="_blank" className="card">
            <div className="card-img">
              <img src="/assets/staff.png" />
              <div className="overlay"><span>View Project →</span></div>
            </div>
            <h3>Staff System</h3>
            <p>Python • SQLite • Tkinter</p>
          </a>

          <a href="https://github.com/deswanth12/Library-data-management-system" target="_blank" className="card">
            <div className="card-img">
              <img src="/assets/library.png" />
              <div className="overlay"><span>View Project →</span></div>
            </div>
            <h3>Library System</h3>
            <p>Python • SQLite • Tkinter</p>
          </a>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="container section center">
        <h2>Contact</h2>
        <p>📞 8374646073</p>
        <p>📧 kdeswanth@gmail.com</p>
      </section>

      <footer className="footer">
        © 2026 Deswanth
      </footer>

    </div>
  );
}