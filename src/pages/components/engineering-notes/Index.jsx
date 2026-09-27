import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import gsap from 'gsap';
import useIsMobile from '@src/hooks/useIsMobile';
import styles from './styles/engineering-notes.module.scss';

const notesData = [
  {
    id: '01',
    question: 'WHY MECHATRONICS + SOFTWARE?',
    answer:
      'I explore the intersection of software and hardware through Mechatronics Engineering. My work spans AI agents, machine learning, and intelligent systems, driven by a hands-on approach to experimental technology.',
  },
  {
    id: '02',
    question: 'WHAT AM I TRYING TO BUILD?',
    answer:
      'I build to understand and engineer to solve. My focus is on intelligent systems and exploring experimental technology at the intersection of software, intelligence, systems, and physical computing.',
  },
  {
    id: '03',
    question: 'WHY DO I EXPERIMENT SO MUCH?',
    answer: 'I build things to understand them. My process involves researching, breaking assumptions, testing where systems fail, and iterating to expose limitations.',
  },
  {
    id: '04',
    question: 'WHAT AM I LEARNING RIGHT NOW?',
    answer: 'Currently focusing on Data Structures & Algorithms, AI / Machine Learning, LLMs and AI agents, and core software engineering principles.',
  },
  {
    id: '05',
    question: 'WHAT KIND OF PROBLEMS INTEREST ME?',
    answer:
      'Building and experimenting with systems that can reason and perform useful tasks, while exploring what happens when software, operating systems, hardware constraints, and computation meet.',
  },
];

function EngineeringNotes() {
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
          <AppearByWords>ENGINEERING NOTES</AppearByWords>
        </h1>
      </div>

      <div className={styles.notesContainer}>
        {notesData.map((note, index) => (
          <div key={note.id} className={styles.note}>
            <div className={styles.questionHeader}>
              <AppearTitle>
                <div className={styles.questionId}>{note.id}</div>
              </AppearTitle>
              <AppearTitle>
                <h5 className={clsx('h5', 'bold', styles.questionTitle)}>{note.question}</h5>
              </AppearTitle>
            </div>

            <div
              ref={(el) => {
                lineRefs.current[index] = el;
              }}
              className={styles.divider}
            />

            <div className={styles.answer}>
              <AppearTitle>
                <p className="p-l">{note.answer}</p>
              </AppearTitle>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EngineeringNotes;
