import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import LinkText from '@src/components/animationComponents/linkText/Index';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import dynamic from 'next/dynamic';
import footerLinks from '@src/components/dom/navbar/constants/footerLinks';
import gsap from 'gsap';
import styles from '@src/components/dom/styles/footer.module.scss';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';
import { useWindowSize } from '@darkroom.engineering/hamo';

const GoTop = dynamic(() => import('@src/components/dom/GoTop'), { ssr: false });

const yashNavLinks = [
  { title: 'HOME', href: '/' },
  { title: 'ABOUT', href: '/#about' },
  { title: 'JOURNEY', href: '/#journey' },
  { title: 'PROJECTS', href: '/#projects' },
  { title: 'LAB', href: '/#lab' },
  { title: 'CONTACT', href: '/#contact' },
];

function Footer() {
  const footerRef = useRef();
  const [isLoading] = useStore(useShallow((state) => [state.isLoading]));
  const windowSize = useWindowSize();

  const github = footerLinks.find((link) => link.title.toLowerCase() === 'github');
  const linkedin = footerLinks.find((link) => link.title.toLowerCase() === 'linkedin');

  useIsomorphicLayoutEffect(() => {
    if (!isLoading) {
      const setupFooterAnimation = () => {
        gsap.set(footerRef.current, { height: 'auto' });
        const allSections = document.querySelectorAll('#mainContainer section');
        if (allSections.length > 1) {
          const lastSection = allSections[allSections.length - 2];
          if (footerRef.current.offsetHeight <= windowSize.height) {
            gsap.set(footerRef.current, { yPercent: -50 });
            const uncover = gsap.timeline({ paused: true });
            gsap.set(footerRef.current, { height: '100.5svh' });
            uncover.to(footerRef.current, {
              yPercent: 0,
              ease: 'none',
            });
            ScrollTrigger.create({
              id: 'footerTrigger',
              trigger: lastSection,
              start: 'bottom bottom',
              end: '+=100%',
              animation: uncover,
              scrub: true,
              scroller: document?.querySelector('main'),
            });
          } else {
            gsap.set(footerRef.current, { transform: 'translate(0%, 0%)', height: 'auto' });
          }
        }
      };

      setupFooterAnimation(footerRef, windowSize);
    }

    return () => {
      const footerTrigger = ScrollTrigger.getById('footerTrigger');
      if (footerTrigger) {
        footerTrigger.kill();
      }
    };
  }, [isLoading, windowSize.height]);

  return (
    <section ref={footerRef} className={clsx(styles.root, 'layout-grid-inner')} role="contentinfo">
      {/* IDENTITY COLUMN */}
      <div className={clsx(styles.linksContainer, styles.identityColumn)}>
        <AppearTitle isFooter>
          <h6 className={clsx(styles.title, 'h6')}>IDENTITY</h6>
          <div className={styles.identityItem}>YASH CHAVAN</div>
          <div className={styles.identityItem}>MECHATRONICS ENGINEER & DEVELOPER</div>
        </AppearTitle>
      </div>

      {/* NAVIGATION COLUMN */}
      <div className={clsx(styles.linksContainer, styles.navigationColumn)}>
        <AppearTitle isFooter>
          <h6 className={clsx(styles.title, 'h6')}>NAVIGATION</h6>
          {yashNavLinks.map((link) => (
            <div key={link.title} className={styles.linkTextContainer}>
              <LinkText className={styles.linkText} title={link.title} href={link.href}>
                <span className="footer">{link.title}</span>
              </LinkText>
            </div>
          ))}
        </AppearTitle>
      </div>

      {/* CONTACT COLUMN */}
      <div className={clsx(styles.linksContainer, styles.contactColumn)}>
        <AppearTitle isFooter>
          <h6 className={clsx(styles.title, 'h6')}>SOCIAL</h6>
          <div className={styles.linkTextContainer}>
            <LinkText className={styles.linkText} title="EMAIL" href="mailto:yychavan24@gmail.com">
              <span className="footer">EMAIL</span>
            </LinkText>
          </div>
          {github && (
            <div className={styles.linkTextContainer}>
              <LinkText target className={styles.linkText} title="GITHUB" href={github.href}>
                <span className="footer">GITHUB</span>
              </LinkText>
            </div>
          )}
          {linkedin && (
            <div className={styles.linkTextContainer}>
              <LinkText target className={styles.linkText} title="LINKEDIN" href={linkedin.href}>
                <span className="footer">LINKEDIN</span>
              </LinkText>
            </div>
          )}
        </AppearTitle>
      </div>

      {/* BOTTOM BAR / COPYRIGHT */}
      <div className={styles.bottomBar}>
        <AppearTitle isFooter>
          <div className={styles.copyrightText}>© {new Date().getFullYear()} YASH CHAVAN</div>
        </AppearTitle>
      </div>

      {/* GIANT WORDMARK */}
      <div className={styles.yashWordmark}>
        <span>YASH</span>
      </div>

      <div className={styles.goToTop}>
        <GoTop />
      </div>
    </section>
  );
}

export default Footer;
