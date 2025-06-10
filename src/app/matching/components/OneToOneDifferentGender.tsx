"use client";
import styles from "./buttons.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface OneToOneButtonProps {
  onClick: () => void;
  errorMessage?: string | null;
  className?: string;
  isSelected?: boolean;
}

export default function OneToOneDifferentGender({
  onClick,
  errorMessage,
  className,
  isSelected,
}: OneToOneButtonProps) {
  const router = useRouter();

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage); // 모달로 수정하기
      router.back();
    }
  },[errorMessage]);

  return (
    <button onClick={onClick} 
    className={`
      ${styles.btns} 
      ${styles.oneToOne} 
      ${styles.middleBg}
      ${className ?? ''}
      ${isSelected ? styles.selected : ""}
      `} >
      친구 뽑기(1:1 이성)
    </button>
  );
}
