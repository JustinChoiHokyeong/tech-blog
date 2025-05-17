# 기술 블로그

## 개발 프로세스

### 25.05.17

1. next.js 프로젝트 생성
2. 기본 레이아웃 잡기
   - GNB, Sidebar, MainContainer
   -
3. Pretendard 폰트 적용

   - public 폴더에 다운받은 가변 폰트(Variable) 파일 추가
   - `global.css` 파일에 @font-face로 웹 폰트 정의 및 전체 적용

```
@font-face {
  font-family: "Pretendard";
  src: url("/fonts/PretendardVariable.woff2") format("woff2-variations");
  font-weight: 45 920;
  font-display: swap;
}

html {
  font-family: "Pretendard", sans-serif;
}
```

   - `브라우저 > 계산됨 탭 최하단 > 렌더링된 글꼴`에서 글꼴 적용 여부 확인 가능
   - tailwind prittier 적용해서 클래스명 정렬
     - 안되면 vscode 껐다 키기

```
// prettier.config.js 추가
module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
};

```
