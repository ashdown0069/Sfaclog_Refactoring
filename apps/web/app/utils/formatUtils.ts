export function formatDate(date: string) {
  const now = new Date();
  const newDate = new Date(date);
  const diff = now.getTime() - newDate.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < hour) {
    return `${Math.floor(diff / minute)}분 전`;
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}시간 전`;
  } else if (diff < 7 * day) {
    return `${Math.floor(diff / day)}일 전`;
  } else {
    //2023.01.01 형식으로 반환
    return `${newDate.getFullYear()}.${(newDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.${newDate.getDate().toString().padStart(2, '0')}`;
  }
}

export function formatNumber(num: number) {
  if (num >= 10000) {
    const divided = num / 10000;
    return (
      (divided - Math.floor(divided) < 0.01
        ? Math.floor(divided)
        : divided.toFixed(1)) + 'M'
    );
  } else if (num >= 1000) {
    const divided = num / 1000;
    return (
      (divided - Math.floor(divided) < 0.01
        ? Math.floor(divided)
        : divided.toFixed(1)) + 'K'
    );
  } else {
    return num.toString();
  }
}

//profile card에서 경력기간 포맷팅
export function FormatDateCareerPeriod(dateString: string) {
  // Date 객체로 변환
  const date = new Date(dateString);

  // 연도와 월 추출
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const formattedDate = `${year}.${month}`;
  return formattedDate;
}

export function formatDateCommentItem(originalDateString: string) {
  const date = new Date(originalDateString);

  const year = date.getFullYear().toString().slice(2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

export function CountComments(comments: any[]) {
  let count = 0;
  comments.forEach(comment => {
    count++;
    if (comment.replies) {
      count += comment.replies.length;
    }
  });
  return count;
}
