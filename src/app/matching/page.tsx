"use client";

import axios from "axios";
import { useState } from "react";
import HanmoHeader from "../../components/HanmoHeader/HanmoHeader";
import OneToOneDifferentGender from './components/OneToOneDifferentGender';
import OneToOneSameGender from "./components/OneToOneSameGender";
import TwoToTwoButton from "./components/TwoToTwoButton";
import styles from "./styles.module.css";

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

  const handleMatch = async (type: MatchType) => {
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
      onmessage = response?.data?.message;
      alert("대기등록이 완료됐습니다!");
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

  return (
    <div className={`${styles.container} font-[nexon]`}>
      <HanmoHeader />
      <div className={`${styles.contents} `}>
        <div>매칭을 시작하세요!</div>
        <div className="text-red-500 px-20">5월 13일 화요일에 매칭 서비스가 열릴 예정입니다!!!</div>
      </div>
      <div className={`${styles.btns묶음} font-[manseh]`}>
        <OneToOneSameGender
          // onClick={() => handleMatch("one-to-one/same-gender")}
          onClick={() => alert("5월 13일 화요일에 열릴 예정입니다!!!")}
          errorMessage={errorMessage}
        />
        <OneToOneDifferentGender
          // onClick={() => handleMatch("one-to-one/different-gender")}
          onClick={() => alert("5월 13일 화요일에 열릴 예정입니다!!!")}
          errorMessage={errorMessage}
        />
        <TwoToTwoButton
          // onClick={() => handleMatch("two-to-two")}
          onClick={() => alert("5월 13일 화요일에 열릴 예정입니다!!!")}
          errorMessage={errorMessage}
        />
        <div className={`${styles.info} font-[manseh]`}>
          *1:1 매 칭은 동성 한명과, <br /> 2:2 매칭은 남녀 각각 2명씩 <br /> 총
          4명으로 이루어집니다. <br />
          <br /> 매칭하시고 부스 방문하시면 <br />
          뽑기 기회를 드려요~
        </div>
      </div>
    </div>
  );
}

{/* <div className={styles.down}>
<Image
  className={styles.logo}
  src="/images/mainchar_wink.png"
  alt="한모"
  width={0}
  height={0}
  sizes="100vw" // 이거 없으면 화질깨짐
/>
</div> */}