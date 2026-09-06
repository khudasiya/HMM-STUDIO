"use client";

import React, {
  useState,
  useRef,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface Project {
  id: string;
  image: string;
  title: string;
  category?: string;
  description?: string;
  cardNum?: string;
  accentColor?: string;
}

export interface AnimatedFolderProps {
  title: string;
  projects: Project[];
  className?: string;
  subtitle?: string;
  onSelectProject?: (project: Project) => void;
}

export function AnimatedFolder({
  title,
  projects,
  className,
  subtitle,
  onSelectProject,
}: AnimatedFolderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const totalCards = projects.length;

  const handleFolderClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCardNavigate = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectProject?.(project);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center",
        "p-8 sm:p-12 rounded-3xl cursor-pointer",
        "bg-[#0d091a]/80 backdrop-blur-xl border border-purple-500/20",
        "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(245,158,11,0.18)]",
        "hover:border-amber-500/40",
        "group/folder select-none",
        className
      )}
      style={{
        minWidth: "340px",
        minHeight: "480px",
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleFolderClick}
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background: "radial-gradient(circle at 50% 65%, rgba(245, 158, 11, 0.18) 0%, transparent 70%)",
          opacity: isHovered || isOpen ? 1 : 0,
        }}
      />

      {/* ── FOLDER VISUAL (blurs when cards are open) ── */}
      <div
        className="relative flex items-center justify-center mb-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          height: "200px",
          width: "260px",
          transformStyle: "preserve-3d",
          filter: isOpen ? "blur(6px) brightness(0.5)" : "blur(0px) brightness(1)",
          opacity: isOpen ? 0.4 : 1,
        }}
      >
        {/* Folder back layer */}
        <div
          className="absolute w-48 sm:w-56 h-36 sm:h-40 bg-folder-back rounded-xl shadow-xl"
          style={{
            transformOrigin: "bottom center",
            transform: isHovered || isOpen ? "rotateX(-18deg)" : "rotateX(0deg)",
            transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 10,
            willChange: "transform",
          }}
        />

        {/* Folder tab */}
        <div
          className="absolute w-16 sm:w-20 h-6 sm:h-7 bg-folder-tab rounded-t-lg shadow-sm flex items-center justify-center"
          style={{
            top: "calc(50% - 72px - 18px)",
            left: "calc(50% - 100px + 16px)",
            transformOrigin: "bottom center",
            transform: isHovered || isOpen ? "rotateX(-28deg) translateY(-3px)" : "rotateX(0deg)",
            transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 10,
            willChange: "transform",
          }}
        >
          <span className="text-[9px] font-mono font-bold text-amber-950/80 tracking-widest uppercase">
            HMM
          </span>
        </div>

        {/* Hover-preview cards (only when NOT open) */}
        <div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 20,
            transformStyle: "preserve-3d",
          }}
        >
          {projects.map((project, index) => {
            const mid = (totalCards - 1) / 2;
            const offset = index - mid;
            const rotation = offset * (totalCards > 3 ? 7.5 : 12);
            const translationX = offset * (totalCards > 3 ? 42 : 55);
            const translationY = -102 - Math.abs(offset) * 4;
            const showPreview = isHovered && !isOpen;

            return (
              <div
                key={project.id}
                className="absolute w-24 sm:w-28 h-36 sm:h-40 rounded-xl overflow-hidden shadow-2xl bg-card border border-white/10 pointer-events-none"
                style={{
                  transform: showPreview
                    ? `translateY(${translationY}px) translateX(${translationX}px) rotate(${rotation}deg) scale(1)`
                    : "translateY(0px) translateX(0px) rotate(0deg) scale(0.65)",
                  opacity: showPreview ? 1 : 0,
                  transition: showPreview
                    ? `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 40}ms, opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 40}ms`
                    : "transform 400ms cubic-bezier(0.16, 1, 0.3, 1) 0ms, opacity 300ms ease 0ms",
                  zIndex: 20 + Math.round(Math.abs(rotation)),
                  left: "-52px",
                  top: "-70px",
                  willChange: "transform, opacity",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                {project.cardNum && (
                  <span
                    className="absolute top-1.5 right-1.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/75 border border-white/15"
                    style={{ color: project.accentColor || "#f59e0b" }}
                  >
                    {project.cardNum}
                  </span>
                )}
                <div className="absolute bottom-1.5 left-1.5 right-1.5">
                  <p className="text-[10px] font-bold text-white truncate drop-shadow-md">
                    {project.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Folder front layer */}
        <div
          className="absolute w-48 sm:w-56 h-36 sm:h-40 bg-folder-front rounded-xl shadow-2xl"
          style={{
            top: "calc(50% - 72px + 6px)",
            transformOrigin: "bottom center",
            transform: isHovered || isOpen ? "rotateX(26deg) translateY(12px)" : "rotateX(0deg)",
            transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 30,
            willChange: "transform",
          }}
        />

        {/* Folder shine effect */}
        <div
          className="absolute w-48 sm:w-56 h-36 sm:h-40 rounded-xl overflow-hidden pointer-events-none"
          style={{
            top: "calc(50% - 72px + 6px)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.38) 0%, transparent 55%)",
            transformOrigin: "bottom center",
            transform: isHovered || isOpen ? "rotateX(26deg) translateY(12px)" : "rotateX(0deg)",
            transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 31,
            willChange: "transform",
          }}
        />
      </div>

      {/* ── OPENED CARDS OVERLAY: Lined up ON the folder ── */}
      <div
        className="absolute inset-x-[-60%] inset-y-0 flex items-center justify-center z-40 pointer-events-none"
        style={{
          opacity: isOpen ? 1 : 0,
          transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          className="flex items-center justify-center gap-2.5 sm:gap-3 md:gap-4 pointer-events-auto flex-nowrap"
          style={{
            perspective: "800px",
          }}
        >
          {projects.map((project, idx) => {
            const delayMs = idx * 50;
            // Slight 3D tilt per card for depth feel
            const tiltY = (idx - (totalCards - 1) / 2) * 3;

            return (
              <div
                key={project.id}
                onClick={(e) => handleCardNavigate(project, e)}
                className="group/card relative w-24 sm:w-32 md:w-36 h-36 sm:h-44 md:h-52 rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.35)] hover:border-amber-400/80 hover:z-50 hover:scale-110 shrink-0"
                style={{
                  transform: isOpen
                    ? `translateY(0px) scale(1) rotateY(${tiltY}deg)`
                    : "translateY(30px) scale(0.6) rotateY(0deg)",
                  opacity: isOpen ? 1 : 0,
                  transition: isOpen
                    ? `transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, opacity 400ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, box-shadow 300ms ease, border-color 300ms ease`
                    : "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 250ms ease",
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Card Number Badge */}
                <span
                  className="absolute top-2 right-2 text-[9px] sm:text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded bg-black/80 border border-white/15"
                  style={{ color: project.accentColor || "#f59e0b" }}
                >
                  {project.cardNum}
                </span>

                {/* Title + Arrow overlay */}
                <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between gap-1">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs md:text-sm font-bold text-white truncate drop-shadow-md leading-tight">
                      {project.title}
                    </p>
                  </div>
                  <ArrowRight
                    className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 opacity-0 group-hover/card:opacity-100 transition-opacity shrink-0"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Folder title */}
      <h3
        className="text-xl sm:text-2xl font-bold text-white mt-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] tracking-tight text-center"
        style={{
          transform: isHovered || isOpen ? "translateY(3px)" : "translateY(0)",
          opacity: isOpen ? 0.5 : 1,
        }}
      >
        {title}
      </h3>

      {/* Project count */}
      <p
        className="text-xs sm:text-sm text-slate-400 font-mono transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mt-1"
        style={{
          opacity: isOpen ? 0.3 : isHovered ? 0.9 : 0.7,
        }}
      >
        {subtitle || `${projects.length} audio disciplines`}
      </p>

      {/* Hint */}
      <div
        className="mt-4 flex items-center gap-1.5 text-xs text-amber-400/90 font-mono transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: isOpen ? 0.9 : isHovered ? 1 : 0.7,
          transform: isHovered || isOpen ? "translateY(2px)" : "translateY(0)",
        }}
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span>{isOpen ? "Click a card to explore • Click folder to close" : "Hover to preview • Click to open cards"}</span>
      </div>
    </div>
  );
}
