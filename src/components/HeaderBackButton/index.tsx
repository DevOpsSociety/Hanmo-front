'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import backBtn from "../../../public/backBtn.svg";

export default function HeaderBackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="mr-2"
      aria-label="뒤로가기"
    >
      <Image src={backBtn} alt="뒤로가기 버튼" />
    </button>
  );
}