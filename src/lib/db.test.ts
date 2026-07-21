import 'dotenv/config';
import { afterAll, describe, expect, it } from 'vitest';

process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
const { prisma } = await import('./db');

describe('prisma client wrapper', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('테스트 DB에 연결해서 User를 생성/조회/삭제할 수 있다', async () => {
    const email = 'wrapper-test@example.com';

    const created = await prisma.user.create({
      data: { email, passwordHash: 'test-hash' },
    });
    expect(created.email).toBe(email);

    const found = await prisma.user.findUnique({ where: { email } });
    expect(found?.id).toBe(created.id);

    await prisma.user.delete({ where: { email } });
    const afterDelete = await prisma.user.findUnique({ where: { email } });
    expect(afterDelete).toBeNull();
  });
});
