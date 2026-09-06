/*
 * Ambient Signal Fabric — decorative signal network for codacon.ai.
 *
 * A sparse, slow network of thin paths drawn on a fixed, pointer-transparent
 * canvas behind the page. Geometry is derived from the document's real layout:
 * trunk routes live in the margins outside the reading column, optional
 * branches cross only through vertical whitespace between content blocks, and
 * each h2/h3 gets a small gutter marker that signals converge on when the
 * heading scrolls into view.
 *
 * Progressive enhancement only. No dependencies, no network requests, no
 * storage, no identifiers. The only client signals used are presentation and
 * performance hints: color scheme, reduced motion, Save-Data, viewport size,
 * device pixel ratio, pointer type, page visibility and scroll position.
 *
 * Compatible with a strict CSP: external module, no eval, no inline styles.
 */

const CANVAS_SELECTOR = ".signal-field";
const TARGET_FPS = 28;
const FRAME_MS = 1000 / TARGET_FPS;

// ---------------------------------------------------------------------------
// Deterministic seeding from the pathname
// ---------------------------------------------------------------------------

function hashString(str) {
  // FNV-1a 32-bit
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function rand() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Environment / preferences (presentation and performance only)
// ---------------------------------------------------------------------------

const mqReducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const mqDark = matchMedia("(prefers-color-scheme: dark)");
const mqCoarse = matchMedia("(pointer: coarse)");
const mqReducedData = matchMedia("(prefers-reduced-data: reduce)");

function saveData() {
  const c = navigator.connection;
  return Boolean((c && c.saveData) || mqReducedData.matches);
}

function readPalette(canvas) {
  const cs = getComputedStyle(canvas);
  const get = (name, fallback) => (cs.getPropertyValue(name) || "").trim() || fallback;
  return {
    pathA: get("--signal-path-a", "rgba(27, 76, 126, 0.18)"),
    pathB: get("--signal-path-b", "rgba(62, 124, 106, 0.18)"),
    pathC: get("--signal-path-c", "rgba(28, 122, 150, 0.16)"),
    node: get("--signal-node", "rgba(27, 76, 126, 0.32)"),
    packet: get("--signal-packet", "rgba(31, 132, 168, 0.85)"),
    packetGlow: get("--signal-packet-glow", "rgba(31, 132, 168, 0.22)"),
    marker: get("--signal-marker", "rgba(62, 124, 106, 0.9)"),
    markerIdle: get("--signal-marker-idle", "rgba(62, 124, 106, 0.35)"),
  };
}

// ---------------------------------------------------------------------------
// Route helpers. A route is { pts: [{x,y}...], len: [cumulative], total }
// ---------------------------------------------------------------------------

function makeRoute(pts, kind) {
  const len = [0];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x;
    const dy = pts[i].y - pts[i - 1].y;
    len.push(len[i - 1] + Math.hypot(dx, dy));
  }
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of pts) {
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  return { pts, len, total: len[len.length - 1], minY, maxY, kind };
}

function pointAt(route, s) {
  const { pts, len } = route;
  if (s <= 0) return pts[0];
  if (s >= route.total) return pts[pts.length - 1];
  let lo = 0;
  let hi = len.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (len[mid] <= s) lo = mid;
    else hi = mid;
  }
  const segLen = len[hi] - len[lo] || 1;
  const t = (s - len[lo]) / segLen;
  return {
    x: pts[lo].x + (pts[hi].x - pts[lo].x) * t,
    y: pts[lo].y + (pts[hi].y - pts[lo].y) * t,
  };
}

// Points along the route between distances s0 and s1 (inclusive of corners).
function sliceRoute(route, s0, s1) {
  const out = [pointAt(route, s0)];
  for (let i = 0; i < route.len.length; i++) {
    if (route.len[i] > s0 && route.len[i] < s1) out.push(route.pts[i]);
  }
  out.push(pointAt(route, s1));
  return out;
}

// x-coordinate of a vertical trunk at a given document y (trunks are monotone in y).
function trunkXAt(route, y) {
  const { pts } = route;
  if (y <= pts[0].y) return pts[0].x;
  for (let i = 1; i < pts.length; i++) {
    if (y <= pts[i].y) {
      const dy = pts[i].y - pts[i - 1].y || 1;
      const t = (y - pts[i - 1].y) / dy;
      return pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t;
    }
  }
  return pts[pts.length - 1].x;
}

