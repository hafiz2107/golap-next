/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
};

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <Link href={href} className="flex-1 shrink py-2 w-full">
    {children}
  </Link>
);

const FooterLanding: React.FC = () => {
  return (
    <footer className="flex overflow-hidden flex-col px-16 py-20 w-full bg-white max-md:px-5 max-md:max-w-full">
      Continuing from where we left off in the Footer component:
      <div className="flex flex-wrap gap-10 items-start p-12 w-full border border-black border-solid max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap flex-1 shrink gap-10 items-start basis-0 min-w-[240px] max-md:max-w-full">
          <div className="flex overflow-hidden flex-col flex-1 shrink items-start basis-0">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/120597dfebf5d1a06ddef3b5896eb830d1ac420e7a3d0f1aad3f680e7d76aea2?placeholderIfAbsent=true&apiKey=239c753944c648dcbfa88d3ccbad7206"
              alt="Company Logo"
              className="object-contain aspect-[2.33] w-[84px]"
            />
          </div>
          <div className="flex overflow-hidden flex-col flex-1 shrink basis-0">
            <h3 className="text-base font-semibold text-black">Quick Links</h3>
            <nav className="flex flex-col mt-4 w-full text-sm text-black">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/help">Help Center</FooterLink>
              <FooterLink href="/blog">Blog Posts</FooterLink>
              <FooterLink href="/faq">FAQs</FooterLink>
            </nav>
          </div>
          <div className="flex overflow-hidden flex-col flex-1 shrink basis-0">
            <h3 className="text-base font-semibold text-black">Resources</h3>
            <nav className="flex flex-col mt-4 w-full text-sm text-black">
              <FooterLink href="/case-studies">Case Studies</FooterLink>
              <FooterLink href="/webinars">Webinars</FooterLink>
              <FooterLink href="/ebooks">E-books</FooterLink>
              <FooterLink href="/templates">Templates</FooterLink>
              <FooterLink href="/guides">Guides</FooterLink>
            </nav>
          </div>
          <div className="flex overflow-hidden flex-col flex-1 shrink basis-0">
            <h3 className="text-base font-semibold text-black">
              Stay Connected
            </h3>
            <nav className="flex flex-col mt-4 w-full text-sm text-black">
              <FooterLink href="/social">Social Media</FooterLink>
              <FooterLink href="/newsletter">Newsletter</FooterLink>
              <FooterLink href="/feedback">Feedback</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/support">Support</FooterLink>
            </nav>
          </div>
        </div>
        <div className="flex flex-col min-w-[240px] w-[400px]">
          <div className="flex flex-col w-full text-base text-black">
            <h3 className="font-semibold">Join</h3>
            <p className="mt-4 leading-6">
              Join our newsletter for updates on features and releases.
            </p>
          </div>
          <form className="flex flex-col mt-6 w-full">
            <div className="flex gap-4 items-start w-full text-base">
              <input
                type="email"
                placeholder="Your Email Here"
                aria-label="Your Email Here"
                className="flex-1 shrink gap-2 self-stretch p-3 border border-black border-solid basis-6 min-w-[240px] text-stone-500"
                required
              />
              <button
                type="submit"
                className="gap-2 self-stretch px-6 py-3 text-black whitespace-nowrap border border-black border-solid w-[119px] max-md:px-5"
              >
                Join
              </button>
            </div>
            <p className="mt-3 text-xs text-black">
              By joining, you agree to our Privacy Policy and consent to receive
              updates.
            </p>
          </form>
        </div>
      </div>
      <div className="flex flex-col mt-8 w-full max-md:max-w-full">
        <div className="flex flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full">
          <div className="flex flex-wrap gap-6 items-center text-sm text-black min-w-[240px] max-md:max-w-full">
            <p className="self-stretch my-auto text-black">
              © 2024 Relume. All rights reserved.
            </p>
            <Link href="/privacy" className="self-stretch my-auto underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="self-stretch my-auto underline">
              Terms of Service
            </Link>
            <button
              className="self-stretch my-auto underline"
              //   onClick={() => {
              //     /* Implement cookie settings logic */
              //   }}
            >
              Cookie Settings
            </button>
          </div>
          <div className="flex gap-3 items-start">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bd8242c262d0dcda7aa1f9a4a048fc666005f7f53549db90564769a580c2c49?placeholderIfAbsent=true&apiKey=239c753944c648dcbfa88d3ccbad7206"
                alt="Facebook"
                className="object-contain shrink-0 w-6 aspect-square"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4dda67f146b8c42f7d026cf08e3865a7477e41edabb39ab3fa8850f4cb98f1a?placeholderIfAbsent=true&apiKey=239c753944c648dcbfa88d3ccbad7206"
                alt="Twitter"
                className="object-contain shrink-0 w-6 aspect-square"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d34339721a3488fbea27551a496250c3d0af14ea767e177a446a731797a59b1?placeholderIfAbsent=true&apiKey=239c753944c648dcbfa88d3ccbad7206"
                alt="Instagram"
                className="object-contain shrink-0 w-6 aspect-square"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/630295e3a7af30a08dd6288032287342278bfd983413030237028d7f31f59cca?placeholderIfAbsent=true&apiKey=239c753944c648dcbfa88d3ccbad7206"
                alt="LinkedIn"
                className="object-contain shrink-0 w-6 aspect-square"
              />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b5ded87b92ed4d1d16eda2673953047ac2c05620e86ff570d75226700865da9?placeholderIfAbsent=true&apiKey=239c753944c648dcbfa88d3ccbad7206"
                alt="YouTube"
                className="object-contain shrink-0 w-6 aspect-square"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLanding;
