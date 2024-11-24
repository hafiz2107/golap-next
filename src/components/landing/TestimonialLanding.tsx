/* eslint-disable @next/next/no-img-element */
import React from 'react';

type TestimonialSectionProps = {
  testimonialImage: string;
  rating: number;
  quote: string;
  author: string;
  position: string;
  companyLogo: string;
};

const TestimonialSectionLanding: React.FC<TestimonialSectionProps> = ({
  testimonialImage,
  rating,
  quote,
  author,
  position,
  companyLogo,
}) => {
  return (
    <section className="flex overflow-hidden flex-col justify-center px-16 py-28 w-full text-black bg-white max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-center w-full max-md:max-w-full">
        <img
          loading="lazy"
          src={testimonialImage}
          alt="Testimonial visual"
          className="object-contain flex-1 shrink self-stretch my-auto w-full aspect-[0.96] basis-0 min-w-[240px] max-md:max-w-full"
        />
        <div className="flex overflow-hidden flex-col flex-1 shrink items-start self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
          <div className="flex overflow-hidden gap-1 items-start">
            {[...Array(rating)].map((_, i) => (
              <img
                key={i}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ee80905284cf407f86ba24b4da6872a51ee4765211824c7d48b487d08e28528?placeholderIfAbsent=true&apiKey=239c753944c648dcbfa88d3ccbad7206"
                alt="Star rating"
                className="object-contain shrink-0 w-5 aspect-[1.05]"
              />
            ))}
          </div>
          <blockquote className="self-stretch mt-8 text-2xl font-bold leading-9 text-black max-md:max-w-full">
            &quot;{quote}&quot;
          </blockquote>
          <div className="flex gap-5 items-center mt-8 text-base text-black">
            <div className="flex flex-col self-stretch my-auto">
              <div className="font-semibold">{author}</div>
              <div>{position}</div>
            </div>
            <div className="shrink-0 self-stretch my-auto w-0 border border-black border-solid h-[61px]" />
            <img
              loading="lazy"
              src={companyLogo}
              alt="Company logo"
              className="object-contain shrink-0 self-stretch my-auto aspect-[2.5] w-[120px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSectionLanding;