// Distance along a trunk at a given document y.
function trunkSAt(route, y) {
  const { pts, len } = route;
  if (y <= pts[0].y) return 0;
  for (let i = 1; i < pts.length; i++) {
    if (y <= pts[i].y) {
      const dy = pts[i].y - pts[i - 1].y || 1;
      const t = (y - pts[i - 1].y) / dy;
      return len[i - 1] + (len[i] - len[i - 1]) * t;
    }
  }
  return route.total;
}

// ---------------------------------------------------------------------------
// Geometry measurement (runs on setup, resize and layout change — never per frame)
// ---------------------------------------------------------------------------

const BLOCK_SELECTOR =
  "p, h1, h2, h3, h4, li, pre, blockquote, time, hr, table, figure, img, .tags, .cta, .hero, .proof, .lang-hint";

function measure(canvas) {
  const main = document.querySelector("main");
  const header = document.querySelector("body > header");
  const footer = document.querySelector("body > footer");
  const scrollY = window.scrollY;
  const docHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;

  const toDoc = (r) => ({
    top: r.top + scrollY,
    bottom: r.bottom + scrollY,
    left: r.left,
    right: r.right,
  });

  const mainRect = toDoc(main.getBoundingClientRect());
  const headerRect = header ? toDoc(header.getBoundingClientRect()) : { bottom: 0 };
  const footerRect = footer ? toDoc(footer.getBoundingClientRect()) : { top: docHeight, bottom: docHeight };

  // Reading column edges (inner edge of main's padding box).
  const mainStyle = getComputedStyle(main);
  const colLeft = mainRect.left + parseFloat(mainStyle.paddingLeft);
  const colRight = mainRect.right - parseFloat(mainStyle.paddingRight);

  // Occupied vertical intervals: every text-bearing block in main and footer.
  const blocks = [];
  const hint = document.querySelector(".lang-hint");
  const scope = [main, footer, hint].filter(Boolean);
  for (const root of scope) {
    for (const el of root.querySelectorAll(BLOCK_SELECTOR)) {
      const r = el.getBoundingClientRect();
      if (r.height === 0) continue;
      blocks.push({ top: r.top + scrollY, bottom: r.bottom + scrollY });
    }
  }
  blocks.sort((a, b) => a.top - b.top);
  const occupied = [];
  for (const b of blocks) {
    const last = occupied[occupied.length - 1];
    if (last && b.top <= last.bottom + 2) last.bottom = Math.max(last.bottom, b.bottom);
    else occupied.push({ top: b.top, bottom: b.bottom });
  }

  // Whitespace gaps between occupied intervals inside main's vertical span.
  const gaps = [];
  for (let i = 1; i < occupied.length; i++) {
    const top = occupied[i - 1].bottom;
    const bottom = occupied[i].top;
    if (bottom - top >= 22 && top >= mainRect.top && bottom <= footerRect.top) {
      gaps.push({ top, bottom, mid: (top + bottom) / 2, height: bottom - top });
    }
  }

  const headings = [];
  for (const el of main.querySelectorAll("h2, h3")) {
    const r = el.getBoundingClientRect();
    if (r.height === 0) continue;
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || r.height;
    headings.push({
      el,
      level: el.tagName === "H2" ? 2 : 3,
      // Align with the first line of the heading, not the block centre.
      y: r.top + scrollY + Math.min(lineHeight, r.height) / 2,
    });
  }

  return {
    vw,
    vh,
    docHeight,
    top: headerRect.bottom + 8,
    bottom: docHeight - 8,
    colLeft,
    colRight,
    gaps,
    headings,
    canvasWidth: canvas.clientWidth || vw,
    canvasHeight: canvas.clientHeight || vh,
  };
}

// ---------------------------------------------------------------------------
// Network construction
// ---------------------------------------------------------------------------

