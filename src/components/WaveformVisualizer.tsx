import React, { useRef, useEffect } from 'react';

interface WaveformVisualizerProps {
  frequencies: number[];
  isPlaying: boolean;
  progress: number; // 0 to 1
  onScrub?: (percentage: number) => void;
  height?: number;
  barColor?: string;
  activeBarColor?: string;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  frequencies,
  isPlaying,
  progress,
  onScrub,
  height = 40,
  barColor = 'rgba(139, 92, 246, 0.3)',
  activeBarColor = '#c084fc'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Adjust for High-DPI screens
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const barCount = frequencies.length || 40;
    const gap = 3;
    const barWidth = Math.max(2, (width - (barCount - 1) * gap) / barCount);
    const activeIndex = Math.floor(progress * barCount);

    frequencies.forEach((val, index) => {
      const x = index * (barWidth + gap);
      // Dynamic height based on frequency value & playing pulse
      const activePulse = isPlaying ? Math.sin(Date.now() * 0.008 + index) * 0.15 : 0;
      const barHeight = Math.max(4, (val + activePulse) * (height - 4));
      const y = (height - barHeight) / 2;

      ctx.fillStyle = index <= activeIndex ? activeBarColor : barColor;
      
      // Draw rounded bar
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 2);
      ctx.fill();
    });
  }, [frequencies, isPlaying, progress, height, barColor, activeBarColor]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onScrub || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    onScrub(percentage);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      style={{ height: `${height}px` }}
      className="w-full cursor-pointer touch-none"
    />
  );
};
