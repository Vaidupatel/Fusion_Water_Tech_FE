import { useState, useRef, useEffect, useCallback } from "react";

const H2OChainReaction = ({
  maxParticles = 60,
  brandColors = {
    hydrogen: "#00D4FF",
    oxygen: "#FF4444",
    bond: "#4A90E2",
    background: ["#0A1E2E", "#1B3A5C"],
    water: "#00B4D8",
    accent: "#90E0EF",
  },
  showStats = true,
  onMoleculeForm = null,
  isPaused,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const dropletsRef = useRef([]);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const [stats, setStats] = useState({ h: 0, o: 0, h2: 0, h2o: 0, total: 0 });
  const [tooltip, setTooltip] = useState(null);

  class Particle {
    constructor(type, x, y, vx = null, vy = null) {
      this.type = type;
      this.x = x;
      this.y = y;
      this.vx = vx !== null ? vx : (Math.random() - 0.5) * 2;
      this.vy = vy !== null ? vy : (Math.random() - 0.5) * 2;
      this.scale = 0;
      this.id = Math.random().toString(36).substr(2, 9);
      this.paused = false;
      this.glow = Math.random() * Math.PI * 2;
    }

    getRadius() {
      switch (this.type) {
        case "H":
          return 10;
        case "O":
          return 18;
        case "H2":
          return 16;
        case "H2O":
          return 24;
        default:
          return 12;
      }
    }

    update(w, h) {
      if (this.paused) return;
      if (this.scale < 1) this.scale = Math.min(1, this.scale + 0.05);
      this.glow += 0.05;

      this.vx += (Math.random() - 0.5) * 0.08;
      this.vy += (Math.random() - 0.5) * 0.08;
      const maxSpeed = 1.5;
      this.vx = Math.max(-maxSpeed, Math.min(maxSpeed, this.vx));
      this.vy = Math.max(-maxSpeed, Math.min(maxSpeed, this.vy));
      this.x += this.vx;
      this.y += this.vy;

      const r = this.getRadius();
      if (this.x - r <= 0 || this.x + r >= w) {
        this.vx *= -0.85;
        this.x = Math.max(r, Math.min(w - r, this.x));
      }
      if (this.y - r <= 0 || this.y + r >= h) {
        this.vy *= -0.85;
        this.y = Math.max(r, Math.min(h - r, this.y));
      }
    }

    drawAtom(ctx, radius, color, glowColor) {
      // Outer glow
      const glowSize = radius * 1.8;
      const glowGrad = ctx.createRadialGradient(
        0,
        0,
        radius * 0.8,
        0,
        0,
        glowSize
      );
      glowGrad.addColorStop(0, `${glowColor}20`);
      glowGrad.addColorStop(0.6, `${glowColor}10`);
      glowGrad.addColorStop(1, `${glowColor}00`);
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // Main sphere with enhanced 3D effect
      const mainGrad = ctx.createRadialGradient(
        -radius * 0.3,
        -radius * 0.3,
        0,
        0,
        0,
        radius
      );
      mainGrad.addColorStop(0, "#FFFFFF");
      mainGrad.addColorStop(0.3, color);
      mainGrad.addColorStop(0.7, color);
      mainGrad.addColorStop(1, `${color}AA`);

      ctx.fillStyle = mainGrad;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();

      // Subtle inner highlight
      const highlight = ctx.createRadialGradient(
        -radius * 0.4,
        -radius * 0.4,
        0,
        -radius * 0.2,
        -radius * 0.2,
        radius * 0.6
      );
      highlight.addColorStop(0, "#FFFFFF40");
      highlight.addColorStop(1, "#FFFFFF00");
      ctx.fillStyle = highlight;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();

      // Rim lighting
      ctx.strokeStyle = `${color}80`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.scale, this.scale);

      switch (this.type) {
        case "H":
          this.drawAtom(ctx, 10, brandColors.hydrogen, brandColors.hydrogen);
          break;
        case "O":
          this.drawAtom(ctx, 18, brandColors.oxygen, brandColors.oxygen);
          break;
        case "H2":
          this._drawH2(ctx);
          break;
        case "H2O":
          this._drawH2O(ctx);
          break;
      }

      // Enhanced label with shadow
      const radius = this.getRadius();
      const fontSize = Math.floor(radius * 0.6);
      ctx.shadowColor = "#000000";
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillStyle = "#FFFFFF";
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.type, 0, 0);
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    _drawH2(ctx) {
      // Enhanced bond with gradient
      const bondGrad = ctx.createLinearGradient(-20, 0, 20, 0);
      bondGrad.addColorStop(0, brandColors.bond);
      bondGrad.addColorStop(0.5, `${brandColors.bond}FF`);
      bondGrad.addColorStop(1, brandColors.bond);
      ctx.strokeStyle = bondGrad;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(18, 0);
      ctx.stroke();

      // Hydrogen atoms
      [-18, 18].forEach((dx) => {
        ctx.save();
        ctx.translate(dx, 0);
        this.drawAtom(ctx, 10, brandColors.hydrogen, brandColors.hydrogen);
        ctx.restore();
      });
    }

    _drawH2O(ctx) {
      const angle = (104.5 * Math.PI) / 180;
      const bondLength = 28;

      // Enhanced bonds
      const bondGrad = ctx.createLinearGradient(0, 0, bondLength, 0);
      bondGrad.addColorStop(0, brandColors.bond);
      bondGrad.addColorStop(1, `${brandColors.bond}AA`);
      ctx.strokeStyle = bondGrad;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";

      // Draw bonds
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(
        bondLength * Math.cos(angle / 2),
        -bondLength * Math.sin(angle / 2)
      );
      ctx.moveTo(0, 0);
      ctx.lineTo(
        -bondLength * Math.cos(angle / 2),
        -bondLength * Math.sin(angle / 2)
      );
      ctx.stroke();

      // Central oxygen
      this.drawAtom(ctx, 18, brandColors.water, brandColors.water);

      // Hydrogen atoms
      [1, -1].forEach((sign) => {
        ctx.save();
        const dx = sign * bondLength * Math.cos(angle / 2);
        const dy = -bondLength * Math.sin(angle / 2);
        ctx.translate(dx, dy);
        this.drawAtom(ctx, 10, brandColors.hydrogen, brandColors.hydrogen);
        ctx.restore();
      });
    }

    distanceTo(o) {
      return Math.hypot(this.x - o.x, this.y - o.y);
    }

    canMergeWith(o) {
      return this.distanceTo(o) < this.getRadius() + o.getRadius() + 5;
    }
  }

  class Droplet {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 6;
      this.vy = (Math.random() - 0.5) * 6;
      this.life = 1;
      this.maxLife = 40;
      this.r = Math.random() * 3 + 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.96;
      this.vy *= 0.96;
      this.life--;
      return this.life > 0;
    }

    draw(ctx) {
      const alpha = (this.life / this.maxLife) * 0.7;
      const radius = this.r * (this.life / this.maxLife);

      // Water droplet gradient
      const dropGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      dropGrad.addColorStop(0, `rgba(0, 212, 255, ${alpha})`);
      dropGrad.addColorStop(0.7, `rgba(0, 180, 216, ${alpha * 0.8})`);
      dropGrad.addColorStop(1, `rgba(0, 180, 216, 0)`);

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.fillStyle = dropGrad;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }
  }

  const initializeParticles = useCallback(() => {
    const { width, height } = dimensionsRef.current;
    if (!width || !height) return;
    particlesRef.current = [];
    const initial = Math.min(maxParticles * 0.7, 40);
    for (let i = 0; i < initial; i++) {
      const types = ["H", "H", "H", "H", "O", "O"];
      const t = types[Math.floor(Math.random() * types.length)];
      particlesRef.current.push(
        new Particle(
          t,
          40 + Math.random() * (width - 80),
          40 + Math.random() * (height - 80)
        )
      );
    }
  }, [maxParticles]);

  const handleMerging = useCallback(() => {
    const P = particlesRef.current;
    const remove = new Set();
    const add = [];

    for (let i = 0; i < P.length; i++) {
      if (remove.has(i)) continue;
      for (let j = i + 1; j < P.length; j++) {
        if (remove.has(j)) continue;
        const p1 = P[i];
        const p2 = P[j];

        if (p1.canMergeWith(p2)) {
          const mx = (p1.x + p2.x) / 2;
          const my = (p1.y + p2.y) / 2;

          if (p1.type === "H" && p2.type === "H") {
            add.push(new Particle("H2", mx, my));
          } else if (
            (p1.type === "H2" && p2.type === "O") ||
            (p1.type === "O" && p2.type === "H2")
          ) {
            add.push(new Particle("H2O", mx, my));
          } else continue;

          remove.add(i);
          remove.add(j);

          // Enhanced particle effects
          for (let k = 0; k < 8; k++) {
            dropletsRef.current.push(new Droplet(mx, my));
          }

          if (onMoleculeForm) onMoleculeForm(add[add.length - 1].type);
          break;
        }
      }
    }

    particlesRef.current = P.filter((_, idx) => !remove.has(idx)).concat(add);

    // Add new particles periodically
    const { width, height } = dimensionsRef.current;
    while (
      particlesRef.current.length < maxParticles &&
      Math.random() < 0.015
    ) {
      const types = ["H", "H", "H", "O"];
      const t = types[Math.floor(Math.random() * types.length)];
      particlesRef.current.push(
        new Particle(
          t,
          40 + Math.random() * (width - 80),
          40 + Math.random() * (height - 80)
        )
      );
    }

    // Update stats
    const s = { h: 0, o: 0, h2: 0, h2o: 0, total: particlesRef.current.length };
    particlesRef.current.forEach((p) => s[p.type.toLowerCase()]++);
    setStats(s);
  }, [maxParticles, onMoleculeForm]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = dimensionsRef.current;

    // Enhanced background gradient
    const bgGrad = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      Math.max(width, height)
    );
    bgGrad.addColorStop(0, brandColors.background[0]);
    bgGrad.addColorStop(0.6, brandColors.background[1]);
    bgGrad.addColorStop(1, "#001122");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle background pattern
    ctx.globalAlpha = 0.1;
    ctx.strokeStyle = brandColors.accent;
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 50) {
      for (let y = 0; y < height; y += 50) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;

    if (!isPaused) {
      particlesRef.current.forEach((p) => p.update(width, height));
      dropletsRef.current = dropletsRef.current.filter((d) => d.update());
      handleMerging();
    }

    // Draw particles and effects
    dropletsRef.current.forEach((d) => d.draw(ctx));
    particlesRef.current.forEach((p) => p.draw(ctx));

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, handleMerging, brandColors]);

  const handleResize = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const { clientWidth: width, clientHeight: height } = c.parentElement;
    c.width = width;
    c.height = height;
    dimensionsRef.current = { width, height };
  }, []);

  const handleCanvasClick = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clicked = particlesRef.current.find(
      (p) => Math.hypot(p.x - x, p.y - y) < p.getRadius()
    );
    if (clicked) {
      clicked.paused = !clicked.paused;
      setTooltip({
        x: e.clientX,
        y: e.clientY,
        type: clicked.type,
        paused: clicked.paused,
      });
      setTimeout(() => setTooltip(null), 2000);
    }
  }, []);

  useEffect(() => {
    handleResize();
    initializeParticles();
    window.addEventListener("resize", handleResize);
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [handleResize, initializeParticles, animate]);

  return (
    <div id="home" className="relative w-full h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0"
        style={{ touchAction: "manipulation" }}
      />

      {showStats && (
        <div className="absolute top-4 right-4 bg-slate-800 bg-opacity-90 backdrop-blur-sm p-2 rounded-xl text-[10px] text-cyan-100 z-20 font-mono border border-cyan-500/30 shadow-2xl">
          <div className="text-cyan-300 font-bold mb-2">Molecular Count</div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
            <span>H: {stats.h}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-400 rounded-full"></span>
            <span>O: {stats.o}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-300 rounded-full"></span>
            <span>H₂: {stats.h2}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-cyan-400 rounded-full"></span>
            <span>H₂O: {stats.h2o}</span>
          </div>
          <div className="border-t border-cyan-500/30 mt-2 pt-2">
            <span className="text-cyan-300">Total: {stats.total}</span>
          </div>
        </div>
      )}

      {tooltip && (
        <div
          className="absolute z-30 bg-slate-900 bg-opacity-95 text-cyan-100 px-2 py-1 rounded-lg text-[8px] pointer-events-none border border-cyan-500/30"
          style={{ left: tooltip.x + 10, top: tooltip.y - 30 }}
        >
          <span className="font-bold">{tooltip.type}</span>
          {tooltip.paused && <span className="text-yellow-400"> (paused)</span>}
        </div>
      )}

      <div className="absolute bottom-4 left-4 text-cyan-300 z-20 bg-slate-800/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/20">
        <div className="flex flex-col text-[10px] text-cyan-200">
          <span>Click molecules to pause</span>
          <span> Watch H₂ + O → H₂O formation</span>
        </div>
      </div>
    </div>
  );
};

export default H2OChainReaction;
