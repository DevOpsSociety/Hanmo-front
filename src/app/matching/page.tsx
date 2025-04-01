"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import HanmoHeader from "../../components/HanmoHeader/HanmoHeader";
// import { useRouter } from "next/navigation";

export default function mainPage() {
  // const router = useRouter();

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
        <button className={styles.btns}>랜덤 친구 뽑기(1:1)</button>
        <button className={`${styles.btns} ${styles.btns2}`}>
          랜덤 과팅 (2:2)
        </button>
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
