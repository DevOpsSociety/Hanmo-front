"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StepOneForm, stepOneSchema } from "../../schemas/stepOneSchema";
import { useAppDispatch } from "../../store/hooks";
import {
  handleSendCodeLogic,
  handleVerifyCodeLogic,
} from "../../utils/authHandlers";
import InputField from "../InputField";

export default function SignUpStepOne(): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [verificationVisible, setVerificationVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOneForm>({
    resolver: zodResolver(stepOneSchema),
  });

  const sendCode = async (data: StepOneForm) => {
    await handleSendCodeLogic(data, setVerificationVisible);
  };

  const verifyCode = async (data: StepOneForm) => {
    await handleVerifyCodeLogic(data, dispatch, router);
  };

  return (
    <div className="max-w-[393px] mx-auto flex flex-col h-[calc(100vh-73px)] bg-white font-[manseh]">
      {/* 입력 폼 */}
      <form
        className="flex flex-col gap-6 px-8 mt-8 h-[calc(100vh-73px)]"
        onSubmit={handleSubmit(verificationVisible ? verifyCode : sendCode)}
      >
        {/* 이름 */}
        <InputField<StepOneForm>
          name="name"
          placeholder="이름을 입력해 주세요"
          disabled={verificationVisible}
          errorMessage={errors.name?.message}
          register={register}
        />

        {/* 전화번호 + 인증 버튼 */}
        <div className="flex gap-2">
          <div className="flex-1">
            <InputField<StepOneForm>
              name="phoneNumber"
              placeholder="전화번호를 입력해 주세요"
              disabled={verificationVisible}
              errorMessage={errors.phoneNumber?.message}
              register={register}
            />
          </div>
          <button
            type="submit"
            className={`w-[50.5px] h-[50.5px] rounded-lg bg-[#134D80] text-white text-[22px] ${verificationVisible ? "bg-gray-300" : ""} ml-auto`}
            disabled={verificationVisible}
          >
            인증
          </button>
        </div>

        {/* 인증번호 입력 */}
        {verificationVisible && (
          <div>
            <InputField<StepOneForm>
              name="authNumber"
              placeholder="인증번호를 입력해 주세요"
              errorMessage={errors.authNumber?.message}
              register={register}
            />
            <p className="text-xs text-[#9ECCF3] mt-2 font-[Pretendard]">인증번호가 전송되었습니다</p>
          </div>
        )}
        {/* 하단 버튼 */}
        <div className="mt-auto pb-8 pt-16">
          <button
            type="submit"
            className={`w-full h-[56px] rounded-xl bg-[#19446C] text-white text-[22px] font-[manseh] tracking-wider ${verificationVisible ? "" : "bg-gray-300"}`}
            disabled={!verificationVisible}
          >
            {verificationVisible ? "인증 확인" : "인증 요청"}
          </button>

          <div className="text-center text-xs text-gray-400 mt-3 underline font-[Pretendard]">
            <Link href="/restore">
              최근 3일 이내 탈퇴하셨나요?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}