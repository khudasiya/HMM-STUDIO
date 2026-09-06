"use client";

import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";
import { X, ExternalLink, ArrowRight } from "lucide-react";

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
  const [isScatteredOpen, setIsScatteredOpen] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleFolderClick = () => {
    setIsScatteredOpen(true);
  };

  const handleCardClick = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    // If onSelectProject is provided, clicking the card directly opens scattered deck or navigates
    setIsScatteredOpen(true);
  };

  const totalCards = projects.length;

  return (
    <>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center",
          "p-8 sm:p-12 rounded-3xl cursor-pointer",
          "bg-[#0d091a]/80 backdrop-blur-xl border border-purple-500/20",
          "transition-all duration-500 ease-out",
          "hover:shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(245,158,11,0.15)]",
          "hover:border-amber-500/40",
          "group select-none",
          className
        )}
        style={{
          minWidth: "320px",
          minHeight: "380px",
          perspective: "1000px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleFolderClick}
      >
        {/* Subtle background glow on hover */}
        <div
          className="absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 65%, rgba(245, 158, 11, 0.15) 0%, transparent 70%)",
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* 3D Folder Container */}
        <div
          className="relative flex items-center justify-center mb-6"
          style={{ height: "200px", width: "260px" }}
        >
          {/* Folder back layer - z-index 10 */}
          <div
            className="absolute w-48 sm:w-56 h-36 sm:h-40 bg-folder-back rounded-xl shadow-xl"
            style={{
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(-18deg)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
            }}
          />

          {/* Folder tab - z-index 10 */}
          <div
            className="absolute w-16 sm:w-20 h-6 sm:h-7 bg-folder-tab rounded-t-lg shadow-sm flex items-center justify-center"
            style={{
              top: "calc(50% - 72px - 18px)",
              left: "calc(50% - 100px + 16px)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(-28deg) translateY(-3px)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
            }}
          >
            <span className="text-[9px] font-mono font-bold text-amber-950/80 tracking-widest uppercase">
              HMM
            </span>
          </div>

          {/* Project cards - z-index 20, between back and front */}
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
            }}
          >
            {projects.map((project, index) => {
              const mid = (totalCards - 1) / 2;
              const offset = index - mid;
              const rotation = offset * (totalCards > 3 ? 7.5 : 12);
              const translationX = offset * (totalCards > 3 ? 42 : 55);
              const translationY = -100 - Math.abs(offset) * 4;

              return (
                <ProjectCard
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  project={project}
                  delay={index * 50}
                  isVisible={isHovered}
                  index={index}
                  rotation={rotation}
                  translationX={translationX}
                  translationY={translationY}
                  onClick={(e) => handleCardClick(project, e)}
                  isSelected={false}
                />
              );
            })}
          </div>

          {/* Folder front layer - z-index 30 */}
          <div
            className="absolute w-48 sm:w-56 h-36 sm:h-40 bg-folder-front rounded-xl shadow-2xl"
            style={{
              top: "calc(50% - 72px + 6px)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(26deg) translateY(12px)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 30,
            }}
          />

          {/* Folder shine effect - z-index 31 */}
          <div
            className="absolute w-48 sm:w-56 h-36 sm:h-40 rounded-xl overflow-hidden pointer-events-none"
            style={{
              top: "calc(50% - 72px + 6px)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 55%)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(26deg) translateY(12px)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 31,
            }}
          />
        </div>

        {/* Folder title */}
        <h3
          className="text-xl sm:text-2xl font-bold text-white mt-4 transition-all duration-300 tracking-tight text-center"
          style={{
            transform: isHovered ? "translateY(4px)" : "translateY(0)",
          }}
        >
          {title}
        </h3>

        {/* Project count */}
        <p
          className="text-xs sm:text-sm text-slate-400 font-mono transition-all duration-300 mt-1"
          style={{
            opacity: isHovered ? 0.9 : 0.7,
          }}
        >
          {subtitle || `${projects.length} audio disciplines`}
        </p>

        {/* Click to Scatter Hint */}
        <div
          className="mt-4 flex items-center gap-1.5 text-xs text-amber-400/90 font-mono transition-all duration-300"
          style={{
            opacity: isHovered ? 1 : 0.7,
            transform: isHovered ? "translateY(4px)" : "translateY(0)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{isHovered ? "Click to open scattered on screen" : "Hover to preview • Click to open"}</span>
        </div>
      </div>

      {/* Scattered Cards Full Screen Modal */}
      <ScatteredCardsModal
        isOpen={isScatteredOpen}
        onClose={() => setIsScatteredOpen(false)}
        projects={projects}
        onSelectProject={onSelectProject}
      />
    </>
  );
}

