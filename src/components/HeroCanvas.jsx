import React, { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class definition
    class Particle {
      constructor(width, height) {
        this.reset(width, height);
      }

      reset(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.0;
        this.vy = (Math.random() - 0.5) * 1.0;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.4 + 0.2;
        // High-shine cyan/sky blue
        this.color = '#00a2ff';
      }

      update(width, height, mouseX, mouseY) {
        // Aero flow field math (vector field using overlapping sin/cos waves)
        const angle = Math.sin(this.x * 0.003 + time) * Math.cos(this.y * 0.003 + time) * Math.PI * 2;
        const flowForceX = Math.cos(angle) * 0.15;
        const flowForceY = Math.sin(angle) * 0.15;

        this.vx += flowForceX;
        this.vy += flowForceY;

        // Interactive mouse force (attraction + swirl)
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 250) {
          // Linear falloff force
          const force = (250 - dist) / 250;
          
          // Pull force
          this.vx += (dx / dist) * force * 0.15;
          this.vy += (dy / dist) * force * 0.15;
          
          // Tangential swirl force (aerodynamic vortex)
          const tx = -dy / dist;
          const ty = dx / dist;
          this.vx += tx * force * 0.25;
          this.vy += ty * force * 0.25;
        }

        // Apply friction to limit infinite acceleration
        this.vx *= 0.96;
        this.vy *= 0.96;

        this.x += this.vx;
        this.y += this.vy;

        // Wrapping boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.globalAlpha = this.alpha;
        context.fill();
      }
    }

    // Initialize particle pool (approx. 200 particles for high density but excellent performance)
    const particleCount = 200;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Mouse movement handler
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const render = () => {
      time += 0.005;
      
      // Interpolate mouse coordinates for smooth lag-chase effect
      const mouse = mouseRef.current;
      if (mouse.targetX === -1000) {
        mouse.x += (-1000 - mouse.x) * 0.1;
        mouse.y += (-1000 - mouse.y) * 0.1;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      }

      // Draw semi-transparent background for motion trail (aerodynamic decay)
      ctx.fillStyle = 'rgba(3, 7, 18, 0.2)'; // Fades particle trails into base dark blue
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle connecting lines (constellations) for drone networking feel
      ctx.strokeStyle = 'rgba(0, 162, 255, 0.03)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height, mouse.x, mouse.y);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
