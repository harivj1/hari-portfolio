import { useEffect, useState } from "react";
import {
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiBurpsuite,
  SiC,
  SiCss,
  SiElasticstack,
  SiGnubash,
  SiHtml5,
  SiJavascript,
  SiKalilinux,
  SiLinux,
  SiMetasploit,
  SiOwasp,
  SiPython,
  SiWireshark,
} from "react-icons/si";
import {
  FaCrosshairs,
  FaFileLines,
  FaFingerprint,
  FaMagnifyingGlass,
  FaMagnifyingGlassChart,
  FaShieldHalved,
  FaSitemap,
  FaTriangleExclamation,
  FaUserLock,
  FaWindows,
} from "react-icons/fa6";
import heroImage from "./assets/kali-hero.svg";
import asciiPortrait from "./assets/kali-ascii.png";
import uncLogo from "./assets/unc-charlotte-logo.png";
import srmLogo from "./assets/srm-logo.png";
import nmapLogo from "./assets/nmap-logo.png";

const projects = [
  {
    title: "Enterprise Security Home Lab",
    description: [
      "Needed a realistic enterprise auth environment → automated DNS, LDAP, Kerberos, and web servers on LXD via Ansible → built idempotent, self-healing infrastructure.",
      "DNS/LDAP traffic was vulnerable to spoofing/interception → signed zones with DNSSEC and enforced LDAPS encryption → secured directory and authentication traffic end-to-end.",
      "Needed centralized app-level login → deployed WordPress over TLS integrated with LDAPS → enabled directory-based SSO.",
    ],
    tags: ["Linux", "Ansible", "LDAP", "Kerberos"],
  },
  {
    title: "ELK Detection Engineering",
    description: [
      "Simulated enterprise network showed suspected credential misuse and lateral movement → built KQL/Kibana queries across auth and service logs → pinpointed compromised hosts, attack sources, and 14 affected machines.",
      "DNS logs lacked threat context → built a Python domain-scoring pipeline → flagged a DGA-based C2 domain missing from Top 1M lists.",
      "NetFlow and SSL logs showed no built-in threat signals → enriched data (IP/ASN tagging) and ran Kibana long-tail analysis in Elastic SIEM → detected exfiltration, beaconing, and spoofed CAs tied to 6 IPs.",
    ],
    tags: ["ELK", "KQL", "Detection", "Threat Hunting"],
  },
  {
    title: "Web Application Security",
    description: [
      "Vulnerable e-commerce app allowed unauthenticated DB access → exploited SQLi, stored/reflected/DOM XSS, and CSRF/clickjacking chains → achieved auth bypass, credential theft, and IDOR discovery.",
      "Java app contained 7 injection vulnerability classes → remediated with parameterized queries, context-aware encoding, and custom input validation → closed all seven attack paths.",
      "Unvalidated URLs and broken access control exposed internal resources → found via Burp/ZAP tampering, fixed with allow-listing and session-based identity checks → documented report.",
    ],
    tags: ["Burp Suite", "SQLMap", "Web Security"],
  },
];

// grid fills row-major (2 cols): [top-left, top-right, bottom-left, bottom-right]
const skillGroups = [
  {
    title: "Security Tools",
    items: [
      "Nmap",
      "Nessus",
      "Burp Suite",
      "OWASP ZAP",
      "Metasploit",
      "Wireshark",
      "Kali Linux",
    ],
  },
  {
    title: "Detection & Monitoring",
    items: [
      "SIEM (ELK Stack)",
      "KQL",
      "Log Analysis",
      "Incident Investigation & Triage",
      "Threat Detection & Hunting",
    ],
  },
  {
    title: "Scripting & Programming",
    items: ["Python", "Bash", "C", "JavaScript", "|", "HTML5", "CSS3"],
  },
  {
    title: "Systems & Infrastructure",
    items: [
      "Linux",
      "Windows",
      "Active Directory",
      "IAM",
      "SSO",
      "System Hardening",
    ],
  },
];

