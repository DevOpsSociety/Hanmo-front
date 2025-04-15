"use client";
import Image from "next/image";
import HanmoHeader from "@/components/HanmoHeader/HanmoHeader";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserProfile = {
  nickname: string;
};

export default function NicknamePage() {
  const [nicknamePageData, setNicknamePageData] = useState<UserProfile | null>(
    null
  );
  useEffect(() => {
    const fetchData = async () => {
      const temptoken = localStorage.getItem("token");
      if (!temptoken) {
        console.error("토큰이 없습니다.");
        return;
      }
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`;
      console.log("Request URL:", url);
      try {
        const response = await axios.get(url, {
          headers: {
            tempToken: temptoken,
          },
        });
        setNicknamePageData(response.data);
        console.log("Response:", response);
      } catch (e) {
        console.log("에러: ", e);
      }
    };
    fetchData();
  }, []);

  const router = useRouter();
  const [nickname, setNickname] = useState(""); // 변경할 닉네임 저장

  useEffect(() => {
    if (nicknamePageData?.nickname) {
      setNickname(nicknamePageData.nickname); // 기존 닉네임을 기본값으로 설정
    }
  }, [nicknamePageData]);

  const handleNicknameChange = async () => {
    const temptoken = localStorage.getItem("token");
    const url2 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/nickname`;
    try {
      await axios.put(
        url2,
        { nickname },
        {
          headers: {
            tempToken: temptoken,
          },
        }
      );
      alert("닉네임 변경 성공!");

      localStorage.setItem("nickname", nickname);

      router.push("/changeNickname");
    } catch (error) {
      console.error("닉네임 변경 실패:", error);
    }
  };

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
        {`"${nicknamePageData?.nickname}"`}
      </div>
      <div className={`${styles.btnsContainer} ${styles.mansehFont}`}>
        <button
          onClick={handleNicknameChange}
          className={`${styles.btns} ${styles.btn_l}`}
        >
          변경
        </button>
        <Link href="/main" className={`${styles.btns} ${styles.btn_r}`}>
          좋아
        </Link>
      </div>
    </div>
  );
}
