/* eslint-disable react/jsx-props-no-spreading */
import Home from '@src/pages/components/home/Index';
import About from '@src/pages/components/about/Index';
import Quote from '@src/pages/components/quote/Index';
import Projects from '@src/pages/components/projects/Index';
import Clients from '@src/pages/components/clients/Index';
import HowIBuild from '@src/pages/components/how-i-build/Index';
import WhatIExplore from '@src/pages/components/what-i-explore/Index';
import Lab from '@src/pages/components/lab/Index';
import BuildLog from '@src/pages/components/build-log/Index';
import EngineeringNotes from '@src/pages/components/engineering-notes/Index';
import Currently from '@src/pages/components/currently/Index';
import Toolbox from '@src/pages/components/toolbox/Index';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {
  title: 'Yash Chavan - Portfolio',
  description: 'Mechatronics Engineering student and developer focused on building intelligent systems and pushing the boundaries of experimental technology.',
  keywords: [
    'Yash Chavan',
    'Mechatronics Engineer',
    'AI',
    'Developer',
    'Portfolio',
    'Web Development',
    'React Developer',
    'Machine Learning',
    'Web Applications',
    'Responsive Design',
    'Progressive Web Apps',
    'Freelance Developer',
    'Modern Web Development',
    'cross-platform development',
    'Greek',
    'JavaScript',
    'Typescript',
    'Next.js',
    'React',
    'React Native',
    'Electron js',
    'HTML',
    'CSS',
  ],
};

function Page() {
  return (
    <>
      <CustomHead {...seo} />
      <Home />
      <About />
      <Clients />
      <Quote />
      <Projects />
      <HowIBuild />
      <WhatIExplore />
      <Lab />
      <BuildLog />
      <EngineeringNotes />
      <Currently />
      <Toolbox />
    </>
  );
}

export default Page;
