import React, { useState, useEffect } from "react";

const CategoryIcons = {
  "WHO AM I?": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[var(--sec)] opacity-70">
      <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    </svg>
  ),
  "Education": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[var(--sec)] opacity-70">
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13.09L3.74 10.5 12 6.09l8.26 4.41L12 16.09z" />
    </svg>
  ),
  "Experience": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[var(--sec)] opacity-70">
      <path d="M20 6h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4c-1.1 0-2 .9-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8c0-1.1-.9-2-2-2zm-6-2v2h-4V4h4zm6 14H4V8h16v10z" />
    </svg>
  ),
};

const SkillsList = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const skills = {
    "WHO AM I?": [
      "I am a computer science student with a strong interest in software engineering and a passion for solving real-world problems through technology.",
      "I am a quick learner and I am always looking for new challenges and opportunities to grow.",
      "I am a team player and I am always looking for new challenges and opportunities to grow.",
    ],
    "Education": [
      "Bachelor of Science in Computer Science",
      "Nile University ",
      "Oct 2022 - Jun 2026",
    ],
    "Experience": [
      "Junior Teaching Assitant",
      "Nile University -Part Time",
      "Feb 2024 - Apr 2024",
    ],
  };

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <div className="text-left pt-3 md:pt-9">
      <div className="flex flex-col lg:flex-row items-start gap-16">
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-[var(--white)] text-3xl md:text-4xl font-semibold">
              What I do?
            </h3>
            <div className="computer-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                <path d="M4 6H20V16H4V6ZM2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18V4ZM6 8H18V14H6V8ZM8 20H16V22H8V20Z"/>
              </svg>
            </div>
          </div>
          <ul className="space-y-4 mt-4 text-lg">
            {Object.entries(skills).map(([category, items]) => (
              <li key={category} className="w-full">
                <div
                  onClick={() => toggleItem(category)}
                  className="skills-anim-pause md:w-[400px] w-full bg-[#1414149c] rounded-2xl text-left hover:bg-opacity-80 transition-all border border-[var(--white-icon-tr)] cursor-pointer overflow-hidden shadow-glow"
                >
                  <div className="flex items-center gap-3 p-4">
                    {CategoryIcons[category]}
                    <div className="flex items-center gap-2 flex-grow justify-between">
                      <div className="min-w-0 max-w-[200px] md:max-w-none overflow-hidden">
                        <span className="block truncate text-[var(--white)] text-lg">
                          {category}
                        </span>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`w-6 h-6 text-[var(--white)] transform transition-transform flex-shrink-0 ${
                          openItem === category ? "rotate-180" : ""
                        }`}
                      >
                        <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                      </svg>
                    </div>
                  </div>

                  <div
                    className={`transition-all duration-300 px-4 ${
                      openItem === category
                        ? "max-h-[500px] pb-4 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="space-y-2 text-[var(--white-icon)] text-sm">
                      {items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <span className="pl-1">•</span>
                          <li className="pl-3">{item}</li>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Computer Science Animation */}
        <div className="hidden lg:block w-96 h-96 relative">
          <canvas 
            id="cs-animation-canvas" 
            className="w-full h-full"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(164, 118, 255, 0.2))'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsList;
