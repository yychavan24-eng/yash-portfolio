import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import useIsMobile from '@src/hooks/useIsMobile';
import styles from './vault.module.scss';

export default function VaultVisual({ src }) {
  const isMobile = useIsMobile();
  const layersRef = useRef([]);
  const baseRef = useRef(null);

  // Architectural layers for the Vault OS visual
  // inset: top right bottom left (in %)
  const layersData = [
    { top: 15, right: 55, bottom: 45, left: 15, xInit: -8, yInit: -12, label: 'SYS.01' },
    { top: 15, right: 15, bottom: 65, left: 45, xInit: 12, yInit: -8, label: 'IDX.02' },
    { top: 55, right: 50, bottom: 15, left: 15, xInit: -12, yInit: 10, label: 'MOD.03' },
    { top: 35, right: 15, bottom: 15, left: 50, xInit: 8, yInit: 12, label: 'DAT.04' },
    { top: 40, right: 40, bottom: 40, left: 35, xInit: 0, yInit: -5, label: 'CORE' },
  ];

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isMobile) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#vaultos',
          start: 'top bottom', // Project enters screen
          end: 'bottom top', // Project leaves screen
          scrub: true,
          scroller: document.querySelector('main'),
          invalidateOnRefresh: true,
        },
      });

      // 0 to 0.25: project scrolls in
      // 0.25 to 0.75: project is sticky, layers align and organize

      // Base image subtly fades in
      tl.fromTo(
        baseRef.current,
        {
          opacity: 0,
          scale: 0.95,
        },
        {
          opacity: 0.2,
          scale: 1,
          ease: 'power1.out',
          duration: 0.3,
        },
        0.2,
      );

      layersData.forEach((_, i) => {
        const layer = layersRef.current[i];
        if (!layer) return;

        // Staggered start times between 0.25 and 0.45
        const startTime = 0.25 + i * 0.05;
        // All layers finish organizing by 0.75
        const duration = 0.75 - startTime;

        tl.fromTo(
          layer,
          {
            xPercent: layersData[i].xInit,
            yPercent: layersData[i].yInit,
            opacity: 0,
          },
          {
            xPercent: 0,
            yPercent: 0,
            opacity: 1,
            ease: 'power3.out',
            duration,
          },
          startTime,
        );
      });

      // Subtle combined exit animation as the project scrolls away (0.8 to 1.0)
      tl.to(
        layersRef.current,
        {
          opacity: 0,
          yPercent: -5,
          ease: 'power1.in',
          duration: 0.2,
        },
        0.8,
      );

      tl.to(
        baseRef.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        0.8,
      );
    });

    return () => ctx.kill();
  }, [isMobile, layersData]);

  return (
    <div className={styles.container}>
      {/* Base Layer */}
      <div ref={baseRef} className={styles.base}>
        <Image priority src={src} fill sizes="100%" alt="VAULT OS" style={{ objectFit: 'cover' }} />
      </div>

      {/* Structured Layers */}
      {!isMobile &&
        layersData.map((data, i) => (
          <div
            key={data.label}
            ref={(el) => {
              layersRef.current[i] = el;
            }}
            className={styles.layer}
          >
            {/* Clipped Image Fragment */}
            <div className={styles.clipContainer} style={{ clipPath: `inset(${data.top}% ${data.right}% ${data.bottom}% ${data.left}%)` }}>
              <Image priority src={src} fill sizes="100%" alt="" style={{ objectFit: 'cover' }} />
            </div>

            {/* SVG Architectural Frame */}
            <svg className={styles.svgOverlay} viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x={`${data.left}`} y={`${data.top}`} width={`${100 - data.left - data.right}`} height={`${100 - data.top - data.bottom}`} vectorEffect="non-scaling-stroke" />
            </svg>

            {/* Technical Label */}
            <div className={styles.label} style={{ top: `${data.top}%`, left: `${data.left}%` }}>
              {data.label}
            </div>
          </div>
        ))}
    </div>
  );
}
