"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Department, Gender, MBTI } from "../../enums";
import { StepTwoForm, stepTwoSchema } from "../../schemas/stepTwoSchema";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { handleSignUpLogic } from "../../utils/authHandlers";
import { enumToOptions, objectEnumToOptions } from "../../utils/enumToOptions";
import Button from "../common/Button";
import Option from "../common/Option";
import InputField from "../InputField";

export default function SignUpStepTwo() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state: RootState) => state.signUp.formData);
  const [loading, setLoading] = useState(false);

  console.log();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<StepTwoForm>({
    resolver: zodResolver(stepTwoSchema),
  });

  // const selectedGender = watch("gender");

  const handleSignup = async (data: StepTwoForm) => {
    await handleSignUpLogic(data, formData, dispatch, router, setLoading);
  };

  useEffect(() => {
    console.log("formData : ", formData);
  }, [formData]);

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="flex flex-col gap-2 w-full max-w-[393px] mx-auto justify-center mt-6 px-3 font-[manSeh]"
    >
      <InputField<StepTwoForm>
        name="studentNumber"
        placeholder="학번을 입력해 주세요"
        errorMessage={errors.studentNumber?.message}
        register={register}
      />

      <div className="text-[#4AA0E8] text-[15px] text-left mb-2 ml-1">
        학번은 아이디로 사용되오니 정확히 입력해 주세요!
      </div>

      <Option
        label="나의 학과는?"
        register={register}
        registerName="department"
        enumOptions={objectEnumToOptions(Department)}
        errorMessage={errors.department?.message}
      />

      <Option
        label="나의 성별은?"
        register={register}
        registerName="gender"
        enumOptions={enumToOptions(Gender)}
        errorMessage={errors.gender?.message}
      />

      <Option
        label="나의 MBTI는?"
        register={register}
        registerName="mbti"
        enumOptions={enumToOptions(MBTI)}
        errorMessage={errors.mbti?.message}
      />

      <InputField<StepTwoForm>
        name="instagramId"
        placeholder="인스타그램 ID를 입력해 주세요"
        errorMessage={errors.instagramId?.message}
        register={register}
      />

      <Button
        name={loading ? "가입 중..." : "가입하고 별명 짓기"}
        className={
          "mt-10 w-full h-14 bg-[#17406D] text-white text-[26px] font-[manSeh] rounded-xl"
          + (loading ? " opacity-50 cursor-not-allowed" : "")
        }
      />

      <p className="text-[#BDBDBD] text-[16px] text-center mt-4 font-[pretendard]">
        입력하신 정보는 가입 일주일 후 자동 폐기됩니다
      </p>
    </form>
  );
}
