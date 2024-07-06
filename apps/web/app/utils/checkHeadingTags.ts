export function checkHeadingTags(htmlString: string) {
  // h1, h2, h3 태그를 찾는 정규 표현식
  const headingRegex = /<h[1-3][^>]*>.*?<\/h[1-3]>/i;

  // 정규 표현식 테스트 결과 반환
  return headingRegex.test(htmlString);
}
