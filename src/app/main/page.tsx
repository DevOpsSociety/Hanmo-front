"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminFindMatchingGroups } from "../../api/admin/adminUser";
import HanmoHeader from "../../components/HanmoHeader/HanmoHeader";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import styles from "./styles.module.css";
import AdCarousel from "./components/AdCarousel"

interface UserProfile {
  nickname: string;
  role: number;
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
  
  const ads = [
    "/images/ads/image1.jpg",
    "/images/ads/image2.jpg",
    "/images/ads/image3.jpg",
    "/images/ads/image4.jpg",
    "/images/ads/image5.jpg"
  ];

  useAuthGuard();

  useEffect(() => {
    const fetchData = async () => {
      const temptoken = localStorage.getItem("token");

      if (!temptoken) {
        console.error("토큰이 없습니다.");
        return;
      }

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`;
      console.log("API URL:", url);
      try {
        const response = await axios.get(url, {
          headers: {
            tempToken: temptoken,
          },
        });
        setMainPageData(response.data);
        localStorage.setItem("nickname", response.data.nickname); // 닉네임을 로컬 스토리지에 저장
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

  const handleMoveToPostPage = () => {
    router.push("/posts");
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


  const [totalMatchedGroupCount, setTotalMatchedGroupCount] = useState("");


  useEffect(() => {
    const temptoken = localStorage.getItem("token");

    if (!temptoken) {
      console.error("토큰이 없습니다.");
      return;
    }
    const totalMatchedCount = async () => {
      try {
        const res = await adminFindMatchingGroups(temptoken);
        console.log("매칭된 그룹 수:", res); // API 응답 형태에 따라 조정
        const countString = res.data.totalMatchedGroupCount;
        const modifiedString = ["지금까지 ", ...countString.split(" ").slice(1)].join(" ");
        // console.log("countString", modifiedString);
        setTotalMatchedGroupCount(modifiedString);
        return res; // 매칭된 그룹 수 반환
      } catch (error) {
        console.error("매칭된 그룹 수 조회 에러:", error);
        // alert("매칭된 그룹 수 조회 중 오류가 발생했습니다.");
      }
    }; 

    totalMatchedCount();
  }, []);

  return (
    <div className={`${styles.container} font-[nexon]`}>
      <HanmoHeader mainPageData={mainPageData}/>
      <div className={`font-[manseh] ${styles.contents}`}>
        <div className={`${styles.nickname}`}>
          <div
            className={`font-[manseh] font-[900]`}
          >{`${mainPageData?.nickname}`}</div>
          님
        </div>
        <div>무엇을 해 볼까요?</div>
      </div>
      <div className={`${styles.btns묶음} font-[manseh]`}>
        <Link
          href={{
            pathname: "/matching",
            query: { nickname: mainPageData?.nickname },
          }}
          className={`${styles.btns} ${styles.leftBg}`}
        >
          매칭<br />
          진행
        </Link>
        {matchingTypeData?.matchingType && (
          <button onClick={handleMoveToResultPage} className={`${styles.middleBg} ${styles.btns}`}>
            매칭 결과 보러가기
          </button>
        )}
        {errorCode === "400" && (
          <button onClick={handleCancelMatching} className={`${styles.middleBg} ${styles.btns}`}>
            매칭 < br />
            취소
          </button >
        )
        }
        <button
          onClick={handleMoveToPostPage}
          className={`${styles.rightBg} ${styles.btns}`}
        > 게시판
        </button>
      </div >
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
      <div>{totalMatchedGroupCount}</div>
      <div>매칭이 성사되지 않는다면 다시 시도해 보세요!</div>
      <AdCarousel images={ads}/>
    </div >
  );
}
