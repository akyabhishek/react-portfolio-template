import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { useTheme } from "@/components/theme-provider";

const TUBE_COUNT = 18;
const DARK_TUBE_COLORS = [
  "#00ccff",
  "#33ff00",
  "#ffcc00",
  "#ff6600",
  "#f967fb",
  "#6600ff",
  "#60aed5",
  "#83f36e",
  "#ff008a",
];
const LIGHT_TUBE_COLORS = [
  "#0066ff",
  "#00994d",
  "#ff3300",
  "#cc0044",
  "#9900ff",
  "#3300cc",
  "#ff0066",
  "#0044ff",
  "#6600cc",
];
const DARK_POINT_COLORS = ["#83f36e", "#60aed5", "#f967fb", "#ffcc00"];
const LIGHT_POINT_COLORS = ["#0066ff", "#9900ff", "#ff3300", "#3300cc"];
const DARK_INTENSITY = 30;
const LIGHT_INTENSITY_VAL = 25;
const DARK_BG = "#0a0a0a";
const LIGHT_BG = "#e8e8e8";
const DARK_BLOOM = { strength: 0.7, radius: 0.35, threshold: 0.25 };
const LIGHT_BLOOM_CFG = { strength: 0.35, radius: 0.2, threshold: 0.3 };
const LERP_SPEED = 0.5;
const NOISE_SCALE = 0.25;
const MIN_RADIUS = 0.005;
const MAX_RADIUS = 0.04;
const MIN_SEGMENTS = 64;
const MAX_SEGMENTS = 128;
const RADIAL_SEGMENTS = 8;
const SLEEP = { rx: 2.5, ry: 1.3, ts1: 0.8, ts2: 1.5 };

const LIGHT_POSITIONS: [number, number, number][] = [
  [-5, -5, 5],
  [-5, 5, 5],
  [5, -5, 5],
  [5, 5, 5],
];

function randomNeonColor(): THREE.Color {
  return new THREE.Color().setHSL(
    Math.random(),
    0.8 + Math.random() * 0.2,
    0.45 + Math.random() * 0.15,
  );
}

function randomDeepColor(): THREE.Color {
  return new THREE.Color().setHSL(
    Math.random(),
    0.7 + Math.random() * 0.3,
    0.25 + Math.random() * 0.15,
  );
}

