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
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);
  const [hiddenCardId, setHiddenCardId] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        onClick={() => setIsHovered((prev) => !prev)}
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
                  onClick={() => handleProjectClick(project, index)}
                  isSelected={hiddenCardId === project.id}
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

        {/* Hover hint */}
        <div
          className="mt-4 flex items-center gap-1.5 text-xs text-amber-400/90 font-mono transition-all duration-300"
          style={{
            opacity: isHovered ? 0.8 : 0.6,
            transform: isHovered ? "translateY(4px)" : "translateY(0)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>{isHovered ? "Click any card to explore" : "Hover or tap to explore"}</span>
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
        onClick={(e) => {
          e.stopPropagation();
          onClick();
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
    const targetWidth = Math.min(768, viewportWidth - 64);
    const targetHeight = Math.min(viewportHeight * 0.85, 600);

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
        className="absolute inset-0 bg-background/85 backdrop-blur-xl"
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
          "rounded-full bg-muted/60 backdrop-blur-md",
          "border border-border",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
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
          "rounded-full bg-muted/60 backdrop-blur-md",
          "border border-border",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
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
          "rounded-full bg-muted/60 backdrop-blur-md",
          "border border-border",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
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
            "bg-card",
            "ring-1 ring-border",
            "shadow-2xl"
          )}
          style={{
            borderRadius: animationPhase === "initial" && !isClosing ? "8px" : "16px",
            transition: "border-radius 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-400 ease-out"
              style={{
                transform: `translateX(-${internalIndex * 100}%)`,
                transition: isSliding ? "transform 400ms cubic-bezier(0.32, 0.72, 0, 1)" : "none",
              }}
            >
              {projects.map((project) => (
                <img
                  key={project.id}
                  src={project.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"}
                  alt={project.title}
                  className="w-full h-auto max-h-[65vh] object-cover bg-background flex-shrink-0"
                  style={{ minWidth: "100%" }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
              ))}
            </div>

            {/* Subtle vignette effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-card/30 via-transparent to-card/10" />
          </div>

          <div
            className={cn("px-6 py-5", "bg-card", "border-t border-border")}
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
                    className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border"
                    style={{ color: currentProject?.accentColor }}
                  >
                    {currentProject?.category || "DISCIPLINE"}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {internalIndex + 1} of {projects.length}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight truncate">
                  {currentProject?.title}
                </h3>

                {currentProject?.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {currentProject.description}
                  </p>
                )}

                <div className="flex items-center gap-3 mt-2">
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    <kbd className="px-1.5 py-0.5 mx-0.5 text-[10px] font-medium bg-muted text-muted-foreground rounded border border-border">
                      ←
                    </kbd>
                    <kbd className="px-1.5 py-0.5 mx-0.5 text-[10px] font-medium bg-muted text-muted-foreground rounded border border-border">
                      →
                    </kbd>{" "}
                    to navigate
                  </p>
                  <div className="flex items-center gap-1.5">
                    {projects.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
                          idx === internalIndex
                            ? "bg-foreground w-4"
                            : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {onSelectProject && (
                <button
                  onClick={() => {
                    onSelectProject(currentProject);
                    handleClose();
                  }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2",
                    "text-xs font-bold font-mono tracking-wider text-primary-foreground",
                    "bg-primary hover:bg-primary/90",
                    "rounded-xl border border-primary/40",
                    "transition-all duration-200 ease-out cursor-pointer shadow-md active:scale-95 shrink-0"
                  )}
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
