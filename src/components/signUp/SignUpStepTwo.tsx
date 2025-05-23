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
import { borderClass, labelClass } from "../../utils/classNames";
import { enumToOptions, objectEnumToOptions } from "../../utils/enumToOptions";
import Button from "../common/Button";
import Input from "../common/Input";
import Option from "../common/Option";
import ErrorMessage from "../ErrorMessage";

export default function SignUpStepTwo() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state: RootState) => state.signUp.formData);
  const [loading, setLoading] = useState(false);

  console.log();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StepTwoForm>({
    resolver: zodResolver(stepTwoSchema),
  });

  const selectedGender = watch("gender");

  const handleSignup = async (data: StepTwoForm) => {
    await handleSignUpLogic(data, formData, dispatch, router, setLoading);
  };

  useEffect(() => {
    console.log("formData : ", formData);
  }, [formData]);

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className={`flex flex-col gap-5 w-[200px] mx-auto justify-center mt-10 ${labelClass}`}
    >
      <Input
        label="학번"
        register={register}
        registerName="studentNumber"
        placeholder="202512345"
        errorMessage={errors.studentNumber?.message}
      />
      <div className="text-[red] text-[9px] text-center">
        학번은 아이디로 사용되니 정확히 입력해주세요.
      </div>

      <div className="w-full flex flex-col">
        <label>성별</label>
        <div className="flex justify-between gap-5">
          {enumToOptions(Gender).map((opt) => {
            const isSelected = selectedGender === String(opt.id);

            return (
              <label
                key={opt.id}
                className={`flex-1 text-[24px] text-center border cursor-pointer font-[manSeh] ${borderClass}
        ${
          isSelected
            ? "bg-[#04447C] bg-opacity-90 text-white border-none"
            : "text-[#2D2D2D] text-opacity-70"
        }
      `}
              >
                <input
                  type="radio"
                  value={opt.id}
                  {...register("gender")}
                  className="hidden"
                />
                {opt.label === "MALE" ? "남" : "여"}
              </label>
            );
          })}
        </div>
        <ErrorMessage message={errors.gender?.message} />
      </div>

      <Option
        label="MBTI"
        register={register}
        registerName="mbti"
        enumOptions={enumToOptions(MBTI)}
        errorMessage={errors.mbti?.message}
      />

      <Option
        label="학과"
        register={register}
        registerName="department"
        enumOptions={objectEnumToOptions(Department)}
        errorMessage={errors.department?.message}
      />

      <Input
        label="인스타"
        register={register}
        registerName="instagramId"
        placeholder="hsu_it_zzang"
        errorMessage={errors.instagramId?.message}
      />

      <Button
        name={loading ? "가입 중..." : "가입하고 별명짓기"}
        className={loading ? "opacity-50 cursor-not-allowed" : "" + "mt-5"}
      />

      {/* <p className="text-[10px] font-extrabold">
        ※ 회원정보는 일주일 후에 자동 삭제됩니다.
      </p> */}
    </form>
  );
}
