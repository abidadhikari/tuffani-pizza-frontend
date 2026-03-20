import HeroSectionWithFoods from "@/components/template/HeroSectionWithFoods";

import { Mail, Map, Phone } from "lucide-react";
import MapSection from "@/components/organism/feat/landing/MapSection";
import ContactUsForm from "@/components/organism/feat/landing/ContactUsForm";
import { getStaticPageData } from "@/hooks/services/public-services";
import { fetchStaticContent } from "@/lib/fetch-static-content";
import { STATIC_CONTENT_KEYS } from "@/lib/constants";
import { ApplicationConfig } from "@/types/staticContent.type";

export const dynamic = "force-dynamic";

export default async function ContactUsPage() {
  const staticContents = await getStaticPageData();
  const rawData = fetchStaticContent(
    STATIC_CONTENT_KEYS.BLOG_PAGE_HERO_SECTION,
    staticContents,
  );
  const applicationConfig: ApplicationConfig = fetchStaticContent(
    STATIC_CONTENT_KEYS.APPLICATION_CONFIG,
    staticContents,
  )?.value;
  const contactInfo = [
    {
      title: "Phone Number",
      value: applicationConfig?.phoneNumber || "N/A",
      description: "Available during opening times for orders",
      icon: Phone,
    },
    {
      title: "Email",
      value: applicationConfig?.email || "N/A",
      description:
        "Email us for general inquiries, feedback, or partnership opportunities",
      icon: Mail,
    },
    {
      title: "Location",
      value: applicationConfig?.address || "N/A",
      description:
        "Visit us at our restaurant for a delightful dining experience",
      icon: Map,
    },
  ];
  return (
    <section>
      <HeroSectionWithFoods
        title={{
          prefix: rawData?.value?.title?.prefix,
          highlight: rawData?.value?.title?.highlight,
          suffix: rawData?.value?.title?.suffix,
        }}
        description={rawData?.value?.description}
      >
        <div className="flex gap-5 py-20 flex-wrap">
          <div className="bg-white p-8 rounded-2xl flex-1">
            <h2 className="font-bold text-3xl mb-11.5">Send a Message</h2>
            <ContactUsForm />
          </div>
          <div className="bg-white p-8 rounded-2xl space-y-[46px] w-[500px] max-w-full">
            {contactInfo.map((item: (typeof contactInfo)[0], index: number) => {
              return (
                <div key={index} className="space-y-2.5">
                  <div className="text-sm text-black/75">{item.title}</div>
                  <div className="flex gap-2">
                    <div className="size-6 grid place-items-center">
                      <item.icon className="text-brand size-4" />
                    </div>
                    <div className="flex flex-col gap-1.75">
                      <div className="font-bold text-base">{item.value}</div>
                      <div className="text-sm text-black/75">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </HeroSectionWithFoods>
      <div>
        <div className="my-width mx-auto py-10 space-y-5">
          {/* <MapSection lat={48.8583736} lng={2.2919064} />
          <MapSection searchText="Tufani Pizza Skywalk Tower Kathmandu" /> */}
          <MapSection searchText="Tufani Pizza" />
        </div>
      </div>
    </section>
  );
}
