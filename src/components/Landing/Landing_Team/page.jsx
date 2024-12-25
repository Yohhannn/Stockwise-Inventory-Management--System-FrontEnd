import React from 'react';

import Footer from '../../Layout/HF_Layout/Footer';
import Header from '../../Layout/HF_Layout/Header';

const TeamPage = () => {
  return (
    <>
    <Header></Header>
    <div className="bg-gray-200 min-h-screen">

{/* Hero Section */}
<div
  className="bg-green-700 text-white py-24 text-center bg-cover bg-center"
  style={{ backgroundImage: "url('landing_assets/team_bg.svg')" }}
>
  <div className="container mx-auto px-6">
    <h1 className="text-4xl font-bold mb-4">Meet the Black Mavericks</h1>
    <p className="text-lg max-w-3xl mx-auto">
      Discover the minds behind STOCKWISE. Our team is committed to delivering exceptional stock management solutions.
    </p>
  </div>
</div>

<div className="max-w-8xl mx-auto 2xl:max-w-7xl bg-white shadow-lg rounded-lg p-6">
<div className="container mx-auto px-6 py-10">
  {/* Team Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {/* Card 1: School */}
    <div className="bg-green-900 shadow-lg rounded-lg overflow-hidden">
      <a href="https://www.ctu.edu.ph/" target='_blank'>
      <img
        src="/landing_assets/team/ctulogoicon.png"
        alt="CTU - Cebu Technological University"
        className="w-full h-auto scale-75 transform duration-300 hover:scale-90 hover:opacity-75"
      />
      </a>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-green-200 text-center opacity-70">Main Campus</h3>
        <h3 className="text-lg font-bold text-white mb-2">Cebu Technological University</h3>
        <p className="text-white opacity-80 text-sm">
        CTU-Main fosters innovation, creativity, and excellence, empowering students to drive STOCKWISE in revolutionizing stock management.
        </p>
      </div>
    </div>

    {/* Card 2: Joehanes Lauglaug */}
    <div className="bg-green-700 shadow-lg rounded-lg overflow-hidden">
      <img
        src="/landing_assets/team/lauglaug.png"
        alt="Joehanes Lauglaug"
        className="w-full h-auto object-cover opacity-70 scale-75 rounded-full transform duration-500 hover:scale-100 hover:rounded-none hover:opacity-80"
      />
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2">Joehanes Lauglaug</h3>
        <p className="text-white opacity-80">
        A dedicated technologist driving innovation with expertise in coding, streaming, and collaborative projects.
        </p>
      </div>
    </div>

    {/* Card 3: John Paul Mahilom */}
    <div className="bg-green-700 shadow-lg rounded-lg overflow-hidden">
      <img
        src="/landing_assets/team/mahilom.png"
        alt="John Paul Mahilom"
        className="w-full h-auto object-cover opacity-70 scale-75 rounded-full transform duration-500 hover:scale-100 hover:rounded-none hover:opacity-80"
      />
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2">John Paul Mahilom</h3>
        <p className="text-white opacity-80">
        A visionary developer with a passion for creating seamless user experiences and optimizing stock systems.
        </p>
      </div>
    </div>

    {/* Card 4: Ian Jhon Dosdos */}
    <div className="bg-green-700 shadow-lg rounded-lg overflow-hidden">
      <img
        src="/landing_assets/team/dosdos.png"
        alt="Ian Jhon Dosdos"
        className="w-full h-auto object-cover opacity-70 scale-75 rounded-full transform duration-500 hover:scale-100 hover:rounded-none hover:opacity-80"
      />
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2">Ian Jhon Dosdos</h3>
        <p className="text-white opacity-80">
          A tech enthusiast with a knack for system designs and streamlining operations for STOCKWISE.
        </p>
      </div>
    </div>

    {/* Card 5: Raymund Abella */}
    <div className="bg-green-700 shadow-lg rounded-lg overflow-hidden">
      <img
        src="/landing_assets/team/abella.png"
        alt="Raymund Abella"
        className="w-full h-auto object-cover opacity-70 scale-75 rounded-full transform duration-500 hover:scale-100 hover:rounded-none hover:opacity-80"
      />
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2">Raymund Abella</h3>
        <p className="text-white opacity-80">
          A problem-solver with expertise in analytics, empowering STOCKWISE to deliver data-driven insights.
        </p>
      </div>
    </div>

    {/* Card 6: Roberto Vender */}
    <div className="bg-green-700 shadow-lg rounded-lg overflow-hidden">
      <img
        src="/landing_assets/team/vender.png"
        alt="Roberto Vender"
        className="w-full h-auto object-cover opacity-70 scale-75 rounded-full transform duration-500 hover:scale-100 hover:rounded-none hover:opacity-80"
      />
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2">Roberto Vender</h3>
        <p className="text-white opacity-80">
          A creative thinker focused on improving STOCKWISE's scalability and multi-device accessibility.
        </p>
      </div>
    </div>

  </div>
</div>
</div>
</div>
<Footer></Footer>
    </>
  );
};

export default TeamPage;
