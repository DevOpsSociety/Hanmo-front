"use client";

import { useEffect, useState } from "react";
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

// 현재 UTC 시간 가져오기 (KST 변환 제거)
function getCurrentUTCTime() {
  const now = new Date();

  return {
    year: now.getUTCFullYear(),
    month: now.getUTCMonth() + 1,
    day: now.getUTCDate(),
    hour: now.getUTCHours(), // UTC 시간 그대로 사용
    minute: now.getUTCMinutes(),
  };
}

// 남은 시간 계산 (시:분 형식) - 수정된 버전
function calculateRemainTime(targetDateTime: { year: number; month: number; day: number; hour: number; minute: number; }) {
  const currentTime = getCurrentUTCTime(); // KST 대신 UTC 사용

  console.log("현재 UTC 시간:", currentTime);
  console.log("목표 UTC 시간:", targetDateTime);

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
  const [displayTitle, setDisplayTitle] = useState(title);

  // title이 ISO 문자열일 때 1분마다 업데이트
  useEffect(() => {
    if (!isISOString(title)) {
      setDisplayTitle(title);
      return;
    }

    // 즉시 한 번 계산
    const updateRemainTime = () => {
      const nextDay = addOneDay(title);
      console.log("다음 날:", nextDay);

      const remainTime = calculateRemainTime(nextDay);
      console.log("남은 시간:", remainTime);

      setDisplayTitle(remainTime);
    };

    // 첫 번째 업데이트
    updateRemainTime();

    // 1분(60초)마다 업데이트
    const timer = setInterval(updateRemainTime, 60 * 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, [title]);

  return (
    <header className="relative text-center border-b border-solid border-[#E7E7E7] h-[73px] flex items-center justify-center">
      <div className="absolute left-0 pl-4">
        <HeaderBackButton />
      </div>
      <span className="mx-auto text-[28px] font-[manSeh] text-[#134D80]">{displayTitle}</span>
    </header>
  );
}