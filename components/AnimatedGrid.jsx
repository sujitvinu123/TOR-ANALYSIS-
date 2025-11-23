import { useEffect, useRef } from 'react';

export default function AnimatedGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const gridSize = 60;
    let offset = 0;
    const lineOpacity = 0.15;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = `rgba(30, 64, 175, ${lineOpacity})`;
      ctx.lineWidth = 1;

      // Draw vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + (offset % gridSize), 0);
        ctx.lineTo(x + (offset % gridSize), height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + (offset % gridSize));
        ctx.lineTo(width, y + (offset % gridSize));
        ctx.stroke();
      }

      // Draw accent lines
      ctx.strokeStyle = `rgba(59, 130, 246, ${lineOpacity * 0.5})`;
      for (let x = 0; x <= width; x += gridSize * 3) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      offset += 0.3;
      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