function sampleGradient(colors: string[], t: number): THREE.Color {
  const c = colors.map((s) => new THREE.Color(s));
  const idx = t * (c.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.min(lo + 1, c.length - 1);
  return new THREE.Color().lerpColors(c[lo], c[hi], idx - lo);
}

function noise3d(x: number, y: number, z: number): [number, number, number] {
  return [
    Math.sin(x * 1.3 + y * 0.7 + z * 2.1) * 0.5 +
      Math.cos(x * 0.9 + z * 1.5) * 0.3,
    Math.cos(y * 1.7 + x * 0.5 + z * 1.3) * 0.5 +
      Math.sin(y * 1.1 + z * 0.9) * 0.3,
    Math.sin(z * 1.5 + x * 0.8 + y * 1.2) * 0.5 +
      Math.cos(z * 0.7 + x * 1.8) * 0.3,
  ];
}

// Tube geometry that updates vertex positions in-place each frame (no re-allocation)
class TubeGeo extends THREE.TubeGeometry {
  private _n = new THREE.Vector3();

  constructor(points: THREE.Vector3[], segments: number, radius: number) {
    super(
      new THREE.CatmullRomCurve3(points),
      segments,
      radius,
      RADIAL_SEGMENTS,
      false,
    );
  }

  get curve(): THREE.CatmullRomCurve3 {
    return this.parameters.path as THREE.CatmullRomCurve3;
  }

  updateVertices() {
    const curve = this.curve;
    const segments = this.parameters.tubularSegments;
    const radius = this.parameters.radius;
    const radial = this.parameters.radialSegments;

    curve.updateArcLengths();
    const frames = curve.computeFrenetFrames(segments, false);
    const pos = this.getAttribute("position") as THREE.BufferAttribute;
    const norm = this.getAttribute("normal") as THREE.BufferAttribute;
    const n = this._n;

    for (let i = 0; i <= segments; i++) {
      const r = Math.sin((i / segments) * Math.PI) * radius;
      const pt = curve.points[i];
      const N = frames.normals[i];
      const B = frames.binormals[i];
      const base = i * (radial + 1);

      for (let j = 0; j <= radial; j++) {
        const theta = (j / radial) * Math.PI * 2;
        const sin = Math.sin(theta);
        const cos = -Math.cos(theta);
        n.set(
          cos * N.x + sin * B.x,
          cos * N.y + sin * B.y,
          cos * N.z + sin * B.z,
        ).normalize();
        pos.setXYZ(base + j, pt.x + r * n.x, pt.y + r * n.y, pt.z + r * n.z);
        norm.setXYZ(base + j, n.x, n.y, n.z);
      }
    }

    pos.needsUpdate = true;
    norm.needsUpdate = true;
  }
}

interface TubeState {
  geo: TubeGeo;
  mat: THREE.MeshStandardMaterial;
  mesh: THREE.Mesh;
  timeDelta: number;
  to: THREE.Vector3;
}

function TubesScene({ isDark }: { isDark: boolean }) {
  const { scene } = useThree();
  const tubes = useRef<TubeState[]>([]);
  const lights = useRef<THREE.PointLight[]>([]);
  const isDarkRef = useRef(isDark);
  const mouse = useRef({ x: 0, y: 0, hover: false });
  const worldTarget = useRef(new THREE.Vector3());
  const rc = useRef(new THREE.Raycaster());
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const mv = useRef(new THREE.Vector2());
  const hit = useRef(new THREE.Vector3());
  const targetTubeColors = useRef<THREE.Color[]>([]);
  const targetLightColors = useRef<THREE.Color[]>([]);

  useEffect(() => {
    const t: TubeState[] = [];
    const tc: THREE.Color[] = [];
    const tubeColors = isDarkRef.current ? DARK_TUBE_COLORS : LIGHT_TUBE_COLORS;
    for (let i = 0; i < TUBE_COUNT; i++) {
      const radius = MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);
      const segments =
        MIN_SEGMENTS +
        Math.floor(Math.random() * (MAX_SEGMENTS - MIN_SEGMENTS));
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= segments; j++)
        points.push(new THREE.Vector3(0, 0, (-j / segments) * 2));

      const geo = new TubeGeo(points, segments, radius);
      const color = sampleGradient(tubeColors, i / Math.max(TUBE_COUNT - 1, 1));
      const mat = new THREE.MeshStandardMaterial({
        color,
        metalness: 1,
        roughness: 0.25,
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      t.push({
        geo,
        mat,
        mesh,
        timeDelta: Math.random() * 100,
        to: new THREE.Vector3(),
      });
      tc.push(color.clone());
    }
    tubes.current = t;
    targetTubeColors.current = tc;

    const l: THREE.PointLight[] = [];
    const lc: THREE.Color[] = [];
    const pointColors = isDarkRef.current
      ? DARK_POINT_COLORS
      : LIGHT_POINT_COLORS;
    const intensity = isDarkRef.current ? DARK_INTENSITY : LIGHT_INTENSITY_VAL;
    pointColors.forEach((c, i) => {
      const light = new THREE.PointLight(new THREE.Color(c), intensity);
      light.position.set(...LIGHT_POSITIONS[i]);
      scene.add(light);
      l.push(light);
      lc.push(new THREE.Color(c));
    });
    lights.current = l;
    targetLightColors.current = lc;

    return () => {
      t.forEach((s) => {
        scene.remove(s.mesh);
        s.geo.dispose();
        s.mat.dispose();
      });
      l.forEach((lt) => {
        scene.remove(lt);
        lt.dispose();
      });
    };
  }, [scene]);

  useEffect(() => {
    isDarkRef.current = isDark;
    const tubeColors = isDark ? DARK_TUBE_COLORS : LIGHT_TUBE_COLORS;
    const pointColors = isDark ? DARK_POINT_COLORS : LIGHT_POINT_COLORS;
    targetTubeColors.current = tubes.current.map((_, i) =>
      sampleGradient(tubeColors, i / Math.max(TUBE_COUNT - 1, 1)),
    );
    targetLightColors.current = pointColors.map((c) => new THREE.Color(c));
    tubes.current.forEach((tube) => {
      if (isDark) {
        tube.mat.metalness = 1;
        tube.mat.roughness = 0.25;
        tube.mat.emissiveIntensity = 0;
      } else {
        tube.mat.metalness = 0;
        tube.mat.roughness = 0.4;
        tube.mat.emissive = tube.mat.color.clone();
        tube.mat.emissiveIntensity = 1.2;
      }
    });
    lights.current.forEach((l) => {
      l.intensity = isDark ? DARK_INTENSITY : LIGHT_INTENSITY_VAL;
    });
  }, [isDark]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.hover = true;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      mouse.current.x = (t.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(t.clientY / window.innerHeight) * 2 + 1;
      mouse.current.hover = true;
    };
    const onLeave = () => {
      mouse.current.hover = false;
    };
    const onClick = () => {
      const randomColor = isDarkRef.current ? randomNeonColor : randomDeepColor;
      targetTubeColors.current = Array.from(
        { length: TUBE_COUNT },
        randomColor,
      );
      targetLightColors.current = Array.from({ length: 4 }, randomColor);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
    };
  }, []);

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    const m = mouse.current;
    const cam = state.camera;

    if (m.hover) {
      mv.current.set(m.x, m.y);
      rc.current.setFromCamera(mv.current, cam);
      cam.getWorldDirection(plane.current.normal);
      if (rc.current.ray.intersectPlane(plane.current, hit.current)) {
        worldTarget.current.copy(hit.current);
      }
    } else {
      worldTarget.current.set(
        SLEEP.rx * Math.cos(elapsed * SLEEP.ts1),
        SLEEP.ry * Math.sin(elapsed * SLEEP.ts2),
        0,
      );
    }

    const wt = worldTarget.current;

    // Each tube's first point follows the cursor (+ noise); subsequent points follow the previous — snake chain
    tubes.current.forEach((tube) => {
      const points = tube.geo.curve.points;
      const { timeDelta } = tube;

      const nx = 0.01 * wt.x + 0.04 * elapsed + timeDelta;
      const ny = 0.01 * wt.y + 0.048 * elapsed + timeDelta;
      const nz = 0.01 * wt.z + 0.06 * elapsed + timeDelta;
      const [noX, noY, noZ] = noise3d(nx, ny, nz);

      tube.to.copy(wt);
      tube.to.x += noX * NOISE_SCALE;
      tube.to.y += noY * NOISE_SCALE;
      tube.to.z += noZ * NOISE_SCALE;

      points[0].lerp(tube.to, LERP_SPEED);
      for (let i = 1; i < points.length; i++) {
        points[i].lerp(points[i - 1], LERP_SPEED);
      }

      tube.geo.updateVertices();
    });

    const ct = 1 - Math.exp(-3 * delta);
    tubes.current.forEach((tube, i) => {
      if (targetTubeColors.current[i])
        tube.mat.color.lerp(targetTubeColors.current[i], ct);
      if (!isDarkRef.current && tube.mat.emissiveIntensity > 0)
        tube.mat.emissive.copy(tube.mat.color);
    });
    lights.current.forEach((light, i) => {
      if (targetLightColors.current[i])
        light.color.lerp(targetLightColors.current[i], ct);
    });
  });

  return null;
}

