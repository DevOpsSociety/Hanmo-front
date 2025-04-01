"use client";
import Image from "next/image";
import HanmoHeader from "@/components/HanmoHeader/HanmoHeader";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function ChangeNicknamePage() {
  const [changeNicknamePageData, setChangeNicknamePageData] = useState(null);

  useEffect(() => {
    const savedNickname = localStorage.getItem("nickname");

    if (savedNickname) {
      setChangeNicknamePageData({ nickname: savedNickname });
    }

    const fetchData = async () => {
      const temptoken = localStorage.getItem("token");
      if (!temptoken) {
        console.error("토큰이 없습니다.");
        return;
      }
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`;

      try {
        const response = await axios.get(url, {
          headers: {
            tempToken: temptoken,
            "Content-Type": "application/json",
          },
        });
        setChangeNicknamePageData(response.data);

        localStorage.setItem("nickname", response.data.nickname);

        console.log("Response:", response);
      } catch (e) {
        console.log("에러: ", e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <HanmoHeader />
      <div className={styles.charContainer}>
        <Image
          className={styles.speechBubble}
          src="/images/nicknamePage1.png"
          alt="바꿀 기회는 1번입니다."
          width={0}
          height={0}
          sizes="100vw" // 이거 없으면 화질깨짐
        />
        <Image
          className={styles.mainchar}
          src="/images/mainchar_smile.png"
          alt="한모"
          width={0}
          height={0}
          sizes="100vw" // 이거 없으면 화질깨짐
        />
      </div>
      <div className={`${styles.userNickname} ${styles.pretendardFont}`}>
        "{changeNicknamePageData?.nickname || "닉네임을 불러오는중..."}"
      </div>
      <div className={`${styles.btnContainer} `}>
        <Link href="/main" className={`${styles.mansehFont} ${styles.btn}`}>
          완전좋아
        </Link>
      </div>
    </div>
  );
}
