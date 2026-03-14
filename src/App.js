import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════
// DATA — Edit these to customize your portfolio
// ═══════════════════════════════════════════════════════════

const SECTIONS = ["Home", "Skills", "Projects", "Experience", "Contacts"];

const SKILLS_ICONS = [
  { name: "Python", icon: "🐍" },
  { name: "JavaScript", icon: "⚡" },
  { name: "Swift", icon: "🍎" },
  { name: "Java", icon: "☕" },
  { name: "Go", icon: "🔷" },
  { name: "React", icon: "⚛️" },
  { name: "SwiftUI", icon: "📱" },
  { name: "Spring Boot", icon: "🌱" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Git", icon: "🔀" },
];

const SKILL_CATEGORIES = [
  { title: "Languages", items: ["Python", "JavaScript", "Swift", "Java", "Go", "SQL"] },
  { title: "Frontend", items: ["React.js", "SwiftUI"] },
  { title: "Backend", items: ["Spring Boot", "Go", "Docker", "AWS"] },
  { title: "Power Platform", items: ["Power Apps", "Power Automate", "Power BI", "Dataverse"] },
  { title: "Database", items: ["PostgreSQL", "MySQL", "Supabase"] },
  { title: "Tools", items: ["Git", "Docker", "AWS", "REST APIs"] },
];

const PROJECTS = [
  {
    name: "Hotel Management System",
    des: "Comprehensive hotel management dashboard with booking administration, room inventory, guest management, and analytics. Built with React and Supabase. University project at UCA.",
    link: "https://github.com/MukhtaramS/hotel-management-system",
    language: "React, Supabase, JavaScript",
    gif: "/gif/hotel-dashboard.gif",
  },
  {
    name: "GolonilApp",
    des: "Digital companion app for the ancient Persian game Gol ya Pooch — a game of strategy, tricking, and guessing. Built natively for iOS with Swift and SwiftUI.",
    link: "https://github.com/MukhtaramS/GolonilApp",
    language: "Swift, SwiftUI, CoreML",
    gif: "/gif/GolonilGif.gif",
  },
  {
    name: "Hotel Booking Platform",
    des: "A modern hotel booking platform with real-time availability, interactive room selection, and seamless reservations. Features a clean UI and responsive design.",
    link: "https://github.com/MukhtaramS/HotelBookingPlatform",
    language: "React, JavaScript, Supabase",
    gif: "/gif/HotelWebsiteGif.gif",
  },
  {
    name: "Benazir Pack Group Website",
    des: " professional business website developed for a packaging manufacturing company to showcase products, company information, and enable direct client inquiries. Designed with a clean layout and responsive structure to improve online presence and accessibility for international B2B customers.",
    link: "https://github.com/MukhtaramS/BEN",
    language: "Swift, SwiftUI, MapKit",
    gif: "/gif/ben.gif",
    demo: "https://benazirpackgroup.com" 
  },
];

const EXPERIENCE = [
  {
    role: "IT Key User Global Production — Working Student",
    company: "DEHN SE",
    location: "Germany",
    period: "Dec 2025 – Present",
    points: [
      "Developing digital automation solutions for production systems using modern cloud technologies",
      "Building AI and IoT solutions to optimize workflows from design through deployment",
      "Designing technical documentation and training programs for production teams",
    ],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Kitchen Wellness Assistant",
    location: "Italy (Remote)",
    period: "Jul 2025 – Sep 2025",
    points: [
      "Architected AI-powered wellness assistant using React, Supabase, GPT, and ElevenLabs APIs",
      "Designed scalable chat-based UI with real-time response handling and efficient state management",
      "Collaborated in agile early-stage startup backed by Ca'Foscari University",
    ],
  },
  {
    role: "Trainee iOS Developer",
    company: "Apple Developer Academy",
    location: "Italy",
    period: "Sep 2024 – Jun 2025",
    points: [
      "Developed 5 production-ready iOS apps using Swift, SwiftUI, and CoreML",
      "Led teams of 6 developers from ideation to App Store deployment",
      "Completed comprehensive challenges in coding, project management, and UX design",
    ],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Humo Bank",
    location: "Tajikistan",
    period: "Jun 2022 – Aug 2022",
    points: [
      "Built features for ReactJS/Go banking platform with focus on reliability",
      "Optimized frontend and API performance, achieving 98% Lighthouse score",
      "Participated in code reviews and wrote technical documentation",
    ],
  },
];

const CONTACTS = [
  { title: "Phone Number", value: "+49 155 1135 1480" },
  { title: "Email", value: "mukhtaramsulaimonov@gmail.com" },
];

// ═══════════════════════════════════════════════════════════
// SCROLL ANIMATION HOOK
// ═══════════════════════════════════════════════════════════

function useScrollAnimation() {
  const refs = useRef([]);
  const addRef = useCallback((el) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  }, []);

  useEffect(() => {
    const handle = () => {
      const scrollY = window.scrollY;
      refs.current.forEach((div) => {
        const top = div.getBoundingClientRect().top + scrollY;
        if (scrollY >= top - window.innerHeight / 1.4) {
          div.classList.add("anim-active");
        }
      });
    };
    window.addEventListener("scroll", handle);
    setTimeout(handle, 100);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return addRef;
}

// ═══════════════════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════════════════

function NavBar({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        width: 1300,
        maxWidth: "100%",
        height: 60,
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxSizing: "border-box",
        zIndex: 100,
        backdropFilter: "blur(10px)",
        background: scrolled ? "rgba(1,8,36,0.7)" : "transparent",
        transition: "background 0.3s",
      }}
    >
      <div
        style={{
          fontFamily: "'MuseoModerno', system-ui",
          fontWeight: 700,
          fontSize: 20,
        }}
      >
        Portfolio
      </div>
      <nav style={{ display: "flex", alignItems: "center", gap: 30 }}>
        {SECTIONS.map((s) => (
          <span
            key={s}
            onClick={() => {
              onNav(s);
              document.getElementById(s)?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              cursor: "pointer",
              color: active === s ? "#e945e3" : "#eee",
              textShadow: active === s ? "0 0 5px #7A43B6" : "none",
              transition: "color 0.3s",
              fontSize: 15,
            }}
          >
            {s}
          </span>
        ))}
      </nav>
    </header>
  );
}

