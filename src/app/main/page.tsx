"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import HanmoHeader from "../../components/HanmoHeader/HanmoHeader";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import logoutIcon from "../../../public/logout.png";
import withdrawIcon from "../../../public/withdrawIcon.png";
import { useRouter } from "next/navigation";
import { logoutUser } from "../../api/user";

interface UserProfile {
  nickname: string;
}

interface MatchingType {
  userStatus: string;
  matchingType: string;
}

export default function MainPage() {
  const [mainPageData, setMainPageData] = useState<UserProfile | null>(null);
  const [matchingTypeData, setMatchingTypeData] = useState<MatchingType | null>(
    null
  );
  const [errorCode, setErrorCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const temptoken = localStorage.getItem("token");

      if (!temptoken) {
        console.error("토큰이 없습니다.");
        return;
      }

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`;
      console.log("API URL:", url);
      console.log("토큰:", temptoken);

      try {
        const response = await axios.get(url, {
          headers: {
            tempToken: temptoken,
          },
        });
        setMainPageData(response.data);
        console.log("Response:", response);
      } catch (e) {
        console.log("에러: ", e);
      }
    };
    fetchData();
  }, []);

  const router = useRouter();
  // const query = `?nickname=${mainPageData?.nickname}`;

  const handleMoveToResultPage = () => {
    const nickname = mainPageData?.nickname;
    if (matchingTypeData?.matchingType === "TWO_TO_TWO") {
      router.push(`/matchingResult?nickname=${nickname}`);
    } else if (matchingTypeData?.matchingType === "ONE_TO_ONE") {
      router.push(`/oneToOneResult?nickname=${nickname}`);
    } else {
      alert("예상치 못한 에러가 발생했습니다.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const temptoken = localStorage.getItem("token");

      if (!temptoken) {
        console.error("토큰이 없습니다.");
        return;
      }

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/matching/result`;
      console.log("API URL:", url);

      try {
        const response = await axios.get(url, {
          headers: {
            tempToken: temptoken,
          },
        });
        setMatchingTypeData(response.data);
        console.log("Response:", response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const dataErrorCode = error.response?.data?.errorCode;
          console.error("에러:", error);
          console.error("에러코드: ", dataErrorCode);
          setErrorCode(dataErrorCode || null); // 상태 저장
        } else {
          console.error("예기치 못한 에러:", error);
          setErrorCode("UNKNOWN");
        }
      }
    };
    fetchData();
  }, []);

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
      console.log(response.data);
      setErrorCode("404");
    } catch (e) {
      console.log("에러: ", e);
    }
  };

  return (
    <div className={`${styles.container} font-[nexon]`}>
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
      <div className={`${styles.contents}`}>
        <div className={`${styles.nickname}`}>
          <div
            className={`font-[nexonbold]`}
          >{`"${mainPageData?.nickname}"`}</div>
          님
        </div>
        <div>좋은 하루 보내세요 </div>
      </div>
      <div className={`${styles.btns묶음} font-[manseh]`}>
        <Link
          href={{
            pathname: "/matching",
            query: { nickname: mainPageData?.nickname },
          }}
          className={styles.btns}
        >
          매칭하러 가볼까~?
        </Link>
        <button className={`${styles.btns} ${styles.btns2}`}>
          게시판보러 가볼까~?
        </button>
        {matchingTypeData?.matchingType && (
          <button onClick={handleMoveToResultPage} className={styles.btns}>
            매칭 결과 보러가기 업데이트 ver
          </button>
        )}
        {errorCode === "400" && (
          <button onClick={handleCancelMatching} className={`${styles.btns}`}>
            매칭 취소
          </button>
        )}
      </div>
      <div className="w-96 h-20 flex justify-center gap-40 mt-8">
        <Link href="/landing" className="">
          <Image
            src={logoutIcon}
            alt="로그아웃"
            width={66}
            height={70}
            onClick={async () => {
              const tempToken = localStorage.getItem("token");
              const res = await logoutUser(tempToken);
              console.log("로그아웃 응답:", res);

              if (res.status === 200) {
                console.log("로그아웃 성공");
                localStorage.removeItem("token");
                localStorage.removeItem("nickname");
                alert("로그아웃 되었습니다.");
              } else {
                console.log("로그아웃 실패");
                alert("로그아웃에 실패했습니다.");
              }
            }}
          />
        </Link>
        <Link href="/withdraw" className="">
          <Image src={withdrawIcon} alt="회원탈퇴" width={66} height={70} />
        </Link>
      </div>
    </div>
  );
}