function buildNetwork(geo, opts) {
  const rand = mulberry32(hashString(location.pathname || "/"));
  const { colLeft, colRight, vw, top, bottom } = geo;
  const gutterW = Math.min(colLeft, vw - colRight);
  const narrow = gutterW < 56;
  const density = opts.density; // "full" | "margin" | "low"

  const trunks = [];
  const branches = [];
  const ticks = [];
  const markers = [];
  const nodes = [];

  const lanesPerSide = narrow ? 1 : density === "full" ? 3 : density === "margin" ? 2 : 1;
  const palette = ["pathA", "pathB", "pathC"];

  function makeTrunk(side, laneIndex) {
    // Available x-range for this side. Keep clear of the viewport edge and the
    // marker zone next to the column.
    let xMin;
    let xMax;
    if (narrow) {
      xMin = xMax = side === "left" ? 6 : vw - 6;
    } else if (side === "left") {
      xMin = Math.max(10, colLeft * 0.25);
      xMax = colLeft - 40;
    } else {
      xMin = colRight + 40;
      xMax = Math.min(vw - 10, colRight + (vw - colRight) * 0.75);
    }
    const span = Math.max(0, xMax - xMin);
    // Spread lanes across the range with a seeded offset per lane.
    const laneCentre = xMin + (span * (laneIndex + 0.5)) / lanesPerSide;
    const wobble = span / lanesPerSide / 2;
    let x = laneCentre + (rand() - 0.5) * wobble;
    const pts = [{ x, y: top }];
    let y = top;
    while (y < bottom) {
      const stretch = 260 + rand() * 720;
      y = Math.min(bottom, y + stretch);
      if (y >= bottom || narrow) {
        pts.push({ x, y: bottom });
        break;
      }
      // Jog to a new x with a 45° chamfer (dy == |dx|).
      const jog = (rand() - 0.5) * Math.min(90, wobble * 2);
      const nx = Math.min(xMax, Math.max(xMin, x + jog));
      const dx = nx - x;
      if (Math.abs(dx) >= 6) {
        pts.push({ x, y });
        pts.push({ x: nx, y: y + Math.abs(dx) });
        nodes.push({ x, y, r: 1.4 });
        y += Math.abs(dx);
        x = nx;
      }
    }
    const route = makeRoute(pts, "trunk");
    route.side = side;
    route.color = palette[(laneIndex + (side === "left" ? 0 : 1)) % palette.length];
    return route;
  }

  for (let i = 0; i < lanesPerSide; i++) trunks.push(makeTrunk("left", i));
  for (let i = 0; i < lanesPerSide; i++) trunks.push(makeTrunk("right", i));

  // Innermost trunk on each side (closest to the column) hosts the ticks.
  const innerLeft = trunks
    .filter((t) => t.side === "left")
    .reduce((a, b) => (trunkXAt(a, top) > trunkXAt(b, top) ? a : b));
  const innerRight = trunks
    .filter((t) => t.side === "right")
    .reduce((a, b) => (trunkXAt(a, top) < trunkXAt(b, top) ? a : b));

  // Branches: only on the full variant, only through real whitespace gaps.
  if (density === "full" && !narrow && geo.gaps.length) {
    const candidates = geo.gaps.filter((g) => g.height >= 26);
    const maxBranches = Math.min(5, Math.ceil(candidates.length / 2));
    // Seeded selection, spread across the page.
    const picked = [];
    const step = Math.max(1, Math.floor(candidates.length / maxBranches));
    for (let i = Math.floor(rand() * step); i < candidates.length && picked.length < maxBranches; i += step) {
      picked.push(candidates[i]);
    }
    picked.forEach((g, idx) => {
      const y = Math.round(g.mid) + 0.5;
      const fromLeft = rand() < 0.5;
      const src = fromLeft ? innerLeft : innerRight;
      const x0 = trunkXAt(src, y);
      const crossing = idx % 2 === 0 && g.height >= 30;
      let pts;
      if (crossing) {
        const dst = fromLeft ? innerRight : innerLeft;
        const x1 = trunkXAt(dst, y);
        pts = [{ x: x0, y }, { x: x1, y }];
        nodes.push({ x: x1, y, r: 1.4 });
      } else {
        // Stub: enters the column whitespace and terminates at a node.
        const reach = 0.25 + rand() * 0.4;
        const x1 = fromLeft
          ? colLeft + (colRight - colLeft) * reach
          : colRight - (colRight - colLeft) * reach;
        pts = [{ x: x0, y }, { x: x1, y }];
        nodes.push({ x: x1, y, r: 1.8 });
      }
      nodes.push({ x: x0, y, r: 1.4 });
      const route = makeRoute(pts, "branch");
      route.color = "pathC";
      branches.push(route);
    });
  }

  // Heading markers and their ticks from the innermost trunk.
  geo.headings.forEach((h) => {
    const side = narrow ? "left" : h.level === 2 ? "left" : "right";
    const trunk = side === "left" ? innerLeft : innerRight;
    const y = Math.round(h.y) + 0.5;
    const tx = trunkXAt(trunk, y);
    const mx = narrow ? tx : side === "left" ? colLeft - 16 : colRight + 16;
    const marker = {
      el: h.el,
      level: h.level,
      side,
      x: mx,
      y,
      trunk,
      trunkX: tx,
      trunkS: trunkSAt(trunk, y),
      activation: 0,
      target: 0,
      pulse: 0, // 0..1 one-shot ring on activation
      narrow,
    };
    markers.push(marker);
    if (!narrow) {
      ticks.push({ from: { x: tx, y }, to: { x: mx, y }, marker });
    }
  });

  return { trunks, branches, ticks, markers, nodes, innerLeft, innerRight, narrow };
}

