import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { remark } from "remark";
import html from "remark-html";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

// FIXME: 이거 왜 타입 에러 나지?
export default async function Page({ params }: any) {
  const { slug } = params;
  const post = getPostBySlug(slug);
  const processed = await remark().use(html).process(post.content);
  const contentHtml = processed.toString();

  return (
    <div className="prose max-w-none p-8">
      <h1>{post.meta.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
