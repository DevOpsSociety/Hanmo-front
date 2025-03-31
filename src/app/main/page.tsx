import styles from "./styles.module.css";
import Image from "next/image";
import HanmoHeader from "../../components/HanmoHeader/HanmoHeader";
import Link from "next/link";
export default function mainPage() {
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
        <div className={`${styles.nickname}`}>"api에서 받은 닉네임"님</div>
        <div>좋은 하루 보내세요</div>
      </div>
      <div className={`${styles.btns묶음} ${styles.mansehFont}`}>
        <Link href="/matching" className={styles.btns}>
          매칭하러 가볼까~?
        </Link>
        <button className={`${styles.btns} ${styles.btns2}`}>
          게시판보러 가볼까~?
        </button>
      </div>
    </div>
  );
}
