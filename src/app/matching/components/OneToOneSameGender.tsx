"use client";
import styles from "./buttons.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface OneToOneButtonProps {
  onClick: () => void;
  errorMessage?: string | null;
}

export default function OneToOneSameGender({
  onClick,
  errorMessage,
}: OneToOneButtonProps) {
  const router = useRouter();

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage); // 모달로 수정하기
      router.back();
    }
  }, [errorMessage]);

  return (
    <button className={`${styles.btns} ${styles.oneToOne} ${styles.leftBg}`} onClick={onClick}>
      친구 뽑기(1:1 동성)
    </button>
  );
}
