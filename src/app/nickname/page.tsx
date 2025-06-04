"use client";
import HanmoHeader from "@/components/HanmoHeader/HanmoHeader";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useAuthGuard } from "../../hooks/useAuthGuard";

type UserProfile = {
  nickname: string;
};

export default function NicknamePage() {
  const [nicknamePageData, setNicknamePageData] = useState<UserProfile | null>(
    null
  );

  useAuthGuard();


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
    <>
      <div className={`${styles.container} font-[manseh]`}>
        <div className={`${styles.userNickname}`}>
          {`${nicknamePageData?.nickname}`}
        </div>
        <div className={styles.flexSpacer}></div>
        <div className={styles.maincharWrapper}>
        <Image
          className={styles.mainchar}
          src="/images/mainchar_stand3.png"
          alt="한모"
          width={0}
          height={0}
          sizes="100vw" 
        />
        </div>
        <div className={`${styles.btnsContainer} `}>
          <Link href="/main" className={`${styles.btns} ${styles.btn_top}`}>
            좋아
          </Link>
          <button
            onClick={handleNicknameChange}
            className={`${styles.btns} ${styles.btn_btm}`}
          >
            다시 짓기(1회 제한)
          </button>
        </div>
      </div>
    </>
  );
}