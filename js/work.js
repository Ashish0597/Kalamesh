import {
  Renderer,
  Program,
  Mesh,
  Triangle,
  Plane,
  Texture,
  RenderTarget,
} from "./ogl.min.js";
const wrap = (v, s) => ((((v + s / 2) % s) + s) % s) - s / 2,
  c01 = (v) => Math.min(Math.max(v, 0), 1),
  eoq = (v) => 1 - Math.pow(1 - c01(v), 5);
const eio = (v) => {
  const t = c01(v);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
const TAPS = 12,
  PX = 4.5e6;
const cardV = `#version 300 es
in vec3 position;in vec2 uv;uniform vec4 uRect;uniform vec2 uResolution;out vec2 vUv;out vec2 vLocal;
void main(){vUv=uv;vLocal=vec2(position.x,-position.y)*uRect.zw;vec2 px=uRect.xy+vLocal;gl_Position=vec4(px.x/uResolution.x*2.0-1.0,1.0-px.y/uResolution.y*2.0,0.0,1.0);}`;
const cardF = `#version 300 es
precision highp float;uniform sampler2D tMap;uniform vec2 uSize;uniform vec2 uImage;uniform float uRadius;uniform float uAlpha;uniform float uReady;uniform float uShift;uniform float uDpr;uniform vec3 uPlaceholder;
in vec2 vUv;in vec2 vLocal;out vec4 fragColor;
float rb(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.0))+min(max(q.x,q.y),0.0)-r;}
void main(){float sd=rb(vLocal,uSize*0.5,min(uRadius,min(uSize.x,uSize.y)*0.5));float mask=clamp(0.5-sd*uDpr,0.0,1.0);
vec2 local=vLocal/uSize+0.5;float ca=uSize.x/uSize.y;float ia=uImage.x/max(uImage.y,1.0);
vec2 scale=ia>ca?vec2(ca/ia,1.0):vec2(1.0,ia/ca);scale/=1.08;vec2 uv=vec2(local.x,1.0-local.y);uv=(uv-0.5)*scale+0.5;uv.x+=uShift*(1.0-scale.x)*0.5;
vec3 image=texture(tMap,uv).rgb;vec3 color=mix(uPlaceholder,image,uReady);float alpha=mask*uAlpha;fragColor=vec4(color*alpha,alpha);}`;
const lensV = `#version 300 es
in vec2 position;void main(){gl_Position=vec4(position,0.0,1.0);}`;
const lensF = `#version 300 es
precision highp float;uniform sampler2D tScene;uniform vec2 uResolution;uniform float uDpr;uniform vec2 uCenter;uniform vec2 uHalf;uniform float uAngle;uniform float uExponent;uniform float uInner;uniform float uOuter;uniform float uFlow;uniform float uCurl;uniform float uDispersion;uniform float uStrength;uniform float uSceneAlpha;out vec4 fragColor;
void main(){vec2 frag=gl_FragCoord.xy/uDpr;vec2 uv=frag/uResolution;vec2 rel=frag-vec2(uCenter.x,uResolution.y-uCenter.y);
float ca=cos(uAngle);float sa=sin(uAngle);vec2 local=vec2(ca*rel.x+sa*rel.y,-sa*rel.x+ca*rel.y);
vec2 k=max(abs(local)/uHalf,vec2(1e-5));float nd=pow(pow(k.x,uExponent)+pow(k.y,uExponent),1.0/uExponent);
vec2 grad=pow(k,vec2(uExponent-1.0))*sign(local)/uHalf*pow(nd,1.0-uExponent);float glen=max(length(grad),1e-6);
float edge=(nd-1.0)/glen;vec2 outward=grad/glen;vec2 normal=vec2(ca*outward.x-sa*outward.y,sa*outward.x+ca*outward.y);vec2 along=vec2(-normal.y,normal.x);
float t=clamp((edge+uInner)/(uInner+uOuter),0.0,1.0);float ramp=t*t*t*(t*(t*6.0-15.0)+10.0);float slope=16.0*t*t*(1.0-t)*(1.0-t);
float reachX=rel.x/(uResolution.x*0.5);float side=smoothstep(0.02,0.3,abs(reachX))*(uCurl==0.0?sign(reachX):uCurl);
float lift=ramp*side*uFlow*uStrength;vec2 swirl=along*along.y*side*slope*uFlow*uStrength*0.35;vec2 drift=vec2(0.0,-lift)-swirl;vec2 shifted=uv+drift/uResolution;
vec2 texels=uResolution*uDpr;vec2 gx=dFdx(shifted);vec2 gy=dFdy(shifted);
gx*=min(1.0,3.0/max(length(gx*texels),1e-4));gy*=min(1.0,3.0/max(length(gy*texels),1e-4));
vec4 color=textureGrad(tScene,shifted,gx,gy);vec2 spread=vec2(0.0,side*slope*uFlow*uStrength)/uResolution*uDispersion;float spreadPx=length(spread*texels);
if(color.a>0.002&&spreadPx>0.25){vec3 base=color.rgb/color.a;vec3 sumColor=vec3(0.0);vec3 sumWeight=vec3(0.0);
for(int i=0;i<${TAPS};i++){float s=(float(i)+0.5)/float(${TAPS});vec4 c=textureGrad(tScene,shifted+spread*(s-0.5),gx,gy);
vec3 w=max(1.0-abs(vec3(s)-vec3(0.15,0.5,0.85))*2.6,0.0)*c.a;sumColor+=c.rgb*(w/max(c.a,0.002));sumWeight+=w;}
vec3 split=mix(base,sumColor/max(sumWeight,vec3(1e-4)),clamp(sumWeight*2.0,0.0,1.0));
color.rgb=mix(color.rgb,clamp(split,0.0,1.0)*color.a,smoothstep(0.25,1.5,spreadPx));}
fragColor=color*uSceneAlpha;}`;

/* Same settings as the "liquid" preset of FlexCarousel */
const S = {
  cardHeight: 0.5,
  gap: 14,
  radius: 14,
  fit: "natural",
  lensWidth: 0.74,
  lensHeight: 1.18,
  tilt: 62,
  roundness: 1,
  bend: 0.34,
  reach: 0.38,
  curl: 0,
  dispersion: 0.45,
  squeeze: 0.2,
};

export function mount(container, items) {
  const renderer = new Renderer({
    dpr: Math.min(devicePixelRatio || 1, 2),
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
  });
  const gl = renderer.gl;
  if (!renderer.isWebgl2) throw new Error("webgl2");
  gl.clearColor(0, 0, 0, 0);
  const canvas = gl.canvas;
  Object.assign(canvas.style, {
    display: "block",
    width: "100%",
    height: "100%",
  });
  container.prepend(canvas);
  const cp = new Program(gl, {
    vertex: cardV,
    fragment: cardF,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      tMap: { value: new Texture(gl) },
      uRect: { value: [0, 0, 1, 1] },
      uResolution: { value: [1, 1] },
      uSize: { value: [1, 1] },
      uImage: { value: [1, 1] },
      uRadius: { value: 16 },
      uAlpha: { value: 1 },
      uReady: { value: 0 },
      uShift: { value: 0 },
      uDpr: { value: 1 },
      uPlaceholder: { value: [0.5, 0.5, 0.5] },
    },
  });
  cp.setBlendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  const cardMesh = new Mesh(gl, { geometry: new Plane(gl), program: cp });
  const target = new RenderTarget(gl, {
    width: 2,
    height: 2,
    depth: false,
    minFilter: gl.LINEAR_MIPMAP_LINEAR,
    magFilter: gl.LINEAR,
  });
  const LU = {
    tScene: { value: target.texture },
    uResolution: { value: [1, 1] },
    uDpr: { value: 1 },
    uCenter: { value: [0, 0] },
    uHalf: { value: [1, 1] },
    uAngle: { value: 0 },
    uExponent: { value: 2 },
    uInner: { value: 60 },
    uOuter: { value: 80 },
    uFlow: { value: 0 },
    uCurl: { value: 0 },
    uDispersion: { value: 0 },
    uStrength: { value: 0 },
    uSceneAlpha: { value: 0 },
  };
  const lensMesh = new Mesh(gl, {
    geometry: new Triangle(gl),
    program: new Program(gl, {
      vertex: lensV,
      fragment: lensF,
      uniforms: LU,
      depthTest: false,
      depthWrite: false,
    }),
  });
  const aniso = renderer.getExtension("EXT_texture_filter_anisotropic") ? 8 : 0;

  /* caption (title + link + rolling counter) */
  const cap = document.createElement("div");
  cap.className = "fc-cap";
  cap.innerHTML =
    '<span class="fc-t"></span><span class="fc-n"><span class="fc-d"><span class="fc-r"></span></span><span class="fc-d"><span class="fc-r"></span></span><span>/</span><span>' +
    String(items.length).padStart(2, "0") +
    "</span></span>";
  container.appendChild(cap);
  const reels = [...cap.querySelectorAll(".fc-r")];
  reels.forEach(
    (r) =>
      (r.innerHTML = "0123456789"
        .split("")
        .map((n) => `<span>${n}</span>`)
        .join("")),
  );
  const setCap = (i) => {
    const it = items[i],
      t = cap.querySelector(".fc-t"),
      n = t.cloneNode(false);
    n.className = "fc-t";
    n.innerHTML =
      `${it.title}<small>${it.subtitle || ""}</small>` +
      (it.href
        ? `<a class="fc-l" href="${it.href}" target="_blank" rel="noopener">View project ↗</a>`
        : "");
    t.replaceWith(n);
    String(i + 1)
      .padStart(2, "0")
      .split("")
      .forEach(
        (d, k) => (reels[k].style.transform = `translateY(${-d * 10}%)`),
      );
  };

  let slots = [],
    width = 1,
    height = 1,
    pos = 0,
    vel = 0,
    goal = 0,
    mode = "spring",
    wheelAt = 0,
    raf = 0,
    last = performance.now(),
    visible = true,
    alive = true,
    dirty = true,
    activeIndex = -1,
    layout = null,
    resnap = false,
    lift = 1,
    energy = 0,
    lastPos = 0,
    instances = [];
  const pointer = {
    x: 0,
    y: 0,
    down: false,
    id: -1,
    startX: 0,
    startY: 0,
    startPos: 0,
    dragging: false,
    touch: false,
    samples: [],
  };
  const intro = { t: 0, running: false, done: false, readyAt: 0 },
    focus = { index: -1, pending: -1, t: 0, v: 0, target: 0 };

  const load = (item, index) => {
    const texture = new Texture(gl, {
      generateMipmaps: true,
      minFilter: gl.LINEAR_MIPMAP_LINEAR,
      magFilter: gl.LINEAR,
      anisotropy: aniso,
    });
    const slot = {
      item,
      index,
      texture,
      aspect: 0.8,
      loaded: false,
      failed: false,
      ready: 0,
      color: [0.5, 0.5, 0.5],
      image: [1, 1],
      dispose: () => {},
    };
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => {
      if (!alive || !slots.includes(slot)) return;
      texture.image = img;
      texture.update();
      slot.image = [img.naturalWidth || 1, img.naturalHeight || 1];
      slot.aspect = slot.image[0] / slot.image[1];
      try {
        const p = document.createElement("canvas");
        p.width = p.height = 8;
        const x = p.getContext("2d", { willReadFrequently: true });
        x.drawImage(img, 0, 0, 8, 8);
        const d = x.getImageData(0, 0, 8, 8).data,
          a = [0, 0, 0];
        for (let i = 0; i < d.length; i += 4) {
          a[0] += d[i];
          a[1] += d[i + 1];
          a[2] += d[i + 2];
        }
        slot.color = a.map((v) => v / 64 / 255);
      } catch {
        /* ignore: colour probe / pointer capture are optional */
      }
      slot.loaded = true;
      dirty = true;
      start();
    };
    img.onerror = () => {
      if (!alive) return;
      slot.failed = true;
      dirty = true;
      start();
    };
    img.src = item.src;
    slot.dispose = () => {
      img.onload = img.onerror = null;
      gl.deleteTexture(texture.texture);
    };
    return slot;
  };

  const metrics = () => {
    const cardH = Math.max(24, S.cardHeight * height),
      widths = slots.map((s) => s.aspect * cardH),
      centers = [];
    let cur = 0;
    for (let i = 0; i < widths.length; i++) {
      centers.push(cur + widths[i] / 2);
      cur += widths[i] + S.gap;
    }
    return { cardH, widths, centers, gap: S.gap, loop: Math.max(cur, 1) };
  };
  const nearest = (m, at) => {
    let b = 0,
      bd = Infinity;
    for (let i = 0; i < m.centers.length; i++) {
      const d = Math.abs(wrap(m.centers[i] - at, m.loop));
      if (d < bd) {
        bd = d;
        b = i;
      }
    }
    return b;
  };
  const snap = (m, at) => {
    const i = nearest(m, at);
    return at + wrap(m.centers[i] - at, m.loop);
  };
  const remap = (f, t, at) => {
    const i = nearest(f, at),
      o = wrap(at - f.centers[i], f.loop),
      cy = Math.round((at - o - f.centers[i]) / f.loop);
    return cy * t.loop + t.centers[i] + o * (t.widths[i] / f.widths[i]);
  };
  const step = (m, delta) => {
    let at = snap(m, goal),
      i = nearest(m, at);
    const n = m.centers.length;
    for (let k = 0; k < Math.abs(delta); k++) {
      const nx = (i + (delta > 0 ? 1 : n - 1)) % n;
      at +=
        delta > 0
          ? m.widths[i] / 2 + m.gap + m.widths[nx] / 2
          : -(m.widths[nx] / 2 + m.gap + m.widths[i] / 2);
      i = nx;
    }
    goal = at;
    mode = "spring";
    dirty = true;
    start();
  };
  const goTo = (i) => {
    const m = metrics(),
      k = ((i % m.centers.length) + m.centers.length) % m.centers.length;
    goal = goal + wrap(m.centers[k] - goal, m.loop);
    mode = "spring";
    dirty = true;
    start();
  };
  const openFocus = (i) => {
    focus.index = i;
    focus.pending = -1;
    focus.target = 1;
    cap.classList.add("zoom");
    dirty = true;
    start();
  };
  const closeFocus = () => {
    focus.pending = -1;
    if (!focus.target) return false;
    focus.target = 0;
    cap.classList.remove("zoom");
    dirty = true;
    start();
    return true;
  };

  const fx = () => {
    const t = intro.running ? intro.t : intro.done ? 1 : 0,
      e = { sa: 1, st: 1, card: null };
    if (!intro.done && !intro.running) {
      e.sa = 0;
      e.st = 0;
      return e;
    }
    if (t >= 1) return e;
    e.st = eio((t - 0.3) / 0.65);
    e.card = (rel) => {
      const d = Math.min(Math.abs(rel) / (width * 0.6), 1) * 0.34,
        l = c01((t - d) / 0.6);
      return {
        alpha: c01(l * 4),
        x: 0,
        y: (1 - eoq(l)) * height * 0.62,
        scale: 0.5 + 0.5 * eio((l - 0.18) / 0.82),
      };
    };
    return e;
  };

  const resize = () => {
    width = Math.max(1, container.clientWidth);
    height = Math.max(1, container.clientHeight);
    renderer.dpr = Math.min(
      devicePixelRatio || 1,
      2,
      Math.sqrt(PX / (width * height)),
    );
    renderer.setSize(width, height);
    target.setSize(
      Math.max(2, Math.round(width * renderer.dpr)),
      Math.max(2, Math.round(height * renderer.dpr)),
    );
    LU.tScene.value = target.texture;
    dirty = true;
    start();
  };

  const frame = (now) => {
    raf = 0;
    if (!alive) return;
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1e3));
    last = now;
    if (!slots.length) {
      if (visible) raf = requestAnimationFrame(frame);
      return;
    }
    const m = metrics(),
      n = slots.length;
    let anim = false;
    if (resnap) {
      goal = snap(m, goal);
      pos = goal;
      vel = 0;
      resnap = false;
    } else if (layout && layout.loop !== m.loop) {
      pos = remap(layout, m, pos);
      goal = remap(layout, m, goal);
      pointer.startPos = pos + (pointer.x - pointer.startX);
      anim = true;
    }
    layout = m;
    if (
      !intro.running &&
      !intro.done &&
      (slots.every((s) => s.loaded || s.failed) || now - intro.readyAt > 3500)
    ) {
      goal = snap(m, goal);
      pos = goal;
      intro.running = true;
      intro.t = 0;
    }
    if (intro.running) {
      intro.t = Math.min(1, intro.t + dt / 2.1);
      if (intro.t >= 1) {
        intro.running = false;
        intro.done = true;
        cap.classList.add("on");
      }
      anim = true;
    }
    if (mode === "wheel" && now - wheelAt > 150) {
      goal = snap(m, goal);
      mode = "spring";
    }
    if (!pointer.dragging) {
      const k = mode === "wheel" ? 80 : 55,
        c = 2 * Math.sqrt(k),
        steps = Math.ceil(dt / (1 / 240)),
        h = dt / steps;
      for (let i = 0; i < steps; i++) {
        vel += (k * (goal - pos) - c * vel) * h;
        pos += vel * h;
      }
      if (Math.abs(goal - pos) < 0.05 && Math.abs(vel) < 0.5) {
        pos = goal;
        vel = 0;
      } else anim = true;
    } else anim = true;
    if (Math.abs(pos) > m.loop * 8) {
      const sh = Math.round(pos / m.loop) * m.loop;
      pos -= sh;
      goal -= sh;
      pointer.startPos -= sh;
    }
    const cur = nearest(m, pos);
    if (cur !== activeIndex) {
      activeIndex = cur;
      setCap(cur);
    }
    if (
      focus.pending >= 0 &&
      mode === "spring" &&
      Math.abs(goal - pos) < 1.5 &&
      Math.abs(vel) < 30
    ) {
      if (cur === focus.pending) openFocus(cur);
      else focus.pending = -1;
    }
    const travel = Math.abs(pos - lastPos) / dt;
    lastPos = pos;
    const et = Math.min(travel / 2600, 1);
    energy += (et - energy) * (1 - Math.exp(-dt / (et > energy ? 0.07 : 0.35)));
    if (energy > 0.001) anim = true;
    focus.v += (64 * (focus.target - focus.t) - 2 * 8 * focus.v) * dt;
    focus.t += focus.v * dt;
    if (
      Math.abs(focus.target - focus.t) < 0.0005 &&
      Math.abs(focus.v) < 0.001
    ) {
      focus.t = focus.target;
      focus.v = 0;
    } else anim = true;
    const fa = c01(focus.t),
      fe = eio(fa),
      fw =
        focus.index >= 0 && focus.index < n ? m.widths[focus.index] : m.cardH,
      fs = Math.max(
        1,
        Math.min(1.3, (height * 0.84) / m.cardH, (width * 0.92) / fw),
      ),
      nl = 1 + (fs - 1) * fe;
    if (Math.abs(nl - lift) > 0.0005) {
      lift = nl;
      container.style.setProperty("--fc-lift", lift.toFixed(4));
    }
    const e = fx(),
      hx = width / 2,
      hy = height / 2,
      halfW = (S.lensWidth * width) / 2,
      halfH = (S.lensHeight * width) / 2;
    for (const s of slots)
      if (s.loaded && s.ready < 1) {
        s.ready = Math.min(1, s.ready + dt / 0.45);
        anim = true;
      }
    const waiting = !intro.done;
    if (dirty || anim || pointer.dragging) {
      dirty = false;
      instances = [];
      const dpr = renderer.dpr;
      cp.uniforms.uResolution.value = [width, height];
      cp.uniforms.uDpr.value = dpr;
      cp.uniforms.uRadius.value = S.radius;
      const shrink = 1 - S.squeeze * energy,
        draws = [];
      for (let i = 0; i < n; i++) {
        const w = m.widths[i],
          br = wrap(m.centers[i] - pos, m.loop);
        for (let k = -3; k <= 3; k++) {
          const rel = br + k * m.loop;
          if (Math.abs(rel) - w / 2 > width + 40) continue;
          const f = e.card ? e.card(rel) : null;
          let x = hx + rel + (f ? f.x : 0),
            sc = shrink * (f ? f.scale : 1),
            al = f ? f.alpha : 1;
          if (fa > 0) {
            if (i === focus.index && Math.abs(rel) < w) sc *= 1 + (fs - 1) * fe;
            else {
              const o = Math.min(Math.abs(rel) / width, 1) * 0.25,
                p = eio(fa * 1.25 - o);
              x += Math.sign(rel) * p * width * 0.7;
              al *= 1 - p;
            }
          }
          const cw = w * sc;
          if (al <= 0.001 || x + cw / 2 < -40 || x - cw / 2 > width + 40)
            continue;
          draws.push({
            i,
            rel,
            x,
            y: hy + (f ? f.y : 0),
            cw,
            ch: m.cardH * sc,
            alpha: al,
          });
        }
      }
      draws.sort((a, b) => Math.abs(b.rel) - Math.abs(a.rel));
      let first = true;
      for (const d of draws) {
        const s = slots[d.i];
        const u = cp.uniforms;
        u.tMap.value = s.texture;
        u.uRect.value = [d.x, d.y, d.cw + 2, d.ch + 2];
        u.uSize.value = [d.cw, d.ch];
        u.uImage.value = s.image;
        u.uAlpha.value = d.alpha;
        u.uReady.value = s.ready;
        u.uShift.value = Math.max(-1, Math.min(1, d.rel / (width * 0.75)));
        u.uPlaceholder.value = s.color;
        renderer.render({ scene: cardMesh, target, clear: first });
        first = false;
        instances.push({
          index: d.i,
          x0: d.x - d.cw / 2,
          x1: d.x + d.cw / 2,
          y0: d.y - d.ch / 2,
          y1: d.y + d.ch / 2,
        });
      }
      if (first) {
        renderer.bindFramebuffer(target);
        gl.viewport(0, 0, target.width, target.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      renderer.bindFramebuffer();
      target.texture.bind();
      gl.generateMipmap(gl.TEXTURE_2D);
      LU.uResolution.value = [width, height];
      LU.uDpr.value = dpr;
      LU.uCenter.value = [hx, hy];
      LU.uHalf.value = [Math.max(halfW, 1), Math.max(halfH, 1)];
      LU.uAngle.value = (S.tilt * Math.PI) / 180;
      LU.uExponent.value = 2 + Math.pow(1 - c01(S.roundness), 1.5) * 10;
      const sw = Math.max(halfW, 1),
        sh = Math.max(halfH, 1),
        inner = Math.max(4, S.reach * (sw + sh) * 0.5);
      LU.uInner.value = inner;
      LU.uOuter.value = inner * 1.6;
      LU.uFlow.value = S.bend * (sw + sh) * 0.45;
      LU.uCurl.value = S.curl;
      LU.uDispersion.value = S.dispersion * 0.12;
      LU.uStrength.value = e.st * (1 - fe);
      LU.uSceneAlpha.value = e.sa;
      renderer.render({ scene: lensMesh });
    }
    if (visible && (anim || waiting || dirty || pointer.down))
      raf = requestAnimationFrame(frame);
  };
  const start = () => {
    if (raf || !visible || !alive) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };

  const lp = (e) => {
    const r = container.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  const down = (e) => {
    if (e.button > 0) return;
    if (intro.running) intro.t = 1;
    const [x, y] = lp(e);
    Object.assign(pointer, {
      down: true,
      id: e.pointerId,
      touch: e.pointerType === "touch",
      startX: x,
      startY: y,
      x,
      y,
      startPos: pos,
      dragging: false,
      samples: [{ x, t: performance.now() }],
    });
    if (Math.abs(vel) > 40) {
      goal = pos;
      vel = 0;
    }
    dirty = true;
    start();
  };
  const move = (e) => {
    const [x, y] = lp(e);
    pointer.x = x;
    pointer.y = y;
    if (pointer.down && e.pointerId === pointer.id) {
      const dx = x - pointer.startX,
        dy = y - pointer.startY,
        slop = pointer.touch ? 10 : 5;
      if (!pointer.dragging) {
        if (
          pointer.touch &&
          Math.abs(dy) > slop &&
          Math.abs(dy) > Math.abs(dx)
        ) {
          pointer.down = false;
          return;
        }
        if (Math.abs(dx) > slop) {
          pointer.dragging = true;
          pointer.startX = x;
          pointer.startPos = pos;
          closeFocus();
          try {
            container.setPointerCapture(e.pointerId);
          } catch {
            /* ignore: colour probe / pointer capture are optional */
          }
          container.setAttribute("data-dragging", "");
        }
      }
      if (pointer.dragging) {
        pos = pointer.startPos - (x - pointer.startX);
        goal = pos;
        vel = 0;
        const now = performance.now();
        pointer.samples.push({ x, t: now });
        while (pointer.samples.length > 2 && now - pointer.samples[0].t > 100)
          pointer.samples.shift();
      }
    }
    dirty = true;
    start();
  };
  const up = (e) => {
    if (!pointer.down || e.pointerId !== pointer.id) return;
    pointer.down = false;
    container.removeAttribute("data-dragging");
    const m = metrics();
    if (pointer.dragging) {
      pointer.dragging = false;
      const now = performance.now(),
        a = pointer.samples[0],
        b = pointer.samples[pointer.samples.length - 1];
      let v = 0;
      if (a && b && b.t > a.t && now - b.t < 70)
        v = -((b.x - a.x) / (b.t - a.t)) * 1e3;
      vel = v;
      const land = snap(m, pos + v * 0.32);
      goal = land;
      if (Math.abs(v) > 400 && Math.abs(land - pos) < 1)
        step(m, v > 0 ? 1 : -1);
      mode = "spring";
      start();
      return;
    }
    if (closeFocus()) return;
    const [x, y] = lp(e),
      hit = instances.find(
        (i) => x >= i.x0 && x <= i.x1 && y >= i.y0 && y <= i.y1,
      );
    if (!hit) return;
    if (hit.index === activeIndex && Math.abs(goal - pos) < 2)
      openFocus(hit.index);
    else {
      goal = snap(m, pos + (hit.x0 + hit.x1) / 2 - width / 2);
      mode = "spring";
      focus.pending = hit.index;
      start();
    }
  };
  const cancel = () => {
    pointer.down = pointer.dragging = false;
    container.removeAttribute("data-dragging");
    goal = snap(metrics(), pos);
    mode = "spring";
    start();
  };
  const wheel = (e) => {
    if (e.ctrlKey) return;
    let dx = e.deltaX;
    if (Math.abs(dx) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    if (closeFocus()) return;
    goal +=
      Math.max(-120, Math.min(120, dx * (e.deltaMode === 1 ? 16 : 1))) * 1.25;
    mode = "wheel";
    wheelAt = performance.now();
    start();
  };
  const key = (e) => {
    const m = metrics();
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      closeFocus();
      step(m, 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      closeFocus();
      step(m, -1);
    } else if (e.key === "Escape") {
      if (closeFocus()) e.preventDefault();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!closeFocus() && activeIndex >= 0) openFocus(activeIndex);
    }
  };
  container.addEventListener("pointerdown", down);
  container.addEventListener("pointermove", move);
  container.addEventListener("pointerup", up);
  container.addEventListener("pointercancel", cancel);
  container.addEventListener("wheel", wheel, { passive: false });
  container.addEventListener("keydown", key);
  new ResizeObserver(resize).observe(container);
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    start();
  }).observe(container);
  resize();
  let began = false;
  /* images are only fetched when begin() is called (just before the section is reached) */
  const begin = () => {
    if (began) return;
    began = true;
    slots = items.map(load);
    resnap = true;
    intro.readyAt = performance.now();
    start();
  };
  return { goTo, closeFocus, begin };
}

