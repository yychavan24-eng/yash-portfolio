import clsx from 'clsx';
import { gsap } from 'gsap';
import styles from '@src/components/animationComponents/infiniteText/infiniteText.module.scss';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef, useState } from 'react';
import useScroll from '@src/hooks/useScroll';

function InfiniteText({ text, length, className, hasStroke = true }) {
  const containerRef = useRef();
  const [tl, setTl] = useState(null);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const containerWidth = container.getBoundingClientRect().width;
    const itemWidth = container.children[0].getBoundingClientRect().width;
    const initialOffset = ((2 * itemWidth) / containerWidth) * 100 * -1;

    gsap.set(container, {
      xPercent: `${initialOffset}`,
    });

    const duration = 5;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline.to(container, {
        ease: 'none',
        duration,
        xPercent: 0,
        repeat: -1,
      });

      setTl(timeline);
    }, containerRef);

    return () => ctx.kill();
  }, []);

  useScroll((e) => {
    if (tl) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Increase timeScale based on absolute velocity (clamped)
      // Base speed is 1. We add velocity mapped appropriately.
      const velocity = Math.abs(e.velocity);
      // max multiplier, let's say 4x normal speed
      const targetTimeScale = 1 + Math.min(velocity * 0.05, 3);

      // Smoothly interpolate the timeScale back to 1 using GSAP quickTo or simple lerp
      gsap.to(tl, { timeScale: targetTimeScale, duration: 0.2, ease: 'power2.out', overwrite: true });
    }
  });

  return (
    <div ref={containerRef} className={styles.root}>
      {Array.from({ length }, (_, index) => (
        <div key={`${index}-${text}`} className={clsx(styles.infiniteItem, index % 2 === 0 && hasStroke && styles.stroke, className)}>
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}

export default InfiniteText;
