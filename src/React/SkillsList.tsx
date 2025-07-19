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

  // Animation colors
  const CS_COLORS = {
    primary: "#a476ff",
    secondary: "#6ee7b7",
    accent: "#f43f5e",
    white: "#ffffff",
    dark: "#2a1b3d"
  };

  useEffect(() => {
    const canvas = document.getElementById("cs-animation-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let t = 0;
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let isMouseOver = false;
    canvas.width = 500;
    canvas.height = 500;

    // Mouse event listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Simple color scheme
    const COLORS = {
      primary: "#a476ff",
      secondary: "#6ee7b7",
      accent: "#f43f5e",
      text: "#ffffff",
      dark: "#1a1a1a"
    };

    function drawCodeEditor(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
      ctx.save();
      ctx.translate(x, y);
      
      // Editor background - bigger size
      ctx.fillStyle = COLORS.dark;
      ctx.fillRect(-80, -50, 160, 100);
      
      // Title bar - bigger size
      ctx.fillStyle = COLORS.primary;
      ctx.fillRect(-80, -50, 160, 20);
      
      // Code lines
      ctx.fillStyle = COLORS.text;
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      
      const codeLines = [
        'function solve() {',
        '',
        '  const result = "Sherif";',
        '  return result;',
        '}',
        
        'const mouse = {',
        `  x: ${Math.floor(mouseX)},`,
        `  y: ${Math.floor(mouseY)}`,
        '};'
      ];
      
      codeLines.forEach((line, i) => {
        let color = COLORS.text;
        let alpha = 0.8;
        
        // Highlight current line based on mouse position
        if (isMouseOver && Math.abs(mouseY - (y - 40 + i * 10)) < 8) {
          color = COLORS.secondary;
          alpha = 1;
          ctx.fillStyle = COLORS.primary;
          ctx.fillRect(-78, -48 + i * 10, 156, 10);
        }
        
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fillText(line, -75, -40 + i * 10);
      });
      
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    function drawTerminal(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
      ctx.save();
      ctx.translate(x, y);
      
      // Terminal background - bigger size
      ctx.fillStyle = COLORS.dark;
      ctx.fillRect(-70, -40, 140, 80);
      
      // Terminal header - bigger size
      ctx.fillStyle = COLORS.accent;
      ctx.fillRect(-70, -40, 140, 15);
      
      // Terminal content
      ctx.fillStyle = COLORS.secondary;
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      
      const terminalLines = [
        '$ whoami',
        'sherif_ahmed',
        '$ pwd',
        '/home/developer',
        '$ ls -la',
        'drwxr-xr-x  projects',
        'drwxr-xr-x  skills',
        
      ];
      
      terminalLines.forEach((line, i) => {
        const alpha = Math.sin(t + i * 0.5) * 0.2 + 0.8;
        ctx.globalAlpha = alpha;
        ctx.fillText(line, -65, -25 + i * 10);
      });
      
      // Cursor blink
      if (Math.sin(t * 4) > 0) {
        ctx.fillStyle = COLORS.secondary;
        ctx.fillRect(-65 + 8 * 7, -25 + 7 * 10, 2, 10);
      }
      
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    function drawMouseTrail(ctx: CanvasRenderingContext2D, t: number) {
      if (!isMouseOver) return;
      
      // Mouse cursor
      ctx.save();
      ctx.strokeStyle = COLORS.primary;
      ctx.lineWidth = 2;
      ctx.shadowColor = COLORS.primary;
      ctx.shadowBlur = 10;
      
      // Cross cursor
      ctx.beginPath();
      ctx.moveTo(mouseX - 8, mouseY);
      ctx.lineTo(mouseX + 8, mouseY);
      ctx.moveTo(mouseX, mouseY - 8);
      ctx.lineTo(mouseX, mouseY + 8);
      ctx.stroke();
      
      // Circle around cursor
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 15, 0, 2 * Math.PI);
      ctx.strokeStyle = COLORS.secondary;
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      
      ctx.restore();
    }

    function drawCodeBlocks(ctx: CanvasRenderingContext2D, t: number) {
      const blocks = [
        { x: 80, y: 120, type: 'function', color: COLORS.primary },
        { x: 420, y: 180, type: 'class', color: COLORS.secondary },
        { x: 120, y: 420, type: 'variable', color: COLORS.accent }
      ];
      
      blocks.forEach((block, i) => {
        ctx.save();
        ctx.translate(block.x, block.y);
        
        const pulse = Math.sin(t + i) * 0.2 + 0.8;
        const hoverEffect = isMouseOver ? 
          Math.max(0, 1 - Math.sqrt((mouseX - block.x) ** 2 + (mouseY - block.y) ** 2) / 40) : 0;
        
        ctx.scale(pulse + hoverEffect * 0.2, pulse + hoverEffect * 0.2);
        ctx.globalAlpha = 0.8 + hoverEffect * 0.2;
        
        // Block background - bigger size
        ctx.fillStyle = COLORS.dark;
        ctx.fillRect(-30, -20, 60, 40);
        
        // Block border - bigger size
        ctx.strokeStyle = block.color;
        ctx.lineWidth = 3;
        ctx.shadowColor = block.color;
        ctx.shadowBlur = 5 + hoverEffect * 10;
        ctx.strokeRect(-30, -20, 60, 40);
        
        // Block content - bigger font
        ctx.fillStyle = block.color;
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(block.type, 0, 0);
        
        ctx.restore();
      });
    }

    function drawConnectionLines(ctx: CanvasRenderingContext2D, t: number) {
      ctx.strokeStyle = COLORS.primary;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.4;
      ctx.shadowColor = COLORS.primary;
      ctx.shadowBlur = 3;
      
      // Connect code blocks
      const points = [
        { x: 250, y: 250 }, // Center
        { x: 80, y: 120 },
        { x: 420, y: 180 },
        { x: 120, y: 420 }
      ];
      
      for(let i = 1; i < points.length; i++) {
        const alpha = Math.sin(t + i) * 0.2 + 0.4;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // No background - completely transparent
      
      drawConnectionLines(ctx, t);
      drawCodeEditor(ctx, 250, 250, t);
      drawTerminal(ctx, 250, 150, t);
      drawCodeBlocks(ctx, t);
      drawMouseTrail(ctx, t);
      
      t += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []); // Empty dependency array: runs once on mount

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
        <div className="hidden lg:block w-[500px] h-[500px] relative ml-16">
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
