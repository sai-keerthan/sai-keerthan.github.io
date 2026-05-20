import { motion } from 'framer-motion'
import { Github, ArrowUpRight } from 'lucide-react'

const REVEAL = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

export default function PersonalProject() {
  return (
    <section
      id="personal"
      className="relative w-full overflow-hidden bg-ink-800 py-32 sm:py-40"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div {...REVEAL} className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-accent/60" />
            <span className="mono-caption text-accent/90">
              Personal project
            </span>
          </div>
        </motion.div>

        {/* Single feature card — full-width, premium treatment.
            One personal project shown well > multiple shown shallowly. */}
        <motion.div
          {...REVEAL}
          transition={{
            duration: 0.7,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden rounded-3xl border border-bone-100/10 bg-ink-700/40"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: content */}
            <div className="p-8 sm:p-12 lg:col-span-7 lg:p-14">
              <div className="mb-3 flex items-center gap-2">
                <span className="mono-caption text-bone-400">
                  Open source
                </span>
                <span className="text-bone-400">&middot;</span>
                <span className="mono-caption text-bone-400">
                  Java / Bouncy Castle
                </span>
              </div>

              <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.05] tracking-tighter text-bone-100">
                Secure Hybrid
                <br />
                Crypto Engine
              </h3>

              <p className="mt-5 text-[15px] leading-relaxed text-bone-200">
                A practical demonstration of hybrid cryptography &mdash;
                combining classical and post-quantum algorithms in parallel.
                Built to make crypto-agility concrete: the same migration
                pattern I identified in the SFMS PQC benchmarking work,
                implemented as a working prototype.
              </p>

              <div className="mt-8 h-px w-full bg-bone-100/8" />

              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
                <Spec label="Classical" value="RSA · ECDSA · AES-GCM" />
                <Spec label="Post-quantum" value="ML-KEM · ML-DSA" />
                <Spec label="Pattern" value="Hybrid in parallel" />
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="https://github.com/sai-keerthan/secure-hybrid-crypto-engine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-bone-100 px-5 py-2.5 text-[13px] font-medium text-ink-900 transition hover:bg-bone-200"
                >
                  <Github size={15} strokeWidth={2} />
                  View on GitHub
                  <ArrowUpRight size={13} strokeWidth={2} />
                </a>
              </div>
            </div>

            {/* Right: visual treatment.
                A small architectural diagram of the hybrid pattern.
                Pure SVG, scales perfectly, no dependencies. */}
            <div className="relative flex items-center justify-center border-t border-bone-100/8 bg-ink-900/40 p-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-14">
              <HybridDiagram />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Spec({ label, value }) {
  return (
    <div>
      <p className="mono-caption mb-1.5">{label}</p>
      <p className="font-sans text-[13px] text-bone-100">{value}</p>
    </div>
  )
}

/**
 * Small architectural illustration: a "hybrid" cryptographic message
 * showing two parallel cipher tracks merging into one output.
 * Custom SVG — communicates the project's concept at a glance.
 */
function HybridDiagram() {
  return (
    <svg
      viewBox="0 0 320 280"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full max-w-[320px]"
      aria-label="Hybrid cryptography diagram"
    >
      {/* Input node */}
      <g>
        <rect
          x="130"
          y="20"
          width="60"
          height="36"
          rx="8"
          fill="none"
          stroke="rgba(245,245,243,0.25)"
          strokeWidth="1"
        />
        <text
          x="160"
          y="42"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="#d4d4d0"
          letterSpacing="0.05em"
        >
          MESSAGE
        </text>
      </g>

      {/* Branch lines */}
      <path
        d="M 160 56 L 160 80 L 80 80 L 80 110"
        stroke="rgba(94,234,212,0.4)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M 160 56 L 160 80 L 240 80 L 240 110"
        stroke="rgba(94,234,212,0.4)"
        strokeWidth="1"
        fill="none"
      />

      {/* Classical track */}
      <g>
        <rect
          x="30"
          y="110"
          width="100"
          height="50"
          rx="8"
          fill="rgba(245,245,243,0.025)"
          stroke="rgba(245,245,243,0.12)"
          strokeWidth="1"
        />
        <text
          x="80"
          y="130"
          textAnchor="middle"
          fontFamily="Cabinet Grotesk, sans-serif"
          fontSize="11"
          fontWeight="700"
          fill="#f5f5f3"
        >
          Classical
        </text>
        <text
          x="80"
          y="146"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#a3a39d"
          letterSpacing="0.05em"
        >
          RSA / ECDSA
        </text>
      </g>

      {/* PQC track */}
      <g>
        <rect
          x="190"
          y="110"
          width="100"
          height="50"
          rx="8"
          fill="rgba(94,234,212,0.04)"
          stroke="rgba(94,234,212,0.25)"
          strokeWidth="1"
        />
        <text
          x="240"
          y="130"
          textAnchor="middle"
          fontFamily="Cabinet Grotesk, sans-serif"
          fontSize="11"
          fontWeight="700"
          fill="#f5f5f3"
        >
          Post-quantum
        </text>
        <text
          x="240"
          y="146"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#5eead4"
          letterSpacing="0.05em"
        >
          ML-KEM / ML-DSA
        </text>
      </g>

      {/* Merge lines down */}
      <path
        d="M 80 160 L 80 190 L 160 190 L 160 215"
        stroke="rgba(94,234,212,0.4)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M 240 160 L 240 190 L 160 190 L 160 215"
        stroke="rgba(94,234,212,0.4)"
        strokeWidth="1"
        fill="none"
      />

      {/* Output node — hybrid composite */}
      <g>
        <rect
          x="105"
          y="215"
          width="110"
          height="42"
          rx="8"
          fill="rgba(94,234,212,0.08)"
          stroke="rgba(94,234,212,0.4)"
          strokeWidth="1"
        />
        <text
          x="160"
          y="234"
          textAnchor="middle"
          fontFamily="Cabinet Grotesk, sans-serif"
          fontSize="11"
          fontWeight="700"
          fill="#f5f5f3"
        >
          Hybrid output
        </text>
        <text
          x="160"
          y="248"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#5eead4"
          letterSpacing="0.05em"
        >
          {`{ classical, pqc }`}
        </text>
      </g>

      {/* Small accent dots at junctions */}
      <circle cx="80" cy="80" r="2" fill="#5eead4" />
      <circle cx="240" cy="80" r="2" fill="#5eead4" />
      <circle cx="160" cy="190" r="2" fill="#5eead4" />
    </svg>
  )
}
