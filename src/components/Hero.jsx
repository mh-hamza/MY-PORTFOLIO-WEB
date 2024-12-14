import React from "react";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

export function Hero() {
  const SocialLink = ({ href, icon: Icon, label }) => (
    <a
      href={href}
      aria-label={label}
      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
    >
      <Icon className="h-6 w-6" />
    </a>
  );

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 bg-gray-50 dark:bg-gray-900"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 " />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ddf1fc]
      via-[#ffffff00]
       to-[#ffffff00] dark:from-[#2177972b]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
        <div className="text-center">
          <div className="space-y-6">
            <h2 className="text-blue-600 dark:text-blue-400 text-lg font-semibold tracking-wide uppercase">
              Welcome to my portfolio
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
              <span className="block">Hi, I'm</span>
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-transparent bg-clip-text">
                Mohammad Hamza
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A passionate MERN Stack Developer crafting beautiful and
              functional web experiences. Specialized in building modern
              applications with MongoDB, Express.js, React.js, and Node.js.
            </p>

            <div className="flex justify-center space-x-6 mt-8">
              <SocialLink
                href="https://github.com"
                icon={Github}
                label="GitHub"
              />
              <SocialLink
                href="https://linkedin.com"
                icon={Linkedin}
                label="LinkedIn"
              />
              <SocialLink
                href="mailto:your.email@example.com"
                icon={Mail}
                label="Email"
              />
            </div>

            <div className="mt-12">
              <a
                href="#about"
                className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                <span>Learn more about me</span>
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
