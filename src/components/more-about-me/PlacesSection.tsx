import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { MapPin, Plus, Minus, RotateCcw } from "lucide-react";

// India state-level GeoJSON following India's official claimed boundaries
// (includes J&K full extent with PoK, Aksai Chin, Arunachal Pradesh)
const GEO_URL =
  "https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson";

type City = {
  name: string;
  state: string;
  coordinates: [number, number]; // [lng, lat]
  note?: string;
  isHome?: boolean;
};

const cities: City[] = [
  {
    name: "Lucknow",
    state: "Uttar Pradesh",
    coordinates: [80.9462, 26.8467],
    note: "City of Nawabs — home.",
    isHome: true,
  },
  {
    name: "Kanpur",
    state: "Uttar Pradesh",
    coordinates: [80.3319, 26.4499],
    note: "Industrial city on the banks of the Ganga.",
  },
  {
    name: "Barabanki",
    state: "Uttar Pradesh",
    coordinates: [81.1836, 26.9271],
    note: "A town close to home.",
  },
  {
    name: "Sitapur",
    state: "Uttar Pradesh",
    coordinates: [80.6833, 27.5667],
    note: "Known for its carpet weaving traditions.",
  },
  {
    name: "Ayodhya",
    state: "Uttar Pradesh",
    coordinates: [82.1998, 26.7922],
    note: "Sacred city on the banks of the Saryu.",
  },
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    coordinates: [82.9739, 25.3176],
    note: "One of the world's oldest living cities.",
  },
  {
    name: "Noida",
    state: "Uttar Pradesh",
    coordinates: [77.391, 28.5355],
    note: "Tech hub of the NCR.",
  },
  {
    name: "Delhi",
    state: "Delhi",
    coordinates: [77.1025, 28.7041],
    note: "The capital — always chaotic, always alive.",
  },
  {
    name: "Kolkata",
    state: "West Bengal",
    coordinates: [88.3639, 22.5726],
    note: "City of joy, creativity, and chai.",
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    coordinates: [80.2707, 13.0827],
    note: "Gateway to South India.",
  },
  {
    name: "Rameshwaram",
    state: "Tamil Nadu",
    coordinates: [79.3129, 9.2876],
    note: "Sacred island city at India's southern tip.",
  },
  {
    name: "Haridwar",
    state: "Uttarakhand",
    coordinates: [78.1642, 29.9457],
    note: "Gateway to the gods — where the Ganga descends.",
  },
  {
    name: "Rishikesh",
    state: "Uttarakhand",
    coordinates: [78.2676, 30.0869],
    note: "Yoga capital of the world.",
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    coordinates: [75.7873, 26.9124],
    note: "The Pink City — royalty in every corner.",
  },
  {
    name: "Auli",
    state: "Uttarakhand",
    coordinates: [79.5617, 30.5276],
    note: "Snow-capped ski slopes in the Himalayas.",
  },
  {
    name: "Dehradun",
    state: "Uttarakhand",
    coordinates: [78.0322, 30.3165],
    note: "Capital of Uttarakhand, nestled in the Doon Valley.",
  },
  {
    name: "Nagpur",
    state: "Maharashtra",
    coordinates: [79.0882, 21.1458],
    note: "Orange city — the geographical heart of India.",
  },
  {
    name: "Mathura",
    state: "Uttar Pradesh",
    coordinates: [77.6737, 27.4924],
    note: "Birthplace of Lord Krishna.",
  },
  {
    name: "Vrindavan",
    state: "Uttar Pradesh",
    coordinates: [77.7007, 27.5794],
    note: "Sacred town of temples and the divine flute.",
  },
  {
    name: "Gurugram",
    state: "Haryana",
    coordinates: [77.0266, 28.4595],
    note: "Millennium City — corporate hub of NCR.",
  },
  {
    name: "Mussoorie",
    state: "Uttarakhand",
    coordinates: [78.0644, 30.4598],
    note: "Queen of the Hills — misty trails and mountain views.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const dotVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 360, damping: 20 },
  },
};

