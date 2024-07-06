//@ts-nocheck
export function extractTextFromHTML(htmlString: string, maxCount = 5) {
  // p 태그 내용을 찾는 정규 표현식
  const regex = /<p>(.*?)<\/p>/gs;

  // 결과를 저장할 배열
  const result = [];

  // 정규 표현식으로 매칭되는 내용 찾기
  let match;
  let count = 0;
  while ((match = regex.exec(htmlString)) !== null && count < maxCount) {
    // 태그 제거 후 순수 텍스트만 추출
    let text = match[1].replace(/<[^>]*>/g, '');
    // 앞뒤 공백 제거 후 결과 배열에 추가
    result.push(text.trim());
    count++;
  }

  return result.join('\n');
}
