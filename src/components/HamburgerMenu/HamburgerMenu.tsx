import styles from "./styles.module.css"
import Link from 'next/link'
import { logoutUser } from '@/api/user';
import { useRouter } from 'next/navigation';

export default function HamburgerMenu() {
  const router = useRouter();
  return (
    <div className={`font-[manseh] ${styles.container}`}>
    <input type="checkbox" id="menuicon" className={styles.menuIcon}></input>
    <label htmlFor="menuicon" className={styles.label}>
      <span></span>
      <span></span>
      <span></span>
    </label>
    <div className={styles.menuBox}>
      <ul className={styles.menuList}>
        <li> 
          <button onClick={async () => {
              const tempToken = localStorage.getItem("token");
              const res = await logoutUser(tempToken);
              console.log("로그아웃 응답:", res);
              if (res.status === 200) {
                console.log("로그아웃 성공");
                localStorage.removeItem("token");
                localStorage.removeItem("nickname");
                alert("로그아웃 되었습니다.");
                router.push("/landing");
              } else {
                console.log("로그아웃 실패");
                alert("로그아웃에 실패했습니다.");
              }
            }}>
            로그아웃
          </button> 
          </li>
        <li> 회원탈퇴 </li>
        <li>
          <Link href="/posts">
          개발자에게 한마디
          </Link>
        </li>
        <li className={styles.bottomMenu}> 만든 사람들 </li>
      </ul>
    </div>
    </div>
  )
}


