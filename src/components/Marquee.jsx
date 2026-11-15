import { useEffect, useRef } from 'react';
import { content } from '../data/content.js';

export default function Marquee() {
  const trackRef = useRef(null);
  const segmentRef = useRef(null);
  const marqueeItems = content.home.marquee;

  useEffect(() => {
    const track = trackRef.current;
    const segment = segmentRef.current;
    if (!track || !segment) return;

    let x = 0;
    // Constant, steady sliding speed (immune to scrolling)
    const constantSpeed = 0.95;
    let rafId;

    let segmentWidth = segment.getBoundingClientRect().width;

    const handleResize = () => {
      if (segment) {
        segmentWidth = segment.getBoundingClientRect().width;
      }
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      // Advance by constant steady speed
      x -= constantSpeed;

      // Seamlessly wrap around when passing one full segment width
      if (segmentWidth > 0) {
        while (x <= -segmentWidth) {
          x += segmentWidth;
        }
        while (x > 0) {
          x -= segmentWidth;
        }
      }

      track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // 4 repetitions within each segment ensures generous width (>2000px per segment)
  const repeatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="skills-marquee-wrapper" aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        {/* Render 3 identical segments for infinite, seamless wrapping */}
        {[0, 1, 2].map((segIdx) => (
          <div
            key={segIdx}
            ref={segIdx === 0 ? segmentRef : undefined}
            className="marquee-segment"
          >
            {repeatedItems.map((item, idx) => (
              <span key={idx} className="marquee-unit">
                <span className="marquee-text">{item}</span>
                <span className="marquee-diamond">{'\u25C6'}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
