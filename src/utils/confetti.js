/**
 * Pure Canvas Confetti & Gold Sparkles generator
 * Creates royal golden glitter particles and falling rose petals
 */
export function triggerRoyalConfetti(x = 0.5, y = 0.6) {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const colors = [
    '#d4a43b', '#edd69c', '#c59b27', '#ffffff', '#e85a71', '#f58296', '#f2d479'
  ];

  const particleCount = 85;
  const particles = [];

  const originX = window.innerWidth * x;
  const originY = window.innerHeight * y;

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 4;
    const isPetal = Math.random() > 0.6;

    particles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 5,
      size: isPetal ? Math.random() * 8 + 6 : Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.22,
      isPetal
    });
  }

  let animationFrame;
  const startTime = Date.now();

  function render() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let alive = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      p.alpha -= 0.012;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.isPetal) {
          // Draw rose petal oval shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw diamond / star sparkle
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }

        ctx.restore();
      }
    });

    if (alive && Date.now() - startTime < 3500) {
      animationFrame = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrame);
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    }
  }

  render();
}
