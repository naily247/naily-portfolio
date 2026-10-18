
"use client";

import { motion } from "motion/react";

type ArchitectureLayer = "interface" | "backend" | "systems" | null;

type LivingEditorialProps = {
  activeLayer: ArchitectureLayer;
  reduceMotion: boolean;
};

const layers = [
  {
    id: "interface",
    number: "01",
    name: "Interface",
    subtitle: "What people experience",
    position: "left-[4%] top-[17%] sm:left-[7%]",
    accent: "bg-soft-violet",
  },
  {
    id: "backend",
    number: "02",
    name: "Backend",
    subtitle: "What makes it work",
    position: "right-[3%] top-[43%] sm:right-[5%]",
    accent: "bg-cool-blue",
  },
  {
    id: "systems",
    number: "03",
    name: "Systems",
    subtitle: "How everything connects",
    position: "left-[9%] bottom-[10%] sm:left-[13%]",
    accent: "bg-soft-violet",
  },
] as const;

export function LivingEditorial({
  activeLayer,
  reduceMotion,
}: LivingEditorialProps) {
  const connected = activeLayer === "systems";

  return (
    <div
      className="relative h-[460px] w-full sm:h-[550px] lg:h-[680px]"
      aria-label="Interactive illustration of interface, backend, and systems architecture"
    >
      {/* Quiet editorial framing */}
      <div className="pointer-events-none absolute inset-x-[5%] top-[5%] flex items-center gap-3">
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-soft-violet/70">
          An anatomy of building
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-soft-violet/25 to-transparent" />
        <span className="font-serif text-sm italic text-foreground/35">
          01—03
        </span>
      </div>

      {/* The structural drawing */}
      <svg
        viewBox="0 0 600 680"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <motion.path
          d="M 130 175 C 265 115, 405 185, 455 335"
          fill="none"
          stroke="#7c6cf2"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="5 9"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{
            pathLength: 1,
            opacity:
              activeLayer === "interface" || connected ? 0.75 : 0.22,
          }}
          transition={{
            pathLength: { duration: reduceMotion ? 0 : 1.8 },
            opacity: { duration: 0.45 },
          }}
        />

        <motion.path
          d="M 455 335 C 485 455, 310 575, 165 555"
          fill="none"
          stroke="#6d9ee8"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="5 9"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{
            pathLength: 1,
            opacity:
              activeLayer === "backend" || connected ? 0.75 : 0.22,
          }}
          transition={{
            pathLength: {
              duration: reduceMotion ? 0 : 1.8,
              delay: reduceMotion ? 0 : 0.35,
            },
            opacity: { duration: 0.45 },
          }}
        />

        <motion.path
          d="M 165 555 C 80 455, 65 280, 130 175"
          fill="none"
          stroke="#7c6cf2"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="5 9"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{
            pathLength: 1,
            opacity: connected ? 0.85 : 0.17,
          }}
          transition={{
            pathLength: {
              duration: reduceMotion ? 0 : 1.8,
              delay: reduceMotion ? 0 : 0.7,
            },
            opacity: { duration: 0.45 },
          }}
        />

        {/* A single central architectural form */}
        <motion.ellipse
          cx="300"
          cy="340"
          rx="120"
          ry="170"
          fill="none"
          stroke="#7c6cf2"
          strokeWidth="0.8"
          animate={{
            opacity: connected ? 0.4 : 0.13,
            rotate: connected && !reduceMotion ? 8 : 0,
          }}
          style={{ transformOrigin: "300px 340px" }}
          transition={{ duration: 0.9 }}
        />

        <motion.ellipse
          cx="300"
          cy="340"
          rx="170"
          ry="100"
          fill="none"
          stroke="#6d9ee8"
          strokeWidth="0.8"
          animate={{
            opacity: connected ? 0.38 : 0.12,
            rotate: connected && !reduceMotion ? -12 : -25,
          }}
          style={{ transformOrigin: "300px 340px" }}
          transition={{ duration: 0.9 }}
        />

        <motion.circle
          cx="300"
          cy="340"
          r="6"
          fill="#7c6cf2"
          animate={{
            opacity: connected ? 0.8 : 0.3,
            scale: connected ? 1.25 : 1,
          }}
          style={{ transformOrigin: "300px 340px" }}
          transition={{ duration: 0.45 }}
        />
      </svg>

      {/* Central editorial statement */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[70%] -translate-x-1/2 -translate-y-1/2 text-center">
        <motion.div
          animate={{
            opacity: activeLayer ? 0.9 : 0.65,
            y: activeLayer && !reduceMotion ? -4 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-soft-violet/70">
            Thoughtfully connected
          </span>
          <p className="mt-3 font-serif text-[clamp(1.8rem,3vw,3.3rem)] italic leading-[1.05] tracking-[-0.045em] text-foreground/75">
            Form meets
            <span className="block">function.</span>
          </p>
        </motion.div>
      </div>

      {/* Three connected architectural layers */}
      {layers.map((layer, index) => {
        const selected = activeLayer === layer.id;
        const emphasized = selected || (connected && layer.id !== "systems");

        return (
          <motion.div
            key={layer.id}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 18, scale: 0.97 }
            }
            animate={{
              opacity: 1,
              y: emphasized && !reduceMotion ? -5 : 0,
              scale: emphasized && !reduceMotion ? 1.035 : 1,
            }}
            transition={{
              delay: reduceMotion ? 0 : 0.55 + index * 0.18,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`absolute ${layer.position} w-[185px] sm:w-[205px]`}
          >
            <div
              className={[
                "rounded-[1.3rem] border px-4 py-4",
                "bg-background/65 backdrop-blur-md",
                "transition-[border-color,box-shadow] duration-500",
                emphasized
                  ? "border-soft-violet/40 shadow-[0_14px_45px_rgba(74,58,160,0.10)]"
                  : "border-foreground/10 shadow-[0_12px_35px_rgba(43,35,90,0.035)]",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-[0.16em] text-soft-violet/70">
                  {layer.number}
                </span>
                <span className={`h-1.5 w-1.5 rounded-full ${layer.accent}`} />
              </div>

              <p className="mt-4 font-serif text-[1.55rem] leading-none tracking-[-0.04em] text-foreground/85">
                {layer.name}
              </p>

              <p className="mt-2 text-[10px] leading-relaxed text-foreground/50">
                {layer.subtitle}
              </p>

              <motion.div
                className="mt-4 h-px origin-left bg-soft-violet/50"
                animate={{
                  scaleX: emphasized ? 1 : 0.22,
                  opacity: emphasized ? 1 : 0.4,
                }}
                transition={{ duration: 0.45 }}
              />
            </div>
          </motion.div>
        );
      })}

      {/* Small closing annotation */}
      <div className="pointer-events-none absolute bottom-[1%] right-[5%] text-right">
        <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-foreground/30">
          Design · Logic · Architecture
        </span>
      </div>
    </div>
  );
}
