export function formatBackendDate(dateStr: string): string {
  // 마이크로초 제거 (예: "2025-04-29T13:20:12")
  const trimmed = dateStr.split('.')[0];
  const date = new Date(trimmed);

  if (isNaN(date.getTime())) return ''; // 유효하지 않은 날짜 처리

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}
