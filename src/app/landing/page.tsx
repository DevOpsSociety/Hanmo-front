"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

export default function LandingPage() {
  return (
    <div className={styles.Container}>
      <div className={styles.hanmo}>
        <Image
          src="/images/landingPage/landingPage1.png"
          alt="logo"
          width={0}
          className={styles.logo}
          height={0}
          sizes="100vw"
        />
      </div>
      <div className={`${styles.sloganContainer} ${styles.pretendardFont}`}>
        한세에서 모여봐요!
      </div>
      <Image
        src="/images/landingPage/landingPage2.png"
        alt="한모"
        className={styles.mainchar}
        width={0}
        height={0}
        sizes="100vw"
      />
      <div className={styles.btnsContainer}>
        <Link
          href="/login"
          className={`${styles.btns} ${styles.btn_l} font-[manseh]`}
        >
          로그인
        </Link>
        <Link
          href="/signup/1"
          className={`${styles.btns} ${styles.btn_r}  font-[manseh]`}
        >
          회원
          <br />
          가입
        </Link>
      </div>
    </div>
  );
}