/* items are read from the <img> list (#wl) in index.html */
const items = [...document.querySelectorAll("#wl a")].map((a) => ({
  src: a.querySelector("img").src,
  title: a.dataset.title,
  subtitle: a.dataset.sub,
  href: a.getAttribute("href") === "#" ? "" : a.href,
}));
const box = document.getElementById("fc");
try {
  const eng = mount(box, items);
  let cur = 0;
  ScrollTrigger.create({
    trigger: "#wk",
    start: "top top",
    end: () => "+=" + innerHeight * items.length * 0.5,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (s) => {
      const i = Math.round(s.progress * (items.length - 1));
      if (i !== cur) {
        cur = i;
        eng.closeFocus();
        eng.goTo(i);
      }
    },
  });
  ScrollTrigger.refresh();
  new IntersectionObserver(
    (e, o) => {
      if (e[0].isIntersecting) {
        eng.begin();
        o.disconnect();
      }
    },
    { rootMargin: "200% 0px" },
  ).observe(box);
  const later = () => setTimeout(eng.begin, 3500);
  document.readyState === "complete"
    ? later()
    : addEventListener("load", later);
} catch {
  box.classList.add("fb");
  box.innerHTML = items
    .map((i) => `<img src="${i.src}" alt="${i.title}">`)
    .join("");
}
