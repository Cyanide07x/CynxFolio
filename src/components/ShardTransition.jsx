import { useEffect, useState } from 'react';

/**
 * ShardTransition
 * Wipes the viewport with sharp diagonal crimson shards during anchor transitions.
 */
export default function ShardTransition({ trigger, onComplete }) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    setAnimating(true);
    const timer = setTimeout(() => {
      setAnimating(false);
      onComplete?.();
    }, 550);
    return () => clearTimeout(timer);
  }, [trigger, onComplete]);

  if (!animating) return null;

  return (
    <div className="shard-transition-curtain" aria-hidden="true">
      <div className="shard-slice slice-1" />
      <div className="shard-slice slice-2" />
      <div className="shard-slice slice-3" />
    </div>
  );
}
