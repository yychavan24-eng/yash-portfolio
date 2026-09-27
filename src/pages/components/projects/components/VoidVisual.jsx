import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import useIsMobile from '@src/hooks/useIsMobile';
import styles from './void.module.scss';

export default function VoidVisual({ src }) {
  const isMobile = useIsMobile();
  const blocksRef = useRef([]);
  const linesRef = useRef([]);

  // A 3x3 grid of blocks covering the image
  const grid = [
    'polygon(0% 0%, 33.33% 0%, 33.33% 33.33%, 0% 33.33%)',
    'polygon(33.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 33.33%)',
    'polygon(66.66% 0%, 100% 0%, 100% 33.33%, 66.66% 33.33%)',
    'polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)',
    'polygon(33.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)',
    'polygon(66.66% 33.33%, 100% 33.33%, 100% 66.66%, 66.66% 66.66%)',
    'polygon(0% 66.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)',
    'polygon(33.33% 66.66%, 66.66% 66.66%, 66.66% 100%, 33.33% 100%)',
    'polygon(66.66% 66.66%, 100% 66.66%, 100% 100%, 66.66% 100%)',
  ];

  // Pseudo-random order of disappearance to feel architectural and intentional
  const disappearOrder = [4, 1, 6, 0, 8, 3, 5, 2, 7];

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isMobile) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#void',
          start: 'top bottom', // Project enters screen
          end: 'bottom top', // Project leaves screen
          scrub: true,
          scroller: document.querySelector('main'),
          invalidateOnRefresh: true,
        },
      });

      // The project scrolls into view from 0 to ~0.25 (when it becomes sticky)
      // The visual subtraction should happen while it is sticky (0.25 to 0.75)
      // The last elements should fade out, leaving negative space as it scrolls out

      const startSubtractProgress = 0.25;
      const endSubtractProgress = 0.8;
      const totalSubtractDuration = endSubtractProgress - startSubtractProgress;
      const fadeDuration = 0.15; // duration of a single block fading

      disappearOrder.forEach((blockIndex, i) => {
        const block = blocksRef.current[blockIndex];
        if (!block) return;

        // Stagger the start times between 0.25 and 0.8
        // i goes from 0 to 8.
        const startTime = startSubtractProgress + i * (totalSubtractDuration / 9);

        tl.to(
          block,
          {
            opacity: 0,
            scale: 0.95, // slight geometric recession
            yPercent: 2, // subtle drop away
            ease: 'power2.out',
            duration: fadeDuration,
          },
          startTime,
        );
      });

      // Fade out the architectural lines at the very end
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        tl.to(
          line,
          {
            opacity: 0,
            ease: 'power1.inOut',
            duration: 0.1,
          },
          0.7 + i * 0.05,
        );
      });
    });

    return () => ctx.kill();
  }, [isMobile]);

  return (
    <div className={styles.container}>
      {!isMobile && (
        <svg className={styles.linesOverlay} viewBox="0 0 100 100" preserveAspectRatio="none">
          <line
            ref={(el) => {
              linesRef.current[0] = el;
            }}
            x1="33.33"
            y1="0"
            x2="33.33"
            y2="100"
          />
          <line
            ref={(el) => {
              linesRef.current[1] = el;
            }}
            x1="66.66"
            y1="0"
            x2="66.66"
            y2="100"
          />
          <line
            ref={(el) => {
              linesRef.current[2] = el;
            }}
            x1="0"
            y1="33.33"
            x2="100"
            y2="33.33"
          />
          <line
            ref={(el) => {
              linesRef.current[3] = el;
            }}
            x1="0"
            y1="66.66"
            x2="100"
            y2="66.66"
          />
        </svg>
      )}

      {/* Grid blocks */}
      {!isMobile ? (
        grid.map((clipPath, i) => (
          <div
            key={clipPath}
            ref={(el) => {
              blocksRef.current[i] = el;
            }}
            className={styles.block}
            style={{ clipPath }}
          >
            <Image priority src={src} fill sizes="100%" alt="" style={{ objectFit: 'cover' }} />
          </div>
        ))
      ) : (
        // Mobile fallback
        <div className={styles.base}>
          <Image priority src={src} fill sizes="100%" alt="VOID" style={{ objectFit: 'cover' }} />
        </div>
      )}
    </div>
  );
}
