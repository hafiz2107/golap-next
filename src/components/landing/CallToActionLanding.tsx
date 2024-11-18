import Link from 'next/link';
import React from 'react';

const CallToActionSectionLanding: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col justify-center px-16 py-28 w-full bg-white max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div className="flex flex-wrap gap-8 items-center w-full max-md:max-w-full">
        <div className="flex flex-col flex-1 shrink items-start self-stretch my-auto text-black basis-0 min-w-[240px] max-md:max-w-full">
          <div className="flex flex-col max-w-full w-[768px]">
            <h2 className="text-4xl font-bold leading-tight max-md:max-w-full">
              Unlock Your Video Potential Today
            </h2>
            <p className="mt-6 text-lg max-md:max-w-full">
              Experience the future of video communication now.
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-start self-stretch my-auto text-base min-w-[240px]">
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
    </section>
  );
};

export default CallToActionSectionLanding;
