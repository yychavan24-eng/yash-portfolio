import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import gsap from 'gsap';
import useIsMobile from '@src/hooks/useIsMobile';
import styles from './styles/build-log.module.scss';

const logEntries = [
  {
    id: '01',
    title: 'CHIMERA',
    description: 'Flagship Project',
  },
  {
    id: '02',
    title: 'INTELLIGENT SYSTEMS',
    description: 'Exploration Area',
  },
  {
    id: '03',
    title: 'ATLAS',
    description: 'Flagship Project',
  },
  {
    id: '04',
    title: 'EXPERIMENTAL COMPUTING',
    description: 'Exploration Area',
  },
  {
    id: '05',
    title: 'OMNIPRESENCE',
    description: 'Flagship Project',
  },
  {
    id: '06',
    title: 'VAULT OS',
    description: 'Flagship Project',
  },
];

function BuildLog() {
  const rootRef = useRef();
  const lineRefs = useRef([]);
  const isMobile = useIsMobile();

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      lineRefs.current.forEach((line) => {
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: line,
                start: 'top 90%',
              },
            },
          );
        }
      });
    }, rootRef);

    return () => ctx.kill();
  }, [isMobile]);

  return (
    <section ref={rootRef} className={clsx(styles.root, 'layout-grid-inner')}>
      <div className={styles.titleContainer}>
        <h1 className="h1">
          <AppearByWords>BUILD LOG</AppearByWords>
        </h1>
      </div>

      <div className={styles.logContainer}>
        {logEntries.map((entry, index) => (
          <div key={entry.id} className={styles.logEntry}>
            <div className={styles.entryHeader}>
              <AppearTitle>
                <div className={styles.entryId}>{entry.id}</div>
              </AppearTitle>
              <AppearTitle>
                <h5 className={clsx('h5', 'bold', styles.entryTitle)}>{entry.title}</h5>
              </AppearTitle>
              <div className={styles.entryDescription}>
                <AppearTitle>
                  <span className="p-m">{entry.description}</span>
                </AppearTitle>
              </div>
            </div>

            <div
              ref={(el) => {
                lineRefs.current[index] = el;
              }}
              className={styles.divider}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default BuildLog;
