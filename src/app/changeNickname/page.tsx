"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { s } from 'framer-motion/client';

type ChangeNicknamePageData = {
  nickname: string;
};

export default function ChangeNicknamePage() {
  const [changeNicknamePageData, setChangeNicknamePageData] =
    useState<ChangeNicknamePageData | null>(null);

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
        console.log("토큰:", temptoken);
        if (response.data.nickname) {
          setChangeNicknamePageData(response.data);
          localStorage.setItem("nickname", response.data.nickname);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={`${styles.container} font-[manseh]`}>
        <div className={`${styles.userNickname}`}>
          {changeNicknamePageData?.nickname || "닉네임을 불러오는중..."}
        </div>
        <div className={styles.flexSpacer}></div> {/* 중간여백용 */}
        
          <div className={styles.maincharWrapper}>
          <Image
            className={styles.mainchar}
            src="/images/mainchar_stand2.png"
            alt="한모"
            width={0}
            height={0}
            sizes="100vw" // 이거 없으면 화질깨짐
          />
          </div>
          <div className={`${styles.btnContainer} `}>
            <Link href="/main" className={`${styles.btn}`}>
              완전좋아
            </Link>
          </div>
        </div>

    </>
  );
}

{/* <Image
className={styles.mainchar}
src="/images/mainchar_smile.png"
alt="한모"
width={0}
height={0}
sizes="100vw" // 이거 없으면 화질깨짐
/> */}