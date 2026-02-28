import WavyText from "@/components/atom/WavyText";
import CustomerReviewCard from "@/components/molecule/CustomerReviewCard";
import AppCarousel from "@/components/molecule/AppCarousel";
import { fetchStaticContent } from "@/lib/fetch-static-content";
import { STATIC_CONTENT_KEYS } from "@/lib/constants";
import { TestimonialResponseDto } from "@/client";
import { IStaticContent } from "@/types/staticContent.type";

interface CustomerReviewSectionProps {
  testimonials: TestimonialResponseDto[];
  staticContent: IStaticContent;
}

export default function CustomerReviewSection({
  testimonials,
  staticContent,
}: CustomerReviewSectionProps) {
  const testimonialStaticContent = fetchStaticContent(
    STATIC_CONTENT_KEYS.TESTIMONIAL_SECTION,
    staticContent,
  );
  const data = testimonials.map((testimonial) => ({
    title: testimonial.title,
    review: testimonial.testimonial,
    reviewer: testimonial.name,
    designation: testimonial.designation,
    image: testimonial?.Asset?.url,
  }));

  const reviews = [...data, ...data, ...data];

  return (
    <div className="py-20">
      <h2 className="font-bold text-2xl max-w-[90%] md:text-3xl mb-4 text-center mx-auto">
        {testimonialStaticContent?.value?.title ? (
          <>
            {testimonialStaticContent?.value.title.prefix}{" "}
            <WavyText className="inline">
              {testimonialStaticContent?.value.title.highlight}
            </WavyText>{" "}
            {testimonialStaticContent?.value.title.suffix}
          </>
        ) : (
          <>
            What our{" "}
            <WavyText className="inline">Customers are Saying</WavyText>
          </>
        )}
      </h2>

      <p className="text-light text-[#828282] text-base md:text-lg mb-16 text-center w-194.25 max-w-[90%] mx-auto ">
        {testimonialStaticContent?.value.description ||
          "See why food lovers call Tufani the best pizza, fried chicken, and burger spot in Baneshwor and Kathmandu."}
      </p>

      <div className="my-width mx-auto">
        <AppCarousel
          items={reviews}
          renderItem={(item: (typeof data)[0], index) => (
            <CustomerReviewCard
              key={index}
              title={item.title}
              review={item.review}
              reviewer={item.reviewer}
              designation={item.designation}
              image={item.image as string}
            />
          )}
        />
      </div>
    </div>
  );
}
