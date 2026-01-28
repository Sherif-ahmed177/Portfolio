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

  useEffect(() => {
    const canvas = document.getElementById("cs-animation-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let time = 0;
    const dpr = window.devicePixelRatio || 1;
    const size = 500;

    // Scale for High DPI
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const mouse = { x: 0, y: 0, active: false };
    const COLORS = {
      primary: "#a476ff",
      secondary: "#6ee7b7",
      accent: "#f43f5e",
      white: "#ffffff",
      dark: "#141414",
      bg: "#1a1a1a"
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => mouse.active = false;

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Data packets that travel along lines
    class DataPacket {
      progress: number;
      speed: number;
      targetIndex: number;
      constructor(targetIndex: number) {
        this.progress = Math.random();
        this.speed = 0.002 + Math.random() * 0.003;
        this.targetIndex = targetIndex;
      }
      draw(ctx: CanvasRenderingContext2D, start: { x: number, y: number }, end: { x: number, y: number }) {
        this.progress += this.speed;
        if (this.progress > 1) this.progress = 0;

        const x = start.x + (end.x - start.x) * this.progress;
        const y = start.y + (end.y - start.y) * this.progress;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.secondary;
        ctx.shadowBlur = 10;
        ctx.shadowColor = COLORS.secondary;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const blocks = [
      { x: 90, y: 70, label: 'function', color: COLORS.primary, packets: [new DataPacket(0), new DataPacket(0)] },
      { x: 410, y: 150, label: 'class', color: COLORS.secondary, packets: [new DataPacket(1), new DataPacket(1)] },
      { x: 100, y: 350, label: 'variable', color: COLORS.accent, packets: [new DataPacket(2), new DataPacket(2)] }
    ];

    function drawWindow(x: number, y: number, w: number, h: number, title: string, content: string[], accent: string, isTerminal = false) {
      ctx.save();
      ctx.translate(x, y);

      // Shadow
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(0,0,0,0.5)';

      // Main Body
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#1a1a1a');
      gradient.addColorStop(1, '#141414');
      ctx.fillStyle = gradient;

      // Rounded Rect
      const r = 12;
      ctx.beginPath();
      ctx.moveTo(-w / 2 + r, -h / 2);
      ctx.lineTo(w / 2 - r, -h / 2);
      ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      ctx.lineTo(w / 2, h / 2 - r);
      ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      ctx.lineTo(-w / 2 + r, h / 2);
      ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
      ctx.lineTo(-w / 2, -h / 2 + r);
      ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
      ctx.fill();

      ctx.shadowBlur = 0;

      // Header
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.moveTo(-w / 2 + r, -h / 2);
      ctx.lineTo(w / 2 - r, -h / 2);
      ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      ctx.lineTo(w / 2, -h / 2 + 25);
      ctx.lineTo(-w / 2, -h / 2 + 25);
      ctx.lineTo(-w / 2, -h / 2 + r);
      ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
      ctx.fill();

      // dots for windows
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(-w / 2 + 15 + i * 12, -h / 2 + 12, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Title
      ctx.fillStyle = isTerminal ? COLORS.dark : COLORS.white;
      ctx.font = 'bold 11px Inter, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(title, 0, -h / 2 + 16);

      // Content
      ctx.textAlign = 'left';
      ctx.font = '11px JetBrains Mono, monospace';
      content.forEach((line, i) => {
        const lineY = -h / 2 + 45 + i * 14;

        // Typing/Scanning effect line highlight
        if (mouse.active && Math.abs(mouse.y - (y + lineY)) < 10) {
          ctx.fillStyle = `${accent}22`;
          ctx.fillRect(-w / 2 + 5, lineY - 10, w - 10, 14);
          ctx.fillStyle = COLORS.secondary;
        } else {
          ctx.fillStyle = isTerminal ? COLORS.secondary : COLORS.white;
          ctx.globalAlpha = 0.8;
        }

        ctx.fillText(line, -w / 2 + 15, lineY);
        ctx.globalAlpha = 1;
      });

      ctx.restore();
    }

    function render() {
      ctx.clearRect(0, 0, size, size);
      time += 0.01;

      const center = { x: 250, y: 240 };

      // 1. Draw connections first
      blocks.forEach((block, i) => {
        const floatX = Math.sin(time + i) * 5;
        const floatY = Math.cos(time + i) * 5;
        const target = { x: block.x + floatX, y: block.y + floatY };

        // Line
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = COLORS.primary;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Data packets
        block.packets.forEach(p => p.draw(ctx, center, target));
      });

      // 2. Draw Code Editor (Bottom Center)
      const editorLines = [
        'function solve() {',
        '  const name = "Sherif";',
        '  let skills = ["Logic", "Code"];',
        '  return skills.map(s => solve(s));',
        '}',
        '',
        'const mouse = {',
        `  x: ${Math.floor(mouse.x)},`,
        `  y: ${Math.floor(mouse.y)}`,
        '};'
      ];
      drawWindow(250, 240, 260, 180, 'EDITOR.tsx', editorLines, COLORS.primary);

      // 3. Draw Terminal (Top Center)
      const termLines = [
        '$ whoami',
        'sherif_ahmed',
        '$ pwd',
        '/home/developer',
        '$ ls -la',
        'drwxr-xr-x projects',
        'drwxr-xr-x skills'
      ];
      drawWindow(250, 80, 180, 140, 'BASH', termLines, COLORS.accent, true);

      // 4. Draw Floating Blocks
      blocks.forEach((block, i) => {
        const floatX = Math.sin(time + i) * 5;
        const floatY = Math.cos(time + i) * 5;
        const x = block.x + floatX;
        const y = block.y + floatY;

        ctx.save();
        ctx.translate(x, y);

        const hoverEffect = mouse.active ?
          Math.max(0, 1 - Math.sqrt((mouse.x - x) ** 2 + (mouse.y - y) ** 2) / 60) : 0;

        const s = 1 + hoverEffect * 0.1;
        ctx.scale(s, s);

        // Box
        ctx.fillStyle = COLORS.dark;
        ctx.shadowBlur = 10;
        ctx.shadowColor = block.color;
        ctx.strokeStyle = block.color;
        ctx.lineWidth = 2;

        const bw = 60, bh = 34;
        ctx.beginPath();
        ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 8);
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.shadowBlur = 0;
        ctx.fillStyle = block.color;
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(block.label, 0, 4);

        ctx.restore();
      });

      rafId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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
      <div className="flex flex-col lg:flex-row items-start gap-24">
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-[var(--white)] text-3xl md:text-4xl font-semibold">
              What I do?
            </h3>
            <div className="computer-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                <path d="M4 6H20V16H4V6ZM2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18V4ZM6 8H18V14H6V8ZM8 20H16V22H8V20Z" />
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
                        className={`w-6 h-6 text-[var(--white)] transform transition-transform flex-shrink-0 ${openItem === category ? "rotate-180" : ""
                          }`}
                      >
                        <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                      </svg>
                    </div>
                  </div>

                  <div
                    className={`transition-all duration-300 px-4 ${openItem === category
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
        <div className="hidden lg:block w-[500px] h-[400px] relative ml-16">
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
