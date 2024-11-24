/* eslint-disable @next/next/no-img-element */
import React from 'react';

type FeatureProps = {
  icon: string;
  title: string;
  description: string;
};

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
    <img
      loading="lazy"
      src={icon}
      alt=""
      className="object-contain w-12 aspect-square"
    />
    <h3 className="mt-4 text-xl font-bold leading-snug">{title}</h3>
    <p className="mt-4 text-base leading-6">{description}</p>
  </div>
);

type FeatureSectionProps = {
  sectionImage: string;
  features: FeatureProps[];
};

const FeatureSectionLanding: React.FC<FeatureSectionProps> = ({
  sectionImage,
  features,
}) => {
  return (
    <section className="flex overflow-hidden flex-col justify-center px-16 py-28 w-full text-black bg-white max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-center w-full max-md:max-w-full">
        <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
          <div className="flex flex-col w-full max-md:max-w-full">
            <h2 className="text-4xl font-bold leading-10 max-md:max-w-full">
              Effortlessly Record and Share Videos with Your Prospects in Real
              Time
            </h2>
            <p className="mt-6 text-lg leading-7 max-md:max-w-full">
              Experience the simplicity of capturing your thoughts on video and
              sharing them instantly. Our AI-powered platform makes it seamless
              and efficient.
            </p>
          </div>
          <div className="flex flex-col mt-8 w-full max-md:max-w-full">
            <div className="flex flex-wrap gap-6 items-start py-2 w-full max-md:max-w-full">
              {features.map((feature, index) => (
                <Feature key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
        <img
          loading="lazy"
          src={sectionImage}
          alt="Feature demonstration"
          className="object-contain flex-1 shrink self-stretch my-auto w-full aspect-[0.96] basis-0 min-w-[240px] max-md:max-w-full"
        />
      </div>
    </section>
  );
};

export default FeatureSectionLanding;
