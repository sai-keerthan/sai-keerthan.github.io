import Hero from './components/Hero'
import SelectedWork from './components/SelectedWork'
import About from './components/About'
import Cryptography from './components/Cryptography'
import PersonalProject from './components/PersonalProject'
import Skills from './components/Skills'
import Recognition from './components/Recognition'
import Contact from './components/Contact'

export default function App() {
  return (
    <main className="relative">
      <Hero />
      <SelectedWork />
      <About />
      <Cryptography />
      <PersonalProject />
      <Skills />
      <Recognition />
      <Contact />
    </main>
  )
}
