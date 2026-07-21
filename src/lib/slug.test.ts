import { describe, expect, it } from 'vitest';
import { generateSlug } from './slug';

describe('generateSlug', () => {
  it('공백을 하이픈으로 바꾼다', () => {
    expect(generateSlug('Hello World')).toBe('hello-world');
  });

  it('연속된 공백을 하나의 하이픈으로 합친다', () => {
    expect(generateSlug('Hello   World')).toBe('hello-world');
  });

  it('특수문자를 제거한다', () => {
    expect(generateSlug('Hello, World!')).toBe('hello-world');
  });

  it('앞뒤 공백을 제거한다', () => {
    expect(generateSlug('  Hello World  ')).toBe('hello-world');
  });

  it('한글 제목을 지원한다', () => {
    expect(generateSlug('안녕 세계')).toBe('안녕-세계');
  });

  it('대문자를 소문자로 바꾼다', () => {
    expect(generateSlug('HELLO WORLD')).toBe('hello-world');
  });

  it('숫자를 유지한다', () => {
    expect(generateSlug('Hello 123 World')).toBe('hello-123-world');
  });
});
