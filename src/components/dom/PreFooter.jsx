import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import LinkText from '@src/components/animationComponents/linkText/Index';
import footerLinks from '@src/components/dom/navbar/constants/footerLinks';
import clsx from 'clsx';
import styles from '@src/components/dom/styles/preFooter.module.scss';

function PreFooter() {
  const github = footerLinks.find((link) => link.title.toLowerCase() === 'github');
  const linkedin = footerLinks.find((link) => link.title.toLowerCase() === 'linkedin');

  return (
    <section className={clsx(styles.root, 'layout-grid-inner')}>
      <div className={styles.contentContainer}>
        <div className={styles.headingContainer}>
          <AppearTitle>
            <h2 className="h1">LET&apos;S BUILD</h2>
          </AppearTitle>
          <AppearTitle>
            <h2 className="h1">SOMETHING</h2>
          </AppearTitle>
          <AppearTitle>
            <h2 className="h1">COMPLEX.</h2>
          </AppearTitle>
        </div>

        <div className={styles.supportContainer}>
          <AppearTitle>
            <h4 className={clsx('h4', styles.supportText)}>I BUILD THINGS TO UNDERSTAND THEM.</h4>
          </AppearTitle>
        </div>

        <div className={styles.linksContainer}>
          <AppearTitle>
            <LinkText className={styles.link} title="EMAIL" href="mailto:yychavan24@gmail.com">
              <span className="h5">EMAIL</span>
            </LinkText>
          </AppearTitle>
          {github && (
            <AppearTitle>
              <LinkText className={styles.link} target title="GITHUB" href={github.href}>
                <span className="h5">GITHUB</span>
              </LinkText>
            </AppearTitle>
          )}
          {linkedin && (
            <AppearTitle>
              <LinkText className={styles.link} target title="LINKEDIN" href={linkedin.href}>
                <span className="h5">LINKEDIN</span>
              </LinkText>
            </AppearTitle>
          )}
        </div>
      </div>
    </section>
  );
}

export default PreFooter;
