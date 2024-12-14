import React from "react";
import Header from "./components/Header";
import Projects from "./components/Project";
import Skills from "./components/Skills";
import Hero from "./components/Hero";
import AboutMe from "./components/Aboutme";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


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
