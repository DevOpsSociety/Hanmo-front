"use client";

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import ad4 from "../../../public/ad4.jpg";
import styles from "./styles.module.css";

export default function MatchingWaitingPage() {
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const router = useRouter();
  const handleMoveToMainPage = () => {
    router.push("/main");
  };
  const handleCancelMatching = async () => {
    const temptoken = localStorage.getItem("token");
    if (!temptoken) {
      console.error("토큰이 없습니다.");
      return;
    }
    const cancelUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/matching/cancel`;
    try {
      const response = await axios.delete(cancelUrl, {
        headers: {
          tempToken: temptoken,
        },
      });
      alert(response.data);
      handleMoveToMainPage();
      console.log(response.data);
      setErrorCode("404");
    } catch (e) {
      console.log("에러: ", e);
    }
  };

  return (
    <div className={`${styles.container} font-[manseh]`}>
      <div className={styles.adBox}>
        <Link href="https://vision.hansei.ac.kr/vision/2433/subview.do">
          <Image src={ad4} alt="광고" className="h-[262px]" />
        </Link>
      </div>
      <div className={`${styles.comment}`}>
        매칭 등록이 완료되었습니다! <br />
        잠시만 기다려주세요!
      </div>
      <Link href="./main" className={`${styles.homeBtn}`}>
        홈으로
      </Link>
      <button onClick={handleCancelMatching} className={`${styles.matchingCancelBtn}`}>
        매칭 취소
      </button>
    </div>
  );
}