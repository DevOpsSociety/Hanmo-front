"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { findUser } from "../../api/user";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { LoginForm, loginSchema } from "../../schemas/loginSchema";
import { handleLoginLogic } from "../../utils/authHandlers";
import { labelClass } from "../../utils/classNames";

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
      const tempToken = localStorage.getItem("token"); // 로컬스토리지에서 토큰 가져오기
      if (tempToken) {
        try {
          const res = await findUser(tempToken); // findUser API 호출로 토큰 검증
          if (res.status === 200) {
            router.push("/main"); // 토큰이 유효하면 main으로 리다이렉트
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
      className={`flex flex-col justify-center h-[calc(100dvh-73px)]
        font-[pretendard] ${labelClass}`}
    >
      <div className="max-w-[393px] px-[56px] flex flex-col gap-4 mx-auto">
        <Input
          label="학번"
          register={register}
          registerName="studentNumber"
          placeholder="245151551"
          errorMessage={errors.studentNumber?.message}
        />

        <Input
          label="전화번호"
          register={register}
          registerName="phoneNumber"
          placeholder="01012345678"
          errorMessage={errors.phoneNumber?.message}
        />

        <div className={`flex flex-col gap-3 mt-4 font-[manSeh]`}>
          <Button name="로그인" className="mt-2" />
        </div>
        {(errors.studentNumber?.message || errors.phoneNumber?.message) && (
          <p className="text-red-500 font-[manSeh] text-[20px] ">
            틀렸어요 ㅠㅡㅠ
          </p>
        )}
      </div>
    </form>
  );
}
