"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LogoImg from "../../../public/signUpLogo.png";
import { useAppDispatch } from "../../store/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepOneForm, stepOneSchema } from "../../schemas/stepOneSchema";
import {
  handleSendCodeLogic,
  handleVerifyCodeLogic,
} from "../../utils/authHandlers";
import Link from "next/link";
import Input from "../common/Input";
import Button from "../common/Button";

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
    <div className="w-[393px] mx-auto flex flex-col justify-center h-[calc(100vh-73px)] font-[Pretendard]">
      <Link href="/landing">
        <Image
          src={LogoImg}
          alt="로고"
          className="mx-auto w-[113px] h-[134px] mb-12"
          priority
        />
      </Link>

      <form
        className="px-[56px] flex flex-col gap-4 mx-auto"
        onSubmit={handleSubmit(verificationVisible ? verifyCode : sendCode)}
      >
        {/* 이름 */}
        <Input
          label="이름 입력"
          register={register}
          registerName="name"
          placeholder="김한모"
          errorMessage={errors.name?.message}
          disabled={verificationVisible}
        />

        {/* 전화번호 */}
        <Input
          label="휴대전화"
          register={register}
          registerName="phoneNumber"
          placeholder="01012345678"
          errorMessage={errors.phoneNumber?.message}
          disabled={verificationVisible}
        />

        {/* <button
          type='submit'
          className={`${buttonClass} ${verificationVisible && 'bg-gray-400'}`}
          disabled={verificationVisible}
        >
          인증하기
        </button> */}
        <Button
          name="인증하기"
          verificationVisible={verificationVisible}
          className="mt-2"
        />

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
              <Button name="인증확인" />
            </div>
          )}
        </div>
      </form>
      <Link href="/restore" className="text-center mt-20 underline">
        3일 이내 탈퇴한 회원은 여기를 눌러주세요.
      </Link>
    </div>
  );
}
