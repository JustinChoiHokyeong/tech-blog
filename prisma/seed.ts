import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { generateSlug } from '../src/lib/slug';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const tags = await Promise.all(
    ['Next.js', 'TDD', 'SEO', 'Docker'].map((name) =>
      prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name, slug: generateSlug(name) },
      }),
    ),
  );

  const posts = [
    {
      title: '블로그 프로젝트를 시작하며',
      content:
        '이 블로그는 Next.js 풀스택 파이프라인을 직접 구축하며 배운 것을 기록하는 공간입니다.',
      tagNames: ['Next.js'],
    },
    {
      title: 'TDD로 슬러그 생성 함수 만들기',
      content: 'Red-Green-Refactor 사이클로 유틸 함수 하나를 처음부터 끝까지 만들어봤습니다.',
      tagNames: ['TDD', 'Next.js'],
    },
    {
      title: 'Docker Compose로 로컬 Postgres 띄우기',
      content: 'Colima와 docker-compose.yml로 로컬 개발 환경용 PostgreSQL을 구성했습니다.',
      tagNames: ['Docker'],
    },
  ];

  for (const post of posts) {
    const slug = generateSlug(post.title);
    await prisma.post.upsert({
      where: { slug },
      update: {},
      create: {
        title: post.title,
        slug,
        content: post.content,
        status: 'PUBLISHED',
        tags: {
          connect: tags
            .filter((tag) => post.tagNames.includes(tag.name))
            .map((tag) => ({ id: tag.id })),
        },
      },
    });
  }

  // 비밀번호 해싱은 Phase 5(인증)에서 bcrypt로 구현 예정. 지금은 로컬 개발용 더미 값.
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', passwordHash: 'seed-placeholder' },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
