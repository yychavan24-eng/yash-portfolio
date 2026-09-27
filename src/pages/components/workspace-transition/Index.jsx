import { useRef } from 'react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import useIsMobile from '@src/hooks/useIsMobile';
import styles from './styles/workspace-transition.module.scss';

export default function WorkspaceTransition() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);
  const gridRef = useRef(null);
  const isMobile = useIsMobile();

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isMobile) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: true,
        },
      });

      tl.fromTo(lineRef.current, { scaleY: 0, transformOrigin: 'top center' }, { scaleY: 1, ease: 'power2.out' }, 0);

      tl.fromTo(gridRef.current, { opacity: 0 }, { opacity: 1, ease: 'power2.out' }, 0.1);

      tl.fromTo(textRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.2);
    }, containerRef);

    return () => ctx.kill();
  }, [isMobile]);

  return (
    <section ref={containerRef} className={clsx(styles.root, 'layout-block')}>
      <div ref={gridRef} className={styles.gridOverlay} />
      <div className={styles.transitionWrapper}>
        <div ref={lineRef} className={styles.architecturalLine} />
        <div ref={textRef} className={styles.textContainer}>
          <h2 className={clsx('h4', styles.marker)}>YASH // WORKSPACE</h2>
        </div>
      </div>
    </section>
  );
}