function BloomEffect({ isDark }: { isDark: boolean }) {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef<EffectComposer | null>(null);
  const bloomPass = useRef<UnrealBloomPass | null>(null);

  useEffect(() => {
    const cfg = isDark ? DARK_BLOOM : LIGHT_BLOOM_CFG;
    const c = new EffectComposer(gl);
    c.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      cfg.strength,
      cfg.radius,
      cfg.threshold,
    );
    bloomPass.current = bloom;
    c.addPass(bloom);
    c.addPass(new OutputPass());
    composer.current = c;
    return () => c.dispose();
  }, [gl, scene, camera]);

  useEffect(() => {
    if (bloomPass.current) {
      const cfg = isDark ? DARK_BLOOM : LIGHT_BLOOM_CFG;
      bloomPass.current.strength = cfg.strength;
      bloomPass.current.radius = cfg.radius;
      bloomPass.current.threshold = cfg.threshold;
    }
  }, [isDark]);

  useEffect(() => {
    composer.current?.setSize(size.width, size.height);
  }, [size]);

  useFrame(() => {
    composer.current?.render();
  }, 1);

  return null;
}

function SceneBackground({ isDark }: { isDark: boolean }) {
  const { scene } = useThree();
  const ambient = useRef<THREE.AmbientLight | null>(null);
  useEffect(() => {
    scene.background = new THREE.Color(isDark ? DARK_BG : LIGHT_BG);
    if (!ambient.current) {
      ambient.current = new THREE.AmbientLight(0xffffff, 0);
      scene.add(ambient.current);
    }
    ambient.current.intensity = isDark ? 0 : 0.3;
    return () => {
      if (ambient.current) {
        scene.remove(ambient.current);
        ambient.current.dispose();
        ambient.current = null;
      }
    };
  }, [scene, isDark]);
  return null;
}

export default function ThreeTubesBackground({
  enabled,
}: {
  enabled: boolean;
}) {
  const { theme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" && document.documentElement.classList.contains("dark"));

  if (!enabled) return null;
  return (
    <div
      className="absolute inset-0"
      style={{ zIndex: 0, background: isDark ? DARK_BG : LIGHT_BG }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
      >
        <SceneBackground isDark={isDark} />
        <TubesScene isDark={isDark} />
        <BloomEffect isDark={isDark} />
      </Canvas>
    </div>
  );
}
