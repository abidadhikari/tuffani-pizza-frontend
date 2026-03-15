"use client";
import ApplicationConfigurationForm from "@/components/organism/feat/static-content/ApplicationConfigurationForm";
import { SiteHeader } from "@/components/site-header";
import { useGetStaticContent } from "@/hooks/services/static-content/useGetStaticContent";
import { useUpdateStaticContent } from "@/hooks/services/static-content/useUpdateStaticContent";
import { STATIC_CONTENT_KEYS } from "@/lib/constants";
import { fetchStaticContent } from "@/lib/fetch-static-content";
import { ApplicationConfig } from "@/types/staticContent.type";
import { useEffect, useState } from "react";

export default function ApplicationConfigPage() {
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

  const appConfigData = fetchStaticContent(
    STATIC_CONTENT_KEYS.APPLICATION_CONFIG,
    data,
  )?.value;

  const value: ApplicationConfig | null = appConfigData
    ? {
        email: appConfigData.email || "",
        phoneNumber: appConfigData.phoneNumber || "",
        address: appConfigData.address || "",
        socialMediaLinks: {
          facebook: appConfigData.socialMediaLinks?.facebook || "",
          twitter: appConfigData.socialMediaLinks?.twitter || "",
          instagram: appConfigData.socialMediaLinks?.instagram || "",
          linkedin: appConfigData.socialMediaLinks?.linkedin || "",
        },
        openingHours: appConfigData.openingHours || "",
      }
    : null;

  return (
    <div>
      <SiteHeader
        title="Application Configurations"
        description="Manage application-wide settings and configurations."
      />
      <ApplicationConfigurationForm defaultValues={appConfigData} />
    </div>
  );
}
