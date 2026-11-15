import { useEffect, useState } from 'react';

/**
 * All 20 polygon paths from the official CYNX mark (public/assets/images/logos/cynx_mark.svg)
 * with individual scatter offsets that converge to (0, 0, 0) as percent reaches 100%.
 */
const SHARDS = [
  { d: "M15.42 117.488L39.738 29.0284L100.352 51.7216L15.42 117.488Z", fill: "#950740", dx: -70, dy: -45, rot: -20 },
  { d: "M5.20399 155.039L29.522 66.5795L90.136 89.2727L5.20399 155.039Z", fill: "#950740", dx: -85, dy: 30, rot: 25 },
  { d: "M5.17 152.876L64.546 218.596L0.0869904 226.658L5.17 152.876Z", fill: "#950740", dx: -55, dy: 65, rot: -15 },
  { d: "M104.572 211.428L37.513 265.896L0 226.055L104.572 211.428Z", fill: "#C3073F", dx: -75, dy: 85, rot: 30 },
  { d: "M221.629 92.5118L24.701 88.5347L39.999 29.3335L221.629 92.5118Z", fill: "#C3073F", dx: -45, dy: -80, rot: -25 },
  { d: "M237.321 218.676L268.468 364.323L238.263 395.117L237.321 218.676Z", fill: "#950740", dx: -25, dy: 95, rot: 18 },
  { d: "M237.321 218.676L238.263 395.117L210.683 392.608L237.321 218.676Z", fill: "#C3073F", dx: -35, dy: 75, rot: -18 },
  { d: "M359.76 71.4609L241.249 237.045L237.648 279.975L237.321 218.676L359.76 71.4609Z", fill: "#950740", dx: 35, dy: -55, rot: 22 },
  { d: "M140.217 108.146L237.321 218.676L227.678 281.641L140.217 108.146Z", fill: "#C3073F", dx: -30, dy: 40, rot: -14 },
  { d: "M359.76 71.4609L311.418 185.034L237.648 279.975L241.249 237.045L359.76 71.4609Z", fill: "#C3073F", dx: 45, dy: -35, rot: -18 },
  { d: "M140.217 108.146L237.321 218.676L241.249 237.045L197.865 188.718L140.217 108.146Z", fill: "#950740", dx: -40, dy: -25, rot: 12 },
  { d: "M230.082 224.439L240.448 236.274L249.787 252.532L238.049 276.969L221.381 253.634L230.082 224.439Z", fill: "#C3073F", dx: 18, dy: 28, rot: 35 },
  { d: "M354.194 139.75L387.365 282.782L360.397 335.77L354.194 139.75Z", fill: "#C3073F", dx: 30, dy: 65, rot: -20 },
  { d: "M354.194 139.75L431.766 187.798L489.194 286.126L354.194 139.75Z", fill: "#C3073F", dx: 55, dy: 35, rot: 16 },
  { d: "M445.067 0L463.397 127.789L489.194 286.126L431.766 187.798L445.067 0Z", fill: "#C3073F", dx: 65, dy: -90, rot: -26 },
  { d: "M354.194 139.75L431.766 187.798L489.194 286.126L354.194 139.75Z", fill: "#950740", dx: 50, dy: 18, rot: 10 },
  { d: "M385.952 285.514L408.064 279.261L361.204 332.949L385.952 285.514Z", fill: "#6F0E34", dx: 40, dy: 80, rot: -28 },
  { d: "M354.715 141.158L407.274 280.166L385.952 285.514L354.715 141.158Z", fill: "#950740", dx: 35, dy: 50, rot: 15 },
  { d: "M704.04 80.5679L526.852 219.52L502.148 319.695L704.04 80.5679Z", fill: "#950740", dx: 95, dy: -35, rot: 28 },
  { d: "M568.766 91.5602L492.524 56L694.416 298.606L568.766 91.5602Z", fill: "#C3073F", dx: 85, dy: 55, rot: -24 },
];

/**
 * Preloader
 * Assembles the CYNX mark from scattered shards as progress counts 0 -> 100%,
 * then executes a diagonal split door exit.
 */
export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [isSplitting, setIsSplitting] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        setPercent(100);
        clearInterval(interval);
        setTimeout(() => setIsSplitting(true), 400);
        setTimeout(() => onComplete?.(), 1100);
      } else {
        setPercent(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Factor goes from 1 (at 0%) down to 0 (at 100%)
  const scatterFactor = (100 - percent) / 100;
  // Opacity ramps up swiftly
  const opacity = Math.min(1, percent / 25);

  return (
    <div className={`preloader-screen ${isSplitting ? 'preloader-exit' : ''}`} aria-hidden="true">
      <div className="preloader-door door-left" />
      <div className="preloader-door door-right" />

      <div className="preloader-content">
        <div className="preloader-mark-wrapper">
          <svg className="preloader-svg" viewBox="0 0 705 396" fill="none">
            {SHARDS.map((shard, idx) => {
              const tx = shard.dx * scatterFactor;
              const ty = shard.dy * scatterFactor;
              const r = shard.rot * scatterFactor;
              return (
                <path
                  key={idx}
                  d={shard.d}
                  fill={shard.fill}
                  style={{
                    transform: `translate(${tx}px, ${ty}px) rotate(${r}deg)`,
                    transformOrigin: '352px 198px',
                    opacity: opacity,
                    transition: 'transform 90ms ease-out, opacity 120ms ease-out',
                  }}
                />
              );
            })}
          </svg>
        </div>

        <div className="preloader-dots" aria-label="Loading">
          <span className="preloader-dot" />
          <span className="preloader-dot" />
          <span className="preloader-dot" />
        </div>

        <div className="preloader-tag">SNAP INTO SYNC</div>
      </div>
    </div>
  );
}
