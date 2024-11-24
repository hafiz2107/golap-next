/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

type HeroSectionProps = {
  heroImage: string;
};

const HeroSectionLanding: React.FC<HeroSectionProps> = ({ heroImage }) => {
  return (
    <section className="flex overflow-hidden flex-wrap gap-10 items-center px-16 py-28 w-full bg-white max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
        <div className="flex flex-col w-full text-black max-md:max-w-full">
          <h1 className="text-6xl font-bold leading-[67px] max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
            Transform Your Outreach with Instant Video Sharing
          </h1>
          <p className="mt-6 text-lg leading-7 max-md:max-w-full">
            Experience the future of communication with our AI-powered web
            application. Record and share engaging videos with your prospects in
            seconds, making your outreach more personal and effective.
          </p>
        </div>
        <div className="flex gap-4 items-start self-start mt-8 text-base">
          <Link
            href="/signup"
            className="gap-2 self-stretch px-6 py-3 text-white bg-black border border-black border-solid max-md:px-5"
          >
            Sign Up
          </Link>
          <Link
            href="/learn-more"
            className="gap-2 self-stretch px-6 py-3 text-black border border-black border-solid max-md:px-5"
          >
            Learn More
          </Link>
        </div>
      </div>
      <img
        loading="lazy"
        src={heroImage}
        alt="Video sharing platform demonstration"
        className="object-contain flex-1 shrink self-stretch my-auto w-full aspect-[0.96] basis-0 min-w-[240px] max-md:max-w-full"
      />
    </section>
  );
};

export default HeroSectionLanding;
