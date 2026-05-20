import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'

// Lightweight inline icons for platforms lucide doesn't ship (Medium, Hashnode).
// Kept as components so we can theme them with currentColor.
const MediumIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795H24v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537V7.794L11.31 21.448h-.728L5.42 9.91v7.731c-.052.385.076.774.347 1.052l2.521 3.058v.403H1.135v-.403l2.521-3.058c.27-.279.39-.67.325-1.052V6.887z"/>
  </svg>
)

const HashnodeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 337 337" fill="currentColor" aria-hidden="true">
    <path d="M50.95 121.85l-29.1 29.1c-29.1 29.1-29.1 76.55 0 105.65l29.1 29.1c29.1 29.1 76.55 29.1 105.65 0l29.1-29.1c29.1-29.1 29.1-76.55 0-105.65l-29.1-29.1c-29.1-29.1-76.55-29.1-105.65 0zm117.8-50.65c-44.05 0-79.7 35.65-79.7 79.7s35.65 79.7 79.7 79.7 79.7-35.65 79.7-79.7-35.65-79.7-79.7-79.7zm0 121.65c-23.15 0-41.95-18.8-41.95-41.95s18.8-41.95 41.95-41.95 41.95 18.8 41.95 41.95-18.8 41.95-41.95 41.95z"/>
  </svg>
)

// Editorial-restrained entrance: short distance, soft easing, staggered.
// Motion exists to guide the eye, not to perform.
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.1 + i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Ambient depth — two soft, near-still gradient orbs.
          NOT pulsing or floating. Just atmospheric weight. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div
          className="absolute -left-32 top-1/4 h-[520px] w-[520px] rounded-full opacity-30 blur-[120px]"
          style={{
            background:
              'radial-gradient(circle at center, rgba(94, 234, 212, 0.18) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute right-[-15%] top-[-10%] h-[640px] w-[640px] rounded-full opacity-25 blur-[140px]"
          style={{
            background:
              'radial-gradient(circle at center, rgba(120, 130, 180, 0.22) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Hairline grid — subtle architectural overlay. Like blueprint paper. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Fixed top navigation — pill-shaped, dark glass */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
      >
        <div className="glass-strong flex items-center gap-1 rounded-full px-2 py-2">
          <div className="flex items-center gap-2 px-4 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-display text-[13px] font-bold tracking-tighter text-bone-100">
              SKK
            </span>
          </div>
          <div className="mx-2 h-4 w-px bg-bone-100/10" />
          <NavLink href="#work">Work</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <a
            href="/resume.pdf"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-bone-100 px-4 py-2 text-[13px] font-medium text-ink-900 transition hover:bg-bone-200"
          >
            Résumé
            <ArrowUpRight size={13} strokeWidth={2.25} />
          </a>
        </div>
      </motion.nav>

      {/* Hero content — anchored left, editorial weight */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 sm:px-10 lg:px-16">
        {/* Eyebrow — mono caption, signals the discipline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-10 flex items-center gap-3"
        >
          <div className="h-px w-10 bg-accent/60" />
          <span className="mono-caption text-accent/90">
            Cryptographic Infrastructure Engineer
          </span>
        </motion.div>

        {/* Name — large but not theatrical. Confidence through restraint. */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-tightest text-bone-100"
        >
          Sai Keerthan
          <br />
          <span className="text-bone-200">Kasula.</span>
        </motion.h1>

        {/* Positioning statement — the work, not the resume */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-10 max-w-2xl font-sans text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed text-bone-200"
        >
          Building and modernizing the cryptographic trust layer behind
          India&rsquo;s interbank financial messaging.{' '}
          <span className="text-bone-100">
            230+ banks. Production scale. Zero downtime.
          </span>
        </motion.p>

        {/* Domain markers — five specializations, ordered by relevance.
            Will wrap to two lines below ~1366px width — that's expected. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          {[
            'Post-Quantum Readiness',
            'Cryptography',
            'PKI',
            'Digital Certificates',
            'Hardware Security Modules',
          ].map((label, i, arr) => (
            <div key={label} className="flex items-center gap-6">
              <span className="font-sans text-[13px] text-bone-300">
                {label}
              </span>
              {i < arr.length - 1 && (
                <span className="text-bone-400">·</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Primary actions */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-14 flex flex-wrap items-center gap-3"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-bone-100 px-6 py-3 text-[14px] font-medium text-ink-900 transition hover:bg-bone-200"
          >
            View selected work
            <ArrowDownRight
              size={16}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            />
          </a>
          <a
            href="#crypto"
            className="inline-flex items-center gap-2 rounded-full border border-bone-100/15 px-6 py-3 text-[14px] font-medium text-bone-100 transition hover:border-bone-100/30 hover:bg-bone-100/5"
          >
            Cryptography &amp; PQC focus
          </a>
        </motion.div>

        {/* Bottom strip — "currently" marker + social row.
            Earned secrets live inside project detail views, not here. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="absolute bottom-12 left-6 right-6 flex flex-wrap items-end justify-between gap-6 sm:left-10 lg:left-16 lg:right-16"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <div>
              <p className="mono-caption mb-1">Currently</p>
              <p className="text-[14px] text-bone-200">
                Cryptographic systems @ TCS &mdash; SFMS / RBI / IFTAS
              </p>
            </div>
          </div>

          {/* Social row — always-on full brand color.
              Each platform renders in its signature color. */}
          <div className="flex items-center gap-1.5">
            <SocialIcon
              href="https://www.linkedin.com/in/saikeerthankasula/"
              label="LinkedIn"
              color="#0a66c2"
            >
              <Linkedin size={20} strokeWidth={1.75} />
            </SocialIcon>
            <SocialIcon
              href="https://github.com/sai-keerthan"
              label="GitHub"
              color="#ffffff"
            >
              <Github size={20} strokeWidth={1.75} />
            </SocialIcon>
            <SocialIcon
              href="https://medium.com/@kasulakeerthan"
              label="Medium"
              color="#ffffff"
            >
              <MediumIcon size={19} />
            </SocialIcon>
            <SocialIcon
              href="https://keerthankasula.hashnode.dev/"
              label="Hashnode"
              color="#2962ff"
            >
              <HashnodeIcon size={19} />
            </SocialIcon>
            <SocialIcon
              href="mailto:saikeerthan.work@gmail.com"
              label="Email"
              color="#5eead4"
            >
              <Mail size={20} strokeWidth={1.75} />
            </SocialIcon>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="rounded-full px-4 py-2 text-[13px] font-medium text-bone-200 transition hover:bg-bone-100/5 hover:text-bone-100"
    >
      {children}
    </a>
  )
}

function SocialIcon({ href, label, color, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{ color }}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-bone-100/5"
    >
      {children}
    </a>
  )
}
