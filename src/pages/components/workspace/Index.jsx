import { useRef } from 'react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import useIsMobile from '@src/hooks/useIsMobile';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import styles from './styles/workspace.module.scss';

const workspaceData = [
  {
    id: '01',
    title: 'LANGUAGES',
    items: ['Python', 'C++', 'JavaScript', 'TypeScript'],
  },
  {
    id: '02',
    title: 'FRONTEND',
    items: ['React', 'Next.js', 'HTML / CSS', 'Tailwind CSS'],
  },
  {
    id: '03',
    title: 'BACKEND',
    items: ['FastAPI', 'Flask', 'Django', 'Node.js'],
  },
  {
    id: '04',
    title: 'AI / ML / LLM',
    items: ['PyTorch', 'TensorFlow', 'Hugging Face', 'LLMs', 'AI Agents'],
  },
  {
    id: '05',
    title: 'DATA',
    items: ['PostgreSQL', 'SQL', 'FAISS', 'Pandas'],
  },
  {
    id: '06',
    title: 'SYSTEMS / DEVOPS',
    items: ['Linux', 'Git', 'Docker', 'Podman', 'Tailscale'],
  },
];

export default function Workspace() {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isMobile) return undefined;

    const ctx = gsap.context(() => {
      const categories = gsap.utils.toArray(`.${styles.category}`);

      categories.forEach((category) => {
        gsap.fromTo(
          category,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: category,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.5,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.kill();
  }, [isMobile]);

  return (
    <section ref={containerRef} className={clsx(styles.root, 'layout-grid-inner')}>
      <div className={styles.grid}>
        {workspaceData.map((category) => (
          <div key={category.id} className={styles.category}>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryIndex}>{category.id}</span>
              <AppearTitle>
                <span className={clsx('p-m', styles.categoryTitle)}>{category.title}</span>
              </AppearTitle>
            </div>
            <div className={styles.itemsList}>
              {category.items.map((item) => (
                <div key={item} className={styles.item}>
                  <div className="p-l">{item}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
