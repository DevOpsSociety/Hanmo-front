"use client";
import styles from "./buttons.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface TwoToTwoButtonProps {
  onClick: () => void;
  errorMessage?: string | null;
  isSelected?: boolean;
}

export default function TwoToTwoButton({
  onClick,
  errorMessage,
  isSelected,
}: TwoToTwoButtonProps) {
  const router = useRouter();
  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage); // 모달로 수정하기
      router.back();
    }
  }, []);
  return (
    <button className={`
    ${styles.btns}
    ${styles.rightBg}
    ${isSelected ? styles.selected : ""}
    `} onClick={onClick}>
      랜덤 과팅(2:2)
    </button>
  );
}
