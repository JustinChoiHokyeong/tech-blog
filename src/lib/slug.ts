export function generateSlug(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '') // \p{L}\p{N}: 한글 등 비ASCII 문자도 유지하기 위한 유니코드 매칭
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
