import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import gsap from 'gsap';
import useIsMobile from '@src/hooks/useIsMobile';
import styles from './styles/what-i-explore.module.scss';

const exploreDomains = [
  {
    id: '01',
    title: 'INTELLIGENT SYSTEMS',
    keywords: 'AI / ML / LLMs / AI Agents',
    description: 'Building and experimenting with systems that can reason, interact, and perform useful tasks.',
  },
  {
    id: '02',
    title: 'SOFTWARE SYSTEMS',
    keywords: 'Applications / APIs / Backend / Developer Tools',
    description: 'Designing software systems and the infrastructure that makes them useful, reliable, and extensible.',
  },
  {
    id: '03',
    title: 'EXPERIMENTAL COMPUTING',
    keywords: 'Linux / Local AI / Systems / Infrastructure',
    description: 'Exploring what happens when software, operating systems, hardware constraints, and computation meet.',
  },
  {
    id: '04',
    title: 'PHYSICAL SYSTEMS',
    keywords: 'Mechatronics / Hardware / Robotics',
    description: 'Exploring the connection between software and physical systems.',
  },
];

function WhatIExplore() {
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
          <AppearByWords>WHAT I EXPLORE</AppearByWords>
        </h1>
        <div className={styles.subtitle}>
          <AppearTitle>
            <div className="p-l">I LIKE BUILDING AT THE INTERSECTION OF SOFTWARE, INTELLIGENCE, SYSTEMS, AND PHYSICAL COMPUTING.</div>
          </AppearTitle>
        </div>
      </div>

      <div className={styles.domainsContainer}>
        {exploreDomains.map((domain, index) => (
          <div key={domain.id} className={styles.domain}>
            <div className={styles.domainHeader}>
              <AppearTitle>
                <div className={styles.domainId}>{domain.id}</div>
              </AppearTitle>
              <AppearTitle>
                <h5 className={clsx('h5', 'bold', styles.domainTitle)}>{domain.title}</h5>
              </AppearTitle>
            </div>

            <div
              ref={(el) => {
                lineRefs.current[index] = el;
              }}
              className={styles.divider}
            />

            <div className={styles.domainContent}>
              <div className={styles.domainKeywords}>
                <AppearTitle>
                  <p className="p-l">{domain.keywords}</p>
                </AppearTitle>
              </div>
              <div className={styles.domainDescription}>
                <AppearTitle>
                  <p className="p-m">{domain.description}</p>
                </AppearTitle>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhatIExplore;
