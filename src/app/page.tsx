import React from 'react';
import HeaderLanding from '@/components/landing/HeaderLanding';
import HeroSectionLanding from '@/components/landing/HeroSectionLanding';
import FeatureSectionLanding from '@/components/landing/FeatureLanding';
import TestimonialSectionLanding from '@/components/landing/TestimonialLanding';
import CallToActionSectionLanding from '@/components/landing/CallToActionLanding';
import FooterLanding from '@/components/landing/FooterLanding';

const App: React.FC = () => {
  const features = [
    {
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f8f159617923c695f0a8fec5d38948baddd0571dfed9338f816411e211898027?placeholderIfAbsent=true&apiKey=239c753944c648dcbfa88d3ccbad7206',
      title: 'Instant Sharing',
      description:
        'Share your videos with just a click, reaching your audience faster than ever.',
    },
    {
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2b09f9e7415418aff1d2dacee1b1484738bc04b08bfb46e9261767d9e11f923d?placeholderIfAbsent=true&apiKey=239c753944c648dcbfa88d3ccbad7206',
      title: 'User-Friendly',
      description:
        'Our intuitive interface ensures anyone can create and share videos effortlessly.',
    },
  ];

  return (
    <div className="flex overflow-hidden flex-col">
      <HeaderLanding logo="https://cdn.builder.io/api/v1/image/assets/TEMP/9d90590a20b8c68f3f09fcd418b08390813563227dd799ca509bc663f81bd2c4?placeholderIfAbsent=true&apiKey=239c753944c648dcbfa88d3ccbad7206" />
      <main>
        <HeroSectionLanding heroImage="https://cdn.builder.io/api/v1/image/assets/TEMP/7b645bbc0a002429fd3eeacc3e3c30c8a60dcbdc3f79896f169e7352223c740d?placeholderIfAbsent=true&apiKey=239c753944c648dcbfa88d3ccbad7206" />
        <FeatureSectionLanding
          sectionImage="https://cdn.builder.io/api/v1/image/assets/TEMP/8d977f1f0ccfec0f28827d40599b147347b4b4efe87fda3e4d86b8af43b881f3?placeholderIfAbsent=true&apiKey=239c753944c648dcbfa88d3ccbad7206"
          features={features}
        />
        <TestimonialSectionLanding
          testimonialImage="https://cdn.builder.io/api/v1/image/assets/TEMP/384c663dd618e35b2dc6d4c1d51978302b7fea37321c379d98cd3d9388e75726?placeholderIfAbsent=true&apiKey=239c753944c648dcbfa88d3ccbad7206"
          rating={5}
          quote="Using this web application transformed our outreach strategy. The instant video sharing has significantly boosted our engagement with prospects!"
          author="Jane Doe"
          position="Sales Manager, TechCorp"
          companyLogo="https://cdn.builder.io/api/v1/image/assets/TEMP/8bfeb3789376f88de1bb1500993a1a156bfd58854a8f7782bdb6a5f5d7e6abe4?placeholderIfAbsent=true&apiKey=239c753944c648dcbfa88d3ccbad7206"
        />
        <CallToActionSectionLanding />
      </main>
      <FooterLanding />
    </div>
  );
};

export default App;
