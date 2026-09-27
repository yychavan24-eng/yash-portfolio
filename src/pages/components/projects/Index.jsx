/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { gsap } from 'gsap';
import projects from '@src/constants/projects';
import styles from '@src/pages/components/projects/styles/projects.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import useScroll from '@src/hooks/useScroll';
import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';
import { useWindowSize } from '@darkroom.engineering/hamo';
import VaultVisual from './components/VaultVisual';
import VoidVisual from './components/VoidVisual';
import OmnipresenceVisual from './components/OmnipresenceVisual';
import ChimeraVisual from './components/ChimeraVisual';
import AtlasVisual from './components/AtlasVisual';

function Projects() {
  const isMobile = useIsMobile();
  const windowSize = useWindowSize();
  const [isLoading] = useStore(useShallow((state) => [state.isLoading]));

  const rootRef = useRef();
  const projectRefs = useRef([]);
  const imageRefs = useRef([]);

  const newProjects = projects;

  const setupProjectAnimations = () => {
    const ctx = gsap.context(() => {
      if (!isLoading) {
        projectRefs.current.slice(0, -1).forEach((projectRef, index) => {
          gsap.set(projectRef, { yPercent: 0 });
          gsap
            .timeline({
              scrollTrigger: {
                id: `projectRef-${index}`,
                trigger: rootRef.current,
                start: `top+=${windowSize.height * index}`,
                end: () => `+=${(projectRefs.current.length - 1) * windowSize.height}`,
                scrub: true,
                scroller: document?.querySelector('main'),
                invalidateOnRefresh: true,
              },
            })
            .to(projectRef, {
              yPercent: 100,
              stagger: 1,
            });
        });
      }
    });

    return ctx;
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = setupProjectAnimations();
    return () => ctx.kill();
  }, [isLoading, windowSize.height]);

  useScroll(
    (e) => {
      if (!isMobile) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const v = Math.abs(e.velocity || 0);
        const scaleAmount = 1 + Math.min(v * 0.0015, 0.03); // max 1.03

        imageRefs.current.forEach((imgRef) => {
          if (imgRef) {
            gsap.to(imgRef, {
              scale: scaleAmount,
              duration: 0.5,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        });
      }
    },
    [isMobile],
  );

  return (
    <>
      <section className={clsx(styles.titleContainer, 'layout-grid-inner')}>
        <h1 className={clsx(styles.title, 'h1')}>
          <AppearByWords>Flagship Projects</AppearByWords>
        </h1>
      </section>
      <section ref={rootRef} className={clsx(styles.root, 'layout-block-inner')}>
        <div className={styles.innerContainer}>
          {newProjects.map((project, index) => (
            <Link aria-label={`Go ${project.title}`} id={project.id} key={project.id} scroll={false} href={project.link} className={clsx(styles.card)}>
              <div
                style={
                  !isMobile
                    ? {
                        height: index === newProjects.length - 1 ? '200svh' : `${200 + 100 * index}svh`,
                        top: index === 0 ? '0px' : '-100svh',
                      }
                    : {
                        height: index === newProjects.length - 1 ? '100svh' : `${200 + 100 * index}svh`,
                        top: index === 0 ? '0px' : '-50svh',
                      }
                }
                className={styles.projectsWrap}
              >
                <div className={clsx(styles.container, 'layout-grid-inner')}>
                  <div className={styles.projectsDetails}>
                    <h6 className="h6">{project.date}</h6>
                    <h3 className="h3">{project.title}</h3>
                  </div>
                  <div className={styles.imageContainer}>
                    {project.id === 'chimera' ? (
                      <ChimeraVisual src={project.img} />
                    ) : project.id === 'atlas' ? (
                      <AtlasVisual src={project.img} />
                    ) : project.id === 'omnipresence' ? (
                      <OmnipresenceVisual src={project.img} />
                    ) : project.id === 'void' ? (
                      <VoidVisual src={project.img} />
                    ) : project.id === 'vaultos' ? (
                      <VaultVisual src={project.img} />
                    ) : (
                      <Image src={project.img} fill sizes="100%" alt={project.title} />
                    )}
                  </div>
                </div>
              </div>
              <div ref={(el) => (projectRefs.current[index] = el)} className={styles.canvas}>
                <div ref={(el) => (imageRefs.current[index] = el)} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                  <Image
                    priority
                    className={index === 0 ? styles.firstCard : index === newProjects.length - 1 ? styles.lastCard : undefined}
                    src={project.img}
                    fill
                    sizes="100%"
                    alt={project.title}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <ButtonLink href="/projects" label="ALL PROJECTS" />
        </div>
      </section>
    </>
  );
}

export default Projects;
