import { useRef, useEffect, useState } from "react";

// Add prop types
interface LetterGlitchProps {
  glitchColors?: string[];
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
}

const ACCENT_COLOR = "#a476ff";
const LINES = [
  "$ who am i",
  "sherif_ahmed",
  "$ echo 'Sherif Ahmed'",
  "Sherif Ahmed | CS Student",
  "$ echo 'Education'",
  "Nile University (2022-2026)",
  "$ skills",
  "- Python, C, C++, C#, JavaScript",
  "- Java, SQL, GitHub, Django, .NET",
  "- TypeScript, React, Node.js",
  "- HTML, CSS, Tailwind",
  "$ interests",
  "- Software Engineering, AI",
  "- Problem Solving",
  "$ contact",
  "- Email: s.ahmed2268@nu.edu.eg",
  "- LinkedIn: linkedin.com/in/sherif-ahmed",
  "$ _",
];
const LINE_HEIGHT = 22;
const FONT = "15px 'Fira Mono', 'Consolas', monospace";
const CURSOR_BLINK_SPEED = 500;
const TYPE_SPEED = 22;
const MAX_VISIBLE_LINES = 12;

const DEFAULT_COLORS = ["#a476ff", "#fff", "#5e4491"];

function parseAnsi(line: string) {
  return { text: line, color: line.startsWith("$") ? ACCENT_COLOR : "#fff" };
}

const TerminalOutput = ({
  glitchColors = DEFAULT_COLORS,
  glitchSpeed = 33,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
}: LetterGlitchProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Typing animation
  useEffect(() => {
    if (currentLine >= LINES.length) return;
    if (currentChar < LINES[currentLine].length) {
      const timeout = setTimeout(() => {
        setCurrentChar((c) => c + 1);
      }, TYPE_SPEED);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypedLines((lines) => [...lines, LINES[currentLine]]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [currentChar, currentLine]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), CURSOR_BLINK_SPEED);
    return () => clearInterval(interval);
  }, []);

  // Draw terminal
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();

    // Adjust font and padding based on width
    const isMobile = rect.width < 500;
    const fontSize = isMobile ? "11px" : "15px";
    const leftPad = isMobile ? 10 : 24;
    const lineHeight = isMobile ? 17 : 22;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize} 'Fira Mono', 'Consolas', monospace`;
    ctx.textBaseline = "top";
    ctx.fillStyle = "#18181b";
    ctx.fillRect(0, 0, rect.width, rect.height);
    // Draw lines
    const visibleLines = [
      ...typedLines.slice(-MAX_VISIBLE_LINES),
      LINES[currentLine]?.slice(0, currentChar) ?? "",
    ];
    visibleLines.forEach((line, i) => {
      const { text, color } = parseAnsi(line);
      ctx.fillStyle = color;
      ctx.fillText(text, leftPad, 16 + i * lineHeight);
    });
    // Draw cursor
    if (showCursor && currentLine < LINES.length) {
      const before = LINES[currentLine]?.slice(0, currentChar) ?? "";
      const cursorX = leftPad + ctx.measureText(before).width;
      const cursorY = 16 + (visibleLines.length - 1) * lineHeight;
      ctx.fillStyle = ACCENT_COLOR;
      ctx.fillRect(cursorX, cursorY, 8, isMobile ? 14 : 18);
    }
  }, [typedLines, currentLine, currentChar, showCursor]);

  // Responsive
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-[280px] md:h-[330px] bg-[#18181b] overflow-hidden rounded-xl border border-[#a476ff33] shadow-lg">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default TerminalOutput;
