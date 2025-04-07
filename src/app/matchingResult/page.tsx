"use client";

import styles from "./styled.module.css";
import Image from "next/image";

export default function MatchingResultPage() {
  return (
    <div className={`${styles.wrapper} ${styles.pretendardFont}`}>
      <div className={styles.top}>
        <div className={`${styles.매칭완료} ${styles.mansehFont}`}>
          매칭완료!
        </div>
        <div className={styles.nicknameWrapper}>
          <div className={styles.nickname}>api로 받아온 닉네임</div>님
        </div>
        <div className={styles.디엠방}>디엠방을 만들어주세요!</div>
      </div>
      <div className={styles.middle}>
        <div className={styles.twoUsersWrapper}>
          <div className={styles.userProfile}>
            <Image
              // className={styles.userImage} // 얘는 왕관 달려서 크기가 약간 다름
              src="/images/matchingPage/user1.png"
              alt="프로필1"
              width={84}
              height={0}
              sizes="100vw"
            />
            <div> 닉네임</div>
            <div> 인스타그램 id</div>
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
            <div> 닉네임</div>
            <div> 인스타그램 id</div>
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
            <div> 닉네임</div>
            <div> 인스타그램 id</div>
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
            <div> 닉네임</div>
            <div> 인스타그램 id</div>
          </div>
        </div>
        {/* 네명의 프로필을 보여줄 것입니다. 각각의 div에 이미지 + 닉네임 +
        instagram 아이디를 보여줘야겠군 */}
      </div>
      <div className={styles.bottom}>
        1. 백그라운드 이미지를 집어넣자
        <div> 화면을 캡쳐하세요! </div>
        <div>
          상대방에게 dm을 보내주세요 ~
          <br />
          상대와 함께 부스를 방문하시고
          <br />
          화면을 보여주시고 상품추첨하세요!
        </div>
        <div>
          <button> </button>
          <div> 절대 누르지 마세요!</div>
        </div>
      </div>
    </div>
  );
}
