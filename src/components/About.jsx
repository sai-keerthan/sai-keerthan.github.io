import { motion } from 'framer-motion'

const REVEAL = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-ink-800 py-32 sm:py-40"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Section header */}
        <motion.div {...REVEAL} className="mb-16 sm:mb-20">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-accent/60" />
            <span className="mono-caption text-accent/90">About</span>
          </div>
        </motion.div>

        {/* Two-column editorial layout.
            Left: large statement.  Right: paragraphs.
            On mobile they stack — left becomes the heading, right the body. */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            {...REVEAL}
            transition={{
              duration: 0.7,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-5"
          >
            <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-[1.05] tracking-tighter text-bone-100">
              I work on the
              <br />
              <span className="text-accent">trust layer</span>
              <br />
              <span className="text-bone-200">of financial systems.</span>
            </h2>
          </motion.div>

          <motion.div
            {...REVEAL}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-6 font-sans text-[16px] leading-[1.75] text-bone-200 lg:col-span-7"
          >
            <p>
              I&rsquo;m a cryptographic infrastructure engineer with ~3.5
              years at Tata Consultancy Services, working on
              national-scale financial messaging infrastructure &mdash; the
              cryptographic backbone used by a financial regulator and 200+
              member institutions for secure cross-institutional communication.
            </p>
            <p>
              My work sits at the intersection of cryptographic engineering,
              PKI infrastructure, and large-scale migration design. I&rsquo;ve
              led the migration from a legacy symmetric cipher to a modern
              authenticated-encryption standard across an entire member
              network, modernized a digital signing service under a major
              Java runtime upgrade with a custom hardware-token integration
              layer, and driven signature-standards compliance across 60+
              independent institutions. I&rsquo;ve also self-initiated
              post-quantum cryptography benchmarking against enterprise-scale
              workloads to put the platform on a quantum-safe roadmap.
            </p>
            <p>
              The thread that connects all of it is the same:{' '}
              <span className="text-bone-100">
                getting the question right before getting the implementation
                right.
              </span>{' '}
              Vulnerability reports describe vulnerability classes, not
              deployments. PQC isn&rsquo;t an algorithm replacement problem
              &mdash; it&rsquo;s a PKI ecosystem problem. Legacy migrations
              aren&rsquo;t code upgrades &mdash; they&rsquo;re modernizations
              of hidden trust assumptions. The infrastructure conclusions
              follow once the framing is right.
            </p>
          </motion.div>
        </div>

        {/* Quick-glance fact strip — supplements the prose with hard data.
            Editorial publications use this pattern to anchor a long-form piece. */}
        <motion.div
          {...REVEAL}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-bone-100/8 pt-12 sm:grid-cols-4"
        >
          <Fact label="Experience" value="~3.5 years" />
          <Fact label="Domain" value="Banking infrastructure" />
          <Fact label="Scale" value="200+ institutions" />
          <Fact label="Based in" value="Hyderabad, India" />
        </motion.div>
      </div>
    </section>
  )
}

function Fact({ label, value }) {
  return (
    <div>
      <p className="mono-caption mb-2">{label}</p>
      <p className="font-display text-[1.25rem] font-bold tracking-tight text-bone-100">
        {value}
      </p>
    </div>
  )
}
