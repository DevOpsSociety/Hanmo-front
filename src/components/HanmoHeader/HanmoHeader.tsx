import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu"

interface UserProfile {
  role: number;
}

interface HanmoHeaderProps {
  mainPageData?: UserProfile | null;
}


export default function HanmoHeader({
  mainPageData,
}: HanmoHeaderProps) {
  return (
    <div className={styles.container}>
      <HamburgerMenu mainPageData={mainPageData}/>
      <div className={styles.hanmologoWrapper}>
      <Link href="/main">
        <Image
          src="/images/hanmoLogo.png"
          className={styles.hanmologo}
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
        />
      </Link>
      </div>
    </div>
  );
}
