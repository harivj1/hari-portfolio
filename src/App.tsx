import { useEffect, useRef, useState } from "react";
import {
  Check,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Moon,
  ShieldCheck,
  Sun,
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
  FaNetworkWired,
} from "react-icons/fa6";
import asciiPortrait from "./assets/kali-ascii.png";
import logoNessusDark from "./assets/skills/nessus-dark.png";
import logoNessusLight from "./assets/skills/nessus-light.png";
import logoSiemElk from "./assets/skills/siem-elk.png";
import logoLogAnalysis from "./assets/skills/log-analysis.png";
import logoIncidentInvestigation from "./assets/skills/incident-investigation.png";
import logoThreatHunting from "./assets/skills/threat-hunting.png";
import logoBash from "./assets/skills/bash.png";
import logoSystemHardening from "./assets/skills/system-hardening.png";
import logoIam from "./assets/skills/iam.png";
import logoSso from "./assets/skills/sso.png";

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
      "Java app contained 7 injection vulnerability classes → remediated with parameterized queries, context-aware encoding, and custom input validation → closed all 7 attack paths.",
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
      "|",
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
      "|",
      "System Hardening",
      "IAM",
      "SSO",
    ],
  },
];

// Brand logos where they exist (simple-icons / Font Awesome); everything else
// gets a concept icon that matches the skill.
const skillIcons: Record<string, IconType> = {
  // Security Tools
  Nmap: FaNetworkWired,
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

// actual logo/graphic images for the skills pills, in place of a flat icon +
// typed label — used only where the logo reads fine on the site's dark pill
// background. Several sourced logos bake in black/dark text or dark line art
// (Burp Suite, OWASP ZAP, Metasploit, Wireshark, Python, HTML5, CSS3,
// Linux/Tux) and would go invisible there, so those keep the original
// colored icon+text treatment instead. KQL also keeps the icon+text
// fallback — nothing found for it fit well enough to replace it. SIEM (ELK
// Stack) uses just the Elastic mark (its baked-in wordmark text didn't
// survive a light/dark theme swap any better than KQL's did), with the
// typed label kept alongside like the concept icons below.
const skillLogos: Record<string, string> = {
  "SIEM (ELK Stack)": logoSiemElk,
  "Log Analysis": logoLogAnalysis,
  "Incident Investigation & Triage": logoIncidentInvestigation,
  "Threat Detection & Hunting": logoThreatHunting,
  Bash: logoBash,
  "System Hardening": logoSystemHardening,
  IAM: logoIam,
  SSO: logoSso,
};

// skills needing separate light/dark artwork — a plain white or navy mark
// (unlike the colored logos above) only reads on one theme, so both variants
// ship and CSS swaps which is visible per data-theme. Nessus uses Tenable's
// abstract interlocking-hexagon mark (there's no plain "Nessus" logo without
// a "Professional"/edition suffix baked in), with the typed label kept
// alongside since the mark alone doesn't read as "Nessus".
const themedSkillLogos: Record<string, { dark: string; light: string }> = {
  Nessus: { dark: logoNessusDark, light: logoNessusLight },
  // the original blue artwork sinks into the navy dark-theme pills, so the
  // dark variants are recolored into the site's blue-to-white palette
};

type ExperienceEntry = {
  role: string;
  org: string;
  orgShort?: string; // compact name for the tab list
  type: string;
  period: string;
  duration?: string; // omitted for current roles: computed from the start date
  city: string;
  site?: string;
  current?: boolean;
  headline: string; // the one win a skimming reader should take away
  tags: string[];
  points: { label: string; text: string }[];
};


const experience: ExperienceEntry[] = [
  {
    role: "Security Engineer",
    org: "Holiday Channel",
    type: "Internship",
    period: "Sep 2026 — Present",
    city: "Colorado, United States",
    current: true,
    headline: "Found malware during a code review and drove it to a fix alongside the developers.",
    tags: ["SAST", "Threat Modelling", "Penetration Testing", "Vulnerability Management"],
    points: [
      {
        label: "Secure Code Review",
        text: "Reviewed application code with SAST, threat modelling, and penetration testing — surfaced vulnerabilities and tracked them through vulnerability management.",
      },
      {
        label: "Malware Discovery & Remediation",
        text: "Found malware during a code review, escalated it, and provided mitigation — worked alongside developers through remediation until it was fixed.",
      },
      {
        label: "Security Coordination",
        text: "Ran security meetings twice a week and tracked every team member's tasks — kept findings and fixes moving to closure.",
      },
    ],
  },
  {
    role: "Technical Linux Specialist",
    org: "University of North Carolina at Charlotte",
    orgShort: "UNC Charlotte",
    type: "Part-time",
    period: "Oct 2025 — May 2026",
    duration: "8 mos",
    city: "Charlotte, North Carolina, United States",
    site: "On-site",
    headline: "Remediated 100+ end-of-life Linux workstations and closed unmanaged-endpoint exposure fleet-wide.",
    tags: ["Linux", "Endpoint Hardening", "Grouper", "Log Analysis"],
    points: [
      {
        label: "Endpoint Security",
        text: "Remediated 100+ EOL Linux workstations, led migration, audited records, found unmanaged endpoints, hardened endpoint security.",
      },
      {
        label: "IAM & Asset Management",
        text: "Locked down access via Grouper, wiped and decommissioned 25+ unused workstations — closed unmanaged endpoint exposure fleet-wide.",
      },
      {
        label: "Incident Response and Support",
        text: "Triaged OS/network/config issues onsite, closed 15+ tickets weekly with documented findings — sharpened response and troubleshooting visibility.",
      },
      {
        label: "Log-Based Troubleshooting",
        text: "Root-caused graphical, network, and boot failures via log analysis — cut repeat incidents.",
      },
      {
        label: "Security Automation",
        text: "Monitored deployment jobs, remediated failed package installs — kept the secure-imaging pipeline repeatable.",
      },
    ],
  },
  {
    role: "Graduate Instructional Assistant",
    org: "University of North Carolina at Charlotte",
    orgShort: "UNC Charlotte",
    type: "Part-time",
    period: "Jan 2025 — May 2025",
    duration: "5 mos",
    city: "Charlotte, North Carolina, United States",
    site: "On-site",
    headline: "Supported 25 students weekly with Python and cryptography troubleshooting.",
    tags: ["Python", "Cryptography", "Canvas", "Gradescope"],
    points: [
      {
        label: "Technical Troubleshooting",
        text: "Diagnosed Python/cryptography issues for 25 students weekly, built solution keys — sharpened support, grading consistency, and feedback turnaround.",
      },
      {
        label: "Confidentiality & Documentation",
        text: "Ran Canvas/Gradescope operations and exam proctoring — kept sensitive academic records accurate and confidential.",
      },
    ],
  },
];

// "Sep 2026" → months elapsed up to today, counted inclusively like LinkedIn
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const durationSince = (start: string) => {
  const [mon, year] = start.split(" ");
  const now = new Date();
  const months =
    (now.getFullYear() - Number(year)) * 12 +
    (now.getMonth() - MONTHS.indexOf(mon)) + 1;
  if (months < 12) return `${months} mo${months === 1 ? "" : "s"}`;
  const y = Math.floor(months / 12), m = months % 12;
  return `${y} yr${y === 1 ? "" : "s"}` + (m ? ` ${m} mo${m === 1 ? "" : "s"}` : "");
};

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

// highlight quantitative tokens and a few key phrases within experience body copy.
// String.split with a capturing group puts the matches at odd indices.
const HIGHLIGHT_RE =
  /(Tier \d+\/\d+|\d+\+|25(?= students)|compliance gaps|AWX\/Ansible|user\/admin access)/;
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
  { id: "home", key: "0", label: "Home" },
  { id: "about", key: "1", label: "About" },
  { id: "skills", key: "2", label: "Skills" },
  { id: "experience", key: "3", label: "Experience" },
  { id: "certifications", key: "4", label: "Certifications" },
  { id: "projects", key: "5", label: "Projects" },
  { id: "contact", key: "6", label: "Contact" },
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

type Theme = "light" | "dark";

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage unavailable — keep the in-memory theme */
    }
  }, [theme]);
  const toggle = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));
  return { theme, toggle };
}

