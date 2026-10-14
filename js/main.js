const $ = (s, c = document) => c.querySelector(s),
  $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
history.scrollRestoration = "manual";
scrollTo(0, 0);
addEventListener("beforeunload", () => scrollTo(0, 0));
gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ lerp: 0.085 });
window.lenis = lenis; // the discipline view pauses/resumes page scroll with this
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
lenis.stop();

/* anchors + menu */
const mn = $("#mn"),
  bg = $("#bg");
function menu(o) {
  mn.classList.toggle("open", o);
  bg.classList.toggle("x", o);
  o ? lenis.stop() : lenis.start();
}
bg.onclick = () => menu(!mn.classList.contains("open"));
$$('a[href^="#"]').forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const h = a.getAttribute("href");
    if (mn.classList.contains("open")) menu(false);
    if (h.length > 1)
      lenis.scrollTo(h, {
        duration: 1.6,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
  }),
);

/* magnetic + tilt */
$$("[data-mag]").forEach((el) => {
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * 0.25,
      y: (e.clientY - r.top - r.height / 2) * 0.4,
      duration: 0.4,
    });
  });
  el.addEventListener("pointerleave", () =>
    gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,.4)" }),
  );
});
$$("[data-tilt]").forEach((el) => {
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect(),
      px = (e.clientX - r.left) / r.width,
      py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", px * 100 + "%");
    el.style.setProperty("--my", py * 100 + "%");
    gsap.to(el, {
      rotationY: (px - 0.5) * 14,
      rotationX: (0.5 - py) * 14,
      transformPerspective: 700,
      duration: 0.4,
    });
  });
  el.addEventListener("pointerleave", () =>
    gsap.to(el, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.8,
      ease: "power3.out",
    }),
  );
});

/* Spline robot: <spline-viewer id="robot"> sits in the HTML so it starts loading immediately.
   Here we only reveal it when ready, hide the "Built with Spline" badge and cap the pixel ratio. */
(function () {
  const v = $("#robot"),
    sl = $("#sl");
  if (!v || !sl) return;
  let done = false;
  const ready = () => {
    if (done) return;
    done = true;
    try {
      v._spline._renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    } catch {
      /* optional optimisation, safe to skip */
    }
    v.classList.add("ready");
    sl.classList.add("gone");
  };
  v.addEventListener("load-complete", ready);
  let n = 0;
  const t = setInterval(() => {
    const l = v.shadowRoot && v.shadowRoot.querySelector("#logo");
    if (l) l.remove();
    if (l || ++n > 120) clearInterval(t);
  }, 250);
  setTimeout(() => {
    if (done) return;
    if (customElements.get("spline-viewer")) ready();
    else
      sl.querySelector("span").textContent =
        "3D could not load (check internet)";
  }, 12000);
})();

/* split words */
$$("[data-split]").forEach((el) => {
  const w = el.textContent.trim().split(/\s+/),
    h = +el.dataset.hl || 0;
  el.innerHTML = w
    .map(
      (t, i) => `<span class="w${i >= w.length - h ? " hl2" : ""}">${t}</span>`,
    )
    .join("");
  gsap.to($$(".w", el), {
    opacity: 1,
    stagger: 0.1,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top 82%",
      end: "bottom 50%",
      scrub: true,
    },
  });
});
/* reveals (play on enter, reverse on leave back) */
$$(".rv").forEach((el) =>
  gsap.from(el, {
    y: 60,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  }),
);
$$(".sh, .index-head").forEach((el) =>
  gsap.from(el, {
    opacity: 0,
    y: 24,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  }),
);
gsap.from(".pc", {
  y: 80,
  opacity: 0,
  rotationX: -25,
  transformPerspective: 800,
  stagger: 0.1,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".pgrid",
    start: "top 88%",
    toggleActions: "play none none reverse",
  },
});
gsap.to(".hl", {
  yPercent: -12,
  opacity: 0.2,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "30% top",
    end: "bottom top",
    scrub: true,
  },
});
/* glow orb follows mouse in intro */
const orb = $("#orb"),
  ox = gsap.quickTo(orb, "x", { duration: 1.2 }),
  oy = gsap.quickTo(orb, "y", { duration: 1.2 });
$(".intro").addEventListener("pointermove", (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  ox(e.clientX - r.left - orb.offsetWidth / 2);
  oy(e.clientY - r.top - orb.offsetHeight / 2);
});

/* marquee with scroll velocity */
const mt = $("#mt");
mt.innerHTML = mt.innerHTML.repeat(4);
const mtw = gsap.to(mt, {
  xPercent: -25,
  repeat: -1,
  duration: 22,
  ease: "none",
});
let sv = 0;
ScrollTrigger.create({
  onUpdate: (s) => {
    sv = s.getVelocity();
  },
});
const skx = gsap.quickSetter(mt, "skewX", "deg");
gsap.ticker.add(() => {
  sv *= 0.9;
  skx(clamp(-sv / 220, -12, 12));
  mtw.timeScale(1 + Math.min(Math.abs(sv) / 250, 6));
});

/* thinking highlight */
$$(".ti").forEach((t) =>
  ScrollTrigger.create({
    trigger: t,
    start: "top 62%",
    end: "bottom 38%",
    toggleClass: { targets: t, className: "on" },
  }),
);

/* floating buttons */
const up = $("#up");
lenis.on("scroll", ({ scroll, limit }) => {
  up.style.opacity = scroll > 500 ? 1 : 0;
  up.style.visibility = scroll > 500 ? "visible" : "hidden";
  up.style.setProperty("--p", ((scroll / limit) * 100).toFixed(1));
});
up.onclick = () => lenis.scrollTo(0, { duration: 1.8 });

/* preloader -> intro */
const pcn = $("#pc"),
  o = { v: 0 };
gsap
  .timeline()
  .to(o, {
    v: 100,
    duration: 0.7,
    ease: "power2.inOut",
    onUpdate: () => (pcn.textContent = Math.round(o.v) + "%"),
  })
  .to(".pre", {
    yPercent: -100,
    duration: 1,
    ease: "power4.inOut",
    onComplete: () => {
      $(".pre").remove();
      lenis.start();
      ScrollTrigger.refresh();
    },
  })
  .from(".nav", { y: -80, opacity: 0, duration: 1, ease: "power4.out" }, "-=.4")
  .from(
    ".logo,.links a,.burger",
    {
      y: -24,
      opacity: 0,
      rotationX: -80,
      transformPerspective: 600,
      stagger: 0.08,
      duration: 0.9,
      ease: "power4.out",
    },
    "<.2",
  )
  .from(".eye", { opacity: 0, y: 20, duration: 0.8 }, "<.1")
  .from(
    ".ln b",
    {
      yPercent: 115,
      rotation: 5,
      stagger: 0.1,
      duration: 1.2,
      ease: "power4.out",
    },
    "<",
  )
  .from(".hd", { opacity: 0, y: 30, stagger: 0.12, duration: 0.9 }, "-=.8")
  .from(
    "#stage",
    { opacity: 0, y: 24, duration: 1.2, ease: "power3.out" },
    "<-.6",
  )
  .from(".vl", { scaleY: 0, transformOrigin: "top", duration: 1.4 }, "<")
  .from(".tag,.scr", { opacity: 0, y: 16, duration: 0.8 }, "-=1");
addEventListener("load", () => ScrollTrigger.refresh());
