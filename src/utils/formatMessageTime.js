// utils/formatMessageTime.js

function padZero(number) {
    return number.toString().padStart(2, "0");
  }
  
  export function formatMessageTime(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    
    // 날짜가 오늘인지 확인
    if (date.toDateString() === now.toDateString()) {
      const hours = padZero(date.getHours());
      const minutes = padZero(date.getMinutes());
      return `${hours}:${minutes}`;
    }
    
    // 날짜가 어제인지 확인
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "어제";
    }
    
    // 그 외의 경우 (어제보다 이전)
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1); // getMonth()는 0부터 시작하므로 1을 더함
    const day = padZero(date.getDate());
    
    return `${year}-${month}-${day}`;
  }