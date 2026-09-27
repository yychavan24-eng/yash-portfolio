import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import useIsMobile from '@src/hooks/useIsMobile';
import styles from './omnipresence.module.scss';

export default function OmnipresenceVisual({ src }) {
  const isMobile = useIsMobile();
  const echoesRef = useRef([]);
  const linesRef = useRef([]);
  const baseRef = useRef(null);

  // The delta values for each echo (in percent) representing their spatial distribution
  const echoData = [
    { dx: -30, dy: -20, scale: 0.35 },
    { dx: 35, dy: -25, scale: 0.25 },
    { dx: -40, dy: 15, scale: 0.2 },
    { dx: 30, dy: 25, scale: 0.3 },
    { dx: -15, dy: 35, scale: 0.25 },
    { dx: 10, dy: -40, scale: 0.3 },
  ];

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isMobile) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#omnipresence',
          start: 'top bottom', // Project enters screen
          end: 'bottom top', // Project leaves screen
          scrub: true,
          scroller: document.querySelector('main'),
          invalidateOnRefresh: true,
        },
      });

      // Central presence scales down slightly and drops opacity to simulate
      // distributing its energy to the echoes.
      tl.fromTo(baseRef.current, { scale: 1.0, opacity: 1 }, { scale: 0.95, opacity: 0.7, ease: 'power1.out', duration: 1 }, 0).to(
        baseRef.current,
        { scale: 1.0, opacity: 1, ease: 'power1.in', duration: 1 },
        1,
      );

      // From 0 to 0.5 (scrub time 1): Propagate outward
      // From 0.5 to 1.0 (scrub time 2): Contract inward
      echoData.forEach((data, i) => {
        const echo = echoesRef.current[i];
        const line = linesRef.current[i];
        if (!echo || !line) return;

        // Echo movement: Starts at center, moves to target dx/dy
        tl.fromTo(echo, { xPercent: 0, yPercent: 0, scale: 0.1, opacity: 0 }, { xPercent: data.dx, yPercent: data.dy, scale: data.scale, opacity: 0.8, ease: 'power1.out', duration: 1 }, 0).to(
          echo,
          { xPercent: data.dx * 0.2, yPercent: data.dy * 0.2, scale: 0.1, opacity: 0, ease: 'power1.in', duration: 1 },
          1,
        );

        // Line drawing: Connects central presence to the distributed point
        const len = line.getTotalLength ? line.getTotalLength() : 150;
        gsap.set(line, { strokeDasharray: len });

        tl.fromTo(line, { strokeDashoffset: len, opacity: 0 }, { strokeDashoffset: 0, opacity: 0.6, ease: 'power1.out', duration: 1 }, 0).to(
          line,
          { strokeDashoffset: len, opacity: 0, ease: 'power1.in', duration: 1 },
          1,
        );
      });
    });

    return () => ctx.kill();
  }, [isMobile, echoData]);

  return (
    <div className={styles.container}>
      {/* Central Base Presence */}
      <div ref={baseRef} className={styles.base}>
        <Image priority src={src} fill sizes="100%" alt="OMNIPRESENCE" style={{ objectFit: 'cover' }} />
      </div>

      {!isMobile && (
        <>
          {/* Spatial Connections */}
          <svg className={styles.svgOverlay} viewBox="0 0 100 100" preserveAspectRatio="none">
            {echoData.map((data, i) => (
              <line
                key={`line-${data.dx}-${data.dy}`}
                ref={(el) => {
                  linesRef.current[i] = el;
                }}
                x1="50"
                y1="50"
                x2={50 + data.dx}
                y2={50 + data.dy}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {/* Distributed Presences (Echoes) */}
          {echoData.map((data, i) => (
            <div
              key={`echo-${data.dx}-${data.dy}`}
              ref={(el) => {
                echoesRef.current[i] = el;
              }}
              className={styles.echo}
            >
              <Image priority src={src} fill sizes="100%" alt="" style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
