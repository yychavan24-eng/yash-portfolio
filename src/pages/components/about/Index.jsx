import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import Image from 'next/image';
import clsx from 'clsx';
import { gsap } from 'gsap';
import styles from '@src/pages/components/about/styles/about.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';

function About() {
  const isMobile = useIsMobile();
  const rootRef = useRef();
  const animatedImageRef = useRef();
  const photoContainerRef = useRef();

  const setupScrollAnimation = () => {
    const ctx = gsap.context(() => {
      gsap.set(animatedImageRef.current, { top: !isMobile ? '-20vw' : '0' });
      if (!isMobile) {
        gsap.to(animatedImageRef.current, {
          top: '20vw',
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            scroller: document?.querySelector('main'),
            invalidateOnRefresh: true,
          },
        });

        gsap.fromTo(
          photoContainerRef.current,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              scroller: document?.querySelector('main'),
              invalidateOnRefresh: true,
            },
          },
        );
      }
    });

    return ctx;
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = setupScrollAnimation();
    return () => ctx.kill();
  }, [isMobile]);

  const renderImageContainer = () => (
    <div ref={photoContainerRef} className={styles.imageContainer}>
      <Image priority src="/images/yash-chavan.jpeg" sizes="100%" fill alt="Yash Chavan" style={{ objectFit: 'cover' }} />
    </div>
  );

  return (
    <section ref={rootRef} className={styles.root}>
      <div className={clsx(styles.nameContainer, 'layout-block-inner')}>
        <AppearTitle>
          <h1 className={clsx('h1', 'medium')}>Hey, My name&apos;s</h1>
          <h1 className={clsx('h1', 'medium')}>Yash Chavan!</h1>
        </AppearTitle>
      </div>

      <div className={clsx(styles.container, 'layout-grid-inner')}>
        {isMobile ? renderImageContainer() : null}
        <div className={clsx(styles.descWrapper)} ref={animatedImageRef}>
          <AppearTitle>
            <div className="p-l">“I am a Mechatronics Engineering student</div>
            <div className="p-l">and developer focused on building</div>
            <div className="p-l">intelligent systems and exploring</div>
            <div className="p-l">experimental technology.”</div>
          </AppearTitle>
        </div>
        {!isMobile ? renderImageContainer() : null}
        <div className={clsx(styles.descWrapperBottom)}>
          {!isMobile ? (
            <AppearTitle key="desktop-descWrapperBottom">
              <h6 className="h6">I explore the intersection of software and hardware</h6>
              <h6 className="h6">through Mechatronics Engineering. My work spans AI</h6>
              <h6 className="h6">agents, machine learning, and intelligent systems,</h6>
              <h6 className="h6">driven by a hands-on approach to experimental technology.</h6>
              <h6 className="h6">I build to understand and engineer to solve.</h6>
            </AppearTitle>
          ) : (
            <AppearTitle key="mobile-descWrapperBottom">
              <h6 className="h6"> I explore the intersection of software and hardware through</h6>
              <h6 className="h6">Mechatronics Engineering. My work spans AI agents, machine</h6>
              <h6 className="h6">learning, and intelligent systems, driven by a hands-on</h6>
              <h6 className="h6">approach to experimental technology. I build to understand.</h6>
            </AppearTitle>
          )}
          <div className={clsx(styles.buttonContainer)}>
            <ButtonLink href="/about" label="ABOUT ME" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
