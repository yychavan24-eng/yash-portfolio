/* eslint-disable react/jsx-props-no-spreading */
import Hero from '@src/pages/about/components/hero/Hero';
import Overview from '@src/pages/about/components/overview/Overview';
import Services from '@src/pages/about/components/services/Services';
import Process from '@src/pages/about/components/process/Process';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {
  title: 'Yash Chavan - About',
  description: 'Learn about my journey, values, and commitment to building intelligent systems.',
  keywords: [
    'Yash Chavan',
    'About Yash Chavan',
    'About me',
    'Mechatronics Engineer',
    'Developer Story',
    'Professional Web Development',
    'Frontend Development Expertise',
    'Machine Learning',
    'AI Services',
    'Developer Profile',
  ],
};
function Page() {
  return (
    <>
      <CustomHead {...seo} />

      <Hero />
      <Overview />
      <Services />
      <Process />
    </>
  );
}

export default Page;
