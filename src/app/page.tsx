import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function Home() {
  return (
    <Container>
      <span className="text-4xl">👋</span>
      <Heading className={twMerge("font-black", "whitespace-pre")}>
        Hello, I&apos;m Hokyeong Choi
      </Heading>
      <Paragraph className="max-w-xl mt-4">
        성장을 즐기며 책임감 있게 일하는, <Highlight>3년차</Highlight>{" "}
        프론트엔드 개발자 최호경입니다.
      </Paragraph>
      {/* <Paragraph className="max-w-xl mt-4">
        I&apos;m a senior software engineer with{" "}
        <Highlight>7 years of experience</Highlight> building scalable web apps
        that are performance optimized and good looking.
      </Paragraph> */}

      {/* <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        What I&apos;ve been working on
      </Heading> */}
      {/* <Products /> */}
      {/* <TechStack /> */}
    </Container>
  );
}
