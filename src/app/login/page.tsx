"use client";

import Button from "@/components/common/Button";
import InputField from "@/components/InputField";
import { LoginForm, loginSchema } from "@/schemas/loginSchema";
import { handleLoginLogic } from "@/utils/authHandlers";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useAuthRedirect("/main", undefined, undefined);

  const handleLogin = async (data: LoginForm) => {
    await handleLoginLogic(data, router, "/main");
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col items-center bg-white font-[manseh] pt-20"
    >
      <div className="mt-16 mb-2 flex flex-col items-center gap-6">
        <span className="text-[#134D80] text-[22px] mb-2">한세에서 모여봐요!</span>
        <Link href="/landing" className="text-[40px] font-extrabold tracking-tight">
          <Image src="/loginPageLogo.svg" alt="한모 로고" width={110} height={55} />
        </Link>
      </div>

      <div className="w-full max-w-[393px] px-8 flex flex-col gap-4 mt-10">
        <InputField<LoginForm>
          name="studentNumber"
          placeholder="학번"
          errorMessage={errors.studentNumber?.message}
          register={register}
        />
        <InputField<LoginForm>
          name="phoneNumber"
          placeholder="전화번호"
          errorMessage={errors.phoneNumber?.message}
          register={register}
        />
        <Button type="submit">
          로그인
        </Button>
      </div>
    </form>
  );
}