// ═══════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════

function Home({ addRef }) {
  return (
    <section
      id="Home"
      style={{
        paddingTop: 150,
        padding: "150px 50px 50px",
        boxSizing: "border-box",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>
        <div
          ref={addRef}
          className="scroll-anim"
          style={{
            fontFamily: "'MuseoModerno', system-ui",
            fontSize: "clamp(3rem, 7vw, 7em)",
            fontWeight: "bold",
            lineHeight: "1em",
          }}
        >
          MY NAME IS <span className="shine-text">MUKHTARAM</span>
        </div>

        <div
          ref={addRef}
          className="scroll-anim"
          style={{
            color: "rgba(238,238,238,0.82)",
            margin: "30px 0",
            borderLeft: "0.7em solid #e945e3",
            paddingLeft: "2em",
            maxWidth: 620,
            lineHeight: 1.7,
          }}
        >
          M.Sc. Computer Science at University of Regensburg. Specializing in
          Full-Stack Development, iOS, and AI solutions. Experienced with React,
          Swift, Go, and cloud technologies. Interested in distributed systems,
          APIs, and scalable architectures.
        </div>

        <div
          ref={addRef}
          className="scroll-anim"
          style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
        >
          <a
            href="#Contacts"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("Contacts")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary"
          >
            Get in Touch
          </a>
          <a href="/Mukhtaram_CV.pdf" download className="btn-outline">
            Download my CV
          </a>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// SKILLS
// ═══════════════════════════════════════════════════════════

function Skills({ addRef }) {
  const quantity = SKILLS_ICONS.length;

  return (
    <section id="Skills" style={{ padding: "50px 0px" }}>
      <div
        ref={addRef}
        className="scroll-anim"
        style={{
          textAlign: "center",
          fontSize: "clamp(2rem, 5vw, 4rem)",
          fontFamily: "'MuseoModerno', system-ui",
          fontWeight: 700,
        }}
      >
        My Skills
      </div>
      <div
        ref={addRef}
        className="scroll-anim"
        style={{
          color: "rgba(238,238,238,0.82)",
          textAlign: "center",
          maxWidth: 500,
          margin: "10px auto 0",
        }}
      >
        Languages, Frameworks & Tools
      </div>

      {/* Infinite scrolling slider */}
      <div
        ref={addRef}
        className="scroll-anim"
        style={{
          width: "100%",
          height: 100,
          padding: "40px 0",
          overflow: "hidden",
          maskImage:
            "linear-gradient(to right, transparent, #000 10% 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 10% 90%, transparent)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            minWidth: quantity * 120,
            position: "relative",
          }}
        >
          {SKILLS_ICONS.map((skill, i) => (
            <div
              key={skill.name}
              className="slider-item"
              style={{
                "--position": i + 1,
                "--quantity": quantity,
                width: 100,
                height: 100,
                position: "absolute",
                left: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <div style={{ fontSize: 36 }}>{skill.icon}</div>
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(238,238,238,0.6)",
                  fontWeight: 500,
                }}
              >
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Skill cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
          padding: "20px 50px",
        }}
      >
        {SKILL_CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            ref={addRef}
            className="scroll-anim skill-card"
            style={{
              padding: 24,
              borderRadius: 16,
              background: "rgba(1,8,36,0.6)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(238,238,238,0.08)",
            }}
          >
            <h3
              style={{
                fontSize: 13,
                color: "rgba(238,238,238,0.4)",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: 600,
                margin: "0 0 14px",
              }}
            >
              {cat.title}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {cat.items.map((s) => (
                <span
                  key={s}
                  style={{
                    padding: "5px 12px",
                    fontSize: 13,
                    background: "rgba(238,238,238,0.06)",
                    borderRadius: 20,
                    color: "rgba(238,238,238,0.75)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// PROJECTS — Alternating layout like reference
// ═══════════════════════════════════════════════════════════

function ProjectsSection({ addRef }) {
  return (
    <section id="Projects" style={{ padding: "50px", boxSizing: "border-box" }}>
      <div
        ref={addRef}
        className="scroll-anim"
        style={{
          textAlign: "center",
          fontSize: "clamp(2rem, 5vw, 4rem)",
          fontFamily: "'MuseoModerno', system-ui",
          fontWeight: 700,
          marginTop: 10,
        }}
      >
        Projects
      </div>
      <div
        ref={addRef}
        className="scroll-anim"
        style={{
          color: "rgba(238,238,238,0.35)",
          textAlign: "center",
          maxWidth: 500,
          margin: "10px auto 0",
        }}
      >
        Some of my recent work
      </div>

      <div className="projects-list" style={{ marginTop: 50 }}>
        {PROJECTS.map((p, i) => {
          const isEven = i % 2 === 1;
          return (
            <div
              key={p.name}
              ref={addRef}
              className="scroll-anim project-item"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 20,
                alignItems: "center",
                marginBottom: 100,
              }}
            >
              {/* Gradient card with emoji */}
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(-45deg, #3b2bcd, #be2424)",
                  padding: 40,
                  textAlign: "center",
                  borderRadius: 20,
                  overflow: "hidden",
                  order: isEven ? 2 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 300,
                }}
              >
                <div
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
                  }}
                >
                  <img
                    src={p.gif}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 20,
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div style={{ order: isEven ? 1 : 2 }}>
                <h3
                  style={{
                    fontSize: "clamp(1.5em, 3vw, 3em)",
                    margin: 0,
                    fontWeight: 700,
                  }}
                >
                  {p.name}
                </h3>
                <div
                  style={{
                    color: "rgba(238,238,238,0.5)",
                    marginTop: 12,
                    lineHeight: 1.7,
                  }}
                >
                  {p.des}
                </div>
                <div style={{ marginTop: 16 }}>
                  <h4 style={{ margin: "0 0 6px", fontSize: 14, color: "#e945e3" }}>
                    What I Used
                  </h4>
                  <div style={{ color: "rgba(238,238,238,0.5)", fontSize: 14 }}>
                    {p.language}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
  <a
    href={p.link}
    target="_blank"
    rel="noopener noreferrer"
    className="btn-outline"
    style={{ fontSize: 14, padding: "10px 15px" }}
  >
    GitHub Code
  </a>

  {p.demo && (
    <a
      href={p.demo}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary"
      style={{ fontSize: 14, padding: "10px 15px" }}
    >
      Live Demo
    </a>
  )}
</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// EXPERIENCE — Timeline
// ═══════════════════════════════════════════════════════════

function ExperienceSection({ addRef }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <section
      id="Experience"
      style={{ padding: "50px", boxSizing: "border-box" }}
    >
      <div
        ref={addRef}
        className="scroll-anim"
        style={{
          textAlign: "center",
          fontSize: "clamp(2rem, 5vw, 4rem)",
          fontFamily: "'MuseoModerno', system-ui",
          fontWeight: 700,
        }}
      >
        Experience
      </div>
      <div
        ref={addRef}
        className="scroll-anim"
        style={{
          color: "rgba(238,238,238,0.35)",
          textAlign: "center",
          maxWidth: 500,
          margin: "10px auto 40px",
        }}
      >
        Where I've worked
      </div>

      <div
        style={{
          position: "relative",
          paddingLeft: 36,
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        {/* Timeline line */}
        <div
          style={{
            position: "absolute",
            left: 7,
            top: 8,
            bottom: 8,
            width: 2,
            background:
              "linear-gradient(180deg, #e945e3, #7A43B6, transparent)",
            borderRadius: 2,
          }}
        />

        {EXPERIENCE.map((exp, i) => (
          <div
            key={i}
            ref={addRef}
            className="scroll-anim"
            style={{
              position: "relative",
              marginBottom: 32,
              cursor: "pointer",
            }}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            {/* Dot */}
            <div
              style={{
                position: "absolute",
                left: -33,
                top: 10,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background:
                  expanded === i ? "#e945e3" : "rgba(238,238,238,0.15)",
                border: "2px solid #010824",
                transition: "background 0.3s",
              }}
            />
            <div
              className="exp-card"
              style={{
                padding: 24,
                borderRadius: 16,
                background:
                  expanded === i
                    ? "rgba(233,69,227,0.04)"
                    : "rgba(238,238,238,0.02)",
                border: `1px solid ${expanded === i ? "rgba(233,69,227,0.2)" : "rgba(238,238,238,0.06)"}`,
                transition: "all 0.3s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>
                    {exp.role}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#e945e3",
                      margin: "4px 0 0",
                      fontWeight: 500,
                    }}
                  >
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 13,
                    color: "rgba(238,238,238,0.35)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {exp.period}
                </span>
              </div>
              <div
                style={{
                  maxHeight: expanded === i ? 300 : 0,
                  overflow: "hidden",
                  transition:
                    "max-height 0.4s cubic-bezier(.16,1,.3,1), opacity 0.3s",
                  opacity: expanded === i ? 1 : 0,
                }}
              >
                <ul
                  style={{
                    margin: "14px 0 0",
                    paddingLeft: 18,
                    listStyle: "none",
                  }}
                >
                  {exp.points.map((pt, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: 14,
                        color: "rgba(238,238,238,0.55)",
                        lineHeight: 1.7,
                        marginBottom: 6,
                        position: "relative",
                        paddingLeft: 4,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: -14,
                          color: "rgba(233,69,227,0.5)",
                        }}
                      >
                        ›
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// CONTACTS
// ═══════════════════════════════════════════════════════════

function ContactsSection({ addRef }) {
  return (
    <section
      id="Contacts"
      style={{ padding: "50px", paddingBottom: 22, boxSizing: "border-box" }}
    >
      <div
        ref={addRef}
        className="scroll-anim"
        style={{
          textAlign: "center",
          fontSize: "clamp(2rem, 5vw, 4rem)",
          fontFamily: "'MuseoModerno', system-ui",
          fontWeight: 700,
        }}
      >
        Let's Connect
      </div>
      <div
        ref={addRef}
        className="scroll-anim"
        style={{
          color: "rgba(238,238,238,0.6)",
          textAlign: "center",
          maxWidth: 500,
          margin: "50px auto 0",
        }}
      >
        I'm always open to new opportunities, collaborations, or just a friendly
        chat about tech.
      </div>

      <div ref={addRef} className="scroll-anim" style={{ textAlign: "center" }}>
        {CONTACTS.map((c) => (
          <div key={c.title} style={{ marginTop: 40 }}>
            <h3 style={{ margin: 0, fontSize: 16 }}>{c.title}</h3>
            <div style={{ color: "rgba(238,238,238,0.7)", marginTop: 4 }}>
              {c.value}
            </div>
          </div>
        ))}

        {/* Social icons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 25,
            gap: 20,
            marginTop: 20,
          }}
        >
          <a
            href="https://github.com/MukhtaramS"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn social-github"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/mukhtaramsulaimonov"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn social-linkedin"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="mailto:mukhtaramsulaimonov@gmail.com"
            className="social-btn social-email"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
            </svg>
          </a>
        </div>

        <div
          style={{
            color: "rgba(238,238,238,0.3)",
            marginTop: 40,
            fontSize: 13,
          }}
        >
          © {new Date().getFullYear()} Mukhtaram Sulaimonov. All Rights
          Reserved.
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const addRef = useScrollAnimation();

  useEffect(() => {
    const handler = () => {
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top < 200) {
          setActive(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      style={{
        margin: 0,
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#010824",
        color: "#eee",
        fontSize: 15,
        minHeight: "100vh",
        backgroundImage: [
          "linear-gradient(to right, transparent 0px, transparent 49px, rgba(238,238,238,0.067) 49px)",
          "linear-gradient(to bottom, transparent 0px, transparent 49px, rgba(238,238,238,0.067) 49px)",
        ].join(", "),
        backgroundSize: "50px 50px",
        position: "relative",
      }}
    >
      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=MuseoModerno:wght@200;500;700&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Styles */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; scroll-padding-top: 70px; }
        body { background-color: #010824; margin: 0; }
        ::selection { background: rgba(233,69,227,0.3); color: #fff; }

        /* Top gradient glow — the math-notebook signature effect */
        .glow-top {
          position: fixed;
          width: 400px;
          height: 400px;
          background-image: linear-gradient(to right, #D02E23, #7A43B6);
          z-index: 0;
          top: -200px;
          left: calc(50% - 200px);
          border-radius: 50% 50% 0% 0%;
          pointer-events: none;
          filter: blur(250px);
        }

        /* Shine gradient text animation */
        .shine-text {
          background-image: linear-gradient(to right, #7BE728, #F3265F, #7F40AC, #7BE728);
          background-size: 200% auto;
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 5s linear infinite;
        }
        @keyframes shine {
          to { background-position: 200% center; }
        }

        /* Scroll-triggered animation (blur + slide up) */
        .scroll-anim {
          transform: translateY(50px);
          filter: blur(20px);
          opacity: 0;
          transition: 0.6s cubic-bezier(.16,1,.3,1);
        }
        .scroll-anim.anim-active {
          opacity: 1;
          filter: blur(0);
          transform: translateY(0);
        }

        /* Infinite skills slider */
        .slider-item {
          animation: autoRun 10s linear infinite;
          animation-delay: calc((10s / var(--quantity)) * (var(--position) - 1));
        }
        @keyframes autoRun {
          from { left: 100%; }
          to { left: -100px; }
        }

        /* Buttons */
        .btn-primary {
          display: inline-block;
          font-size: 15px;
          color: #eee;
          font-weight: bold;
          text-decoration: none;
          background: linear-gradient(135deg, #D02E23, #7A43B6);
          padding: 16px 30px;
          border-radius: 40px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(233,69,227,0.3);
        }
        .btn-outline {
          display: inline-block;
          font-size: large;
          color: #eee;
          font-weight: bold;
          text-decoration: none;
          border: 1px solid #eee;
          background: transparent;
          width: max-content;
          padding: 16px 30px;
          border-radius: 40px;
          transition: 0.3s;
        }
        .btn-outline:hover {
          background-color: #eee;
          color: #010824;
        }

        /* Social buttons */
        .social-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: rgb(44,44,44);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
          text-decoration: none;
        }
        .social-github:hover { background-color: #000; }
        .social-linkedin:hover { background-color: #0072b1; }
        .social-email:hover { background-color: #ea4335; }
        .social-btn:active { transform: scale(0.9); }

        /* Skill cards hover */
        .skill-card {
          transition: border-color 0.3s, transform 0.3s;
          cursor: default;
        }
        .skill-card:hover {
          border-color: rgba(233,69,227,0.35) !important;
          transform: translateY(-4px);
        }

        /* Experience cards hover */
        .exp-card:hover {
          border-color: rgba(233,69,227,0.15) !important;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #010824; }
        ::-webkit-scrollbar-thumb { background: rgba(238,238,238,0.1); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(238,238,238,0.2); }

        /* Mobile responsive */
        @media screen and (max-width: 767px) {
          .project-item {
            grid-template-columns: 1fr !important;
          }
          .project-item > div {
            order: unset !important;
          }
          nav span { font-size: 12px !important; }
          nav { gap: 14px !important; }
        }
      `}</style>

      {/* Top glow */}
      <div className="glow-top" />

      <NavBar active={active} onNav={setActive} />

      <main
        style={{
          width: 1300,
          maxWidth: "100%",
          margin: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Home addRef={addRef} />
        <Skills addRef={addRef} />
        <ProjectsSection addRef={addRef} />
        <ExperienceSection addRef={addRef} />
        <ContactsSection addRef={addRef} />
      </main>
    </div>
  );
}