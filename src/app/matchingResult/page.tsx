"use client";

import styles from "./styled.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface MatchResponse {
  matchingType: "ONE_TO_ONE";
  users: MatchedUser[];
}

interface MatchedUser {
  nickname: string;
  name: string;
  instagramId: string;
}

export default function MatchingResultPage() {
  const [matchedUser, setMatchedUser] = useState<MatchResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const temptoken = localStorage.getItem("token");
      if (!temptoken) {
        console.error("토큰이 없습니다.");
        return;
      }
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/matching/result`;
      console.log("Request URL:", url);
      try {
        const response = await axios.get(url, {
          headers: {
            tempToken: temptoken,
          },
        });
        setMatchedUser(response.data);
        console.log("Response:", response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status === 400) {
            alert("매칭상대가 없어요!");
            router.back();
          } else {
            console.log("status is ", status);
            alert(status + "에러입니다.");
            router.back();
          }
          console.log("에러: ", error);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className={`${styles.wrapper} ${styles.pretendardFont}`}>
      <div className={styles.topMiddleWrapper}>
        <div className={styles.top}>
          <div className={`${styles.매칭완료} ${styles.mansehFont}`}>
            매칭완료!
          </div>
          <div className={styles.nicknameWrapper}>
            <div className={styles.nickname}>
              {matchedUser?.users?.[0].nickname}
            </div>
            님
          </div>
          <div className={styles.디엠방}>디엠방을 만들어주세요!</div>
        </div>
        <div className={styles.middle}>
          <div className={styles.twoUsersWrapper}>
            <div className={styles.userProfile}>
              <Image
                // 얘는 왕관 달려서 크기가 약간 다름
                src="/images/matchingPage/user1.png"
                alt="프로필1"
                width={84}
                height={0}
                sizes="100vw"
              />
              <div> {matchedUser?.users?.[0].nickname}</div>
              <div> {matchedUser?.users?.[0].nickname}</div>
            </div>
            <div className={styles.userProfile}>
              <Image
                className={styles.userImage}
                src="/images/matchingPage/user2.png"
                alt="프로필2"
                width={0}
                height={0}
                sizes="100vw"
              />
              <div> {matchedUser?.users?.[1].nickname}</div>
              <div> {matchedUser?.users?.[1].instagramId}</div>
            </div>
          </div>
          <div className={styles.twoUsersWrapper}>
            <div className={styles.userProfile}>
              <Image
                className={styles.userImage}
                src="/images/matchingPage/user3.png"
                alt="프로필3"
                width={0}
                height={0}
                sizes="100vw"
              />
              <div> {matchedUser?.users?.[2].nickname}</div>
              <div> {matchedUser?.users?.[2].instagramId}</div>
            </div>
            <div className={styles.userProfile}>
              <Image
                className={styles.userImage}
                src="/images/matchingPage/user4.png"
                alt="프로필4"
                width={0}
                height={0}
                sizes="100vw"
              />
              <div> {matchedUser?.users?.[3].nickname}</div>
              <div> {matchedUser?.users?.[3].instagramId}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={`${styles.mansehFont} ${styles.캡쳐}`}>
          화면을 캡쳐하세요!
        </div>
        <div className={styles.messageBox}>
          상대방에게 dm을 보내주세요~
          <br />
          상대와 함께 부스를 방문하시고
          <br />
          화면을 보여주시고 상품추첨하세요!
        </div>
        <div className={styles.boxWrapper}>
          <button>
            <Image
              className={styles.warningBtn}
              src="/images/matchingPage/warning.png"
              alt="프로필1"
              width={0}
              height={0}
              sizes="100vw"
            />
          </button>
          <div> 절대 누르지 마세요!</div>
        </div>
      </div>
    </div>
  );
}
