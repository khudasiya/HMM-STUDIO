"use client";

import React, {
  useState,
  useRef,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";

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
  onClickFolder?: () => void;
  isExpanded?: boolean;
}

export function AnimatedFolder({
  title,
  projects,
  className,
  subtitle,
  onClickFolder,
  isExpanded = false,
}: AnimatedFolderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const totalCards = projects.length;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center",
        "p-8 sm:p-12 rounded-3xl cursor-pointer",
        "bg-[#0d091a]/80 backdrop-blur-xl border border-purple-500/20",
        "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(245,158,11,0.18)]",
        "hover:border-amber-500/40",
        "group select-none",
        className
      )}
      style={{
        minWidth: "320px",
        minHeight: "380px",
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClickFolder}
    >
      {/* Ambient radial glow on hover */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background:
            "radial-gradient(circle at 50% 65%, rgba(245, 158, 11, 0.18) 0%, transparent 70%)",
          opacity: isHovered || isExpanded ? 1 : 0,
        }}
      />

      {/* 3D Folder Container */}
      <div
        className="relative flex items-center justify-center mb-6"
        style={{
          height: "200px",
          width: "260px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Folder back layer - z-index 10 */}
        <div
          className="absolute w-48 sm:w-56 h-36 sm:h-40 bg-folder-back rounded-xl shadow-xl"
          style={{
            transformOrigin: "bottom center",
            transform: isHovered || isExpanded ? "rotateX(-18deg)" : "rotateX(0deg)",
            transition: isHovered || isExpanded
              ? "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)"
              : "transform 450ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 10,
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />

        {/* Folder tab - z-index 10 */}
        <div
          className="absolute w-16 sm:w-20 h-6 sm:h-7 bg-folder-tab rounded-t-lg shadow-sm flex items-center justify-center"
          style={{
            top: "calc(50% - 72px - 18px)",
            left: "calc(50% - 100px + 16px)",
            transformOrigin: "bottom center",
            transform: isHovered || isExpanded ? "rotateX(-28deg) translateY(-3px)" : "rotateX(0deg)",
            transition: isHovered || isExpanded
              ? "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)"
              : "transform 450ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 10,
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        >
          <span className="text-[9px] font-mono font-bold text-amber-950/80 tracking-widest uppercase">
            HMM
          </span>
        </div>

        {/* Project cards - z-index 20, between back and front (visible on hover) */}
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

            return (
              <ProjectCard
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                project={project}
                delay={index * 40}
                isVisible={isHovered && !isExpanded}
                index={index}
                rotation={rotation}
                translationX={translationX}
                translationY={translationY}
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
            transform: isHovered || isExpanded ? "rotateX(26deg) translateY(12px)" : "rotateX(0deg)",
            transition: isHovered || isExpanded
              ? "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)"
              : "transform 450ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 30,
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />

        {/* Folder shine effect - z-index 31 */}
        <div
          className="absolute w-48 sm:w-56 h-36 sm:h-40 rounded-xl overflow-hidden pointer-events-none"
          style={{
            top: "calc(50% - 72px + 6px)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.38) 0%, transparent 55%)",
            transformOrigin: "bottom center",
            transform: isHovered || isExpanded ? "rotateX(26deg) translateY(12px)" : "rotateX(0deg)",
            transition: isHovered || isExpanded
              ? "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)"
              : "transform 450ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 31,
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />
      </div>

      {/* Folder title */}
      <h3
        className="text-xl sm:text-2xl font-bold text-white mt-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] tracking-tight text-center"
        style={{
          transform: isHovered || isExpanded ? "translateY(3px)" : "translateY(0)",
        }}
      >
        {title}
      </h3>

      {/* Project count */}
      <p
        className="text-xs sm:text-sm text-slate-400 font-mono transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mt-1"
        style={{
          opacity: isHovered || isExpanded ? 0.9 : 0.7,
        }}
      >
        {subtitle || `${projects.length} audio disciplines`}
      </p>

      {/* Click Hint */}
      <div
        className="mt-4 flex items-center gap-1.5 text-xs text-amber-400/90 font-mono transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: isHovered || isExpanded ? 1 : 0.7,
          transform: isHovered || isExpanded ? "translateY(2px)" : "translateY(0)",
        }}
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span>{isExpanded ? "Click to collapse cards back" : "Hover to preview • Click to spread cards wide"}</span>
      </div>
    </div>
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
          "transition-all duration-300 pointer-events-none",
          isSelected && "opacity-0"
        )}
        style={{
          transform: isVisible
            ? `translateY(${translationY}px) translateX(${translationX}px) rotate(${rotation}deg) scale(1)`
            : "translateY(0px) translateX(0px) rotate(0deg) scale(0.65)",
          opacity: isVisible ? 1 : 0,
          transition: isVisible
            ? `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
            : "transform 400ms cubic-bezier(0.16, 1, 0.3, 1) 0ms, opacity 300ms ease 0ms",
          zIndex: 20 + Math.round(Math.abs(rotation)),
          left: "-52px",
          top: "-70px",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        }}
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
            className="absolute top-1.5 right-1.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/75 border border-white/15 shadow-sm"
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