// ---------------------------------------------------------------------------
// Packets
// ---------------------------------------------------------------------------

function spawnPackets(net, opts, rand) {
  const packets = [];
  const routes = [...net.trunks, ...net.branches.filter((b) => b.total > 120)];
  const perTrunk = opts.density === "full" ? 1.5 : opts.density === "margin" ? 1 : 0.5;
  let budget = Math.max(2, Math.round(net.trunks.length * perTrunk));
  if (opts.density === "low") budget = Math.min(budget, 2);
  for (let i = 0; i < budget; i++) {
    const route = routes[i % routes.length];
    packets.push({
      route,
      s: rand() * route.total,
      speed: (34 + rand() * 26) * (rand() < 0.3 ? -1 : 1),
      tail: 18 + rand() * 10,
      alpha: 0.55 + rand() * 0.35,
    });
  }
  return packets;
}

// ---------------------------------------------------------------------------
// Controller
// ---------------------------------------------------------------------------

function init() {
  const canvas = document.querySelector(CANVAS_SELECTOR);
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;
  const main = document.querySelector("main");
  if (!main) return;

  const variant = canvas.dataset.mode === "full" ? "full" : "margin";

  let palette = readPalette(canvas);
  let geo = null;
  let net = null;
  let packets = [];
  let converging = []; // transient packets heading to a marker
  let dpr = 1;
  let scrollY = window.scrollY;
  let running = false;
  let rafId = 0;
  let lastFrame = 0;
  let mainVisible = true;
  let staticMode = false;
  let rebuildTimer = 0;
  let opts = {};

  function computeOptions() {
    const vw = document.documentElement.clientWidth;
    const lowPower = saveData() || vw < 720 || (mqCoarse.matches && vw < 1024);
    const density = lowPower ? "low" : variant;
    const dprCap = lowPower ? 1.5 : 2;
    dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    staticMode = mqReducedMotion.matches;
    opts = { density, lowPower };
  }

  function sizeCanvas() {
    const w = document.documentElement.clientWidth;
    const h = window.innerHeight;
    const pw = Math.round(w * dpr);
    const ph = Math.round(h * dpr);
    if (canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw;
      canvas.height = ph;
    }
  }

  function rebuild() {
    computeOptions();
    sizeCanvas();
    geo = measure(canvas);
    net = buildNetwork(geo, opts);
    const rand = mulberry32(hashString(location.pathname + "#packets"));
    const previous = packets;
    packets = staticMode ? [] : spawnPackets(net, opts, rand);
    // Preserve progress along matching routes so rebuilds do not jump.
    packets.forEach((p, i) => {
      if (previous[i] && previous[i].route.total) {
        p.s = (previous[i].s / previous[i].route.total) * p.route.total;
      }
    });
    converging = [];
    observeHeadings();
    canvas.classList.add("is-ready");
    if (staticMode) {
      draw(performance.now(), 0);
      stop();
    } else {
      start();
    }
  }

  function scheduleRebuild() {
    clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(rebuild, 180);
  }

  // Heading tracking ---------------------------------------------------------
  let headingObserver = null;
  let activationQueue = 0;

  function observeHeadings() {
    if (headingObserver) headingObserver.disconnect();
    headingObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const marker = net.markers.find((m) => m.el === entry.target);
          if (!marker) continue;
          if (entry.isIntersecting) {
            if (marker.target !== 1) {
              marker.target = 1;
              marker.pulse = 1;
              if (!staticMode) queueConvergence(marker);
            }
          } else {
            marker.target = 0;
          }
        }
        if (staticMode) draw(performance.now(), 0);
      },
      { rootMargin: "-6% 0px -12% 0px", threshold: 0 }
    );
    for (const m of net.markers) headingObserver.observe(m.el);
  }

  function queueConvergence(marker) {
    // Stagger when several headings enter together (e.g. initial paint).
    const delay = activationQueue * 260;
    activationQueue += 1;
    setTimeout(() => {
      activationQueue = Math.max(0, activationQueue - 1);
      if (!net || marker.target !== 1 || opts.density === "low") return;
      const trunk = marker.trunk;
      const approach = 140 + Math.random() * 60; // presentation-only randomness
      const fromAbove = marker.trunkS > approach;
      const s0 = fromAbove ? marker.trunkS - approach : Math.min(trunk.total, marker.trunkS + approach);
      converging.push({
        marker,
        trunk,
        s: s0,
        dir: fromAbove ? 1 : -1,
        phase: "trunk", // then "tick", then "done"
        t: 0,
        speed: 70,
        tail: 22,
        alpha: 0.9,
      });
    }, delay);
  }

  // Animation loop ------------------------------------------------------------
  function start() {
    if (running || staticMode || document.hidden || !mainVisible || !net) return;
    running = true;
    lastFrame = performance.now();
    rafId = requestAnimationFrame(tick);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  function tick(now) {
    if (!running) return;
    rafId = requestAnimationFrame(tick);
    const elapsed = now - lastFrame;
    if (elapsed < FRAME_MS) return;
    const dt = Math.min(elapsed, 100) / 1000;
    lastFrame = now;
    update(dt);
    draw(now, dt);
  }

  function update(dt) {
    for (const p of packets) {
      p.s += p.speed * dt;
      if (p.s > p.route.total + p.tail) p.s = -p.tail;
      else if (p.s < -p.tail) p.s = p.route.total + p.tail;
    }
    for (const m of net.markers) {
      const k = m.target > m.activation ? 1.6 : 0.9;
      m.activation += (m.target - m.activation) * Math.min(1, dt * k);
      if (m.pulse > 0) m.pulse = Math.max(0, m.pulse - dt * 0.55);
    }
    const alive = [];
    for (const c of converging) {
      if (c.phase === "trunk") {
        c.s += c.speed * c.dir * dt;
        if ((c.dir === 1 && c.s >= c.marker.trunkS) || (c.dir === -1 && c.s <= c.marker.trunkS)) {
          c.s = c.marker.trunkS;
          c.phase = c.marker.narrow ? "done" : "tick";
          c.t = 0;
        }
      } else if (c.phase === "tick") {
        const len = Math.abs(c.marker.x - c.marker.trunkX) || 1;
        c.t += (c.speed * 0.8 * dt) / len;
        if (c.t >= 1) c.phase = "done";
      } else {
        c.alpha -= dt * 1.8;
      }
      if (c.alpha > 0) alive.push(c);
    }
    converging = alive;
  }

  // Drawing -------------------------------------------------------------------
  function strokePolyline(pts) {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.stroke();
  }

  function draw(now) {
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const viewTop = scrollY - 40;
    const viewBottom = scrollY + h + 40;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.translate(0, -scrollY);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Static paths
    ctx.lineWidth = 1;
    for (const r of net.trunks) {
      if (r.maxY < viewTop || r.minY > viewBottom) continue;
      ctx.strokeStyle = palette[r.color];
      strokePolyline(r.pts);
    }
    for (const r of net.branches) {
      if (r.maxY < viewTop || r.minY > viewBottom) continue;
      ctx.strokeStyle = palette[r.color];
      strokePolyline(r.pts);
    }

    // Nodes
    ctx.fillStyle = palette.node;
    for (const n of net.nodes) {
      if (n.y < viewTop || n.y > viewBottom) continue;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Ticks and markers
    for (const m of net.markers) {
      if (m.y < viewTop || m.y > viewBottom) continue;
      const a = staticMode ? 0.5 : m.activation;
      if (!m.narrow) {
        ctx.strokeStyle = palette.pathB;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(m.trunkX, m.y);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
        if (a > 0.01) {
          ctx.globalAlpha = a;
          ctx.strokeStyle = palette.marker;
          ctx.beginPath();
          ctx.moveTo(m.trunkX, m.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
      // Marker: small ring that fills as the heading becomes active.
      const r = m.narrow ? 2.2 : m.level === 2 ? 3.2 : 2.6;
      ctx.lineWidth = 1;
      ctx.strokeStyle = palette.markerIdle;
      ctx.beginPath();
      ctx.arc(m.x, m.y, r, 0, Math.PI * 2);
      ctx.stroke();
      if (a > 0.01) {
        ctx.globalAlpha = a;
        ctx.fillStyle = palette.marker;
        ctx.beginPath();
        ctx.arc(m.x, m.y, r * 0.75, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      if (m.pulse > 0 && !staticMode) {
        // One calm expanding ring on activation. On narrow screens the marker
        // sits a few pixels from the column edge, so cap the ring to the gutter.
        const p = 1 - m.pulse;
        const room = m.narrow ? Math.max(0, geo.colLeft - m.x - r - 1) : 10;
        ctx.globalAlpha = m.pulse * 0.45;
        ctx.strokeStyle = palette.marker;
        ctx.beginPath();
        ctx.arc(m.x, m.y, r + p * Math.min(10, room), 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    if (staticMode) return;

    // Packets: short trail plus a small bright head.
    for (const p of packets) {
      const head = Math.min(Math.max(p.s, 0), p.route.total);
      const tailStart = p.speed > 0 ? Math.max(0, p.s - p.tail) : Math.min(p.route.total, p.s + p.tail);
      const hp = pointAt(p.route, head);
      if (hp.y < viewTop || hp.y > viewBottom) continue;
      const pts = p.speed > 0 ? sliceRoute(p.route, tailStart, head) : sliceRoute(p.route, head, tailStart).reverse();
      drawPacket(pts, hp, p.alpha);
    }
    for (const c of converging) {
      let hp;
      let pts;
      if (c.phase === "trunk") {
        hp = pointAt(c.trunk, c.s);
        const tail = c.dir === 1 ? Math.max(0, c.s - c.tail) : Math.min(c.trunk.total, c.s + c.tail);
        pts = c.dir === 1 ? sliceRoute(c.trunk, tail, c.s) : sliceRoute(c.trunk, c.s, tail).reverse();
      } else if (c.phase === "tick") {
        const m = c.marker;
        const x = m.trunkX + (m.x - m.trunkX) * c.t;
        hp = { x, y: m.y };
        const back = m.trunkX + (m.x - m.trunkX) * Math.max(0, c.t - 0.5);
        pts = [{ x: back, y: m.y }, hp];
      } else {
        hp = { x: c.marker.x, y: c.marker.y };
        pts = [hp, hp];
      }
      if (hp.y < viewTop || hp.y > viewBottom) continue;
      drawPacket(pts, hp, Math.max(0, Math.min(1, c.alpha)));
    }
  }

  function drawPacket(pts, head, alpha) {
    ctx.globalAlpha = alpha * 0.5;
    ctx.strokeStyle = palette.packet;
    ctx.lineWidth = 1.2;
    strokePolyline(pts);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = palette.packetGlow;
    ctx.beginPath();
    ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = palette.packet;
    ctx.beginPath();
    ctx.arc(head.x, head.y, 1.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Events --------------------------------------------------------------------
  window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });
  window.addEventListener("resize", scheduleRebuild, { passive: true });

  if ("ResizeObserver" in window) {
    // Fires when the document height changes (fonts, late images), not per frame.
    let lastHeight = document.body.getBoundingClientRect().height;
    const ro = new ResizeObserver((entries) => {
      const h = entries[0].contentRect.height;
      if (Math.abs(h - lastHeight) > 4) {
        lastHeight = h;
        if (geo) scheduleRebuild();
      }
    });
    ro.observe(document.body);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  // Stop the loop entirely when the content area is scrolled out of view.
  new IntersectionObserver(
    (entries) => {
      mainVisible = entries[0].isIntersecting;
      if (mainVisible) start();
      else stop();
    },
    { rootMargin: "120px 0px 120px 0px" }
  ).observe(main);

  const onPrefChange = () => {
    palette = readPalette(canvas);
    scheduleRebuild();
  };
  mqDark.addEventListener("change", onPrefChange);
  document.addEventListener("themechange", onPrefChange);
  mqReducedMotion.addEventListener("change", onPrefChange);
  mqReducedData.addEventListener("change", onPrefChange);
  mqCoarse.addEventListener("change", onPrefChange);
  if (navigator.connection && typeof navigator.connection.addEventListener === "function") {
    navigator.connection.addEventListener("change", onPrefChange);
  }

  window.addEventListener("beforeprint", stop);
  window.addEventListener("afterprint", start);

  rebuild();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
