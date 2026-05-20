import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, ArrowUpRight } from 'lucide-react'

const REVEAL = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

// Inline brand icons for platforms lucide doesn't ship
const MediumIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795H24v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537V7.794L11.31 21.448h-.728L5.42 9.91v7.731c-.052.385.076.774.347 1.052l2.521 3.058v.403H1.135v-.403l2.521-3.058c.27-.279.39-.67.325-1.052V6.887z" />
  </svg>
)

const HashnodeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 337 337" fill="currentColor" aria-hidden="true">
    <path d="M50.95 121.85l-29.1 29.1c-29.1 29.1-29.1 76.55 0 105.65l29.1 29.1c29.1 29.1 76.55 29.1 105.65 0l29.1-29.1c29.1-29.1 29.1-76.55 0-105.65l-29.1-29.1c-29.1-29.1-76.55-29.1-105.65 0zm117.8-50.65c-44.05 0-79.7 35.65-79.7 79.7s35.65 79.7 79.7 79.7 79.7-35.65 79.7-79.7-35.65-79.7-79.7-79.7zm0 121.65c-23.15 0-41.95-18.8-41.95-41.95s18.8-41.95 41.95-41.95 41.95 18.8 41.95 41.95-18.8 41.95-41.95 41.95z" />
  </svg>
)

const channels = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    handle: 'in/saikeerthankasula',
    href: 'https://www.linkedin.com/in/saikeerthankasula/',
    note: 'Primary professional contact',
    color: '#0a66c2',
  },
  {
    icon: Github,
    label: 'GitHub',
    handle: 'sai-keerthan',
    href: 'https://github.com/sai-keerthan',
    note: 'Code, experiments, SHCE',
    color: '#ffffff',
  },
  {
    icon: Mail,
    label: 'Email',
    handle: 'saikeerthan.work@gmail.com',
    href: 'mailto:saikeerthan.work@gmail.com',
    note: 'For direct inquiries',
    color: '#5eead4',
  },
  {
    icon: MediumIcon,
    label: 'Medium',
    handle: '@kasulakeerthan',
    href: 'https://medium.com/@kasulakeerthan',
    note: 'Explore my Technical Analysis and Research Work and More',
    color: '#ffffff',
  },
  {
    icon: HashnodeIcon,
    label: 'Hashnode',
    handle: 'keerthankasula.hashnode.dev',
    href: 'https://keerthankasula.hashnode.dev/',
    note: 'Explore my Technical Blogs, Code Work, and More',
    color: '#2962ff',
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-ink-900 pb-20 pt-32 sm:pb-24 sm:pt-40"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[140px]"
          style={{
            background:
              'radial-gradient(circle at center, rgba(94, 234, 212, 0.18) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div {...REVEAL} className="mb-16 sm:mb-20">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-accent/60" />
            <span className="mono-caption text-accent/90">Contact</span>
          </div>
          <h2 className="max-w-4xl font-display text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1] tracking-tighter text-bone-100">
            Building cryptographic
            <br />
            infrastructure?
            <br />
            <span className="text-bone-300">Let&rsquo;s talk.</span>
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-[16px] leading-relaxed text-bone-300">
            Open to roles in cryptography engineering, PKI infrastructure,
            security modernization, and post-quantum readiness. Especially
            interested in production-scale systems where the trust foundation
            actually matters.
          </p>
        </motion.div>

        {/* Channel list — editorial, not a wall of cards */}
        <motion.div
          {...REVEAL}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="rounded-2xl border border-bone-100/8 bg-ink-700/30 backdrop-blur-sm"
        >
          {channels.map((channel, i) => {
            const Icon = channel.icon
            return (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  channel.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                className={`group flex items-center gap-5 px-6 py-5 transition-colors hover:bg-bone-100/[0.02] sm:px-8 sm:py-6 ${
                  i !== channels.length - 1
                    ? 'border-b border-bone-100/8'
                    : ''
                }`}
              >
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                  style={{ color: channel.color }}
                >
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-x-3 gap-y-0.5 sm:flex-row sm:items-baseline">
                    <p className="font-display text-[1rem] font-bold tracking-tight text-bone-100">
                      {channel.label}
                    </p>
                    <p className="truncate font-sans text-[13px] text-bone-300">
                      {channel.handle}
                    </p>
                  </div>
                  <p className="mt-0.5 text-[12px] text-bone-400">
                    {channel.note}
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.75}
                  className="flex-shrink-0 text-bone-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bone-100"
                />
              </a>
            )
          })}
        </motion.div>

        {/* Résumé CTA */}
        <motion.div
          {...REVEAL}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-bone-100 px-6 py-3 text-[14px] font-medium text-ink-900 transition hover:bg-bone-200"
          >
            Download résumé
            <ArrowUpRight size={15} strokeWidth={2} />
          </a>
          <p className="text-[13px] text-bone-400">
            PDF &middot; Updated regularly
          </p>
        </motion.div>

        {/* Footer */}
        <div className="mt-32 border-t border-bone-100/8 pt-10">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-display text-[13px] font-bold tracking-tighter text-bone-200">
                SKK
              </span>
              <span className="ml-2 text-[12px] text-bone-400">
                Sai Keerthan Kasula
              </span>
            </div>
            <p className="font-sans text-[12px] text-bone-400">
              Designed and built with care. &copy;{' '}
              {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
