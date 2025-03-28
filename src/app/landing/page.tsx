"use client";

import styles from "./styles.module.css";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className={styles.Container}>
      <div className={styles.hanmo}>
        <span className={styles.han}>한</span>
        <span className={styles.mo}>모</span>
      </div>
      <div className={styles.sloganContainer}>
        <div className={styles.hanmoSlogan}>세에서</div>
        <div className={`${styles.hanmoSlogan} ${styles.여봐요}`}>여봐요 </div>
      </div>
      <Image
        src="/images/mainchar.png"
        alt="한모"
        className={styles.mainchar}
        width={0}
        height={0}
        sizes="100vw"
      />
      <div className={styles.btnsContainer}>
        <button className={`${styles.btns} ${styles.btn_l}`}>
          매칭
          <br />
          확인
        </button>
        <button className={`${styles.btns} ${styles.btn_r}`}>
          회원
          <br />
          가입
        </button>
      </div>
    </div>
  );
}
