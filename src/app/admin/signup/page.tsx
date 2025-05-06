"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";

import { useRouter } from "next/navigation";
import { AdminSignupForm, adminSignupSchema } from "../../../schemas/admin/adminSignupSchema";
import { handleAdminSignupLogic } from "../../../utils/adminAuthHandlers";
import { labelClass } from "../../../utils/classNames";

export default function AdminSignupPage(): JSX.Element {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminSignupForm>({
    resolver: zodResolver(adminSignupSchema),
  });

  // useEffect(() => {
  //   const checkToken = async () => {
  //     const tempToken = localStorage.getItem("token"); // 로컬스토리지에서 토큰 가져오기
  //     if (tempToken) {
  //       try {
  //         const res = await findUser(tempToken); // findUser API 호출로 토큰 검증
  //         if (res.status === 200) {
  //           router.push("/main"); // 토큰이 유효하면 main으로 리다이렉트
  //         }
  //       } catch (error) {
  //         console.error("유효하지 않은 토큰:", error);
  //       }
  //     }
  //   };

  //   checkToken();
  // }, [router]);

  const handleAdminSignup = async (data: AdminSignupForm) => {
    await handleAdminSignupLogic(data, router);
  };

  return (
    <form
      onSubmit={handleSubmit(handleAdminSignup)}
      className={`flex flex-col justify-center h-[calc(100dvh-73px)]
        font-[pretendard] ${labelClass}`}
    >
      <div className="max-w-[393px] px-[56px] flex flex-col gap-4 mx-auto">
        <Input
            label="전화번호"
            register={register}
            registerName="phoneNumber"
            placeholder="01012345678"
            errorMessage={errors.phoneNumber?.message}
          />

        <Input
          label="관리자 아이디"
          register={register}
          registerName="loginId"
          placeholder="id"
          errorMessage={errors.loginId?.message}
        />

        <Input
          label="비밀번호"
          register={register}
          registerName="loginPw"
          placeholder="password"
          errorMessage={errors.loginPw?.message}
          type="password"
        />

        <Input
          label="비밀번호 확인"
          register={register}
          registerName="loginPwCheck"
          placeholder="password"
          errorMessage={errors.loginPwCheck?.message}
          type="password"
        />

        <div className={`flex flex-col gap-3 mt-4 font-[manSeh]`}>
          <Button name="관리자 계정 가입하기" className="mt-2" />
        </div>
        {(errors.loginId?.message || errors.loginPw?.message) && (
          <p className="text-red-500 font-[manSeh] text-[20px] ">
            틀렸어요 ㅠㅡㅠ
          </p>
        )}
      </div>
    </form>
  );
}
