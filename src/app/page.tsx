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
import dbConnect from "../lib/db";
import Content from "../models/Content";

// Server-side database query helper
async function getSiteContent() {
  try {
    await dbConnect();
    const doc = await Content.findOne().lean();
    if (doc) {
      // Serialize Mongoose ObjectIds / dates for Next.js JSON compatibility
      return JSON.parse(JSON.stringify(doc));
    }
    return null;
  } catch (error) {
    console.error("Mongoose server-side fetch failed, using frontend localizations fallback.", error);
    return null;
  }
}

export default async function Home() {
  const dbContent = await getSiteContent();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Dynamic Header */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Fullscreen Hero Cover */}
        <Hero content={dbContent?.hero} />

        {/* Institutional Section */}
        <AboutUs />

        {/* Services Showcase */}
        <Services content={dbContent?.services} />

        {/* Why Choose Us Values Grid */}
        <WhyChooseUs />

        {/* Animated Metrics Counters */}
        <Stats />

        {/* Strategic Projects Portfolio */}
        <Projects content={dbContent?.projects} />

        {/* Environmental, Social & Governance Commitments */}
        <ESG />

        {/* Strategic Corporate Partners Ticker */}
        <Partners />

        {/* Media & News Press Releases */}
        <News content={dbContent?.news} />

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
