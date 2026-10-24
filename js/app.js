/* ============================================================
   ◈ REVELACIONES 27 · Orden TI — JavaScript (solo esta web,
   sin enlaces externos: comunidad exclusiva)
   1) Partículas   2) Efecto typing   3) Cifras animadas
   4) Scroll reveal 5) Menú móvil + año dinámico
   ============================================================ */

/* ---------- 1) RED DE PARTÍCULAS DE FONDO ---------- */
(function crearRed() {
  const canvas = document.getElementById("red");
  if (!canvas) return;

  // Sin animación si el usuario prefiere menos movimiento
  const respetaMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (respetaMovimiento) return;

  const ctx = canvas.getContext("2d");
  const RATON = { x: -9999, y: -9999 };

  let puntos = [];
  let w = 0, h = 0;

  function redimensionar() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    // Densidad proporcional al área, con tope para no saturar el móvil
    const objetivo = Math.min(90, Math.round((w * h) / 16000));
    puntos = Array.from({ length: objetivo }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.6 + 0.6
    }));
  }

  window.addEventListener("resize", redimensionar, { passive: true });
  window.addEventListener("mousemove", (e) => {
    RATON.x = e.clientX;
    RATON.y = e.clientY;
  }, { passive: true });
  window.addEventListener("mouseout", () => {
    RATON.x = -9999;
    RATON.y = -9999;
  });

  const DIST_MAX = 130; // distancia máxima para enlazar dos puntos

  function paso() {
    ctx.clearRect(0, 0, w, h);

    // Mover y rebotar en los bordes
    for (const p of puntos) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }

    // Enlaces entre puntos cercanos
    for (let i = 0; i < puntos.length; i++) {
      const a = puntos[i];
      for (let j = i + 1; j < puntos.length; j++) {
        const b = puntos[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < DIST_MAX * DIST_MAX) {
          const alfa = 1 - Math.sqrt(d2) / DIST_MAX;
          ctx.strokeStyle = `rgba(0, 229, 255, ${alfa * 0.18})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      // Enlace con el cursor (efecto interactivo)
      const dxR = a.x - RATON.x, dyR = a.y - RATON.y;
      const dR2 = dxR * dxR + dyR * dyR;
      if (dR2 < 180 * 180) {
        const alfa = 1 - Math.sqrt(dR2) / 180;
        ctx.strokeStyle = `rgba(178, 73, 255, ${alfa * 0.4})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(RATON.x, RATON.y);
        ctx.stroke();
      }
    }

    // Dibujar los puntos
    for (const p of puntos) {
      ctx.fillStyle = "rgba(0, 229, 255, 0.7)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(paso);
  }

  redimensionar();
  paso();
})();

/* ---------- 2) EFECTO MÁQUINA DE ESCRIBIR (solo portada) ---------- */
(function escribir() {
  const el = document.getElementById("typing");
  if (!el) return;

  const PALABRAS = [
    "Programación",
    "Redes",
    "Hardware",
    "Datos",
    "Automatización",
    "Ciberseguridad"
  ];

  let indice = 0;
  let letra = 0;
  let borrando = false;

  function tick() {
    if (letra === 0 && borrando) {
      borrando = false;
      indice = (indice + 1) % PALABRAS.length;
    }
    const palabra = PALABRAS[indice];
    letra += borrando ? -1 : 1;
    el.textContent = palabra.slice(0, letra);
    let ms = borrando ? 40 : 95;

    if (!borrando && letra === palabra.length) {
      ms = 1600;   // pausa antes de borrar
      borrando = true;
    }
    setTimeout(tick, ms);
  }
  tick();
})();

/* ---------- 3) CIFRAS ANIMADAS (IntersectionObserver) ---------- */
(function cifrasAnimadas() {
  const items = document.querySelectorAll(".cifra-numero[data-max]");
  if (!items.length) return;

  const obs = new IntersectionObserver((entradas) => {
    for (const entrada of entradas) {
      if (!entrada.isIntersecting) continue;
      const el = entrada.target;
      obs.unobserve(el);

      const final = parseInt(el.getAttribute("data-max"), 10);
      if (isNaN(final)) continue;
      const sufijo = el.getAttribute("data-sufijo") || "";

      const duracion = 1200;
      const inicio = performance.now();

      function marcar(t) {
        const progreso = Math.min((t - inicio) / duracion, 1);
        const suavizado = 1 - Math.pow(1 - progreso, 3); // ease-out
        el.textContent = Math.round(final * suavizado) + sufijo;
        if (progreso < 1) requestAnimationFrame(marcar);
      }
      requestAnimationFrame(marcar);
    }
  }, { threshold: 0.6 });

  items.forEach((i) => obs.observe(i));
})();

/* ---------- 4) APARECER AL HACER SCROLL ---------- */
(function reveals() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("visible"));
    return;
  }
  const obs = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    }
  }, { threshold: 0.15 });
  items.forEach((i) => obs.observe(i));
})();

/* ---------- 5) MENÚ MÓVIL + AÑO DINÁMICO ---------- */
(function ui() {
  // Menú hamburguesa
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("navEnlaces");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      const abierto = nav.classList.toggle("abierto");
      btn.setAttribute("aria-expanded", String(abierto));
    });
    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        nav.classList.remove("abierto");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Año actual en el pie de todas las páginas
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
})();
