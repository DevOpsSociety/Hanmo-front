"use client";

import Input from "../../components/common/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RestoreForm, restoreSchema } from "../../schemas/restoreSchema";
import { labelClass } from "../../utils/classNames";
import { useRouter } from "next/navigation";
import {
  handleRestoreSendCodeLogic,
  handleRestoreVerifyCodeLogic,
} from "../../utils/authHandlers";
import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { findUser } from "../../api/user";

export default function RestorePage(): JSX.Element {
  const router = useRouter();

  const [verificationVisible, setVerificationVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestoreForm>({
    resolver: zodResolver(restoreSchema),
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

  const restoreSendCode = async (data: RestoreForm) => {
    await handleRestoreSendCodeLogic(data.phoneNumber, setVerificationVisible);
  };

  const restoreVerifyCode = async (data: RestoreForm) => {
    await handleRestoreVerifyCodeLogic(data, router);
  };

  return (
    <form
      onSubmit={handleSubmit(
        verificationVisible ? restoreVerifyCode : restoreSendCode
      )}
      className={`max-w-[393px] px-[56px] flex flex-col justify-center gap-4 mx-auto h-[calc(100vh-73px)] font-[Pretendard] ${labelClass}`}
    >
      <Input
        label="휴대전화"
        register={register}
        registerName="phoneNumber"
        placeholder="01012345678"
        errorMessage={errors.phoneNumber?.message}
      />
      <div className="text-red-500 text-center">
        3일 이내 탈퇴한 계정만 복원 가능합니다.
      </div>
      <Button name="인증하기" verificationVisible={verificationVisible} />

      {/* 인증 버튼 */}
      <div className="flex flex-col gap-2">
        {/* 인증번호 입력 및 확인 */}
        {verificationVisible && (
          <div className="flex flex-col gap-6 mt-5">
            <Input
              register={register}
              registerName="authNumber"
              placeholder="인증번호를 입력해주세요"
              errorMessage={errors.authNumber?.message}
            />
            {/* <button type='submit' className={buttonClass}>
                      인증확인
                    </button> */}
            <Button name="탈퇴 계정 복원하기" />
          </div>
        )}
      </div>
    </form>
  );
}
