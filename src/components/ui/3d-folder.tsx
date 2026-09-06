"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";
import { X, ExternalLink, ChevronLeft, ChevronRight, Volume2 } from "lucide-react";

export interface Project {
  id: string;
  image: string;
  title: string;
  category?: string;
  description?: string;
  cardNum?: string;
  accentColor?: string;
  tag?: string;
}

export interface AnimatedFolderProps {
  title: string;
  projects: Project[];
  className?: string;
  subtitle?: string;
  onSelectProject?: (project: Project) => void;
  isOpenControlled?: boolean;
  onToggleOpen?: () => void;
}

export function AnimatedFolder({
  title,
  projects,
  className,
  subtitle,
  onSelectProject,
  isOpenControlled,
  onToggleOpen,
}: AnimatedFolderProps) {
  const [isHoveredInternal, setIsHoveredInternal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);
  const [hiddenCardId, setHiddenCardId] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isExpanded = isOpenControlled !== undefined ? isOpenControlled || isHoveredInternal : isHoveredInternal;

  const handleProjectClick = (project: Project, index: number) => {
    const cardEl = cardRefs.current[index];
    if (cardEl) {
      setSourceRect(cardEl.getBoundingClientRect());
    }
    setSelectedIndex(index);
    setHiddenCardId(project.id);
  };

  const handleCloseLightbox = () => {
    setSelectedIndex(null);
    setSourceRect(null);
  };

  const handleCloseComplete = () => {
    setHiddenCardId(null);
  };

  const handleNavigate = (newIndex: number) => {
    setSelectedIndex(newIndex);
    setHiddenCardId(projects[newIndex]?.id || null);
  };

  const totalCards = projects.length;

  return (
    <>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center",
          "p-8 sm:p-10 rounded-3xl cursor-pointer",
          "bg-[#0e091b]/90 backdrop-blur-2xl border border-purple-500/30",
          "transition-all duration-500 ease-out",
          "hover:shadow-[0_20px_60px_rgba(168,85,247,0.25)]",
          "hover:border-purple-400/60",
          "group select-none",
          className
        )}
        style={{
          minWidth: "300px",
          minHeight: "360px",
          perspective: "1200px",
        }}
        onMouseEnter={() => setIsHoveredInternal(true)}
        onMouseLeave={() => setIsHoveredInternal(false)}
        onClick={() => {
          if (onToggleOpen) {
            onToggleOpen();
          }
        }}
      >
        {/* Subtle background glow on hover */}
        <div
          className="absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 65%, rgba(168,85,247,0.25) 0%, transparent 70%)",
            opacity: isExpanded ? 0.25 : 0,
          }}
        />

        {/* 3D Folder Assembly */}
        <div
          className="relative flex items-center justify-center mb-6"
          style={{ height: "180px", width: "260px" }}
        >
          {/* Folder back layer - z-index 10 */}
          <div
            className="absolute w-44 sm:w-48 h-32 rounded-xl shadow-2xl"
            style={{
              background: "linear-gradient(145deg, #2a1645 0%, #150927 100%)",
              border: "1px solid rgba(168,85,247,0.35)",
              transformOrigin: "bottom center",
              transform: isExpanded ? "rotateX(-20deg)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
            }}
          />

          {/* Folder tab - z-index 10 */}
          <div
            className="absolute w-16 h-5 rounded-t-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(180deg, #4c1d95 0%, #2a1645 100%)",
              borderTop: "1px solid rgba(192,132,252,0.6)",
              borderLeft: "1px solid rgba(192,132,252,0.4)",
              borderRight: "1px solid rgba(192,132,252,0.4)",
              top: "calc(50% - 64px - 14px)",
              left: "calc(50% - 96px + 20px)",
              transformOrigin: "bottom center",
              transform: isExpanded ? "rotateX(-30deg) translateY(-3px)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
            }}
          >
            <span className="text-[9px] font-mono font-bold tracking-widest text-purple-200">
              VAULT
            </span>
          </div>

          {/* Stacked Project Cards - z-index 20, between back and front */}
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
              const rotation = offset * (totalCards > 3 ? 8 : 12);
              const translationX = offset * (totalCards > 3 ? 46 : 55);
              const translationY = -95 - Math.abs(offset) * 4;

              return (
                <ProjectCard
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  project={project}
                  delay={index * 60}
                  isVisible={isExpanded}
                  index={index}
                  rotation={rotation}
                  translationX={translationX}
                  translationY={translationY}
                  onClick={() => handleProjectClick(project, index)}
                  isSelected={hiddenCardId === project.id}
                />
              );
            })}
          </div>

          {/* Folder front layer - z-index 30 */}
          <div
            className="absolute w-44 sm:w-48 h-32 rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col justify-between p-3.5"
            style={{
              top: "calc(50% - 64px + 6px)",
              background: "linear-gradient(160deg, #1f1133 0%, #10061e 100%)",
              border: "1px solid rgba(192,132,252,0.45)",
              transformOrigin: "bottom center",
              transform: isExpanded ? "rotateX(28deg) translateY(14px)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 30,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="w-5 h-3.5 rounded bg-gradient-to-tr from-amber-400 to-amber-200 border border-amber-300/80 shadow-xs" />
              <Volume2 className="w-3.5 h-3.5 text-purple-300/80" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-widest text-purple-300/90">
                HMM STUDIO
              </span>
              <span className="text-[9px] font-mono text-purple-400 bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-800/40">
                0{totalCards}
              </span>
            </div>
          </div>

          {/* Folder shine effect - z-index 31 */}
          <div
            className="absolute w-44 sm:w-48 h-32 rounded-xl overflow-hidden pointer-events-none"
            style={{
              top: "calc(50% - 64px + 6px)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 55%)",
              transformOrigin: "bottom center",
              transform: isExpanded ? "rotateX(28deg) translateY(14px)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 31,
            }}
          />
        </div>

        {/* Folder title */}
        <h3
          className="text-xl sm:text-2xl font-extrabold text-white mt-4 transition-all duration-300 tracking-tight"
          style={{
            transform: isExpanded ? "translateY(4px)" : "translateY(0)",
          }}
        >
          {title}
        </h3>

        {/* Subtitle / Count */}
        <p
          className="text-xs sm:text-sm text-purple-300/70 transition-all duration-300 font-mono mt-1"
          style={{
            opacity: isExpanded ? 0.9 : 0.7,
          }}
        >
          {subtitle || `${totalCards} audio disciplines inside`}
        </p>

        {/* Action hint */}
        <div
          className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-600/30 text-[11px] font-mono text-purple-300 transition-all duration-300"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>{isExpanded ? "Click any card to inspect" : "Hover or click to eject cards"}</span>
        </div>
      </div>

      <ImageLightbox
        projects={projects}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={handleCloseLightbox}
        sourceRect={sourceRect}
        onCloseComplete={handleCloseComplete}
        onNavigate={handleNavigate}
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
  onClick: () => void;
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
          "bg-[#130b24] border border-purple-500/40",
          "cursor-pointer hover:ring-2 hover:ring-purple-400 hover:scale-105",
          "transition-transform group/card",
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
          borderColor: project.accentColor ? `${project.accentColor}80` : undefined,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <img
          src={project.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
          }}
        />
        {/* Dark vignette gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Card header: Card Number Badge */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
          <span
            className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/60 border border-white/15"
            style={{ color: project.accentColor || "#c084fc" }}
          >
            {project.cardNum || `0${project.id}`}
          </span>
          <Volume2 className="w-3 h-3 text-white/70" />
        </div>

        {/* Card bottom title */}
        <div className="absolute bottom-2 left-2 right-2">
          {project.category && (
            <span className="text-[8px] font-mono uppercase tracking-wider block text-purple-300/80 truncate">
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

export interface ImageLightboxProps {
  projects: Project[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  sourceRect: DOMRect | null;
  onCloseComplete?: () => void;
  onNavigate: (index: number) => void;
  onSelectProject?: (project: Project) => void;
}

export function ImageLightbox({
  projects,
  currentIndex,
  isOpen,
  onClose,
  sourceRect,
  onCloseComplete,
  onNavigate,
  onSelectProject,
}: ImageLightboxProps) {
  const [animationPhase, setAnimationPhase] = useState<"initial" | "animating" | "complete">("initial");
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [internalIndex, setInternalIndex] = useState(currentIndex);
  const [prevIndex, setPrevIndex] = useState(currentIndex);
  const [isSliding, setIsSliding] = useState(false);
  const [_slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const containerRef = useRef<HTMLDivElement>(null);

  const totalProjects = projects.length;
  const hasNext = internalIndex < totalProjects - 1;
  const hasPrev = internalIndex > 0;

  const currentProject = projects[internalIndex];
  const _previousProject = projects[prevIndex];

  useEffect(() => {
    if (isOpen && currentIndex !== internalIndex && !isSliding) {
      const direction = currentIndex > internalIndex ? "left" : "right";
      setSlideDirection(direction);
      setPrevIndex(internalIndex);
      setIsSliding(true);

      const timer = setTimeout(() => {
        setInternalIndex(currentIndex);
        setIsSliding(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, isOpen, internalIndex, isSliding]);

  useEffect(() => {
    if (isOpen) {
      setInternalIndex(currentIndex);
      setPrevIndex(currentIndex);
      setIsSliding(false);
    }
  }, [isOpen, currentIndex]);

  const navigateNext = useCallback(() => {
    if (internalIndex >= totalProjects - 1 || isSliding) return;
    onNavigate(internalIndex + 1);
  }, [internalIndex, totalProjects, isSliding, onNavigate]);

  const navigatePrev = useCallback(() => {
    if (internalIndex <= 0 || isSliding) return;
    onNavigate(internalIndex - 1);
  }, [internalIndex, isSliding, onNavigate]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    onClose();
    setTimeout(() => {
      setIsClosing(false);
      setShouldRender(false);
      setAnimationPhase("initial");
      onCloseComplete?.();
    }, 400);
  }, [onClose, onCloseComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") navigateNext();
      if (e.key === "ArrowLeft") navigatePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose, navigateNext, navigatePrev]);

  useLayoutEffect(() => {
    if (isOpen && sourceRect) {
      setShouldRender(true);
      setAnimationPhase("initial");
      setIsClosing(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationPhase("animating");
        });
      });
      const timer = setTimeout(() => {
        setAnimationPhase("complete");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, sourceRect]);

  const handleDotClick = (idx: number) => {
    if (isSliding || idx === internalIndex) return;
    onNavigate(idx);
  };

  if (!shouldRender || !currentProject) return null;

  const getInitialStyles = (): React.CSSProperties => {
    if (!sourceRect) return {};

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const targetWidth = Math.min(800, viewportWidth - 48);
    const targetHeight = Math.min(viewportHeight * 0.85, 620);

    const targetX = (viewportWidth - targetWidth) / 2;
    const targetY = (viewportHeight - targetHeight) / 2;

    const scaleX = sourceRect.width / targetWidth;
    const scaleY = sourceRect.height / targetHeight;
    const scale = Math.max(scaleX, scaleY);

    const translateX = sourceRect.left + sourceRect.width / 2 - (targetX + targetWidth / 2);
    const translateY = sourceRect.top + sourceRect.height / 2 - (targetY + targetHeight / 2);

    return {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      opacity: 1,
    };
  };

  const getFinalStyles = (): React.CSSProperties => {
    return {
      transform: "translate(0, 0) scale(1)",
      opacity: 1,
    };
  };

  const currentStyles = animationPhase === "initial" && !isClosing ? getInitialStyles() : getFinalStyles();

  return (
    <div
      className={cn("fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8")}
      onClick={handleClose}
      style={{
        opacity: isClosing ? 0 : 1,
        transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
        style={{
          opacity: animationPhase === "initial" && !isClosing ? 0 : 1,
          transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        className={cn(
          "absolute top-5 right-5 z-50",
          "w-10 h-10 flex items-center justify-center",
          "rounded-full bg-purple-950/80 backdrop-blur-md",
          "border border-purple-500/40",
          "text-purple-300 hover:text-white hover:bg-purple-900/90",
          "transition-all duration-300 ease-out hover:scale-105 active:scale-95 cursor-pointer"
        )}
        style={{
          opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
          transform: animationPhase === "complete" && !isClosing ? "translateY(0)" : "translateY(-10px)",
          transition: "opacity 300ms ease-out, transform 300ms ease-out",
        }}
      >
        <X className="w-4 h-4" strokeWidth={2.5} />
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigatePrev();
        }}
        disabled={!hasPrev || isSliding}
        className={cn(
          "absolute left-4 md:left-8 z-50",
          "w-12 h-12 flex items-center justify-center",
          "rounded-full bg-purple-950/80 backdrop-blur-md",
          "border border-purple-500/40",
          "text-purple-300 hover:text-white hover:bg-purple-900",
          "transition-all duration-300 ease-out hover:scale-110 active:scale-95 cursor-pointer",
          "disabled:opacity-0 disabled:pointer-events-none"
        )}
        style={{
          opacity: animationPhase === "complete" && !isClosing && hasPrev ? 1 : 0,
          transform: animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms",
        }}
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigateNext();
        }}
        disabled={!hasNext || isSliding}
        className={cn(
          "absolute right-4 md:right-8 z-50",
          "w-12 h-12 flex items-center justify-center",
          "rounded-full bg-purple-950/80 backdrop-blur-md",
          "border border-purple-500/40",
          "text-purple-300 hover:text-white hover:bg-purple-900",
          "transition-all duration-300 ease-out hover:scale-110 active:scale-95 cursor-pointer",
          "disabled:opacity-0 disabled:pointer-events-none"
        )}
        style={{
          opacity: animationPhase === "complete" && !isClosing && hasNext ? 1 : 0,
          transform: animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(20px)",
          transition: "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms",
        }}
      >
        <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
      </button>

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          ...currentStyles,
          transform: isClosing ? "translate(0, 0) scale(0.95)" : currentStyles.transform,
          transition:
            animationPhase === "initial" && !isClosing
              ? "none"
              : "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease-out",
          transformOrigin: "center center",
        }}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            "rounded-2xl",
            "bg-[#100b1e]",
            "border border-purple-500/40",
            "shadow-[0_25px_80px_rgba(0,0,0,0.9)]"
          )}
          style={{
            borderRadius: animationPhase === "initial" && !isClosing ? "8px" : "20px",
            transition: "border-radius 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="relative overflow-hidden bg-black/60">
            <div
              className="flex transition-transform duration-400 ease-out"
              style={{
                transform: `translateX(-${internalIndex * 100}%)`,
                transition: isSliding ? "transform 400ms cubic-bezier(0.32, 0.72, 0, 1)" : "none",
              }}
            >
              {projects.map((project) => (
                <div key={project.id} className="w-full flex-shrink-0 relative min-w-full flex items-center justify-center p-4">
                  <img
                    src={project.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"}
                    alt={project.title}
                    className="w-full h-auto max-h-[60vh] object-cover rounded-xl border border-white/10"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Ambient vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#100b1e] via-transparent to-transparent opacity-80" />
          </div>

          <div
            className={cn("px-6 py-5", "bg-[#140c26]", "border-t border-purple-900/40")}
            style={{
              opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
              transform: animationPhase === "complete" && !isClosing ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 300ms ease-out 100ms, transform 300ms ease-out 100ms",
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-950 border border-purple-800/40"
                    style={{ color: currentProject?.accentColor || "#c084fc" }}
                  >
                    {currentProject?.category || "DISCIPLINE"}
                  </span>
                  <span className="text-xs font-mono text-purple-400/60">
                    {internalIndex + 1} of {projects.length}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white tracking-tight truncate">
                  {currentProject?.title}
                </h3>

                {currentProject?.description && (
                  <p className="text-xs text-slate-300/80 mt-1 line-clamp-2 leading-relaxed">
                    {currentProject.description}
                  </p>
                )}

                {/* Navigation Dots */}
                <div className="flex items-center gap-1.5 mt-3">
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
                        idx === internalIndex
                          ? "bg-purple-400 w-5"
                          : "bg-purple-900/60 hover:bg-purple-500/50"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Action Button: Navigate to Category */}
              {onSelectProject && (
                <button
                  onClick={() => {
                    onSelectProject(currentProject);
                    handleClose();
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono tracking-wider transition-all duration-200 cursor-pointer shadow-lg shadow-purple-600/30 active:scale-95 shrink-0"
                >
                  <span>EXPLORE TRACKS</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
