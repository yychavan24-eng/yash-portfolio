import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import { useRef } from 'react';

import styles from './styles/toolbox.module.scss';

const toolboxData = [
  {
    title: 'LANGUAGES',
    items: ['Python', 'C++', 'JavaScript', 'TypeScript', 'Rust'],
  },
  {
    title: 'FRONTEND',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Vite'],
  },
  {
    title: 'BACKEND',
    items: ['FastAPI', 'Flask'],
  },
  {
    title: 'AI / ML / LLM',
    items: ['Hugging Face', 'LangChain', 'LLMs', 'AI Agents'],
  },
  {
    title: 'DATABASE / DATA',
    items: ['PostgreSQL', 'FAISS', 'JSON', 'CSV'],
  },
  {
    title: 'DEVOPS / SYSTEMS',
    items: ['Linux', 'Fedora', 'Docker', 'Podman', 'Git', 'GitHub', 'Tailscale'],
  },
  {
    title: 'TOOLS',
    items: ['VS Code', 'NPM', 'PNPM', 'UV', 'Streamlit'],
  },
];

function Toolbox() {
  const rootRef = useRef();

  return (
    <section ref={rootRef} className={clsx(styles.root, 'layout-grid-inner')}>
      <div className={styles.titleContainer}>
        <AppearTitle>
          <h1 className="h1">TOOLBOX</h1>
        </AppearTitle>
        <AppearTitle>
          <div className={styles.subtitle}>TOOLS I BUILD WITH</div>
        </AppearTitle>
      </div>
      <div className={styles.grid}>
        {toolboxData.map((cat) => (
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

export default Toolbox;
