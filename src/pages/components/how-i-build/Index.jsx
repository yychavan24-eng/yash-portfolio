import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import gsap from 'gsap';
import useIsMobile from '@src/hooks/useIsMobile';
import styles from './styles/how-i-build.module.scss';

const buildStages = [
  {
    id: '01',
    title: 'QUESTION',
    description: 'Start with something worth understanding.',
    details: ['What is the problem?', 'Why does it exist?', 'Can it be approached differently?'],
  },
  {
    id: '02',
    title: 'EXPLORE',
    description: 'Research. Experiment. Break assumptions.',
    details: ['Try technologies.', 'Prototype ideas.', 'Study existing systems.'],
  },
  {
    id: '03',
    title: 'BUILD',
    description: 'Turn the idea into something real.',
    details: ['Code it.', 'Connect the pieces.', 'Make the system actually work.'],
  },
  {
    id: '04',
    title: 'BREAK',
    description: 'Find where it fails.',
    details: ['Stress it.', 'Question the architecture.', 'Expose limitations.'],
  },
  {
    id: '05',
    title: 'ITERATE',
    description: 'Build it again, better.',
    details: ['Refine the idea.', 'Change the architecture.', 'Keep what works.'],
  },
];

function HowIBuild() {
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
          <AppearByWords>HOW I BUILD</AppearByWords>
        </h1>
        <div className={styles.subtitle}>
          <AppearTitle>
            <div className="p-l">I BUILD THINGS TO UNDERSTAND THEM.</div>
          </AppearTitle>
        </div>
      </div>

      <div className={styles.stagesContainer}>
        {buildStages.map((stage, index) => (
          <div key={stage.id} className={styles.stage}>
            <div className={styles.stageHeader}>
              <AppearTitle>
                <div className={styles.stageId}>{stage.id}</div>
              </AppearTitle>
              <AppearTitle>
                <h5 className={clsx('h5', 'bold', styles.stageTitle)}>{stage.title}</h5>
              </AppearTitle>
            </div>

            <div
              ref={(el) => {
                lineRefs.current[index] = el;
              }}
              className={styles.divider}
            />

            <div className={styles.stageContent}>
              <div className={styles.stageDescription}>
                <AppearTitle>
                  <p className="p-l">{stage.description}</p>
                </AppearTitle>
              </div>
              <div className={styles.stageDetails}>
                {stage.details.map((detail) => (
                  <div key={detail} className={styles.detailItem}>
                    <AppearTitle>
                      <span className="p-m">{detail}</span>
                    </AppearTitle>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowIBuild;
