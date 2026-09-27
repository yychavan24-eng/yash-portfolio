import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import styles from '@src/pages/components/lab/styles/lab.module.scss';
import { useRef } from 'react';

const labData = [
  {
    title: 'AI / MACHINE LEARNING',
    items: ['Machine Learning', 'LLMs', 'AI agents', 'Intelligent systems', 'Model experimentation'],
  },
  {
    title: 'SOFTWARE / DEVELOPMENT',
    items: ['Python', 'C++', 'JavaScript / TypeScript', 'React', 'Rust', 'FastAPI', 'Backend development', 'Developer tooling'],
  },
  {
    title: 'SYSTEMS / INFRASTRUCTURE',
    items: ['Linux', 'Fedora', 'Docker / containers', 'Git', 'Networking / Tailscale', 'Systems experimentation'],
  },
  {
    title: 'EXPERIMENTAL TECHNOLOGY',
    items: ['AI research exploration', 'Developer tools', 'Open-source experimentation', 'Hackathons', 'Game development exploration', 'Hardware / software experimentation'],
  },
];

function Lab() {
  const rootRef = useRef();

  return (
    <section ref={rootRef} className={clsx(styles.root, 'layout-grid-inner')}>
      <div className={styles.titleContainer}>
        <h1 className="h1">
          <AppearByWords>LAB</AppearByWords>
        </h1>
        <div className={styles.subtitle}>
          <AppearTitle>
            <div className="p-l">EXPERIMENTS • SYSTEMS • TOOLS • IDEAS</div>
          </AppearTitle>
        </div>
      </div>

      <div className={styles.grid}>
        {labData.map((category) => (
          <div key={category.title} className={styles.category}>
            <div className={styles.categoryTitle}>
              <AppearTitle>
                <h5 className={clsx('h5', 'bold')}>{category.title}</h5>
              </AppearTitle>
            </div>
            <div className={styles.itemsList}>
              {category.items.map((item) => (
                <div key={item} className={styles.item}>
                  <AppearTitle>
                    <div className="p-l">{item}</div>
                  </AppearTitle>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Lab;
