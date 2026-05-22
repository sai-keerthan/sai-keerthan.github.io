import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

const REVEAL = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

const awards = [
  {
    title: 'TCS Beyond Excellence Award',
    issuer: 'Tata Consultancy Services',
    year: '2024',
    citation:
      'For leading the migration of a national financial messaging platform from a legacy symmetric cipher to a modern authenticated-encryption standard across 200+ member institutions with zero operational disruption.',
  },
]

export default function Recognition() {
  return (
    <section
      id="recognition"
      className="relative w-full overflow-hidden bg-ink-800 py-32 sm:py-40"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div {...REVEAL} className="mb-16 sm:mb-20">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-accent/60" />
            <span className="mono-caption text-accent/90">Recognition</span>
          </div>
          <h2 className="max-w-3xl font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1] tracking-tighter text-bone-100">
            Awards for production
            <br />
            <span className="text-bone-300">cryptographic work.</span>
          </h2>
        </motion.div>

        <div className="mx-auto max-w-2xl">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              {...REVEAL}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col rounded-2xl border border-bone-100/8 bg-ink-700/40 p-8 transition-all duration-300 hover:border-bone-100/15 hover:bg-ink-600/40 sm:p-10"
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-bone-100/10 bg-ink-600/50">
                  <Award
                    size={20}
                    strokeWidth={1.6}
                    className="text-accent"
                  />
                </div>
                <span className="mono-caption text-bone-400">
                  {award.year}
                </span>
              </div>

              <h3 className="font-display text-[1.35rem] font-bold leading-[1.15] tracking-tight text-bone-100">
                {award.title}
              </h3>
              <p className="mono-caption mt-2">{award.issuer}</p>

              <div className="my-6 h-px w-full bg-bone-100/8" />

              <p className="text-[14px] leading-relaxed text-bone-200">
                {award.citation}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
