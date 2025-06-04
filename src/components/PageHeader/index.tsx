"use client";

import HeaderBackButton from "../HeaderBackButton";

// 일(day)에 1을 더하고, 월/년 넘김도 자동 처리
function addOneDay(isoString: string) {
  const d = new Date(isoString);
  d.setUTCDate(d.getUTCDate() + 1); // 일에 1 추가 (자동으로 월/년 넘김 처리)

  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    isoString: d.toISOString(), // 새로운 ISO 문자열도 반환
  };
}

// 현재 UTC 시간 가져오기
function getCurrentKSTTime() {
  const now = new Date();
  // 한국 시간으로 변환 (UTC+9)
  const kstOffset = 9 * 60; // 9시간을 분으로 변환
  const kstTime = new Date(now.getTime() + (kstOffset * 60 * 1000));

  return {
    year: kstTime.getUTCFullYear(), // UTC 메서드를 사용하지만 실제로는 KST 시간
    month: kstTime.getUTCMonth() + 1,
    day: kstTime.getUTCDate(),
    hour: kstTime.getUTCHours(),
    minute: kstTime.getUTCMinutes(),
  };
}

// 남은 시간 계산 (시:분 형식) - 수정된 버전
function calculateRemainTime(targetDateTime: { year: number; month: number; day: number; hour: number; minute: number; }) {
  const currentTime = getCurrentKSTTime(); // UTC 대신 KST 사용

  // Date 객체로 변환 (UTC 기준)
  const target = new Date(Date.UTC(targetDateTime.year, targetDateTime.month - 1, targetDateTime.day, targetDateTime.hour, targetDateTime.minute));
  const current = new Date(Date.UTC(currentTime.year, currentTime.month - 1, currentTime.day, currentTime.hour, currentTime.minute));

  // 차이를 밀리초로 계산
  const diffMs = target.getTime() - current.getTime();

  if (diffMs <= 0) {
    return "00:00";
  }

  // 밀리초를 분으로 변환
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

// ISO 문자열인지 확인
function isISOString(str: string) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str);
}

export default function PageHeader({ title }: { title: string; }) {
  let displayTitle = title;

  // title이 ISO 문자열이면 남은 시간을 계산해서 표시
  if (isISOString(title)) {
    // 일에 1을 더한 값 계산
    const nextDay = addOneDay(title);

    // 현재 시간과 비교해서 남은 시간 계산
    const remainTime = calculateRemainTime(nextDay);
    console.log("남은 시간:", remainTime);

    // 남은 시간을 title로 사용
    displayTitle = remainTime;
  }

  return (
    <header className="relative text-center border-b border-solid border-[#E7E7E7] h-[73px] flex items-center justify-center">
      <div className="absolute left-0 pl-4">
        <HeaderBackButton />
      </div>
      <span className="mx-auto text-[28px] font-[manSeh] text-[#134D80]">{displayTitle}</span>
    </header>
  );
}