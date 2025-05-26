"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import loginPageLogo from "../../../public/loginPageLogo.svg";
import { findUser } from "../../api/user";
import Button from "../../components/common/Button";
import InputField from "../../components/InputField";
import { LoginForm, loginSchema } from "../../schemas/loginSchema";
import { handleLoginLogic } from "../../utils/authHandlers";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const checkToken = async () => {
      const tempToken = localStorage.getItem("token");
      if (tempToken) {
        try {
          const res = await findUser(tempToken);
          if (res.status === 200) {
            router.push("/main");
          }
        } catch (error) {
          console.error("유효하지 않은 토큰:", error);
        }
      }
    };

    checkToken();
  }, [router]);

  const handleLogin = async (data: LoginForm) => {
    await handleLoginLogic(data, router, "/main");
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col items-center bg-white font-[manseh] pt-20"
    >
      {/* 상단 타이틀/로고 */}
      <div className="mt-16 mb-2 flex flex-col items-center gap-6">
        <span className="text-[#134D80] text-[22px] mb-2">한세에서 모여봐요!</span>
        <Link href="/landing" className="text-[40px] font-extrabold tracking-tight">
          <Image src={loginPageLogo} alt="한모 로고" />
        </Link>
      </div>

      {/* 입력 폼 */}
      <div className="w-full max-w-[393px] px-8 flex flex-col gap-4 mt-10">

        <InputField<LoginForm>
          name="studentNumber"
          placeholder="학번"
          errorMessage={errors.studentNumber?.message}
          register={register}
        />
        {/* <Input
          label="학번"
          register={register}
          registerName="studentNumber"
          placeholder="245151551"
          errorMessage={errors.studentNumber?.message}
        /> */}

        <InputField<LoginForm>
          name="phoneNumber"
          placeholder="전화번호"
          errorMessage={errors.phoneNumber?.message}
          register={register}
        />

        {/* <Input
          label="전화번호"
          register={register}
          registerName="phoneNumber"
          placeholder="01012345678"
          errorMessage={errors.phoneNumber?.message}
        /> */}

        <Button
          name="로그인"
          className="mt-6 w-full h-12 bg-[#134D80] text-white text-[20px] font-[manSeh] rounded-xl"
        />

        {(errors.studentNumber?.message || errors.phoneNumber?.message) && (
          <p className="text-red-500 font-[manSeh] text-[18px] mt-2 ml-1">
            틀렸어요 ㅠ_ㅠ
          </p>
        )}
      </div>
    </form>
  );
}