// Brand logos where they exist (simple-icons / Font Awesome); everything else
// gets a concept icon that matches the skill.
const skillIcons: Record<string, IconType> = {
  // Security Tools
  Nessus: FaMagnifyingGlassChart,
  "Burp Suite": SiBurpsuite,
  "OWASP ZAP": SiOwasp,
  Metasploit: SiMetasploit,
  Wireshark: SiWireshark,
  "Kali Linux": SiKalilinux,
  // Detection & Monitoring
  "SIEM (ELK Stack)": SiElasticstack,
  KQL: FaMagnifyingGlass,
  "Log Analysis": FaFileLines,
  "Threat Detection & Hunting": FaCrosshairs,
  "Incident Investigation & Triage": FaTriangleExclamation,
  // Scripting & Programming
  Python: SiPython,
  Bash: SiGnubash,
  C: SiC,
  JavaScript: SiJavascript,
  HTML5: SiHtml5,
  CSS3: SiCss,
  // Systems & Infrastructure
  Linux: SiLinux,
  Windows: FaWindows, // simple-icons dropped the Microsoft/Windows marks
  "Active Directory": FaSitemap,
  IAM: FaUserLock,
  SSO: FaFingerprint,
  "System Hardening": FaShieldHalved,
};

// Official brand colors (from Simple Icons) for the real logos above.
// Concept glyphs that stand in for a skill with no real logo (Nessus, KQL,
// Log Analysis, Threat Detection, Incident Investigation, Windows, Active
// Directory, IAM, SSO, System Hardening) keep the default accent color.
const skillIconColors: Record<string, string> = {
  "Burp Suite": "#FF6633",
  Metasploit: "#2596CD",
  Wireshark: "#1679A7",
  "Kali Linux": "#557C94",
  "SIEM (ELK Stack)": "#005571",
  Python: "#3776AB",
  Bash: "#4EAA25",
  C: "#A8B9CC",
  JavaScript: "#F7DF1E",
  HTML5: "#E34F26",
  CSS3: "#663399",
  Linux: "#FCC624",
  Windows: "#0078D6",
  "Incident Investigation & Triage": "#febc2e",
  "Threat Detection & Hunting": "#ff5f57",
};

const experience = [
  {
    role: "Technical Linux Specialist",
    org: "University of North Carolina at Charlotte",
    type: "Part-time",
    period: "Oct 2025 — May 2026",
    duration: "8 months",
    city: "Charlotte, NC",
    site: "On-site",
    points: [
      {
        label: "Endpoint Security Hardening",
        text: "Led migration of 100+ workstations off EOL Linux versions and tracked down unmanaged endpoints, closing compliance gaps.",
      },
      {
        label: "Deployment Automation",
        text: "Monitored AWX/Ansible deployments, diagnosing failed installs to keep the secure-imaging pipeline reliable.",
      },
      {
        label: "Identity & Access Management",
        text: "Provisioned user/admin access in Grouper across 100+ reimaged and onboarded workstations.",
      },
      {
        label: "Asset Lifecycle Management",
        text: "Identified 25+ unmanaged workstations via inventory audits, then securely wiped and decommissioned them.",
      },
      {
        label: "Technical Support",
        text: "Delivered Tier 1/2 support on-site and remotely, resolving 15+ tickets weekly.",
      },
      {
        label: "Documentation & Communication",
        text: "Triaged issues across channels and briefed management on resolution outcomes.",
      },
    ],
  },
  {
    role: "Graduate Instructional Assistant",
    org: "University of North Carolina at Charlotte",
    type: "Part-time",
    period: "Jan 2025 — May 2025",
    duration: "5 months",
    city: "Charlotte, NC",
    site: "On-site",
    points: [
      {
        label: "Instructional Development",
        text: "Developed Python and cryptography solution keys for assignments, improving grading consistency and turnaround time.",
      },
      {
        label: "Student Mentorship",
        text: "Mentored 25 students weekly, resolving Python and cryptography programming issues to support project completion.",
      },
      {
        label: "Course Operations",
        text: "Managed exam proctoring and assignment administration via Canvas and Gradescope, handling academic records with confidentiality.",
      },
    ],
  },
];

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

// highlight quantitative tokens and a few key phrases within experience body copy.
// String.split with a capturing group puts the matches at odd indices.
const HIGHLIGHT_RE =
  /(Tier \d+\/\d+|\d+\+|25(?= students)|compliance gaps|AWX\/Ansible|user\/admin access|support)/;
const highlightMetrics = (text: string) =>
  text.split(HIGHLIGHT_RE).map((part, i) =>
    i % 2 === 1 ? (
      <span className="xp-metric" key={i}>
        {part}
      </span>
    ) : (
      part
    ),
  );

type Certification = {
  name: string;
  subtitle: string;
  issuer: string;
  status: "completed" | "in-progress";
  badge?: string;
  verify?: string;
  credentialId?: string;
};

