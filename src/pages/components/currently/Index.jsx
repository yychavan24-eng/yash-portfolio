import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import { useRef } from 'react';

import styles from './styles/currently.module.scss';

const currentlyData = [
  {
    title: 'LEARNING',
    items: ['Data Structures & Algorithms', 'AI / Machine Learning', 'LLMs and AI agents', 'Software engineering'],
  },
  {
    title: 'BUILDING',
    items: ['Intelligent systems', 'Experimental software projects', 'Developer tools', 'AI-powered applications'],
  },
  {
    title: 'EXPLORING',
    items: ['AI research', 'Linux / systems', 'Open-source', 'Game development', 'Hardware + software experimentation'],
  },
];

function Currently() {
  const rootRef = useRef();

  return (
    <section ref={rootRef} className={clsx(styles.root, 'layout-grid-inner')}>
      <div className={styles.titleContainer}>
        <AppearTitle>
          <h1 className="h1">CURRENTLY</h1>
        </AppearTitle>
        <AppearTitle>
          <div className={styles.subtitle}>RIGHT NOW</div>
        </AppearTitle>
      </div>
      <div className={styles.grid}>
        {currentlyData.map((cat) => (
          <div key={cat.title} className={styles.category}>
            <div className={styles.categoryTitle}>
              <AppearTitle>
                <h4 className={clsx('h4', 'bold')}>{cat.title}</h4>
              </AppearTitle>
            </div>
            <div className={styles.itemsList}>
              {cat.items.map((item) => (
                <AppearTitle key={item}>
                  <div className={styles.item}>{item}</div>
                </AppearTitle>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Currently;
