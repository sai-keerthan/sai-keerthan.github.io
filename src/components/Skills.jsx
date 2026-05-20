import { motion } from 'framer-motion'

const REVEAL = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

// Grouped by category. Each item is searchable plain-text — this is the
// payload ATS systems and LinkedIn Recruiter scrape for keyword match.
// We are deliberately verbose with standards (FIPS 203 / 204, RFC numbers)
// because those are high-value match terms.
const skillGroups = [
  {
    label: 'Cryptography',
    items: [
      'AES-256-GCM',
      'RSA',
      'ECDSA / ECDH',
      'SHA-2 family',
      'PKCS#7',
      'PKCS#11',
      'X.509',
      'ASN.1 encoding',
      'Digital signatures',
      'Bouncy Castle',
      'JCE',
      'OpenSSL',
    ],
  },
  {
    label: 'Post-quantum',
    items: [
      'ML-KEM (FIPS 203)',
      'ML-DSA (FIPS 204)',
      'Hybrid cryptography',
      'Crypto-agility',
      'NIST PQC standards',
    ],
  },
  {
    label: 'PKI & infrastructure',
    items: [
      'Certificate Authority design',
      'HSM integration',
      'Token management',
      'Trust-chain modernization',
      'Certificate governance',
      'Key lifecycle management',
    ],
  },
  {
    label: 'Languages & frameworks',
    items: [
      'Java (8 / 11 / 17)',
      'Spring Boot',
      'Spring MVC',
      'REST APIs',
      'Maven',
      'JUnit',
    ],
  },
  {
    label: 'Security engineering',
    items: [
      'Vulnerability remediation',
      'CVE analysis',
      'Burp Suite',
      'Threat modeling',
      'Trust-boundary analysis',
      'Secure code review',
    ],
  },
  {
    label: 'Standards',
    items: [
      'RFC 5485',
      'RFC 3279',
      'RFC 5912',
      'FIPS 203',
      'FIPS 204',
      'NIST PQC',
    ],
  },
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden bg-ink-900 py-32 sm:py-40"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div {...REVEAL} className="mb-16 sm:mb-20">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-accent/60" />
            <span className="mono-caption text-accent/90">Technical scope</span>
          </div>
          <h2 className="max-w-3xl font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1] tracking-tighter text-bone-100">
            Tools, standards,
            <br />
            <span className="text-bone-300">and the systems they ship in.</span>
          </h2>
        </motion.div>

        {/* Two-column grid of skill groups.
            Items rendered as quiet text rows, not pills or logos. */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:gap-x-16">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              {...REVEAL}
              transition={{
                duration: 0.7,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-6 bg-accent/40" />
                <p className="mono-caption text-bone-300">{group.label}</p>
              </div>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-[14px] leading-snug text-bone-200"
                  >
                    <span className="mono-caption text-bone-400">&middot;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
