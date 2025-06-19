import React, { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./i18n";

function App() {
  // Add smooth scrolling behavior
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();
        const id = target.getAttribute("href")?.substring(1);
        const element = document.getElementById(id || "");
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Adjust for header height
            behavior: "smooth",
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-theme text-theme transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
      <Analytics />
    </ThemeProvider>
  );
}

export default App;
