import WavyText from "@/components/atom/WavyText";
import CustomerReviewCard from "@/components/molecule/CustomerReviewCard";
import AppCarousel from "@/components/molecule/AppCarousel";

export default function CustomerReviewSection() {
  const reviews = Array.from({ length: 10 });

  return (
    <div className="py-20">
      <h2 className="font-bold text-2xl max-w-[90%] md:text-3xl mb-4 text-center">
        What our <WavyText className="inline">Customers are Saying</WavyText>
      </h2>

      <p className="text-light text-[#828282] text-base md:text-lg mb-16 text-center w-194.25 max-w-[90%] mx-auto">
        Subheading that sets up context, shares more info about the website, or
        generally gets people psyched to keep scrolling.
      </p>

      <div className="my-width mx-auto">
        <AppCarousel
          items={reviews}
          renderItem={(_, index) => <CustomerReviewCard key={index} />}
        />
      </div>
    </div>
  );
}
