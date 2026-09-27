import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import useIsMobile from '@src/hooks/useIsMobile';
import styles from './chimera.module.scss';

export default function ChimeraVisual({ src }) {
  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  const fragmentsRef = useRef([]);

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isMobile) return undefined;

    const ctx = gsap.context(() => {
      // Configuration for each fragment's entry animation
      // The idea is: start separated, reach 0,0 at center, separate again slightly on exit
      fragmentsRef.current.forEach((frag, i) => {
        if (!frag) return;

        const xOffset = (i % 2 === 0 ? 1 : -1) * (i + 1) * 3; // e.g. 3%, -6%, 9%
        const yOffset = (i % 2 === 0 ? -1 : 1) * (i + 1) * 3;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '#chimera',
            start: 'top bottom', // Project enters screen
            end: 'bottom top', // Project leaves screen
            scrub: true,
            scroller: document.querySelector('main'),
            invalidateOnRefresh: true,
          },
        });

        // 0 to 50% (entering -> center)
        tl.fromTo(frag, { xPercent: xOffset, yPercent: yOffset }, { xPercent: 0, yPercent: 0, ease: 'none', duration: 1 });

        // 50% to 100% (center -> leaving)
        tl.to(frag, { xPercent: xOffset * -0.5, yPercent: yOffset * -0.5, ease: 'none', duration: 1 });
      });
    });

    return () => ctx.kill();
  }, [isMobile]);

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Base Full Image */}
      <div className={styles.base}>
        <Image priority src={src} fill sizes="100%" alt="CHIMERA" style={{ objectFit: 'cover' }} />
      </div>

      {/* Visual Fragments */}
      {!isMobile && (
        <>
          <div
            ref={(el) => {
              fragmentsRef.current[0] = el;
            }}
            className={styles.fragment}
            style={{ clipPath: 'polygon(0 0, 50% 0, 30% 100%, 0 100%)' }}
          >
            <Image priority src={src} fill sizes="100%" alt="" style={{ objectFit: 'cover' }} />
          </div>
          <div
            ref={(el) => {
              fragmentsRef.current[1] = el;
            }}
            className={styles.fragment}
            style={{ clipPath: 'polygon(60% 0, 100% 0, 100% 40%, 80% 60%)' }}
          >
            <Image priority src={src} fill sizes="100%" alt="" style={{ objectFit: 'cover' }} />
          </div>
          <div
            ref={(el) => {
              fragmentsRef.current[2] = el;
            }}
            className={styles.fragment}
            style={{ clipPath: 'polygon(40% 100%, 100% 100%, 100% 70%, 70% 50%)' }}
          >
            <Image priority src={src} fill sizes="100%" alt="" style={{ objectFit: 'cover' }} />
          </div>
          <div
            ref={(el) => {
              fragmentsRef.current[3] = el;
            }}
            className={styles.fragment}
            style={{ clipPath: 'polygon(45% 20%, 75% 30%, 65% 80%, 35% 70%)' }}
          >
            <Image priority src={src} fill sizes="100%" alt="" style={{ objectFit: 'cover' }} />
          </div>
        </>
      )}
    </div>
  );
}
