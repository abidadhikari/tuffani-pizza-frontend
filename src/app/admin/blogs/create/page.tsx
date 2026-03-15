import CreateUpdateBlog from "@/components/organism/feat/blog/CreateUpdateBlog";
import { SiteHeader } from "@/components/site-header";

export default function CreateBlog() {
  return (
    <section>
      <SiteHeader title="Create Blog" />
      <CreateUpdateBlog type="create" />
    </section>
  );
}
