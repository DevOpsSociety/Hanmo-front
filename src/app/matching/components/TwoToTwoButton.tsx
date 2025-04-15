"use client";
import styles from "./buttons.module.css";
import { useEffect } from "react";

interface TwoToTwoButtonProps {
  onClick: () => void;
  errorMessage?: string | null;
}

export default function TwoToTwoButton({
  onClick,
  errorMessage,
}: TwoToTwoButtonProps) {
  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, []);
  return (
    <button className={`${styles.btns} ${styles.btns2}`} onClick={onClick}>
      랜덤 과팅(2:2)
    </button>
  );
}
