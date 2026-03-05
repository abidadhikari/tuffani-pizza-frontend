"use client";
import ContactsTable from "@/components/organism/feat/dashboard/ContactsTable";
import { SiteHeader } from "@/components/site-header";
import { useGetAllContacts } from "@/hooks/services/contacts/useGetAllContacts";
import { usePatchContact } from "@/hooks/services/contacts/usePatchContact";
import React, { useState } from "react";

export default function ContactPage() {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: contactsData, isLoading: contactsLoading } = useGetAllContacts({
    page: pageNo,
    limit: pageSize,
    isRead: undefined,
  });

  const { mutate: patchContact, isLoading: patchingContact } =
    usePatchContact();
  return (
    <div>
      <SiteHeader
        title="Contact Us"
        description="Check your contact information"
      />

      <ContactsTable
        data={contactsData?.data || []}
        pageNumber={pageNo}
        pageSize={pageSize}
        onPageChange={setPageNo}
        onPageSizeChange={setPageSize}
        totalRecords={contactsData?.meta?.total || 0}
        loading={contactsLoading}
        onReadClick={(row) => {
          patchContact({
            id: row.id,
            body: {
              isRead: true,
            },
          });
        }}
      />
    </div>
  );
}
