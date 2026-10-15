/* =====================================================================
   MARKETING — PERFORMANCE CASE STUDIES
   All the content of this section lives in `D` below. Edit the numbers / text here.
   Items with "—" are empty in the source (fill them when you have the data).
   This file only builds the HTML; js/disciplines.js puts it inside the Marketing view.
   ===================================================================== */
(() => {
  /* shown as a small credit above the section. Set to "" to hide it. */
  const CREDIT =
    "Campaigns by Yesha Bhayani · Performance Marketing · Real Estate & D2C · Mumbai";
  const EMAIL = "hello@kalamesh.com";
  const WHATSAPP = "https://wa.me/919987556474";

  const D = {
    hero: {
      kicker: "Meta Ads · Lead gen · WhatsApp funnels",
      title:
        "Leads that turn into site visits — and site visits that turn into bookings.",
      text: "Hyperlocal, community-aware campaigns for Mumbai real estate developers and commercial leasing, plus traffic and awareness work for D2C brands. Every number below is pulled straight from Meta Ads Manager.",
      stats: [
        ["1,677", "real estate leads & WhatsApp conversations"],
        ["40", "site visits across 5 projects"],
        ["1", "commercial leasing booking"],
        ["₹203", "blended cost per lead on ₹3.4L managed spend"],
      ],
      note: "Client names withheld for confidentiality. Totals cover 8 real estate campaigns. Live campaigns are counted at their snapshot as of 13 Oct 2026.",
    },
    live: {
      kicker: "Live now",
      title: "Campaigns running right now",
      text: "These are in-flight. Numbers are a dated snapshot, not final results, and update as the campaigns progress.",
      items: [
        {
          tag: "Snapshot · 13 Oct 2026",
          status: "Live · Day 31",
          started: "Started 13 Sep 2026 · ₹1,400/day",
          title: "Residential Project Launch",
          sub: "Residential lead generation · Meta instant forms",
          big: [
            ["76", "leads"],
            ["3", "site visits so far"],
            ["1.20%", "link CTR"],
          ],
          metrics: [
            ["Reach", "81,360"],
            ["Impressions", "1,67,772"],
            ["Link clicks", "2,014 · ₹13.96 CPC"],
            ["Cost per lead", "₹369.94"],
            ["Spend to date", "₹28,115"],
          ],
        },
        {
          status: "Live · Early stage",
          started: "Start date · budget/day — to be added", // TODO: fill in
          title: "Designer Fashion Boutique",
          sub: "Fashion · Instagram profile visits + WhatsApp engagement",
          big: [
            ["—", "profile visits"],
            ["—", "per profile visit"],
            ["—", "WhatsApp chats"],
          ], // TODO: fill in
          goal: "Goal: build boutique discovery on Instagram and move interested shoppers into WhatsApp conversations.",
          foot: "Full case study: published when the campaign closes.",
        },
      ],
    },
    cases: {
      kicker: "Case studies",
      title: "From ad spend to people on site",
      items: [
        {
          feature: true,
          tag: "Commercial leasing · Andheri → Borivali",
          title: "Andheri–Borivali commercial leasing",
          hero: ["1 booking", "closed on ₹21,583 of ad spend"],
          metrics: [
            ["Form leads", "44"],
            ["Cost per lead", "₹490.53"],
            ["Link clicks", "2,107 · ₹10.24 CPC"],
            ["Link CTR", "1.02%"],
            ["Reach", "59,875"],
            ["Impressions", "2,05,701 · 3.44 freq."],
          ],
          notes: [
            [
              "Result",
              "Commercial leads cost more than residential ones, but each deal is worth far more. A single booking from 44 qualified leads made this the highest-return campaign in the set.",
            ],
          ],
        },
        {
          tag: "Leasing · WhatsApp conversations",
          title: "Office Leasing, Andheri West",
          big: [
            ["6", "site visits"],
            ["153", "WhatsApp chats"],
            ["₹198", "per chat"],
          ],
          bars: {
            title: "Cost per chat, by targeting",
            max: 323.77,
            rows: [
              ["Broad M/A", "121 chats", "₹185.86", 185.86],
              ["Andheri West", "21 chats", "₹204.69", 204.69],
              ["Site geofence", "11 chats", "₹323.77", 323.77],
            ],
          },
          notes: [
            [
              "Result",
              "Three targeting approaches run side by side; the broad audience delivered the most chats at the lowest cost. ₹30,349 total spend · 7.66L impressions.",
            ],
          ],
        },
        {
          tag: "Residential · Palghar West · PMAY approved",
          title: "PMAY Housing, Palghar West",
          big: [
            ["4", "site visits"],
            ["76", "WhatsApp chats"],
            ["₹206", "per chat"],
          ],
          metrics: [
            ["Reach", "74,334"],
            ["Impressions", "1,57,539"],
            ["Spend", "₹15,678"],
          ],
          notes: [
            [
              "What worked",
              "3 km radius around the site, with income- and interest-based optimisation.",
            ],
            ["Constraint", "a tight client budget of ₹1,000/day."],
          ],
        },
        {
          tag: "Affordable housing · Andheri West",
          title: "Affordable Housing, Andheri West",
          big: [
            ["18", "site visits"],
            ["612", "leads"],
            ["₹116", "cost per lead"],
          ],
          metrics: [
            ["Reach", "3,30,234"],
            ["Impressions", "6,99,280"],
            ["Spend", "₹71,204"],
          ],
          notes: [
            [
              "What worked",
              "sharp Andheri West targeting and on-site walkthrough video with clear rate callouts.",
            ],
          ],
        },
        {
          tag: "Premium residential · Goregaon West",
          title: "Premium Residential, Goregaon West",
          big: [
            ["9", "site visits"],
            ["235", "leads"],
            ["₹340", "cost per lead"],
          ],
          metrics: [
            ["Impressions", "4,23,376"],
            ["Spend", "₹80,000"],
          ],
          notes: [
            [
              "Audience",
              "community-focused messaging built around a temple right beside the project.",
            ],
            [
              "Pivot",
              "the first video underperformed, so it was replaced with elevation and pain-point creative.",
            ],
          ],
        },
      ],
    },
    ledger: {
      kicker: "Every real estate campaign",
      title: "The full ledger",
      cols: [
        "Campaign",
        "Location",
        "Spend",
        "Results",
        "Cost / result",
        "Outcome",
        "Status",
      ],
      rows: [
        [
          "Residential launch",
          "—",
          "₹28,115",
          "76 leads",
          "₹369.94",
          "3 site visits",
          "Live",
        ],
        [
          "Andheri–Borivali",
          "Commercial leasing",
          "₹21,583",
          "44 leads",
          "₹490.53",
          "1 booking",
          "Completed",
        ],
        [
          "Office leasing",
          "Andheri West",
          "₹30,349",
          "153 chats",
          "₹198.36",
          "6 site visits",
          "Completed",
        ],
        [
          "PMAY housing",
          "Palghar West",
          "₹15,678",
          "76 chats",
          "₹206.29",
          "4 site visits",
          "Completed",
        ],
        [
          "Affordable housing",
          "Andheri West",
          "₹71,204",
          "612 leads",
          "₹116",
          "18 site visits",
          "Completed",
        ],
        [
          "Premium residential",
          "Goregaon West",
          "₹80,000",
          "235 leads",
          "₹340",
          "9 site visits",
          "Completed",
        ],
        [
          "Residential project",
          "Dahisar–Andheri",
          "₹53,000",
          "357 leads",
          "₹148",
          "—",
          "Completed",
        ],
        [
          "Residential project",
          "Malad West",
          "₹40,000",
          "124 leads",
          "₹323",
          "—",
          "Completed",
        ],
      ],
    },
    d2c: {
      kicker: "Beyond real estate",
      title: "D2C traffic & awareness",
      items: [
        {
          tag: "Hair & skincare · Traffic",
          title: "Hair & Skincare Brand",
          big: "9,441",
          text: "Instagram profile visits at ₹1.39–₹1.44 each, across two video ads on ₹13,325 spend. Best ad: 19% hook rate.",
        },
        {
          tag: "Diamond jewellery · Awareness",
          title: "Diamond Jewellery Brand",
          big: "6,53,835",
          text: "people reached for ₹1,695 — ₹2.59 per 1,000. Video creative and tight targeting carried it.",
        },
        {
          tag: "Designer fashion · Profile visits + WhatsApp",
          live: true,
          title: "Designer Fashion Boutique",
          big: "—",
          text: "Instagram profile visits at ₹— each, plus — WhatsApp conversations so far. Snapshot as of 13 Oct 2026.",
        }, // TODO: fill in
      ],
    },
    cta: {
      title: "Ready to turn ad spend into real customers?",
      text: "Let’s plan a campaign built around site visits, not just lead counts.",
      foot: "Client names are withheld for confidentiality; project details shared on request. All figures from Meta Ads Manager. Live campaign figures are a snapshot as of 13 Oct 2026 and will change. Site visits and bookings reported by the client’s sales team.",
    },
  };

  /* ---------- small builders ---------- */
  const head = (id, o, extra = "") =>
    `<header class="cs-head" id="${id}"><p class="view-kicker">${o.kicker}</p><h2>${o.title}</h2>${extra}</header>`;
  const big = (list) =>
    `<div class="cs-big">${list.map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join("")}</div>`;
  const metrics = (list) =>
    `<dl class="cs-metrics">${list.map(([l, v]) => `<div><dt>${l}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
  const notes = (list) =>
    `<div class="cs-notes">${list.map(([l, t]) => `<p><b>${l}</b>${t}</p>`).join("")}</div>`;
  const bars = (b) =>
    `<div class="cs-bars"><p class="cs-bars__t">${b.title}</p>${b.rows.map(([n, c, v, w]) => `<div class="cs-bar"><span>${n}<small>${c}</small></span><i style="--w:${((w / b.max) * 100).toFixed(1)}%"></i><b>${v}</b></div>`).join("")}</div>`;

  const liveCard = (c) => `<article class="cs-card cs-card--live">
    <div class="cs-card__top">${c.tag ? `<span class="cs-tag">${c.tag}</span>` : ""}<span class="cs-pill"><i></i>${c.status}</span></div>
    <p class="cs-started">${c.started}</p>
    <h3>${c.title}</h3><p class="cs-sub">${c.sub}</p>
    ${big(c.big)}${c.metrics ? metrics(c.metrics) : ""}${c.goal ? `<p class="cs-goal">${c.goal}</p>` : ""}${c.foot ? `<p class="cs-foot-line">${c.foot}</p>` : ""}
  </article>`;

  const caseCard = (
    c,
  ) => `<article class="cs-card cs-case${c.feature ? " cs-case--feature" : ""}">
    <span class="cs-tag">${c.tag}</span><h3>${c.title}</h3>
    ${c.feature ? `<div class="cs-feature"><div class="cs-hero"><b>${c.hero[0]}</b><span>${c.hero[1]}</span></div><div>${metrics(c.metrics)}</div></div>` : `${big(c.big)}${c.bars ? bars(c.bars) : ""}${c.metrics ? metrics(c.metrics) : ""}`}
    ${notes(c.notes)}
  </article>`;

  const table = (
    L,
  ) => `<div class="cs-table" role="table" aria-label="${L.title}">
    <div class="cs-tr cs-tr--head" role="row">${L.cols.map((c) => `<span role="columnheader">${c}</span>`).join("")}</div>
    ${L.rows.map((r) => `<div class="cs-tr" role="row">${r.map((v, i) => `<span role="cell" data-l="${L.cols[i]}"${i === 6 ? ` class="${v === "Live" ? "is-live" : "is-done"}"` : ""}>${v}</span>`).join("")}</div>`).join("")}
  </div>`;

  window.caseStudiesHTML = () => `
    <section class="cs" aria-label="Performance marketing case studies">
      <div class="cs-block cs-intro">
        ${CREDIT ? `<p class="cs-credit">${CREDIT}</p>` : ""}
        <p class="view-kicker">${D.hero.kicker}</p>
        <h2 class="cs-title">${D.hero.title}</h2>
        <p class="cs-lede">${D.hero.text}</p>
        <div class="cs-stats">${D.hero.stats.map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join("")}</div>
        <p class="cs-note">${D.hero.note}</p>
        <nav class="cs-jump" aria-label="Jump to"><button type="button" data-jump="cs-live">Live now</button><button type="button" data-jump="cs-cases">Case studies</button><button type="button" data-jump="cs-all">All campaigns</button><button type="button" data-jump="cs-d2c">D2C</button></nav>
      </div>
      <div class="cs-block">${head("cs-live", D.live, `<p class="cs-lede">${D.live.text}</p>`)}<div class="cs-grid cs-grid--2">${D.live.items.map(liveCard).join("")}</div></div>
      <div class="cs-block">${head("cs-cases", D.cases)}<div class="cs-grid cs-grid--2">${D.cases.items.map(caseCard).join("")}</div></div>
      <div class="cs-block">${head("cs-all", D.ledger)}${table(D.ledger)}</div>
      <div class="cs-block">${head("cs-d2c", D.d2c)}<div class="cs-grid cs-grid--3">${D.d2c.items.map((c) => `<article class="cs-card cs-d2c"><div class="cs-card__top"><span class="cs-tag">${c.tag}</span>${c.live ? `<span class="cs-pill"><i></i>Live</span>` : ""}</div><h3>${c.title}</h3><b class="cs-d2c__n">${c.big}</b><p>${c.text}</p></article>`).join("")}</div></div>
      <div class="cs-block">
        <div class="cs-cta">
          <div><h2>${D.cta.title}</h2><p>${D.cta.text}</p></div>
          <div class="cs-cta__btns"><a class="cs-btn cs-btn--red" href="mailto:${EMAIL}">Email me <span>↗</span></a><a class="cs-btn" href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp <span>↗</span></a></div>
        </div>
        <p class="cs-note">${D.cta.foot}</p>
      </div>
    </section>`;

  /* "Live now / Case studies / ..." chips scroll inside the open view */
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-jump]");
    if (!b) return;
    const t = document.getElementById(b.dataset.jump);
    if (t)
      t.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
  });
})();
