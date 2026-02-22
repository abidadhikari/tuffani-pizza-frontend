import WavyText from "@/components/atom/WavyText";
import CustomerReviewCard from "@/components/molecule/CustomerReviewCard";
import AppCarousel from "@/components/molecule/AppCarousel";
import { useGetStaticContent } from "@/hooks/services/static-content/useGetStaticContent";
import { fetchStaticContent } from "@/lib/fetch-static-content";
import { STATIC_CONTENT_KEYS } from "@/lib/constants";

export default function CustomerReviewSection() {
  const { data: staticContent } = useGetStaticContent();
  const testimonialStaticContent = fetchStaticContent(
    STATIC_CONTENT_KEYS.TESTIMONIAL_SECTION,
    staticContent,
  );
  const data = [
    {
      title: "Pizza Perfection!",
      review:
        "Tuffani's Super तुफानी Pizza is absolutely amazing! The crust is perfectly baked, the toppings are fresh, and the smoky flavor makes every bite unforgettable. Definitely the best pizza in Baneshwor!",
      reviewer: "Rajan K",
    },
    {
      title: "Burger Heaven!",
      review:
        "I tried the Juicy Tuffani Burger and it blew me away! Tender chicken, fresh veggies, and melted cheese — every bite was packed with flavor. A must-visit spot for burger lovers in Kathmandu!",
      reviewer: "Priya S",
    },
    {
      title: "Crunchy Chicken Delight!",
      review:
        "The Crunchy Chicken at Tuffani is so crispy on the outside and juicy on the inside. Perfectly spiced and served hot — I can't get enough of it!",
      reviewer: "Sujan T",
    },
    {
      title: "Wraps Worth Coming Back For!",
      review:
        "Tuffani's chicken wraps are my go-to for a quick, tasty meal. Fresh ingredients, bold flavors, and perfectly balanced spices — every bite is a treat!",
      reviewer: "Anjali M",
    },
  ];

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
            />
          )}
        />
      </div>
    </div>
  );
}
