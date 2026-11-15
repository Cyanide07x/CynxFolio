import { useRef, useState } from 'react';

/**
 * MagneticButton
 * Wraps buttons/links with elastic cursor attraction and snap-back easing.
 */
export default function MagneticButton({ children, className = '', onClick, href, ...props }) {
  const buttonRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.28;
    const deltaY = (e.clientY - centerY) * 0.28;

    setOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={onClick}
      className={`magnetic-button ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 ? 'transform 450ms var(--ease-elastic)' : 'transform 80ms ease-out',
      }}
      {...props}
    >
      <span className="magnetic-content">{children}</span>
    </Component>
  );
}
