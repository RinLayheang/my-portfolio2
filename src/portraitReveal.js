// Hero portrait effect: the chrome-and-python version of the portrait burns away on load to
// reveal the real photo. show() burns between the two versions in either direction, and the
// cursor trail briefly reveals whichever version is not currently shown.
// Loaded lazily; the render loop only runs while something is animating.
import {
  WebGLRenderer, Scene, OrthographicCamera, Mesh, PlaneGeometry, ShaderMaterial,
  Texture, CanvasTexture, LinearFilter,
} from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uPhoto;
  uniform sampler2D uAlt;
  uniform sampler2D uTrail;
  uniform float uProgress;
  uniform vec3 uGlow;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main() {
    // --- TWEAK ALIGNMENT HERE ---
    // If the eyes don't perfectly match, adjust these values!
    // offsetX: positive moves photo left, negative moves right
    // offsetY: positive moves photo down, negative moves up
    float offsetX = 0.000;
    float offsetY = 0.008; 
    
    vec2 photoUv = vec2(vUv.x + offsetX, vUv.y + offsetY);
    vec4 photo = texture2D(uPhoto, photoUv);
    vec4 alt = texture2D(uAlt, vUv);

    // burn front sweeping through noise
    float n = fbm(vUv * vec2(4.2, 4.0) + 1.7);
    float edge = 0.07;
    float threshold = uProgress * (1.0 + edge * 2.0) - edge;
    float revealed = 1.0 - smoothstep(threshold - edge * 0.35, threshold + edge * 0.35, n);
    float burnGlow = 1.0 - smoothstep(0.0, edge, abs(n - threshold));

    // cursor trail flips to the other version, with a ragged noisy edge
    // alpha, not red: the 2D canvas uploads un-premultiplied, so rgb stays white as strokes fade
    float trail = texture2D(uTrail, vUv).a + (n - 0.5) * 0.35;
    float trailMask = smoothstep(0.28, 0.55, trail);
    float trailGlow = pow(4.0 * trailMask * (1.0 - trailMask), 4.0) * 0.8; // thin rim only

    // the trail only flips where the other image has pixels, so it never punches holes
    float coverage = mix(photo.a, alt.a, revealed);
    float showPhoto = mix(revealed, 1.0 - revealed, trailMask * coverage);
    vec4 color = mix(vec4(alt.rgb * alt.a, alt.a), vec4(photo.rgb * photo.a, photo.a), showPhoto);
    float glow = clamp(burnGlow + trailGlow, 0.0, 1.0) * max(photo.a, alt.a);
    color.rgb += uGlow * glow;
    color.a = max(color.a, glow);
    gl_FragColor = color;
  }
`;

function makeTexture(image) {
  // colour space left unset: pixels pass straight through, matching the <img> exactly
  const t = new Texture(image);
  t.minFilter = LinearFilter;
  t.generateMipmaps = false;
  t.needsUpdate = true;
  return t;
}

export function mountPortraitReveal(canvas, photoImage, altImage, { reducedMotion = false, glow = "#ffd43b" } = {}) {
  // up to 2x so the portrait stays sharp on high-density screens
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);

  const photo = makeTexture(photoImage);
  const alt = makeTexture(altImage);

  // cursor trail is painted into a small 2D canvas and uploaded as a texture
  // (sized once, before the texture exists: WebGL textures can't change size after upload)
  const trailCanvas = document.createElement("canvas");
  trailCanvas.width = 192;
  trailCanvas.height = Math.round((192 * photoImage.naturalHeight) / photoImage.naturalWidth);
  const trailCtx = trailCanvas.getContext("2d");
  const trail = new CanvasTexture(trailCanvas);
  trail.minFilter = LinearFilter;
  trail.generateMipmaps = false;

  const material = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    premultipliedAlpha: true,
    depthTest: false,
    uniforms: {
      uPhoto: { value: photo },
      uAlt: { value: alt },
      uTrail: { value: trail },
      uProgress: { value: reducedMotion ? 1 : 0 },
      uGlow: { value: hexToRgb(glow) },
    },
  });
  const geometry = new PlaneGeometry(2, 2);
  const scene = new Scene();
  scene.add(new Mesh(geometry, material));
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  let rect = canvas.getBoundingClientRect();
  const resize = () => {
    rect = canvas.getBoundingClientRect();
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    wake();
  };

  // pointer → trail strokes
  let pointer = null, lastPointer = null, activeFrames = 0;
  const onPointer = (e) => {
    rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    if (x < -0.1 || x > 1.1 || y < -0.1 || y > 1.1) { lastPointer = null; return; }
    pointer = { x, y };
    wake();
  };
  const paintTrail = () => {
    const w = trailCanvas.width, h = trailCanvas.height;
    trailCtx.globalCompositeOperation = "destination-out";
    trailCtx.fillStyle = "rgba(0,0,0,0.045)";
    trailCtx.fillRect(0, 0, w, h);
    if (!pointer) return;
    trailCtx.globalCompositeOperation = "lighter";
    const brush = (90 / rect.width) * w; // ~90 css px
    const from = lastPointer || pointer;
    const steps = Math.max(1, Math.ceil(Math.hypot((pointer.x - from.x) * w, (pointer.y - from.y) * h) / (brush * 0.35)));
    for (let i = 1; i <= steps; i++) {
      const cx = (from.x + ((pointer.x - from.x) * i) / steps) * w;
      const cy = (from.y + ((pointer.y - from.y) * i) / steps) * h;
      const g = trailCtx.createRadialGradient(cx, cy, 0, cx, cy, brush);
      g.addColorStop(0, "rgba(255,255,255,0.35)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      trailCtx.fillStyle = g;
      trailCtx.fillRect(cx - brush, cy - brush, brush * 2, brush * 2);
    }
    lastPointer = pointer;
    pointer = null;
  };

  // loop that sleeps when idle, off-screen or the tab is hidden
  // progress 0 = chrome version, 1 = photo; it eases toward target at `duration` seconds per sweep
  let raf = 0, running = false, visible = true, last = performance.now();
  let target = 1, duration = 2.2;
  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const u = material.uniforms;
    const p = u.uProgress.value;
    const burning = p !== target;
    if (burning) {
      const step = dt / duration;
      u.uProgress.value = target > p ? Math.min(target, p + step) : Math.max(target, p - step);
    }
    const moved = pointer !== null;
    paintTrail();
    trail.needsUpdate = true;
    renderer.render(scene, camera);
    activeFrames = moved ? 150 : activeFrames - 1; // let the trail fade out (~2.5s) before sleeping
    if (burning || activeFrames > 0) raf = requestAnimationFrame(frame);
    else { running = false; lastPointer = null; }
  };
  function wake() {
    if (running || !visible || document.hidden) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) wake();
    else { cancelAnimationFrame(raf); running = false; }
  });
  io.observe(canvas);
  const onVisibility = () => (document.hidden ? (cancelAnimationFrame(raf), (running = false)) : wake());
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pointermove", onPointer, { passive: true });
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  renderer.render(scene, camera);

  return {
    show(layer) {
      target = layer === "alt" ? 0 : 1;
      duration = 1.3;
      if (reducedMotion) {
        material.uniforms.uProgress.value = target;
        renderer.render(scene, camera);
      }
      wake();
    },
    destroy() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose(); material.dispose(); photo.dispose(); alt.dispose(); trail.dispose();
      renderer.dispose();
    },
  };
}

function hexToRgb(hex) {
  const v = parseInt(hex.slice(1), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}
