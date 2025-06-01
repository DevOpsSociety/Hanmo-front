"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { RestoreForm, restoreSchema } from "../../schemas/restoreSchema";
import {
  handleRestoreSendCodeLogic,
  handleRestoreVerifyCodeLogic,
} from "../../utils/authHandlers";
import { labelClass } from "../../utils/classNames";

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
      <Button type="submit" disabled={verificationVisible}>
        인증하기
      </Button>
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
            <Button type="submit">
              탈퇴 계정 복원하기
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