export default function PlacesSection() {
  const [tooltip, setTooltip] = useState<City | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(800);
  const [center, setCenter] = useState<[number, number]>([82, 22]);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const centerOnDrag = useRef<[number, number]>([82, 22]);
  const mapRef = useRef<HTMLDivElement>(null);

  const MIN_ZOOM = 500;
  const MAX_ZOOM = 1800;
  const STEP = 200;
  const DEFAULT_CENTER: [number, number] = [82, 22];
  const DEFAULT_ZOOM = 800;

  function degreesPerPixel(scale: number) {
    // Approximate: 360° / circumference in pixels at this scale
    return 360 / (scale * 2 * Math.PI);
  }

  function startDrag(clientX: number, clientY: number) {
    setIsDragging(true);
    dragStart.current = { x: clientX, y: clientY };
    centerOnDrag.current = center;
    setTooltip(null);
  }

  function moveDrag(clientX: number, clientY: number) {
    if (!isDragging || !dragStart.current) return;
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    const dpx = degreesPerPixel(zoom);
    // Invert dx (drag right → move center west)
    const newLng = centerOnDrag.current[0] - dx * dpx * 60;
    // Mercator: drag down → move center south (invert dy)
    const newLat = centerOnDrag.current[1] + dy * dpx * 60;
    setCenter([newLng, Math.max(-60, Math.min(75, newLat))]);
  }

  function stopDrag() {
    setIsDragging(false);
    dragStart.current = null;
  }

  function handleMarkerEnter(
    city: City,
    e: React.MouseEvent<SVGElement, MouseEvent>,
  ) {
    if (isDragging) return;
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    setTooltip(city);
  }

  return (
    <motion.section
      className="mt-12"
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/55 mb-1">
            Travelled
          </p>
          <h2 className="text-xl font-bold tracking-tight">Places I've Been</h2>
        </div>
        <span className="text-[11px] text-muted-foreground tabular-nums">
          {cities.length} {cities.length === 1 ? "city" : "cities"}
        </span>
      </div>

      {/* Map card */}
      <div
        ref={mapRef}
        className="relative rounded-3xl overflow-hidden border border-border/50 bg-card/60 backdrop-blur-xl"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
        onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
        onMouseUp={stopDrag}
        onMouseLeave={() => {
          stopDrag();
          setTooltip(null);
        }}
        onTouchStart={(e) =>
          startDrag(e.touches[0].clientX, e.touches[0].clientY)
        }
        onTouchMove={(e) => {
          e.preventDefault();
          moveDrag(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={stopDrag}
      >
        {/* Zoom + reset controls */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1">
          <button
            onClick={() => setZoom((z) => Math.min(z + STEP, MAX_ZOOM))}
            className="w-7 h-7 rounded-xl border border-border/60 bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
            aria-label="Zoom in"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - STEP, MIN_ZOOM))}
            className="w-7 h-7 rounded-xl border border-border/60 bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
            aria-label="Zoom out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              setZoom(DEFAULT_ZOOM);
              setCenter(DEFAULT_CENTER);
            }}
            className="w-7 h-7 rounded-xl border border-border/60 bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
            aria-label="Reset view"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.02] pointer-events-none z-10" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: center,
              scale: zoom,
            }}
            width={500}
            height={520}
            className="w-full h-auto"
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "hsl(var(--muted))",
                        stroke: "hsl(var(--border))",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: "hsl(var(--muted))",
                        stroke: "hsl(var(--border))",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      pressed: {
                        fill: "hsl(var(--muted))",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {cities.map((city) => (
              <Marker
                key={city.name}
                coordinates={city.coordinates}
                onMouseEnter={(e) =>
                  handleMarkerEnter(
                    city,
                    e as unknown as React.MouseEvent<SVGElement, MouseEvent>,
                  )
                }
                onMouseLeave={() => setTooltip(null)}
              >
                {/* Pulse ring - removed */}
                {/* Solid dot */}
                <motion.circle
                  r={city.isHome ? 6 : 4}
                  fill={city.isHome ? "#22c55e" : "hsl(var(--primary) / 0.85)"}
                  stroke="hsl(var(--background))"
                  strokeWidth={1.5}
                  variants={dotVariants}
                  style={{ cursor: "pointer" }}
                />
                {/* Home label */}
                {city.isHome && (
                  <motion.text
                    y={-10}
                    textAnchor="middle"
                    style={{
                      fontSize: "8px",
                      fill: "#22c55e",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      pointerEvents: "none",
                    }}
                    variants={dotVariants}
                  >
                    HOME
                  </motion.text>
                )}
              </Marker>
            ))}
          </ComposableMap>
        </motion.div>

        {/* Tooltip — floats above the hovered pin */}
        <AnimatePresence>
          {tooltip && (
            <motion.div
              className="absolute w-48 rounded-2xl border border-border/60 bg-background/90 backdrop-blur-xl p-3.5 z-20 pointer-events-none"
              style={{
                left: mousePos.x,
                top: mousePos.y,
                transform: "translate(-50%, calc(-100% - 14px))",
              }}
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 24 }}
            >
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-[12px] font-semibold tracking-tight">
                    {tooltip.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {tooltip.state}
                  </p>
                  {tooltip.note && (
                    <p className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed border-t border-border/40 pt-1.5">
                      {tooltip.note}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* City pills below map */}
      <motion.div
        className="flex flex-wrap gap-2 mt-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {cities.map((city) => (
          <motion.span
            key={city.name}
            className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full border border-border/50 bg-card/60 text-muted-foreground backdrop-blur"
            variants={dotVariants}
          >
            {city.isHome && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            )}
            {city.name}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
}
