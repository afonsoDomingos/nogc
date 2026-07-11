import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import Projects from "../components/Projects";
import ESG from "../components/ESG";
import Stats from "../components/Stats";
import Partners from "../components/Partners";
import News from "../components/News";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Dynamic Header */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Fullscreen Hero Cover */}
        <Hero />

        {/* Institutional Section */}
        <AboutUs />

        {/* Services Showcase */}
        <Services />

        {/* Why Choose Us Values Grid */}
        <WhyChooseUs />

        {/* Animated Metrics Counters */}
        <Stats />

        {/* Strategic Projects Portfolio */}
        <Projects />

        {/* Environmental, Social & Governance Commitments */}
        <ESG />

        {/* Strategic Corporate Partners Ticker */}
        <Partners />

        {/* Media & News Press Releases */}
        <News />

        {/* Interactive Contact Form */}
        <Contact />
      </main>

      {/* Corporate Footnotes and Contact Directory */}
      <Footer />

      {/* Scroll back to top trigger */}
      <ScrollToTop />
    </div>
  );
}
