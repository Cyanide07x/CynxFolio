import { useState, useRef } from 'react';
import { useMouse } from '../hooks/useMouse.js';

/**
 * SplitText
 * Renders typography with the signature CYNX "out-of-phase" chromatic layer.
 * Reacts with opposing mouse parallax and snaps into dead zero on click/hold.
 */
export default function SplitText({ text, tag: Tag = 'h2', className = '', isHeadline = false }) {
  const mouse = useMouse();
  const [isLocked, setIsLocked] = useState(false);
  const containerRef = useRef();

  const offsetX = isLocked ? 0 : (mouse?.normX || 0) * 8 + 4;
  const offsetY = isLocked ? 0 : -(mouse?.normY || 0) * 8 + 4;

  const handlePointerDown = () => setIsLocked(true);
  const handlePointerUp = () => setIsLocked(false);

  return (
    <Tag
      ref={containerRef}
      className={`split-text-container ${className} ${isLocked ? 'is-synced' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      data-cursor="SYNC"
    >
      {/* Front primary layer */}
      <span className="split-text-front">{text}</span>

      {/* Out-of-phase chromatic crimson ghost layer */}
      {isHeadline && (
        <span
          className="split-text-ghost"
          aria-hidden="true"
          style={{
            transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
          }}
        >
          {text}
        </span>
      )}
    </Tag>
  );
}