// fires once, the first time the returned ref scrolls into view — used to
// trigger a reveal/stagger animation instead of everything appearing at once.
function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

// types out a terminal command once its prompt line scrolls into view, then
// leaves a blinking cursor — reinforces the "live terminal" conceit instead
// of the command just appearing as static text.
function TypedCommand({ cmd }: { cmd: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(cmd);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [cmd]);

  useEffect(() => {
    if (!started || typed.length >= cmd.length) return;
    const delay = 18 + Math.random() * 32;
    const t = setTimeout(() => setTyped(cmd.slice(0, typed.length + 1)), delay);
    return () => clearTimeout(t);
  }, [started, typed, cmd]);

  return <span ref={ref}>{typed}</span>;
}

// one skill category's pill row — the pills stagger in together once the
// row scrolls into view, instead of the whole grid appearing at once.
function SkillGroup({ group }: { group: (typeof skillGroups)[number] }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div className="skill-group">
      <h3 className="skill-group-title">{group.title}</h3>
      <div
        className={"skills" + (inView ? " reveal-in" : "")}
        ref={ref}
      >
        {group.items.map((item, i) => {
          if (item === "|")
            return <i className="skill-break" key={`br-${i}`} />;
          const themed = themedSkillLogos[item];
          if (themed) {
            return (
              <span className="skill-logo-pill" key={item}>
                <img
                  src={themed.dark}
                  className="skill-logo skill-logo-dark-only"
                  alt={item}
                />
                <img
                  src={themed.light}
                  className="skill-logo skill-logo-light-only"
                  alt={item}
                />
                <span className="skill-logo-label">{item}</span>
              </span>
            );
          }
          const logo = skillLogos[item];
          if (logo) {
            return (
              <span className="skill-logo-pill" key={item}>
                <img src={logo} className="skill-logo" alt={item} />
                <span className="skill-logo-label">{item}</span>
              </span>
            );
          }
          const Icon = skillIcons[item];
          return (
            <span key={item}>
              {Icon && (
                <Icon
                  className="skill-icon"
                  data-skill={item}
                  style={
                    skillIconColors[item]
                      ? { color: skillIconColors[item] }
                      : undefined
                  }
                  aria-hidden="true"
                />
              )}
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// one job's timeline entry — its bullet points stagger in together once the
// entry scrolls into view.
// experience: roles listed down the left like terminal windows, the selected
// role's details on the right. Arrow keys move between tabs (WAI-ARIA tabs).
function ExperienceTabs({ jobs }: { jobs: ExperienceEntry[] }) {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const job = jobs[selected];
  const [start, end] = job.period.split(" — ");

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1,
    };
    let next: number | undefined;
    if (e.key in keys) next = (selected + keys[e.key] + jobs.length) % jobs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = jobs.length - 1;
    if (next === undefined) return;
    e.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="xp-tabs">
      <div
        className="xp-tablist"
        role="tablist"
        aria-label="Roles"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
      >
        {jobs.map((j, i) => (
          <button
            key={j.role + j.period}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`xp-tab-${i}`}
            aria-selected={i === selected}
            aria-controls="xp-tabpanel"
            tabIndex={i === selected ? 0 : -1}
            className={"xp-tab" + (i === selected ? " is-active" : "")}
            onClick={() => setSelected(i)}
          >
            <span className="xp-tab-org">
              {j.orgShort ?? j.org}
              {j.current && <span className="xp-tab-live" aria-label="current" />}
            </span>
            <span className="xp-tab-role">{j.role}</span>
            <span className="xp-tab-period">{j.period.replace(" — ", " – ")}</span>
          </button>
        ))}
      </div>

      <div
        className="xp-tabpanel"
        role="tabpanel"
        id="xp-tabpanel"
        aria-labelledby={`xp-tab-${selected}`}
        key={selected}
      >
        <div className="xp-heading">
          <h3>
            {job.role}
            {job.current && <span className="xp-current">Current</span>}
          </h3>
          <span className="xp-duration">
            {job.duration ?? durationSince(start)}
          </span>
        </div>
        <p className="xp-org">
          {job.org}
          <span className="xp-org-extra">
            <span className="xp-dot">·</span>
            <span className="xp-type">{job.type}</span>
            <span className="xp-dot">·</span>
            <span className="xp-loc">{job.city}</span>
            {job.site && (
              <>
                <span className="xp-dot">·</span>
                <span className="xp-loc">{job.site}</span>
              </>
            )}
            <span className="xp-dot">·</span>
            <span className="xp-loc">
              {start} – {end}
            </span>
          </span>
        </p>
        <p className="xp-headline">{highlightMetrics(job.headline)}</p>
        <div className="tags xp-tags">
          {job.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <ul className="xp-points reveal-in">
          {job.points.map((point) => (
            <li key={point.label}>
              <span className="xp-point-label">{point.label}:</span>{" "}
              {highlightMetrics(point.text)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SectionHead({ name, active }: { name: string; active: boolean }) {
  return (
    <div className="sec-head">
      <div className={"tmux-sep" + (active ? " is-active" : "")}>
        <span className="tmux-sep-rule" aria-hidden="true" />
        <h2 className="tmux-sep-label">
          <span className="tmux-sep-name">{name}</span>
        </h2>
        <span className="tmux-sep-rule" aria-hidden="true" />
      </div>
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

// small visual "artifact" per project, standing in for what each one actually
// produced — a network diagram, a detection dashboard, an intercepted request.
function HomeLabArtifact() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <div className="proj-artifact proj-topology" aria-hidden="true">
      <span className="proj-artifact-label">Service architecture</span>
      <div
        className={"topology-diagram" + (inView ? " diagram-in-view" : "")}
        ref={ref}
      >
        <div className="topo2-node topo2-dns">
          <span className="topo2-title">DNS</span>
          <span className="topo2-chip">DNSSEC</span>
        </div>
        <div className="topo2-node topo2-kerberos">
          <span className="topo2-title">Kerberos</span>
        </div>
        <div className="topo2-node topo2-ldap topo2-node-accent">
          <span className="topo2-title">LDAP</span>
        </div>
        <div className="topo2-node topo2-wordpress">
          <span className="topo2-title">WordPress</span>
          <span className="topo2-sub">TLS · SSO</span>
        </div>
        <span className="topo2-line topo2-line-bracket" />
        <span className="topo2-line topo2-line-stub" />
        <span className="topo2-line topo2-line-ldaps" />
        <span className="topo2-ldaps-label">
          <Lock size={10} /> LDAPS
        </span>
      </div>
    </div>
  );
}

// a Kibana-style detections dashboard — a failed-login histogram, the headline
// stat it produced, and the top indicators the queries actually flagged.
function ElkArtifact() {
  return (
    <div className="proj-artifact proj-elk" aria-hidden="true">
      <span className="proj-artifact-label">Detection findings</span>
      <div className="elk-stat">
        <strong>14</strong>
        <span>affected machines</span>
      </div>
      <table className="elk-table2">
        <thead>
          <tr>
            <th>indicator</th>
            <th>type</th>
            <th>score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>kq3xn8vv2lq.top</td>
            <td>DGA / C2</td>
            <td className="elk-score elk-score-crit">0.97</td>
          </tr>
          <tr>
            <td>185.212.44.19</td>
            <td>beaconing</td>
            <td className="elk-score elk-score-high">0.84</td>
          </tr>
          <tr>
            <td>154.72.31.98</td>
            <td>exfiltration</td>
            <td className="elk-score elk-score-high">0.81</td>
          </tr>
          <tr>
            <td>91.109.7.203</td>
            <td>spoofed CA</td>
            <td className="elk-score elk-score-med">0.79</td>
          </tr>
        </tbody>
      </table>
      <div className="artifact-meta">
        <span className="artifact-meta-label">Log sources</span>
        <div className="artifact-meta-row">
          <span className="artifact-chip">Endpoint logs</span>
          <span className="artifact-chip">DNS logs</span>
          <span className="artifact-chip">NetFlow</span>
          <span className="artifact-chip">SSL logs</span>
        </div>
      </div>
    </div>
  );
}

// the intercepted request pane next to a severity checklist — proof of the
// payload plus how it was triaged, side by side like a real Burp/ZAP view.
function WebAppArtifact() {
  const findings: { name: string; sev: "crit" | "high" | "med" }[] = [
    { name: "SQL Injection", sev: "crit" },
    { name: "Stored / Reflected / DOM XSS", sev: "high" },
    { name: "CSRF", sev: "high" },
    { name: "Clickjacking", sev: "med" },
    { name: "IDOR", sev: "med" },
    { name: "Broken Access Control", sev: "med" },
  ];
  return (
    <div className="proj-artifact proj-webapp" aria-hidden="true">
      <span className="proj-artifact-label">Vulnerability findings</span>
      <ul className="waf-sev-list">
        {findings.map((f) => (
          <li key={f.name}>
            <Check size={11} /> {f.name} <b className={`sev-${f.sev}`}>{f.sev}</b>
          </li>
        ))}
      </ul>
      <div className="artifact-meta">
        <span className="artifact-meta-label">Tools</span>
        <div className="artifact-meta-row">
          <span className="artifact-chip">Burp Suite</span>
          <span className="artifact-chip">OWASP ZAP</span>
          <span className="artifact-chip">SQLMap</span>
        </div>
      </div>
    </div>
  );
}

const projectArtifacts = [HomeLabArtifact, ElkArtifact, WebAppArtifact];

function App() {
  const active = useActiveWindow();
  const { theme, toggle } = useTheme();
  const [aboutRef, aboutInView] = useInView<HTMLElement>();
  const [skillsRef, skillsInView] = useInView<HTMLElement>();
  const [experienceRef, experienceInView] = useInView<HTMLElement>();
  const [certsRef, certsInView] = useInView<HTMLElement>();
  const [projectsRef, projectsInView] = useInView<HTMLElement>();
  const [contactRef, contactInView] = useInView<HTMLElement>();

  return (
    <main>

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
                <span className="sb-win-label">{w.label}</span>
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="sb-theme"
            onClick={toggle}
            aria-label={
              theme === "light"
                ? "Switch to dark theme"
                : "Switch to light theme"
            }
          >
            {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
          </button>
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
            <p className="term-cmd">
              <span className="term-user">hari@kali</span>
              <span className="term-punc">:</span>
              <span className="term-path">~</span>
              <span className="term-punc">$</span> <TypedCommand cmd="whoami" />
            </p>

            <div className="hero-stage">
              <img
                className="term-ascii"
                src={asciiPortrait}
                alt=""
                aria-hidden="true"
              />
              <div className="term-output-main">
                <h1 className="hero-name">
                  Hariharan Vijay Iswaran
                </h1>

                <h2>Security Engineer · Offensive Security</h2>

                <p className="eyebrow">
                  <span className="eyebrow-part">
                    <MapPin className="eyebrow-pin" size={12} strokeWidth={2.5} />
                    Currently in Tempe, Arizona
                  </span>
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
                    Open to security roles
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
            </div>
          </div>

          <section
            id="about"
            ref={aboutRef}
            className={"section shell" + (aboutInView ? " reveal-in" : "")}
          >
            <SectionHead
              name="about"
              active={active === "about"}
            />
            <div className="about-stack">
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
                <div className="edu-list">
                  <div className="edu-item">
                    <h3>M.S. Cybersecurity</h3>
                    <p className="edu-org">
                      University of North Carolina at Charlotte
                    </p>
                    <p className="edu-meta">
                      Aug 2024 – May 2026 ·{" "}
                      <span className="edu-gpa">GPA 3.90 / 4.00</span>
                    </p>
                  </div>

                  <div className="edu-item">
                    <h3>B.Tech, Information Technology</h3>
                    <p className="edu-org">SRM IST, Chennai, TN, India</p>
                    <p className="edu-meta">
                      Sep 2020 – May 2024 ·{" "}
                      <span className="edu-gpa">GPA 8.97 / 10.00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="skills"
            ref={skillsRef}
            className={"section shell" + (skillsInView ? " reveal-in" : "")}
          >
            <SectionHead
              name="skills"
              active={active === "skills"}
            />
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <SkillGroup group={group} key={group.title} />
              ))}
            </div>
          </section>

          <section
            id="experience"
            ref={experienceRef}
            className={
              "section shell" + (experienceInView ? " reveal-in" : "")
            }
          >
            <SectionHead
              name="experience"
              active={active === "experience"}
            />
            <ExperienceTabs jobs={experience} />
          </section>

          <section
            id="certifications"
            ref={certsRef}
            className={"section shell" + (certsInView ? " reveal-in" : "")}
          >
            <SectionHead
              name="certifications"
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

          <section
            id="projects"
            ref={projectsRef}
            className={"section shell" + (projectsInView ? " reveal-in" : "")}
          >
            <SectionHead
              name="projects"
              active={active === "projects"}
            />
            <div className="project-grid">
              {projects.map((project, i) => {
                const Artifact = projectArtifacts[i];
                return (
                  <article className="project-card" key={project.title}>
                    {Artifact && <Artifact />}
                    <div className="project-body">
                      <h3>{project.title}</h3>
                      {Array.isArray(project.description) ? (
                        <ul className="project-desc-list">
                          {project.description.map((line, di) => (
                            <li key={di}>{line}</li>
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
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section
            id="contact"
            ref={contactRef}
            className={
              "contact section shell" + (contactInView ? " reveal-in" : "")
            }
          >
            <SectionHead
              name="contact"
              active={active === "contact"}
            />
            <h2>Let's build something secure.</h2>
            <p>
              Interesting problem, open role, or just want to talk security?{" "}
              <span style={{ whiteSpace: "nowrap" }}>
                <span className="contact-ping">Get in touch</span> — links below.
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
              <span className="term-punc">$</span>{" "}
              <TypedCommand cmd='echo "Thanks for visiting"' />
            </span>
            <span className="footer-copy">
              © {new Date().getFullYear()} Hariharan Vijay Iswaran
            </span>
          </footer>
        </div>
      </div>
    </main>
  );
}

export default App;
