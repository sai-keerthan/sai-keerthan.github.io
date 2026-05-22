import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'

// Section reveal — same easing as hero. Consistency across sections matters.
const REVEAL = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

export default function SelectedWork() {
  const [activeProject, setActiveProject] = useState(null)

  // Lock body scroll while modal is open — critical for the modal feel.
  // Without this, scrolling the modal scrolls the page underneath.
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeProject])

  // Escape key closes modal — accessibility baseline.
  useEffect(() => {
    if (!activeProject) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveProject(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeProject])

  return (
    <section
      id="work"
      className="relative w-full overflow-hidden bg-ink-900 py-32 sm:py-40"
    >
      {/* Subtle ambient glow on this section — same family as the hero
          but at much lower intensity. Continuity, not duplication. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div
          className="absolute right-[-10%] top-1/3 h-[480px] w-[480px] rounded-full opacity-20 blur-[140px]"
          style={{
            background:
              'radial-gradient(circle at center, rgba(94, 234, 212, 0.10) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Section header — editorial, mirroring the hero's eyebrow pattern */}
        <motion.div {...REVEAL} className="mb-16 sm:mb-20">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-accent/60" />
            <span className="mono-caption text-accent/90">Selected work</span>
          </div>
          <h2 className="max-w-3xl font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1] tracking-tighter text-bone-100">
            Production cryptographic systems
            <br />
            <span className="text-bone-300">at banking scale.</span>
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-[15px] leading-relaxed text-bone-300">
            My top 5 Work Story Cards: spanning migration engineering,
            performance, vulnerability remediation, and post-quantum readiness
            &mdash; shipped across national-scale financial messaging
            infrastructure.
          </p>
        </motion.div>

        {/* Uniform grid: 1 col mobile, 2 col tablet, 3 col desktop.
            Five projects means the bottom row has 2 cards instead of 3,
            which actually reads cleaner than a forced 5-across or 2x3 grid. */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              {...REVEAL}
              transition={{
                duration: 0.7,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setActiveProject(project)}
              className="group relative flex flex-col rounded-2xl border border-bone-100/8 bg-ink-700/40 p-6 text-left transition-all duration-300 hover:border-bone-100/15 hover:bg-ink-600/40 sm:p-7"
              aria-label={`Read full case study for ${project.title}`}
            >
              {/* Index + year/org row */}
              <div className="mb-8 flex items-start justify-between">
                <span className="mono-caption text-bone-400">
                  {project.index}
                </span>
                <span className="mono-caption text-bone-400">
                  {project.year} &middot; {project.org}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-[1.35rem] font-bold leading-[1.1] tracking-tight text-bone-100">
                {project.title}
              </h3>

              {/* One-line positioning — the compressed earned secret */}
              <p className="mt-3 text-[14px] leading-relaxed text-bone-300">
                {project.oneLine}
              </p>

              {/* Hairline separator before metrics */}
              <div className="mt-6 h-px w-full bg-bone-100/8" />

              {/* Metrics — compact, scannable */}
              <ul className="mt-6 space-y-2">
                {project.metrics.map((metric) => (
                  <li
                    key={metric}
                    className="flex items-start gap-2 text-[13px] leading-relaxed text-bone-200"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-accent/60"
                    />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom — read affordance */}
              <div className="mt-8 flex items-center justify-between border-t border-bone-100/8 pt-5">
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium uppercase tracking-wider text-bone-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1.5 text-[12px] font-medium text-bone-300 transition-colors group-hover:text-accent">
                  Read full case
                  <ArrowUpRight
                    size={13}
                    strokeWidth={2}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal — full STAR + earned secret. Lives outside the grid map
          so AnimatePresence can cleanly animate the single active project. */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink-900/85 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${project.id}`}
    >
      <motion.article
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        // Stop click-bubbling so clicking inside modal doesn't close it
        onClick={(e) => e.stopPropagation()}
        className="my-12 w-full max-w-3xl rounded-3xl border border-bone-100/10 bg-ink-800 px-6 py-10 shadow-2xl sm:px-12 sm:py-14"
      >
        {/* Close button — sticky to the top right of modal */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="mono-caption text-bone-400">
                {project.index}
              </span>
              <span className="text-bone-400">&middot;</span>
              <span className="mono-caption text-bone-400">
                {project.year} &middot; {project.org}
              </span>
            </div>
            <h2
              id={`modal-title-${project.id}`}
              className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.05] tracking-tighter text-bone-100"
            >
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="ml-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-bone-100/10 text-bone-300 transition hover:border-bone-100/20 hover:bg-bone-100/5 hover:text-bone-100"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        {/* Earned secret — pull-quote opener, the way the storybank intends.
            Leading the modal with insight, not situation. */}
        <blockquote className="relative border-l-2 border-accent/60 pl-6 sm:pl-8">
          <p className="font-sans text-[17px] italic leading-[1.65] text-bone-200">
            {project.earnedSecret}
          </p>
        </blockquote>

        {/* STAR sections — labeled but quiet. The label is mono caption,
            the content is body prose. Editorial structure, not corporate template. */}
        <div className="mt-10 space-y-9">
          <StarSection label="Situation" body={project.star.situation} />
          <StarSection label="Task" body={project.star.task} />
          <StarSection label="Action" body={project.star.action} />
          <StarSection label="Result" body={project.star.result} />
        </div>

        {/* Tags — full list inside modal (cards show only 2) */}
        <div className="mt-10 border-t border-bone-100/10 pt-8">
          <p className="mono-caption mb-4">Technical scope</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-bone-100/10 bg-bone-100/[0.02] px-3 py-1.5 text-[12px] font-medium text-bone-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Optional external links */}
        {project.links && project.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-bone-100/15 px-4 py-2 text-[13px] font-medium text-bone-100 transition hover:border-accent/40 hover:text-accent"
              >
                {link.label}
                <ArrowUpRight size={13} strokeWidth={2} />
              </a>
            ))}
          </div>
        )}
      </motion.article>
    </motion.div>
  )
}

function StarSection({ label, body }) {
  return (
    <div>
      <p className="mono-caption mb-3">{label}</p>
      <p className="font-sans text-[15px] leading-[1.75] text-bone-200">
        {body}
      </p>
    </div>
  )
}
