import React from "react";
import Header from "./components/Header.jsx";
import Projects from "./components/Project.jsx";
import Skills from "./components/Skills.jsx";
import Hero from "./components/Hero.jsx";
import AboutMe from "./components/AboutMe.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";


function App() {
  return (
    <>
      <Header />
      <Hero />
      <AboutMe />
      <Projects />
      <Skills />
      <Contact/>
      <Footer/>
    </>
  );
}

export default App;