const certifications: Certification[] = [
  {
    name: "eJPTv2",
    subtitle: "Junior Penetration Tester",
    issuer: "INE Security",
    status: "completed",
    badge: asset("certs/ejpt-badge.png"),
    verify: "https://certs.ine.com/8264a935-8d2c-4a4c-8bf6-a431d1bcc2d2",
    credentialId: "173882711",
  },
  {
    name: "AWS SAA-C03",
    subtitle: "Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    status: "completed",
    badge: asset("certs/aws-saa-badge.png"),
    verify:
      "https://www.credly.com/badges/38cb9b4a-171f-46e8-a266-47164f4daa1b/public_url",
    credentialId: "8d446526df2d4dfeb6f3676fea2b742a",
  },
];

type WindowDef = { id: string; key: string; label: string };

// tmux window list — index 0 is the home window.
const windows: WindowDef[] = [
  { id: "home", key: "0", label: "home" },
  { id: "about", key: "1", label: "about" },
  { id: "skills", key: "2", label: "skills" },
  { id: "experience", key: "3", label: "experience" },
  { id: "certifications", key: "4", label: "certs" },
  { id: "projects", key: "5", label: "projects" },
  { id: "contact", key: "6", label: "contact" },
];

function useActiveWindow() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const ids = windows.map((w) => w.id);
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - line <= 1) current = id;
      }
      // near the very bottom, lock to the last section
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return active;
}

function SectionHead({
  n,
  name,
  cmd,
  active,
}: {
  n: string;
  name: string;
  cmd: string;
  active: boolean;
}) {
  return (
    <div className="sec-head">
      <div
        className={"tmux-sep" + (active ? " is-active" : "")}
        aria-hidden="true"
      >
        <span className="tmux-sep-rule" />
        <span className="tmux-sep-label">
          <span className="tmux-sep-br">[</span>&nbsp;
          <span className="tmux-sep-n">{n}</span>
          <span className="tmux-sep-colon">:</span>
          <span className="tmux-sep-name">{name}</span>&nbsp;
          <span className="tmux-sep-br">]</span>
        </span>
        <span className="tmux-sep-rule" />
      </div>
      <p className="section-cmd">
        <span className="term-user">hari@kali</span>
        <span className="term-punc">:</span>
        <span className="term-path">~</span>
        <span className="term-punc">$</span> {cmd}
      </p>
    </div>
  );
}

function CertBadge({ cert }: { cert: Certification }) {
  const [broken, setBroken] = useState(false);

  if (cert.badge && !broken) {
    return (
      <img
        className="cert-badge-img"
        src={cert.badge}
        alt={`${cert.name} badge`}
        loading="lazy"
        onError={() => setBroken(true)}
      />
    );
  }

  const Icon = cert.status === "in-progress" ? Terminal : ShieldCheck;
  return <Icon className="cert-badge-icon" aria-hidden="true" />;
}

