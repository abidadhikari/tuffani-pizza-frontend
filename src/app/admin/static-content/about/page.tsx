"use client";

import StaticTitleDescriptionTool from "@/components/molecule/StaticTitleDescriptionTool";
import StaticValueLabelTool from "@/components/molecule/StaticValueLabelTool";
import { SiteHeader } from "@/components/site-header";
import { useGetStaticContent } from "@/hooks/services/static-content/useGetStaticContent";
import { useUpdateStaticContent } from "@/hooks/services/static-content/useUpdateStaticContent";
import { STATIC_CONTENT_KEYS } from "@/lib/constants";
import { fetchStaticContent } from "@/lib/fetch-static-content";

export default function StaticContentPage() {
  const { data } = useGetStaticContent();
  const { mutate } = useUpdateStaticContent();

  const handleUpdate = (key: string, content: JSON) => {
    mutate({
      key: key,
      body: {
        value: content,
      },
    });
  };

  return (
    <div className="space-y-4">
      <SiteHeader title="About Page Static Content" />
      {data ? (
        <>
          <StaticTitleDescriptionTool
            sectionKey={STATIC_CONTENT_KEYS.ABOUT_PAGE_HERO_SECTION}
            defaultValue={
              fetchStaticContent(
                STATIC_CONTENT_KEYS.ABOUT_PAGE_HERO_SECTION,
                data,
              )?.value
            }
            onSave={(json) => {
              handleUpdate(
                STATIC_CONTENT_KEYS.ABOUT_PAGE_HERO_SECTION,
                JSON.parse(JSON.stringify(json)),
              );
            }}
            isArray={false}
          />
          <StaticTitleDescriptionTool
            sectionKey={STATIC_CONTENT_KEYS.ABOUT_PAGE_PIZZA_SECTION}
            defaultValue={
              fetchStaticContent(
                STATIC_CONTENT_KEYS.ABOUT_PAGE_PIZZA_SECTION,
                data,
              )?.value
            }
            onSave={(json) => {
              handleUpdate(
                STATIC_CONTENT_KEYS.ABOUT_PAGE_PIZZA_SECTION,
                JSON.parse(JSON.stringify(json)),
              );
            }}
            isArray={false}
          />

          <StaticValueLabelTool
            sectionKey={STATIC_CONTENT_KEYS.ABOUT_PAGE_STATS_SECTION}
            defaultValue={
              fetchStaticContent(
                STATIC_CONTENT_KEYS.ABOUT_PAGE_STATS_SECTION,
                data,
              )?.value
            }
            onSave={(json) => {
              handleUpdate(
                STATIC_CONTENT_KEYS.ABOUT_PAGE_STATS_SECTION,
                JSON.parse(JSON.stringify(json)),
              );
            }}
          />

          <StaticTitleDescriptionTool
            sectionKey={STATIC_CONTENT_KEYS.ABOUT_PAGE_CAROUSEL_SECTION}
            defaultValue={
              fetchStaticContent(
                STATIC_CONTENT_KEYS.ABOUT_PAGE_CAROUSEL_SECTION,
                data,
              )?.value
            }
            onSave={(json) => {
              handleUpdate(
                STATIC_CONTENT_KEYS.ABOUT_PAGE_CAROUSEL_SECTION,
                JSON.parse(JSON.stringify(json)),
              );
            }}
            isArray={false}
          />
        </>
      ) : null}
    </div>
  );
}
