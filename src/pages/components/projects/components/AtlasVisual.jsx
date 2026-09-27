import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import useIsMobile from '@src/hooks/useIsMobile';
import styles from './atlas.module.scss';

export default function AtlasVisual({ src }) {
  const isMobile = useIsMobile();
  const groupRef = useRef(null);
  const overlayRef = useRef(null);
  const nodesRef = useRef([]);
  const linesRef = useRef([]);

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isMobile) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#atlas',
          start: 'top bottom', // Project enters screen
          end: 'bottom top', // Project leaves screen
          scrub: true,
          scroller: document.querySelector('main'),
          invalidateOnRefresh: true,
        },
      });

      // Background overlay darkens as project reaches center to highlight network
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, ease: 'power2.out', duration: 1 }, 0).to(overlayRef.current, { opacity: 0, ease: 'power2.in', duration: 1 }, 1);

      // Pan/Zoom the entire constellation group slightly for spatial depth
      tl.fromTo(groupRef.current, { scale: 1.05, x: -5 }, { scale: 1, x: 0, ease: 'none', duration: 1 }, 0).to(groupRef.current, { scale: 1.05, x: 5, ease: 'none', duration: 1 }, 1);

      // Nodes scale/fade in and out stagger
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        tl.fromTo(node, { opacity: 0, scale: 0.5, transformOrigin: 'center' }, { opacity: 1, scale: 1, ease: 'power1.out', duration: 0.4 }, 0.1 + (i % 3) * 0.1).to(
          node,
          { opacity: 0, scale: 0.5, ease: 'power1.in', duration: 0.4 },
          1.5 + ((nodesRef.current.length - i) % 3) * 0.1,
        );
      });

      // Connections draw in and erase
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        const len = line.getTotalLength ? line.getTotalLength() : 150;
        gsap.set(line, { strokeDasharray: len });

        tl.fromTo(line, { strokeDashoffset: len, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, ease: 'none', duration: 0.5 }, 0.3 + (i % 4) * 0.05).to(
          line,
          { strokeDashoffset: -len, opacity: 0, ease: 'none', duration: 0.5 },
          1.2 + (i % 4) * 0.05,
        );
      });
    });

    return () => ctx.kill();
  }, [isMobile]);

  return (
    <div className={styles.container}>
      {/* Base Full Image */}
      <div className={styles.base}>
        <Image priority src={src} fill sizes="100%" alt="ATLAS" style={{ objectFit: 'cover' }} />
      </div>

      {/* Dark Overlay for contrast */}
      <div ref={overlayRef} className={styles.darkOverlay} />

      {/* Spatial Network SVG */}
      {!isMobile && (
        <svg className={styles.svgOverlay} viewBox="0 0 192 90" preserveAspectRatio="xMidYMid slice">
          <g ref={groupRef}>
            {/* Connections */}
            <line
              ref={(el) => {
                linesRef.current[0] = el;
              }}
              x1="40"
              y1="30"
              x2="70"
              y2="55"
            />
            <line
              ref={(el) => {
                linesRef.current[1] = el;
              }}
              x1="70"
              y1="55"
              x2="100"
              y2="25"
            />
            <line
              ref={(el) => {
                linesRef.current[2] = el;
              }}
              x1="70"
              y1="55"
              x2="90"
              y2="75"
            />
            <line
              ref={(el) => {
                linesRef.current[3] = el;
              }}
              x1="70"
              y1="55"
              x2="120"
              y2="65"
            />
            <line
              ref={(el) => {
                linesRef.current[4] = el;
              }}
              x1="100"
              y1="25"
              x2="120"
              y2="65"
            />
            <line
              ref={(el) => {
                linesRef.current[5] = el;
              }}
              x1="120"
              y1="65"
              x2="160"
              y2="40"
            />
            <line
              ref={(el) => {
                linesRef.current[6] = el;
              }}
              x1="120"
              y1="65"
              x2="150"
              y2="70"
            />
            <line
              ref={(el) => {
                linesRef.current[7] = el;
              }}
              x1="90"
              y1="75"
              x2="150"
              y2="70"
            />

            {/* Nodes */}
            <circle
              ref={(el) => {
                nodesRef.current[0] = el;
              }}
              cx="40"
              cy="30"
              r="1.5"
            />
            <circle
              ref={(el) => {
                nodesRef.current[1] = el;
              }}
              cx="70"
              cy="55"
              r="2.5"
            />
            <circle
              ref={(el) => {
                nodesRef.current[2] = el;
              }}
              cx="100"
              cy="25"
              r="1.5"
            />
            <circle
              ref={(el) => {
                nodesRef.current[3] = el;
              }}
              cx="120"
              cy="65"
              r="2.5"
            />
            <circle
              ref={(el) => {
                nodesRef.current[4] = el;
              }}
              cx="160"
              cy="40"
              r="1.5"
            />
            <circle
              ref={(el) => {
                nodesRef.current[5] = el;
              }}
              cx="90"
              cy="75"
              r="1.5"
            />
            <circle
              ref={(el) => {
                nodesRef.current[6] = el;
              }}
              cx="150"
              cy="70"
              r="1.5"
            />
          </g>
        </svg>
      )}
    </div>
  );
}
