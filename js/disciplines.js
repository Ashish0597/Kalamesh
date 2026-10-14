/* =====================================================================
   WHAT WE DO — opens a full-screen view for each discipline.
   1) EDIT YOUR TEXT in `content` below.
   2) PUT YOUR OWN IMAGES / VIDEOS for Visualisation in `WORK` below.
   ===================================================================== */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------
     VISUALISATION WORK  —  paste your own files here.
       type   : "image" or "video"
       src    : image path/URL, or video file (mp4 recommended, keep it short & compressed)
       poster : (video only) a still image shown before the video plays
       title  : name shown on hover
       tag    : small label (e.g. "3D / CGI")
       cat    : "cgi" | "production" | "spatial"   (used by the filter buttons)
       ratio  : shape of the tile, e.g. "4/5" (portrait), "1/1", "3/2", "16/9"
     Add as many items as you like — the grid adapts to every screen.
     --------------------------------------------------------------- */
  const U = (id, w = 900) =>
    `https://images.unsplash.com/${id}?w=${w}&q=75&auto=format&fit=max`;
  const WORK = [
    {
      type: "image",
      src: U("photo-1737071371043-761e02b1ef95"),
      title: "Iridescence",
      tag: "3D / CGI",
      cat: "cgi",
      ratio: "4/5",
    },
    {
      type: "video",
      src: "videos/video1.mp4",
      poster: U("photo-1770249196550-ff6c641165cb"),
      title: "Automaton — motion study",
      tag: "Motion",
      cat: "production",
      ratio: "16/10",
    },
    {
      type: "video",
       src: "videos/video3.mp4",
      title: "Liquid Metal",
      tag: "3D / CGI",
      cat: "cgi",
      ratio: "1/1",
    },
    {
      type: "image",
      src: U("photo-1747191092806-c7da11881986"),
      title: "Clay Study",
      tag: "Visual production",
      cat: "production",
      ratio: "4/5",
    },
    {
      type: "image",
      src: U("photo-1693645325828-62cd35c8da8f"),
      title: "White Room",
      tag: "Spatial concept",
      cat: "spatial",
      ratio: "3/2",
    },
    {
      type: "video",
      src: "videos/video2.mp4",
      poster: U("photo-1787181875088-087d612262a7"),
      title: "Obsidian",
      tag: "CGI film",
      cat: "cgi",
      ratio: "4/5",
    },
    {
      type: "image",
      src: U("photo-1786835568925-20cd20007ed0"),
      title: "Three Forms",
      tag: "3D / CGI",
      cat: "cgi",
      ratio: "1/1",
    },
    {
      type: "image",
      src: U("photo-1770062422885-2dfcbe8fb65b"),
      title: "Poise",
      tag: "Visual production",
      cat: "production",
      ratio: "4/5",
    },
    {
      type: "image",
      src: U("photo-1726910133626-9b573eca70ff"),
      title: "Fins",
      tag: "Digital scene",
      cat: "spatial",
      ratio: "3/2",
    },
  ];
  const FILTERS = [
    ["all", "All"],
    ["cgi", "3D & CGI"],
    ["production", "Visual production"],
    ["spatial", "Digital & spatial"],
  ];

  /* ---------------------------------------------------------------
     TEXT CONTENT (art = which themed illustration the card uses)
     --------------------------------------------------------------- */
  const content = {
    gtm: {
      number: "01",
      title: "GO-TO-MARKET",
      kicker: "STRATEGY / MARKET ENTRY",
      intro:
        "We turn market understanding into a clear launch direction — who to reach, what to say, where to show up and how to grow.",
      approach: "Insight → Direction → Action.",
      footer: "Let's find your way in.",
      steps: [
        "Understand the market",
        "Define the opportunity",
        "Activate the plan",
      ],
      hero: "map",
      heroV: "light",
      strip: "road",
      projects: [
        {
          type: "MARKET RESEARCH & POSITIONING",
          title: "Find the whitespace.",
          copy: "Map customer needs, competitor claims and unmet demand. Turn the findings into a focused audience and a differentiated value proposition.",
          tags: ["Audience definition", "Competitor map", "Positioning"],
          art: "map",
          v: "light",
          top: "STRATEGY / 01",
          bottom: "MARKET MAP / AUDIENCE SIGNALS",
          lines: ["Find the", "right market."],
        },
        {
          type: "PRODUCT LAUNCH & COMMUNICATION",
          title: "Make the entrance count.",
          copy: "Shape the launch story, key messages, campaign concept and channel sequence so every touchpoint works toward the same goal.",
          tags: ["Launch narrative", "Channel plan", "Campaign direction"],
          art: "launch",
          v: "red",
          top: "LAUNCH / 02",
          bottom: "CAMPAIGN CONCEPT / LAUNCH DIRECTION",
          lines: ["MAKE", "YOUR", "MOVE."],
        },
        {
          type: "ACQUISITION & GROWTH SYSTEM",
          title: "Build a repeatable path.",
          copy: "Connect acquisition channels, conversion touchpoints and success metrics into a practical system that can be tested and improved.",
          tags: ["Channel priorities", "Conversion journey", "KPI framework"],
          art: "funnel",
          v: "dark",
          top: "GROWTH / 03",
          bottom: "CHANNEL MIX / CONVERSION PATH",
          lines: ["REACH", "ENGAGE", "CONVERT"],
        },
      ],
    },
    branding: {
      number: "02",
      title: "BRANDING",
      kicker: "IDENTITY / MEANING / MEMORY",
      intro:
        "We build brands with a clear point of view — from strategic foundations and verbal identity to distinctive visual systems people recognise and remember.",
      approach: "Meaning → Identity → Consistency.",
      footer: "Let's make it recognisable.",
      steps: [
        "Define the brand position",
        "Create the identity system",
        "Build consistency at every touchpoint",
      ],
      hero: "logo",
      heroV: "light",
      strip: "swatches",
      projects: [
        {
          type: "BRAND STRATEGY",
          title: "Find the point of difference.",
          copy: "Clarify purpose, audience, category context and the space the brand can credibly own.",
          tags: ["Brand platform", "Audience insight", "Positioning"],
          art: "logo",
          v: "light",
          top: "STRATEGY / 01",
          bottom: "POSITION / PURPOSE / PROMISE",
          lines: ["Own a", "point of", "view."],
        },
        {
          type: "VISUAL IDENTITY",
          title: "Give the idea a form.",
          copy: "Develop a distinctive identity through typography, colour, graphic language and an adaptable design system.",
          tags: ["Art direction", "Identity system", "Design language"],
          art: "type",
          v: "red",
          top: "IDENTITY / 02",
          bottom: "TYPE / COLOUR / FORM",
          lines: ["MAKE", "IT", "KNOWN."],
        },
        {
          type: "VERBAL IDENTITY & GUIDELINES",
          title: "Make every expression feel connected.",
          copy: "Build the voice, messaging principles and practical brand guidelines that keep every interaction coherent.",
          tags: ["Tone of voice", "Messaging", "Brand guidelines"],
          art: "system",
          v: "dark",
          top: "SYSTEM / 03",
          bottom: "ONE BRAND / MANY TOUCHPOINTS",
          lines: ["SAY IT", "WITH", "PURPOSE"],
        },
      ],
    },
    marketing: {
      number: "03",
      title: "MARKETING",
      kicker: "CAMPAIGNS / CONTENT / CONNECTION",
      intro:
        "We turn brand direction into communication people notice — connecting the right message, creative idea and channel to a clear business objective.",
      approach: "Audience → Idea → Activation.",
      footer: "Let's make the message move.",
      steps: [
        "Understand the audience",
        "Create the campaign idea",
        "Activate, measure and refine",
      ],
      hero: "board",
      heroV: "light",
      strip: "ticker",
      projects: [],
    },
    visualisation: {
      number: "04",
      title: "VISUALISATION",
      kicker: "3D / CGI / DIGITAL EXPERIENCES",
      intro:
        "We make ideas tangible through visual worlds, CGI, digital experiences and spatial concepts — helping people see a possibility before it exists.",
      approach: "Concept → Craft → Experience.",
      footer: "Let's bring the idea to life.",
      steps: [
        "Shape the visual concept",
        "Build the world and details",
        "Deliver the experience",
      ],
      hero: "cube",
      heroV: "dark",
      strip: null,
      projects: [
        {
          type: "3D & CGI",
          title: "Make the unreal feel real.",
          copy: "Develop crafted 3D imagery and CGI scenes for products, places and concepts that need to be seen from a new perspective.",
          tags: ["3D direction", "CGI scenes", "Product imagery"],
        },
        {
          type: "VISUAL PRODUCTION",
          title: "Create a world around the idea.",
          copy: "Bring together composition, lighting, motion and art direction to create a consistent visual story across formats.",
          tags: ["Art direction", "Motion studies", "Visual system"],
        },
        {
          type: "DIGITAL & SPATIAL EXPERIENCES",
          title: "Let people step inside the concept.",
          copy: "Explore spatial narratives and digital experiences that translate complex ideas into clear, memorable encounters.",
          tags: ["Spatial concept", "Experience design", "Digital scenes"],
        },
      ],
    },
  };
  const KEYS = Object.keys(content);

  /* ---------- themed illustrations (pure CSS, no images needed) ---------- */
  const dots = (l) =>
    l
      .map(
        ([x, y, h]) =>
          `<i class="dot${h ? " hot" : ""}" style="left:${x}%;top:${y}%"></i>`,
      )
      .join("");
  const ART = {
    map: () =>
      `<div class="art-layer a-map"><i class="ring"></i><i class="ring"></i><i class="ring"></i><i class="axis x"></i><i class="axis y"></i>${dots(
        [
          [22, 30],
          [70, 24],
          [78, 52],
          [30, 62],
          [56, 40],
          [44, 22],
          [64, 66],
          [18, 50],
          [84, 34, 1],
        ],
      )}</div>`,
    launch: () =>
      `<div class="art-layer a-launch"><span style="--h:30%"><b>T−30</b></span><span style="--h:55%"><b>T−0</b></span><span class="hot" style="--h:90%"><b>T+30</b></span></div>`,
    funnel: () =>
      `<div class="art-layer a-funnel"><span style="--w:100%">Reach</span><span style="--w:74%">Engage</span><span style="--w:50%">Convert</span></div>`,
    logo: () =>
      `<div class="art-layer a-logo"><i class="guide"></i><span class="mark">K</span></div>`,
    type: () =>
      `<div class="art-layer a-type"><b>Aa</b><div><span>Display 500 · −6.5%</span><span>Body 400 · 1.7</span></div></div>`,
    system: () =>
      `<div class="art-layer a-system"><span style="--c:#ff0000"></span><span style="--c:#000"></span><span style="--c:#f8f8f8"></span><span style="--c:#3c3c3c"></span><i></i><i></i></div>`,
    board: () =>
      `<div class="art-layer a-board"><div class="board">MAKE<br>THEM<br>LOOK.</div><i class="leg"></i><i class="leg r"></i></div>`,
    feed: () =>
      `<div class="art-layer a-feed">${Array.from({ length: 12 }, (_, i) => `<span class="t${i % 4}"></span>`).join("")}</div>`,
    bars: () =>
      `<div class="art-layer a-bars">${[22, 34, 30, 52, 64, 90].map((h, i) => `<span class="${i === 5 ? "hot" : ""}" style="--h:${h}%"></span>`).join("")}</div>`,
    cube: () =>
      `<div class="art-layer a-cube"><div class="cube"><i>K</i><i></i><i></i><i></i><i></i><i></i></div></div>`,
  };

  const card = (p) => `<article class="project-card">
    <div class="project-art project-art--${p.v}">
      <span class="art-top">${p.top}</span>${ART[p.art]()}
      <div class="art-copy">${p.lines.map((l, i) => `<div>${i === p.lines.length - 1 ? `<em>${l}</em>` : l}</div>`).join("")}</div>
      <span class="art-bottom">${p.bottom}</span>
    </div>
    <p class="project-type">${p.type}</p><h3>${p.title}</h3><p class="project-card__copy">${p.copy}</p>
    <div class="deliverables">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
  </article>`;

  const STRIPS = {
    road: () =>
      `<div class="strip strip--road">${["Research", "Position", "Launch", "Grow"].map((s, i) => `<span><b>0${i + 1}</b>${s}</span>`).join("")}</div>`,
    swatches: () =>
      `<div class="strip strip--swatches">${[
        ["Red", "#FF0000", "#fff"],
        ["Black", "#000000", "#fff"],
        ["White", "#F8F8F8", "#000"],
        ["Grey", "#3C3C3C", "#fff"],
      ]
        .map(
          ([n, h, t]) => `<span style="--c:${h};--t:${t}">${n}<br>${h}</span>`,
        )
        .join("")}</div>`,
    ticker: () => {
      const w = ["Campaign", "Content", "Media", "Performance", "Film", "OOH"]
        .map((s) => `<span>${s} ✦</span>`)
        .join("");
      return `<div class="strip strip--ticker" aria-hidden="true"><div>${w}${w}</div></div>`;
    },
  };

  const media = (
    it,
    i,
  ) => `<button type="button" class="media-item" data-i="${i}" data-cat="${it.cat}" style="--ratio:${it.ratio || "4/5"}" aria-label="Open ${it.title}">
    ${it.type === "video" ? `<video muted loop playsinline preload="none" poster="${it.poster || ""}" data-src="${it.src}"></video><span class="media-play">▶ Video</span>` : `<img src="${it.src}" alt="${it.title}" loading="lazy" decoding="async">`}
    <span class="media-cap"><b>${it.title}</b><em>${it.tag}</em></span></button>`;

  /* ---------- elements ---------- */
  const view = $("#portfolioView"),
    panel = $("#viewPanel"),
    bodyEl = $("#viewBody"),
    numEl = $("#viewNumber");
  const rows = $$(".discipline-row");
  const lb = $("#lightbox"),
    lbStage = $("#lbStage"),
    lbCap = $("#lbCap"),
    lbCount = $("#lbCount");
  let current = null,
    lastFocus = null,
    pushed = false,
    videoIO = null,
    lbList = [],
    lbI = 0;

  /* ---------- render one discipline ---------- */
  function render(key) {
    const d = content[key];
    current = key;
    rows.forEach((r) =>
      r.classList.toggle("is-active", r.dataset.discipline === key),
    );
    numEl.textContent = d.number;
    panel.dataset.theme = key;
    const isMedia = key === "visualisation";
    if (key === "branding") {
      bodyEl.innerHTML = `
        <div class="brand-page">
          <section class="brand-hero">
            <div class="brand-hero__copy">
              <p class="view-kicker">BRAND · DESIGN · VISUAL EXPERIENCE STUDIO</p>
              <h1 id="viewTitle">We build what your business <em>has become.</em></h1>
              <p class="brand-lead">For businesses whose ambition has moved faster than the way they are presented to the market — strategy, creative and visual experience brought together to close that gap.</p>
              <div class="brand-actions"><button type="button" data-brand-scroll="brand-work">See the work <span>↘</span></button><a href="mailto:hello@kalamesh.com">Start a project <span>↗</span></a></div>
            </div>
            <div class="brand-hero__image"><img src="./images/brand01.png" alt="Refined contemporary interior with warm materials" loading="eager"><span>IDENTITY / SPACE / EXPERIENCE</span></div>
          </section>
          <div class="brand-ribbon" aria-label="Research, strategy, experience"><span>Research</span><i>—</i><span>Strategy</span><i>—</i><span>Experience</span></div>
          <section class="brand-disciplines">
            <div class="brand-section-heading"><h2>Three disciplines. <em>One visual language.</em></h2><p>Most launches need all three. We make sure the render, the brand and the billboard all look like they came from the same place.</p></div>
            <div class="brand-discipline-grid">
              <article><img src="./images/brand02.png"  alt="Large-format outdoor creative" loading="lazy"><span class="brand-index">01</span><h3>Design</h3><p>Key visuals, hoardings, brochures, newspaper ads, event collateral, social and web.</p></article>
              <article><img src="./images/brand03.png"  alt="Brand identity and visual design materials" loading="lazy"><span class="brand-index">02</span><h3>Branding</h3><p>Positioning, logo, colour and type systems, stationery, packaging and signage.</p></article>
              <article><img src="./images/brand04.png"  alt="Interior visualisation and spatial design" loading="lazy"><span class="brand-index">03</span><h3>3D Visualization</h3><p>Exterior and interior renders, workspaces, hospitality and environment design.</p></article>
            </div>
          </section>
          <section class="brand-work" id="brand-work">
            <p class="view-kicker">SELECTED WORK</p>
            <div class="brand-work-grid">
              <img src="./images/brand01.png"  alt="Warm, editorial interior project" loading="lazy">
              <img src="./images/brand01.png"  alt="Digital design presentation" loading="lazy">
              <img src="./images/brand01.png"  alt="Hospitality space visualisation" loading="lazy">
              <img src="./images/brand01.png"  alt="Stationery and print design" loading="lazy">
              <img src="./images/brand09.png"  alt="Architectural campaign visual" loading="lazy">
              <img src="./images/brand01.png"  alt="Contemporary interior mood and material palette" loading="lazy">
            </div>
          </section>
          <section class="brand-make"><h2>What we make</h2><div class="brand-make-grid">
            <div><h3>Design</h3><ul><li>Statics &amp; carousels</li><li>Newspaper advertisements</li><li>Hoardings &amp; banners</li><li>Brochures</li><li>Standees, stands &amp; invitations</li><li>Website design</li></ul></div>
            <div><h3>Branding</h3><ul><li>Logo design</li><li>Colour &amp; type systems</li><li>Mood boards</li><li>Stationery &amp; packaging</li><li>Signage</li><li>Social feed planning</li></ul></div>
            <div><h3>3D &amp; Visual</h3><ul><li>Exterior &amp; interior renders</li><li>Product design</li><li>Asset design</li><li>Character design</li><li>Environment design</li><li>Digital illustration</li></ul></div>
          </div></section>
          <footer class="brand-end"><div><p class="view-kicker">HAVE A PROJECT IN MIND?</p><h2>Make your next move <em>recognisable.</em></h2></div><a href="mailto:hello@kalamesh.com">START A CONVERSATION <span>↗</span></a></footer>
        </div>`;
      panel.scrollTop = 0;
      const jump = bodyEl.querySelector("[data-brand-scroll]");
      if (jump)
        jump.addEventListener("click", () =>
          bodyEl
            .querySelector("#brand-work")
            ?.scrollIntoView({
              behavior: reduceMotion ? "auto" : "smooth",
              block: "start",
            }),
        );
      stopVideos();
      return;
    }
    const caps = `<div class="cap-list">${d.projects.map((p) => `<article><p class="project-type">${p.type}</p><h3>${p.title}</h3><p>${p.copy}</p><div class="deliverables">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div></article>`).join("")}</div>`;
    const wall = `<div class="media-filter" role="group" aria-label="Filter work">${FILTERS.map(([k, l], i) => `<button type="button" data-f="${k}" class="${i ? "" : "is-on"}">${l}</button>`).join("")}</div><div class="media-wall" id="mediaWall">${WORK.map(media).join("")}</div>`;
    bodyEl.innerHTML = `
      <div class="view-hero">
        <p class="view-kicker">${d.kicker}</p>
        <h1 id="viewTitle">${d.title}<span class="title-period">.</span></h1>
        <div class="view-hero__row">
          <p class="view-intro">${d.intro}</p>
          <div class="project-art project-art--hero project-art--${d.heroV}" aria-hidden="true">${ART[d.hero]()}</div>
        </div>
      </div>
      ${d.strip ? STRIPS[d.strip]() : ""}
      <div class="view-meta"><span>${isMedia ? "SELECTED WORK" : ""}</span><span>${d.number} / 04</span></div>
      ${isMedia ? caps + wall : `<div class="project-grid">${d.projects.map(card).join("")}</div>`}
      ${key === "marketing" && window.caseStudiesHTML ? window.caseStudiesHTML() : ""}
      <section class="approach">
        <div><p class="view-kicker">HOW WE THINK</p><h2>${d.approach}</h2></div>
        <div class="approach-steps">${d.steps.map((s, i) => `<span><b>${String(i + 1).padStart(2, "0")}</b>${s}</span>`).join("")}</div>
      </section>
      <footer class="view-footer">
        <div><p class="view-kicker">HAVE A PROJECT IN MIND?</p><h2>${d.footer}</h2></div>
        <a class="contact-link" href="mailto:hello@kalamesh.com">START A CONVERSATION <span>↗</span></a>
      </footer>`;
    panel.scrollTop = 0;
    if (isMedia) bindGallery();
    else stopVideos();
  }

  /* ---------- gallery: filter, lazy video, lightbox ---------- */
  function stopVideos() {
    if (videoIO) videoIO.disconnect();
    videoIO = null;
  }
  function bindGallery() {
    const wall = $("#mediaWall");
    if (!wall) return;
    const items = $$(".media-item", wall);
    $$(".media-filter button", bodyEl).forEach((b) =>
      b.addEventListener("click", () => {
        $$(".media-filter button", bodyEl).forEach((x) =>
          x.classList.toggle("is-on", x === b),
        );
        items.forEach(
          (m) =>
            (m.hidden = b.dataset.f !== "all" && m.dataset.cat !== b.dataset.f),
        );
      }),
    );
    items.forEach((m) =>
      m.addEventListener("click", () =>
        lbOpen(
          items.filter((x) => !x.hidden).map((x) => WORK[+x.dataset.i]),
          items.filter((x) => !x.hidden).indexOf(m),
        ),
      ),
    );
    stopVideos();
    if (reduceMotion) return;
    videoIO = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          const v = e.target;
          if (e.isIntersecting) {
            if (!v.src) v.src = v.dataset.src;
            v.play().catch(() => {});
          } else v.pause();
        }),
      { root: panel, threshold: 0.4 },
    );
    $$("video", wall).forEach((v) => videoIO.observe(v));
  }
  function lbOpen(list, i) {
    lbList = list;
    lb.inert = false;
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    lbShow(i);
    $("#lbClose").focus();
  }
  function lbShow(i) {
    lbI = (i + lbList.length) % lbList.length;
    const it = lbList[lbI];
    lbStage.innerHTML =
      it.type === "video"
        ? `<video src="${it.src}" poster="${it.poster || ""}" controls autoplay playsinline></video>`
        : `<img src="${it.src}" alt="${it.title}">`;
    lbCap.textContent = `${it.title} — ${it.tag}`;
    lbCount.textContent = `${String(lbI + 1).padStart(2, "0")} / ${String(lbList.length).padStart(2, "0")}`;
  }
  function lbClose() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    lb.inert = true;
    lbStage.innerHTML = "";
  }

  /* ---------- open / close the view ---------- */
  function open(key, trigger) {
    lastFocus = trigger || document.activeElement;
    render(key);
    view.inert = false;
    view.classList.add("is-open");
    view.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("modal-open");
    if (window.lenis) window.lenis.stop();
    if (!pushed) {
      history.pushState({ disc: key }, "");
      pushed = true;
    } else history.replaceState({ disc: key }, "");
    panel.focus({ preventScroll: true });
  }
  function hide() {
    if (!view.classList.contains("is-open")) return;
    lbClose();
    stopVideos();
    view.classList.remove("is-open");
    view.setAttribute("aria-hidden", "true");
    view.inert = true;
    document.documentElement.classList.remove("modal-open");
    if (window.lenis) window.lenis.start();
    pushed = false;
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  const close = () =>
    pushed && history.state && history.state.disc ? history.back() : hide();

  rows.forEach((row) => {
    row.addEventListener("click", () => open(row.dataset.discipline, row));
    row.addEventListener("mouseenter", () =>
      rows.forEach((r) => r.classList.toggle("is-active", r === row)),
    );
    row.addEventListener("focus", () =>
      rows.forEach((r) => r.classList.toggle("is-active", r === row)),
    );
  });
  $$("[data-close]", view).forEach((b) => b.addEventListener("click", close));
  $("#viewNext").addEventListener("click", () => render_next());
  function render_next() {
    open(KEYS[(KEYS.indexOf(current) + 1) % KEYS.length], lastFocus);
  }
  addEventListener("popstate", hide);

  /* lightbox controls */
  $("#lbClose").addEventListener("click", lbClose);
  $("#lbPrev").addEventListener("click", () => lbShow(lbI - 1));
  $("#lbNext").addEventListener("click", () => lbShow(lbI + 1));
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target === lbStage) lbClose();
  });

  /* keyboard: Esc, arrows in lightbox, Tab stays inside the open layer */
  document.addEventListener("keydown", (e) => {
    const lbOn = lb.classList.contains("is-open"),
      viewOn = view.classList.contains("is-open");
    if (!lbOn && !viewOn) return;
    if (e.key === "Escape") {
      e.preventDefault();
      lbOn ? lbClose() : close();
      return;
    }
    if (lbOn && e.key === "ArrowRight") lbShow(lbI + 1);
    if (lbOn && e.key === "ArrowLeft") lbShow(lbI - 1);
    if (e.key === "Tab") {
      const root = lbOn ? lb : view;
      const f = $$(
        'button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])',
        root,
      ).filter((x) => x.offsetParent !== null || x === document.activeElement);
      if (!f.length) return;
      const first = f[0],
        last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