function App() {
  const active = useActiveWindow();

  return (
    <main>
      <div
        className="hero-desktop"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="hero-overlay" />

      <header className="statusbar">
        <div className="sb-inner">
          <a className="sb-session" href="#home" aria-label="Home">
            <Terminal size={14} />
            <span>hari@kali</span>
          </a>

          <nav className="sb-windows" aria-label="Sections">
            {windows.map((w) => (
              <a
                key={w.id}
                href={`#${w.id}`}
                className={"sb-win" + (active === w.id ? " is-active" : "")}
                aria-current={active === w.id ? "true" : undefined}
              >
                <span className="sb-win-key">{w.key}</span>
                <span className="sb-win-colon">:</span>
                <span className="sb-win-label">{w.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="terminal">
        <div className="term-bar">
          <span className="term-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="term-title">hari@kali: ~</span>
        </div>

        <div className="term-body">
          <div id="home" className="term-output">
            <p className="tmux-tag">[ 0:home ]</p>

            <p className="term-cmd">
              <span className="term-user">hari@kali</span>
              <span className="term-punc">:</span>
              <span className="term-path">~</span>
              <span className="term-punc">$</span> whoami
            </p>

            <div className="term-output-row">
              <div className="term-output-main">
                <h1 className="hero-name">
                  <span className="nm-w">Hari</span>
                  <span className="nm-o">haran</span>{" "}
                  <span className="nm-w">Vijay</span>{" "}
                  <span className="nm-o">Iswaran</span>
                </h1>

                <h2>Security Engineer · Offensive Security</h2>

                <p className="eyebrow">
                  <span className="eyebrow-part">
                    <MapPin className="eyebrow-pin" size={12} strokeWidth={2.5} />
                    Currently In Tempe, Arizona
                  </span>
                </p>

                <p className="term-cmd term-cmd-next">
                  <span className="term-user">hari@kali</span>
                  <span className="term-punc">:</span>
                  <span className="term-path">~</span>
                  <span className="term-punc">$</span> cat ~/about.txt
                </p>

                <p className="intro">
                  Currently focused on offensive security — hacking into
                  systems, networks, web apps, and Active Directory
                  (ethically), finding real weaknesses and helping develop
                  defense mechanisms before they become real breaches.
                </p>

                <div className="hero-actions">
                  <a
                    className="btn primary"
                    href={asset("resume.pdf")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText size={17} /> View Resume
                  </a>
                  <span className="hero-location">
                    <span className="status-dot" />
                    Available For Security Roles
                  </span>
                </div>

                <div className="socials">
                  <a
                    href="https://github.com/harivj1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={18} />
                    <span>github.com/harivj1</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/hari-v-i"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={18} />
                    <span>linkedin.com/in/hari-v-i</span>
                  </a>
                  <a href="mailto:iswaranh@gmail.com">
                    <Mail size={18} />
                    <span>iswaranh@gmail.com</span>
                  </a>
                </div>
              </div>

              <div className="term-aside">
                <img className="term-ascii" src={asciiPortrait} alt="" />
                <div className="term-summary">
                  <p className="term-cmd">
                    <span className="term-user">hari@kali</span>
                    <span className="term-punc">:</span>
                    <span className="term-path">~</span>
                    <span className="term-punc">$</span> whoami --summary
                  </p>
                  <p className="term-summary-line">
                    hari — Security Engineer, Pentester
                  </p>
                  <p className="term-summary-line">
                    <span className="term-summary-key">certified:</span> eJPT,
                    AWS SAA-C03
                  </p>
                  <p className="term-summary-line">
                    <span className="term-summary-key">learning:</span> OSCP (in
                    progress)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section id="about" className="section shell">
            <SectionHead
              n="01"
              name="about"
              cmd="cat ~/about.md"
              active={active === "about"}
            />
            <div className="about-grid">
              <div className="about-intro">
                <p>
                  I'm currently interning as a Security Engineer, and
                  previously worked as a Technical Linux Specialist with
                  University IT support.
                </p>
                <p>
                  I specialize and have gained hands-on experience in
                  identifying, exploiting, and remediating vulnerabilities
                  through academic projects, home labs, and platforms like
                  TryHackMe and Hack The Box, simulating real-world attack
                  and defense scenarios.
                </p>
                <p>
                  I also have Active Directory pentesting experience and SIEM
                  log analysis expertise through projects and home labs using
                  the ELK Stack, where I ingest logs, build dashboards,
                  analyze enterprise logs, and detect malicious activity.
                </p>
                <p>
                  I'm looking for an entry-level role in Penetration Testing
                  and Security Engineering, happy to connect with anyone in
                  cybersecurity or recruiters.
                </p>
              </div>

              <div className="about-edu">
                <p className="about-edu-label">Education</p>

                <div className="edu-item">
                  <div>
                    <h3>M.S. Cybersecurity</h3>
                    <p className="edu-org">
                      University of North Carolina at Charlotte
                    </p>
                    <p className="edu-meta">
                      Aug 2024 – May 2026 · GPA 3.90 / 4.00
                    </p>
                  </div>
                  <img
                    className="edu-logo"
                    src={uncLogo}
                    alt="University of North Carolina at Charlotte"
                  />
                </div>

                <div className="edu-item">
                  <div>
                    <h3>B.Tech, Information Technology</h3>
                    <p className="edu-org">SRM IST, Chennai</p>
                    <p className="edu-meta">
                      Sep 2020 – May 2024 · GPA 8.97 / 10.00
                    </p>
                  </div>
                  <img
                    className="edu-logo"
                    src={srmLogo}
                    alt="SRM Institute of Science and Technology"
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="skills" className="section shell">
            <SectionHead
              n="02"
              name="skills"
              cmd="ls ~/toolkit/"
              active={active === "skills"}
            />
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <div className="skill-group" key={group.title}>
                  <h3 className="skill-group-title">{group.title}</h3>
                  <div className="skills">
                    {group.items.map((item, i) => {
                      if (item === "|")
                        return <i className="skill-break" key={`br-${i}`} />;
                      const Icon = skillIcons[item];
                      return (
                        <span key={item}>
                          {item === "Nmap" ? (
                            <img
                              src={nmapLogo}
                              className="skill-icon"
                              alt=""
                              aria-hidden="true"
                            />
                          ) : (
                            Icon && (
                              <Icon
                                className="skill-icon"
                                style={
                                  skillIconColors[item]
                                    ? { color: skillIconColors[item] }
                                    : undefined
                                }
                                aria-hidden="true"
                              />
                            )
                          )}
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="experience" className="section shell">
            <SectionHead
              n="03"
              name="experience"
              cmd="cat ~/experience.log"
              active={active === "experience"}
            />
            <ol className="xp-list">
              {experience.map((job) => (
                <li className="xp-item" key={job.role + job.period}>
                  <div className="xp-body">
                    <div className="xp-heading">
                      <h3>{job.role}</h3>
                      <span className="xp-period">
                        {job.period} <span className="xp-duration">· {job.duration}</span>
                      </span>
                    </div>
                    <p className="xp-org">
                      {job.org} ·{" "}
                      <span className="xp-org-extra">
                        <span className="xp-type">{job.type}</span>
                        <span className="xp-dot">·</span>
                        <span className="xp-loc">{job.city}</span>
                        <span className="xp-dot">·</span>
                        <span className="xp-loc">{job.site}</span>
                      </span>
                    </p>
                    <ul>
                      {job.points.map((point) => (
                        <li key={point.label}>
                          <span className="xp-point-label">{point.label}.</span>{" "}
                          {highlightMetrics(point.text)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="certifications" className="section shell">
            <SectionHead
              n="04"
              name="certifications"
              cmd="ls -l ~/certs/"
              active={active === "certifications"}
            />
            <div className="cert-grid">
              {certifications.map((cert) => {
                const link = cert.verify;
                const linkLabel = "Verify credential";
                return (
                  <article
                    className={
                      "cert-card" +
                      (cert.status === "in-progress" ? " active-cert" : "")
                    }
                    key={cert.name}
                  >
                    <div className="cert-badge">
                      <CertBadge cert={cert} />
                    </div>
                    <span className="cert-status">
                      {cert.status === "in-progress"
                        ? "In Progress"
                        : "Completed"}
                    </span>
                    <h3>{cert.name}</h3>
                    <p className="cert-sub">{cert.subtitle}</p>
                    <p className="cert-issuer">{cert.issuer}</p>
                    {cert.credentialId && (
                      <p className="cert-id" title={cert.credentialId}>
                        ID {cert.credentialId}
                      </p>
                    )}
                    {link && (
                      <a
                        className="cert-link"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {linkLabel} <ExternalLink size={14} />
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          <section id="projects" className="section shell">
            <SectionHead
              n="05"
              name="projects"
              cmd="git log --oneline academic-projects/"
              active={active === "projects"}
            />
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.title}>
                  <h3>{project.title}</h3>
                  {Array.isArray(project.description) ? (
                    <ul className="project-desc-list">
                      {project.description.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{project.description}</p>
                  )}
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="contact section shell">
            <SectionHead
              n="06"
              name="contact"
              cmd="./contact.sh"
              active={active === "contact"}
            />
            <h2>Let's build something secure.</h2>
            <p>
              Interesting problem, open role, or just want to talk security?{" "}
              <span style={{ whiteSpace: "nowrap" }}>
                <span className="contact-ping">Ping me</span> — links below.
              </span>
            </p>

            <div className="contact-links">
              <a
                className="contact-link"
                href="https://github.com/harivj1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} />
                GitHub
              </a>
              <a
                className="contact-link"
                href="https://www.linkedin.com/in/hari-v-i"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a className="contact-link" href="mailto:iswaranh@gmail.com">
                <Mail size={18} />
                Gmail
              </a>
              <a
                className="contact-link contact-link-resume"
                href={asset("resume.pdf")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText size={18} />
                Resume
              </a>
            </div>
          </section>

          <footer className="footer shell">
            <span>
              <span className="term-user">hari@kali</span>
              <span className="term-punc">:</span>
              <span className="term-path">~</span>
              <span className="term-punc">$</span> echo "Thanks for visiting"
            </span>
          </footer>
        </div>
      </div>
    </main>
  );
}

export default App;
