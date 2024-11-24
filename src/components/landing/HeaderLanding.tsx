/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

type HeaderProps = {
  logo: string;
};

const HeaderLanding: React.FC<HeaderProps> = ({ logo }) => {
  return (
    <header className="flex flex-col justify-center px-16 w-full bg-white min-h-[72px] max-md:px-5 max-md:max-w-full">
      <nav className="flex flex-wrap gap-8 justify-center items-center w-full max-md:max-w-full">
        <div className="flex flex-1 shrink items-start self-stretch my-auto basis-0 min-w-[240px]">
          <img
            loading="lazy"
            src={logo}
            alt="Company Logo"
            className="object-contain aspect-[2.33] w-[84px]"
          />
        </div>
        <div className="flex gap-8 items-center self-stretch my-auto text-base text-black min-w-[240px] max-md:max-w-full">
          <Link href="/" className="gap-1 self-stretch my-auto">
            Home Page
          </Link>
          <Link
            href="/features"
            className="gap-1 self-stretch my-auto whitespace-nowrap"
          >
            Features
          </Link>
          <Link href="/pricing" className="gap-1 self-stretch my-auto">
            Pricing Plans
          </Link>
          <div className="flex flex-col self-stretch my-auto whitespace-nowrap w-[103px]">
            <div className="flex gap-1 justify-center items-center w-full">
              <Link href="/resources" className="self-stretch my-auto">
                Resources
              </Link>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0b86a5e1b77b3900ea3bfadf91e5619307aba54fbb18777b5c7faeb40f35755?placeholderIfAbsent=true&apiKey=239c753944c648dcbfa88d3ccbad7206"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1 shrink gap-4 items-center self-stretch my-auto text-base text-white basis-0 min-w-[240px]">
          <Link
            href="/signup"
            className="gap-2 self-stretch px-5 py-2 my-auto bg-black border border-black border-solid"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderLanding;