export interface ProjectCardProps {
  project: Project;
  delay: number;
  isVisible: boolean;
  index: number;
  rotation: number;
  translationX: number;
  translationY: number;
  onClick: (e: React.MouseEvent) => void;
  isSelected: boolean;
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      project,
      delay,
      isVisible,
      rotation,
      translationX,
      translationY,
      onClick,
      isSelected,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute w-24 sm:w-28 h-36 sm:h-40 rounded-xl overflow-hidden shadow-2xl",
          "bg-card border border-white/10",
          "cursor-pointer hover:ring-2 hover:ring-amber-400 hover:scale-105",
          "transition-transform",
          isSelected && "opacity-0 pointer-events-none"
        )}
        style={{
          transform: isVisible
            ? `translateY(${translationY}px) translateX(${translationX}px) rotate(${rotation}deg) scale(1)`
            : "translateY(0px) translateX(0px) rotate(0deg) scale(0.5)",
          opacity: isSelected ? 0 : isVisible ? 1 : 0,
          transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
          zIndex: 20 + Math.round(Math.abs(rotation)),
          left: "-52px",
          top: "-70px",
        }}
        onClick={onClick}
      >
        <img
          src={project.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Card Number on top right */}
        {project.cardNum && (
          <span
            className="absolute top-1.5 right-1.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/70 border border-white/15"
            style={{ color: project.accentColor || "#f59e0b" }}
          >
            {project.cardNum}
          </span>
        )}

        {/* Card Title on bottom */}
        <div className="absolute bottom-1.5 left-1.5 right-1.5">
          {project.category && (
            <span className="text-[8px] font-mono uppercase tracking-wider block text-amber-300/80 truncate">
              {project.category}
            </span>
          )}
          <p className="text-[10px] sm:text-[11px] font-bold text-white truncate drop-shadow-md">
            {project.title}
          </p>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export interface ScatteredCardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject?: (project: Project) => void;
}

export function ScatteredCardsModal({
  isOpen,
  onClose,
  projects,
  onSelectProject,
}: ScatteredCardsModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cardRotations = [-2.5, 1.8, -2, 2.2, -1.5, 2];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-start sm:justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-6 pt-4 sm:pt-0 relative z-20">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-300">
            Hmm Studio Sound Vault • 6 Disciplines Scattered
          </span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-mono border border-white/15 transition-all duration-200 cursor-pointer shadow-md"
        >
          <span>ESC / CLOSE</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scattered Cards Grid Canvas */}
      <div
        className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        {projects.map((project, idx) => {
          const rot = cardRotations[idx % cardRotations.length];

          return (
            <div
              key={project.id}
              onClick={() => {
                onSelectProject?.(project);
                onClose();
              }}
              style={{
                transform: `rotate(${rot}deg)`,
              }}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/15 bg-[#120b22] p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-30 hover:border-amber-400/80 shadow-2xl hover:shadow-[0_20px_50px_rgba(245,158,11,0.25)]"
            >
              {/* High-res Cover Artwork with Smooth Zoom */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-65"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0618] via-[#0c0618]/70 to-transparent pointer-events-none" />

              {/* Card Top: Number & Category */}
              <div className="relative z-10 flex items-center justify-between">
                <span
                  className="text-[11px] font-mono font-extrabold px-2.5 py-1 rounded-md bg-black/80 border border-white/20 shadow-sm"
                  style={{ color: project.accentColor || "#f59e0b" }}
                >
                  {project.cardNum || `0${idx + 1}`}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-300/80 bg-black/40 px-2 py-0.5 rounded border border-white/10">
                  {project.category || "DISCIPLINE"}
                </span>
              </div>

              {/* Card Bottom: Title, Description & CTA */}
              <div className="relative z-10 mt-auto pt-4 border-t border-white/15">
                <h3 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors tracking-tight">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-xs text-slate-300/90 line-clamp-2 mt-1 leading-relaxed">
                    {project.description}
                  </p>
                )}

                <div className="mt-4 flex items-center justify-between text-xs font-mono font-bold">
                  <span
                    className="tracking-wider text-[11px] group-hover:underline"
                    style={{ color: project.accentColor || "#f59e0b" }}
                  >
                    EXPLORE AUDIO TRACKS
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-amber-500 group-hover:text-black flex items-center justify-center transition-all duration-200">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-400 font-mono text-center pb-4">
        Click any discipline card to jump straight to its audio catalog
      </p>
    </div>
  );
}
