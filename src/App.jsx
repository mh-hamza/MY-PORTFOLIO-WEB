import React from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import TechMarquee from "./components/TechMarquee.jsx";
import AboutMe from "./components/AboutMe.jsx";
import Projects from "./components/Project.jsx";
import Skills from "./components/Skills.jsx";
import DeveloperExtras from "./components/DeveloperExtras.jsx";
import TerminalSection from "./components/TerminalSection.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <TechMarquee />
      <AboutMe />
      <Projects />
      <Skills />
      <DeveloperExtras />
      <TerminalSection />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
