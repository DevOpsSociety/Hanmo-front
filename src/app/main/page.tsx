"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import HanmoHeader from "../../components/HanmoHeader/HanmoHeader";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import logoutIcon from "../../../public/logout.png";
import withdrawIcon from "../../../public/withdrawIcon.png";

interface UserProfile {
  nickname: string;
}

export default function MainPage() {
  const [mainPageData, setMainPageData] = useState<UserProfile | null>(null);

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
        <div>좋은 하루 보내세요</div>
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
        <Link
          href={{
            pathname: "/oneToOneResult",
            query: { nickname: mainPageData?.nickname },
          }}
          className={styles.btns}
        >
          매칭 결과 보러가기!
        </Link>
      </div>
      <div className="w-96 h-20 flex justify-center gap-40 mt-8">
        <Link href="/landing" className="">
          <Image
            src={logoutIcon}
            alt="로그아웃"
            width={66}
            height={70}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("nickname");
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
