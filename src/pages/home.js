
import React, { useState, useEffect } from "react";
import video1 from "../source/solarv1.mp4"
import Btnav from "../component/bottomnav";


function Home() {
  const texts = [
    "Smart Observation & Localized Analytics for Rural grids",
    "Empowering communities with IoT-driven microgrids",
    "Reliable energy monitoring for sustainable villages",
    "Harnessing solar power with smart insights"
  ];

  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(120); // typing/deleting speed

  useEffect(() => {
    const currentText = texts[textIndex];

    let typingTimeout;

    if (!isDeleting) {
      // Typing forward
      if (displayedText.length < currentText.length) {
        typingTimeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, speed);
      } else {
        // Pause at full sentence
        typingTimeout = setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      // Deleting backward
      if (displayedText.length > 0) {
        typingTimeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length - 1));
        }, speed / 2); // faster delete
      } else {
        // Move to next sentence
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(typingTimeout);
  }, [displayedText, isDeleting, textIndex, texts, speed]);


  return (
    <>
        <header className="relative h-screen w-full">
  {/* Video Background */}
  <video
    src={video1}
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover sm:object-center md:object-cover filter brightness-50 -z-10"
  />

  {/* Overlay gradient for better readability */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60 -z-5"></div>

  {/* Centered Hero Content */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-0 space-y-6">
    <div className="flex flex-wrap justify-center text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-wider space-x-3 md:space-x-6">
      {["S", "O", "L", "A", "R"].map((letter, i) => (
        <span
          key={i}
          className="hover:text-green-400 transition-colors duration-300 cursor-pointer"
        >
          {letter}
          {i < 4 && <span className="text-white">.</span>}
        </span>
      ))}
    </div>

    <p className="text-sm sm:text-lg md:text-xl text-white max-w-3xl font-medium">
      {displayedText}
      <span className="animate-pulse">|</span>
    </p>
  </div>
</header>

<Btnav />

<main className="max-w-5xl mx-auto p-6 space-y-8">
  {/* Project Description */}
  <section className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-2xl font-semibold mb-3">Project Description</h2>
    <p className="text-gray-700 leading-relaxed">
      Develop an IoT-based monitoring system for solar or wind microgrids in rural areas, providing
      real-time data on energy generation, storage, and consumption. The system should include
      remote sensors and gateway devices that stream telemetry to a cloud backend where analytics
      and rules run. Users receive alerts (SMS/push/email) for inefficiencies, faults, or scheduled
      maintenance needs, enabling faster response and better uptime for community microgrids.
    </p>
  </section>

  {/* Expected Outcome */}
  <section className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-2xl font-semibold mb-3">Expected Outcome</h2>
    <p className="text-gray-700 leading-relaxed mb-3">
      A hardware–software prototype that demonstrably improves microgrid efficiency by <strong>~15%</strong>.
      The prototype includes:
    </p>
    <ul className="list-disc list-inside text-gray-700 space-y-2">
      <li>Realtime dashboards showing generation, battery state-of-charge, and consumption.</li>
      <li>Automated alerts for performance drops, battery under/over-charge, or inverter faults.</li>
      <li>A mobile-friendly app for community operators to manage energy distribution and view alerts.</li>
    </ul>
  </section>

  {/* Technical Feasibility */}
  <section className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-2xl font-semibold mb-3">Technical Feasibility</h2>
    <p className="text-gray-700 leading-relaxed mb-3">
      The solution uses affordable, widely available IoT hardware and cloud services:
    </p>
    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-3">
      <li>Edge devices: Raspberry Pi or Arduino with appropriate ADCs/CT sensors.</li>
      <li>Connectivity: Wi-Fi, LoRaWAN, or GSM gateways depending on site connectivity.</li>
      <li>Cloud & analytics: Stream processing via AWS IoT / Azure IoT or open-source stack.</li>
      <li>Mobile app & alerts: Lightweight PWA or native wrapper for community operators.</li>
    </ul>
    <p className="text-sm text-gray-600">
      Compatible with many existing microgrid setups; can be rolled out incrementally.
    </p>
  </section>

  {/* Next Steps */}
  <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 text-gray-800">
    <h3 className="text-xl font-medium mb-2">Next steps (prototype)</h3>
    <ol className="list-decimal list-inside space-y-2">
      <li>Build sensor rig (voltage/current/temperature) and a gateway prototype.</li>
      <li>Implement simple MQTT pipeline to a cloud topic and store telemetry.</li>
      <li>Create a dashboard for realtime metrics and a mobile PWA for alerts.</li>
      <li>Run a field trial and measure efficiency gains vs baseline.</li>
    </ol>
  </section>
</main>
    </>
  )
}
export default Home;