import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";

export default function HanmoHeader() {
  return (
    <div className={styles.container}>
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
  );
}
