import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { getAllBlogs } from "../../../lib/getAllBlogs";
import { Blogs } from "@/components/Blogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Hokyeong Choi",
  // description:
  //   "Hokyeong Choi is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

export default async function Blog() {
  const blogs = await getAllBlogs();
  const data = blogs.map(({ component, ...meta }) => meta);

  return (
    <Container>
      <span className="text-4xl">📝</span>
      <Heading className="font-black pb-4">I write about technology</Heading>
      <Paragraph className="pb-10">
        새로 알게 된 내용들을 <Highlight>정리하고 문서화하며</Highlight>{" "}
        꾸준하게 학습하고 있습니다.
      </Paragraph>
      <Blogs blogs={data} />
    </Container>
  );
}
