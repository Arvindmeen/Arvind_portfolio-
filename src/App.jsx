import { useState } from 'react';
import { useTheme } from './hooks';
import { CompetitionProvider } from './CompetitionContext';
import Navbar from './components/Navbar';
import ScrollProgressBar from './components/ScrollProgressBar';
import MobileMenu from './components/MobileMenu';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Competitions from './components/Competitions';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';

export default function App() {
  const { dark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <CompetitionProvider>
      <ScrollProgressBar />
      <Navbar dark={dark} toggleTheme={toggle} onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} dark={dark} toggleTheme={toggle} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Competitions />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
      <ScrollTop />
    </CompetitionProvider>
  );
}
