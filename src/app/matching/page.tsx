"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import HanmoHeader from "../../components/HanmoHeader/HanmoHeader";
import OneToOneButton from "./components/OneToOneButton";
import TwoToTwoButton from "./components/TwoToTwoButton";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";

type MatchedUser = {
  nickname: string;
  instagramId: string;
};

type ApiResponse = {
  matchedUsers: MatchedUser[];
  matchingType: "ONE_TO_ONE" | "TWO_TO_TWO";
  code: string;
  message: string;
};

export default function MatchingPage() {
  const [matchingData, setMatchingData] = useState<ApiResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOneToOneMatch = async () => {
    const temptoken = localStorage.getItem("token");
    if (!temptoken) {
      return console.error("토큰이 없습니다.");
    }
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/matching/one-to-one`;
    console.log("URL:", url);
    try {
      const response = await axios.post(url, null, {
        headers: {
          tempToken: temptoken,
        },
      });
      setMatchingData(response.data);
      setErrorMessage(null);
      console.log("Response:", response);
      console.log("대기등록 완료!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          setErrorMessage("매칭 상대를 찾는 중이에요!");
        } else if (status === 409) {
          setErrorMessage("이미 매칭된 유저입니다.");
        } else {
          setErrorMessage("알 수 없는 오류가 발생했습니다.");
        }
        console.error("에러:", error);
      } else {
        console.error("예기치 못한 에러:", error);
      }
    }
  };

  const handleMatch = async (type: "one-to-one" | "two-to-two") => {
    const temptoken = localStorage.getItem("token");
    if (!temptoken) {
      return console.error("토큰이 없습니다.");
    }
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/matching/${type}`;
    console.log("URL:", url);
    try {
      const response = await axios.post(url, null, {
        headers: {
          tempToken: temptoken,
        },
      });
      setMatchingData(response.data);
      setErrorMessage(null);
      console.log("Response:", response);
      console.log("대기등록 완료!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          setErrorMessage("매칭 상대를 찾는 중이에요!");
        } else if (status === 409) {
          setErrorMessage("이미 매칭된 유저입니다.");
        } else {
          setErrorMessage("알 수 없는 오류가 발생했습니다.");
        }
        console.error("에러:", error);
      } else {
        console.error("예기치 못한 에러:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <HanmoHeader />
      <div className={styles.down}>
        <Image
          className={styles.logo}
          src="/images/mainchar_wink.png"
          alt="한모"
          width={0}
          height={0}
          sizes="100vw" // 이거 없으면 화질깨짐
        />
      </div>
      <div className={`${styles.contents} ${styles.pretendardFont}`}>
        <div>매칭을 시작하세요!</div>
      </div>
      <div className={`${styles.btns묶음} ${styles.mansehFont}`}>
        <OneToOneButton
          onClick={() => handleMatch("one-to-one")}
          errorMessage={errorMessage}
        />
        <TwoToTwoButton
          onClick={() => handleMatch("two-to-two")}
          errorMessage={errorMessage}
        />
        <div className={`${styles.info} ${styles.mansehFont}`}>
          *1:1 매 칭은 동성 한명과, <br /> 2:2 매칭은 남녀 각각 2명씩 <br /> 총
          4명으로 이루어집니다. <br />
          <br /> 매칭하시고 부스 방문하시면 <br />
          뽑기 기회를 드려요~
        </div>
      </div>
    </div>
  );
}
