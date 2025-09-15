import React from "react";
import "../App.css";
import Micon from "../source/menicon.jpg"

function About() {
  const developers = [
      { name: "Akshat", role: "software developer", img: Micon },
      { name: "Nerandra", role: "Hardware developer", img: Micon },
      { name: "Navidita", role: "solar dept. head", img: Micon },
      { name: "Palak", role: "UI/UX Designer & developer", img: Micon },
      { name: "Rounak Agarwal", role: "Wind mill dept. head", img: Micon },
      { name: "Rudrashish", role: "Developer", img: Micon },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-serif">
        
        {/* About Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center border-b border-gray-300">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 tracking-wide">
            About Us
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            We are a passionate team of engineers, developers, and innovators
            working towards one common goal: to bring sustainable energy
            solutions to rural communities. Our focus lies in combining
            cutting-edge Internet of Things (IoT) technology, renewable energy
            resources, and advanced analytics to build smarter, more resilient
            microgrids.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Through our project, we aim to empower rural areas with tools that
            not only improve efficiency but also provide independence in energy
            management. By offering real-time monitoring, predictive analytics,
            and easy-to-use platforms, we ensure that communities can manage
            energy better — with fewer outages and more savings.
          </p>
        </section>

        {/* Our Story Section */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-b border-gray-300">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 underline underline-offset-8">
            Our Story
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              The journey began with a simple observation — rural areas often
              face frequent power cuts, inefficient energy usage, and lack of
              transparency in energy distribution. Inspired by these challenges,
              we started brainstorming ways to make energy smarter, cleaner, and
              more reliable.
            </p>
            <p>
              What started as a small research idea soon evolved into a
              full-fledged project. We combined our diverse expertise in{" "}
              <span className="font-semibold">IoT hardware, software
              development, renewable energy systems, and cloud infrastructure</span> 
              to design a solution that could actually make a difference in
              people’s lives.
            </p>
            <p>
              Today, our project stands as a prototype that not only monitors
              energy but also predicts faults, optimizes distribution, and
              engages local communities in managing their resources effectively.
            </p>
          </div>
        </section>

        {/* Developer Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 underline underline-offset-8">
            Meet Our Developers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {developers.map((dev, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 text-center hover:shadow-md transition"
              >
                <img
                  src={dev.img}
                  alt={dev.name}
                  className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border border-gray-400"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {dev.name}
                </h3>
                <p className="text-gray-600 italic">{dev.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Looking Ahead
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our vision goes beyond just energy monitoring — we dream of
            building smarter, greener, and more connected communities. With the
            right support and collaboration, we believe this project can scale
            across multiple regions, improving lives and driving sustainable
            development.
          </p>
        </section>
      </div>
    </>
  );
}

export default About;
