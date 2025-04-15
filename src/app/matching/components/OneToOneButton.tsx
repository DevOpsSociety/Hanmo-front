"use client";
import styles from "./buttons.module.css";
import { useEffect } from "react";

interface OneToOneButtonProps {
  onClick: () => void;
  errorMessage?: string | null;
}

export default function OneToOneButton({
  onClick,
  errorMessage,
}: OneToOneButtonProps) {
  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorMessage]);

  return (
    <button className={`${styles.btns} ${styles.oneToOne}`} onClick={onClick}>
      랜덤 친구 만들기(1:1)
    </button>
  );
}
