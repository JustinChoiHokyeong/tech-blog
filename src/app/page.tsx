import Link from "next/link";
import { getPostSlugs, getPostBySlug } from "../lib/posts";
import { Post } from "../lib/posts";

export default async function HomePage() {
  const slugs = getPostSlugs();
  const posts: Post[] = slugs.map((slug) => getPostBySlug(slug));

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">My Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="text-blue-500 underline"
            >
              {post.meta.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
