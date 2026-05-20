import { motion } from 'framer-motion'
import { ShieldCheck, GitBranch, Atom } from 'lucide-react'

const REVEAL = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Classical foundations',
    body: 'Production work in symmetric cryptography (AES-GCM, ChaCha20), asymmetric (RSA, ECDSA, ECDH), PKI design, X.509 certificate engineering, HSM and PKCS#11 integration. The foundation everything else builds on.',
    items: [
      'AES-256-GCM',
      'RSA / ECDSA',
      'X.509 / ASN.1',
      'HSM · PKCS#11',
      'Bouncy Castle',
    ],
  },
  {
    icon: GitBranch,
    title: 'Migration engineering',
    body: 'Backward-compatible cryptographic transitions across multi-tenant production systems. HUB-routed phased rollouts. Crypto-agility design. Interoperability without disruption. The discipline that turns algorithm choices into shippable infrastructure.',
    items: [
      'Phased rollouts',
      'Backward compatibility',
      'Crypto-agility',
      'Trust-chain modernization',
      'Zero-downtime migration',
    ],
  },
  {
    icon: Atom,
    title: 'Post-quantum readiness',
    body: 'Benchmarking ML-KEM (FIPS 203) and ML-DSA (FIPS 204) against banking-scale workloads. Hybrid cryptography as the practical migration path. PQC framed as a PKI ecosystem problem, not an algorithm-replacement problem.',
    items: [
      'ML-KEM (FIPS 203)',
      'ML-DSA (FIPS 204)',
      'Hybrid classical + PQC',
      'NIST PQC standards',
      'Quantum-safe PKI',
    ],
  },
]

export default function Cryptography() {
  return (
    <section
      id="crypto"
      className="relative w-full overflow-hidden bg-ink-900 py-32 sm:py-40"
    >
      {/* Ambient orb — slightly warmer position than the work section,
          differentiates this section while staying in the same family */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div
          className="absolute left-[-10%] top-1/4 h-[520px] w-[520px] rounded-full opacity-20 blur-[140px]"
          style={{
            background:
              'radial-gradient(circle at center, rgba(94, 234, 212, 0.10) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div {...REVEAL} className="mb-16 sm:mb-20">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-accent/60" />
            <span className="mono-caption text-accent/90">
              Cryptography &amp; PQC
            </span>
          </div>
          <h2 className="max-w-3xl font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1] tracking-tighter text-bone-100">
            From classical foundations
            <br />
            <span className="text-bone-300">to quantum-safe roadmaps.</span>
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-[15px] leading-relaxed text-bone-300">
            Three threads of cryptographic work, each with production-scale
            grounding and forward-looking design.
          </p>
        </motion.div>

        {/* Three pillar columns */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                {...REVEAL}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col rounded-2xl border border-bone-100/8 bg-ink-700/40 p-7 transition-all duration-300 hover:border-bone-100/15 hover:bg-ink-600/40"
              >
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-bone-100/10 bg-ink-600/50">
                  <Icon
                    size={20}
                    strokeWidth={1.6}
                    className="text-accent"
                  />
                </div>
                <h3 className="font-display text-[1.25rem] font-bold leading-[1.15] tracking-tight text-bone-100">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-bone-300">
                  {pillar.body}
                </p>
                <div className="mt-6 h-px w-full bg-bone-100/8" />
                <ul className="mt-6 space-y-2">
                  {pillar.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[13px] leading-relaxed text-bone-200"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-accent/60"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Anchor pull-quote — single earned-secret moment for this section.
            This is the only earned secret on the homepage (per your spec
            they live inside project modals). It earns its place here because
            the section is *about* this insight. */}
        <motion.blockquote
          {...REVEAL}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-20 border-l-2 border-accent/60 pl-6 sm:pl-8"
        >
          <p className="max-w-4xl font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium italic leading-[1.45] tracking-tight text-bone-100">
            &ldquo;PQC migration is a PKI ecosystem problem, not a
            cryptographic algorithm problem. Getting that question right
            before your organization starts planning is what separates a
            clean migration from an expensive one.&rdquo;
          </p>
          <p className="mono-caption mt-5">From the PQC benchmarking work</p>
        </motion.blockquote>
      </div>
    </section>
  )
}
