"use client";

import axios from "axios";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from "react";
import HanmoHeader from "../../components/HanmoHeader/HanmoHeader";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import OneToOneDifferentGender from './components/OneToOneDifferentGender';
import OneToOneSameGender from "./components/OneToOneSameGender";
import TwoToTwoButton from "./components/TwoToTwoButton";
import styles from "./styles.module.css";
import SlideUpPanel from './components/SlideUpPanel';

interface MatchedUser {
  nickname: string;
  instagramId: string;
}

interface ApiResponse {
  matchedUsers: MatchedUser[];
  matchingType: "ONE_TO_ONE" | "TWO_TO_TWO";
  genderMatchingType: "SAME_GENDER" | "DIFFERENT_GENDER";
  code: string;
  message: string;
}

type MatchType =
  | "two-to-two"
  | "one-to-one/same-gender"
  | "one-to-one/different-gender";


export default function MatchingPage() {
  const [matchingData, setMatchingData] = useState<ApiResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedMatchType, setSelectedMatchType] = useState<string | null>(null);
  const [studentYear, setStudentYear] = useState<string>("상관없음");
  const [mbtiEI, setMbtiEI]         = useState<"상관없음"|"E"|"I">("상관없음");
  const [mbtiFT, setMbtiFT]         = useState<"상관없음"|"F"|"T">("상관없음");
  // const [preferredStudentYear, setPreferredStudentYear] = useState<number>(2020);


  const handleStart = async () => {
    const temptoken = localStorage.getItem("token");
    if (!temptoken) {
      return console.error("토큰이 없습니다.");
    }
    if (!selectedMatchType) {
      return setErrorMessage("매칭 방식을 선택해주세요.");
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/matching/${selectedMatchType}`;

    const eiMbtiToSend = mbtiEI === "상관없음" ? "" : mbtiEI;
    const ftMbtiToSend = mbtiFT === "상관없음" ? "" : mbtiFT;
    const preferredStudentYear =
      studentYear === "상관없음"
        ? null
        : Number(studentYear.replace("학번", "")) + 2000; 

    const body = {
      eiMbti: eiMbtiToSend,               
      ftMbti: ftMbtiToSend,               
      preferredStudentYear, 
    };
  
    try {
      const response = await axios.post(url, body, {
        headers: {
          tempToken: temptoken,
        },
      });
      setMatchingData(response.data);
      setErrorMessage(null);
      console.log("Response:", response);
      onmessage = response?.data?.message;
      alert("대기등록이 완료됐습니다!");
      router.push("/matchingWaiting");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const dataErrorMessage = error.response?.data?.errorMessage;
        setErrorMessage(dataErrorMessage || "알 수 없는 오류가 발생했습니다.");
        console.error("에러:", error);
      } else {
        console.error("예기치 못한 에러:", error);
      }
    }
  };

  const router = useRouter();
  useAuthGuard();

  return (
    <div className={`${styles.container} font-[manseh]`}>
      <HanmoHeader />
      <div className={`${styles.contents} `}>
        <div>오늘 나는... <br />
          결정했어! </div>
      </div>
      <div className={`${styles.btns묶음} font-[manseh]`}>
        <OneToOneSameGender
          onClick={() => {
            setSelectedMatchType("one-to-one/same-gender");
            setErrorMessage(null);
          }}
          isSelected={selectedMatchType === "one-to-one/same-gender"}
          errorMessage={errorMessage}
        />
        
        <OneToOneDifferentGender
          onClick={() => {
            setSelectedMatchType("one-to-one/different-gender");
            setErrorMessage(null);
          }}
          isSelected={selectedMatchType === "one-to-one/different-gender"}
          errorMessage={errorMessage}
          className={styles.raised}
        />
        <TwoToTwoButton
          onClick={() => {
            setSelectedMatchType("two-to-two")
            setErrorMessage(null);
          }}
          isSelected={selectedMatchType === "two-to-two"}
          errorMessage={errorMessage}
        />
      </div>
      <div className={styles.down}>
        <Image
          className={styles.mainchar}
          src="/images/mainchar_stand1.png"
          alt="한모"
          width={0}
          height={0}
          sizes="100vw" // 이거 없으면 화질깨짐
        />
      </div>
      <SlideUpPanel 
        studentYear={studentYear}
        setStudentYear={setStudentYear}
        mbtiEI={mbtiEI}
        setMbtiEI={setMbtiEI}
        mbtiFT={mbtiFT}
        setMbtiFT={setMbtiFT}
        />
      {/* <Link href="/main" className={`${styles.출발}`}>
        출발!
      </Link> */}
      <button 
        className={styles.출발}
        onClick={handleStart}>
        출발!
      </button>
    </div>
  );
}
