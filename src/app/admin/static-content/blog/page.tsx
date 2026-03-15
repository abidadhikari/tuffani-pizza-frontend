"use client";

import StaticTitleDescriptionTool from "@/components/molecule/StaticTitleDescriptionTool";
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
      <SiteHeader title="Blog Page Static Content" />
      {data ? (
        <>
          <StaticTitleDescriptionTool
            sectionKey={STATIC_CONTENT_KEYS.BLOG_PAGE_HERO_SECTION}
            defaultValue={
              fetchStaticContent(
                STATIC_CONTENT_KEYS.BLOG_PAGE_HERO_SECTION,
                data,
              )?.value
            }
            onSave={(json) => {
              handleUpdate(
                STATIC_CONTENT_KEYS.BLOG_PAGE_HERO_SECTION,
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
