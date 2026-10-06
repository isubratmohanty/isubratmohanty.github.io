import GridBackground from './components/GridBackground';
import CursorGlow from './components/CursorGlow';
import ScrollProgress from './components/ScrollProgress';
import CommandPalette from './components/CommandPalette';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import EnvironmentDashboard from './components/EnvironmentDashboard';
import AIAchievements from './components/AIAchievements';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import './App.css';

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <GridBackground />
      <CursorGlow />
      <ScrollProgress />
      <CommandPalette />
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Skills />
        <AIAchievements />
        <EnvironmentDashboard />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
