import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";
import {
  restoreSendCode,
  restoreVerifyCode,
  sendCode,
  verifyCode,
} from "../api/sms";
import { deleteUser, loginUser, signUpUser } from "../api/user";
import { LoginForm } from "../schemas/loginSchema";
import { RestoreForm } from "../schemas/restoreSchema";
import { StepOneForm } from "../schemas/stepOneSchema";
import { StepTwoForm } from "../schemas/stepTwoSchema";
import { AppDispatch } from "../store";
import {
  resetForm,
  SignUpFormData,
  updateFormData,
} from "../store/signUpSlice";
import { delay } from "./delay";
import { handleToastError } from "./errorHandlers";


export async function handleLoginLogic(
  data: LoginForm,
  router: AppRouterInstance,
  onSuccessRedirect: string
) {

  const { studentNumber, phoneNumber } = data;

  if (!studentNumber || !phoneNumber) {
    toast.error("모든 항목을 입력해주세요.");
    return;
  }

  try {
    toast.loading("로그인 중...");

    await delay(1000); // 1초 대기

    const res = await loginUser({ studentNumber, phoneNumber });
    toast.dismiss();

    console.log("로그인 응답:", res); // 응답 확인용 로그 추가


    if (res.status === 200) {
      toast.success("로그인 성공!");
      await delay(1000); // 1초 대기
      localStorage.setItem("token", res.headers.temptoken);
      router.push(onSuccessRedirect); // ✅ 전달받은 router 사용
    } else if (res.status === 202) {
      if (res.data.errorMessage === "관리자 추가 정보 입력이 필요합니다.") {
        toast.error("관리자 추가 정보 입력이 필요합니다.");
        router.push("/admin/signup");
      } else if (res.data.errorMessage === "관리자 로그인 페이지로 이동해야 합니다.") {
        toast.error("관리자 로그인 페이지로 이동해야 합니다.");
        router.push("/admin/login");
      }
    } else {
      toast.error("로그인 실패");
      console.error("로그인 실패:", res); // 에러 로그 추가
      // onerror?.('로그인 실패: 정보를 확인해주세요.');
    }
  } catch (err) {
    toast.dismiss();
    handleToastError(err);
  }
}

export async function handleWithdrawLogic(
  phoneNumber: string,
  router: AppRouterInstance,
  redirectPath: string
) {
  try {
    toast.loading("탈퇴 중...");

    await delay(1000);

    const res = await deleteUser(phoneNumber);

    if (res.status === 200) {
      toast.dismiss();
      toast.success("탈퇴 완료!");
      await delay(1000);
      toast("다시 또 만나요!!");
      await delay(2000);

      localStorage.removeItem("token");
      localStorage.removeItem("nickname");
      localStorage.removeItem("matchingType");
      router.push(redirectPath);
    } else {
      toast.error("탈퇴 실패: 정보를 확인해주세요.");
    }
  } catch (err) {
    toast.dismiss();
    handleToastError(err);
  }
}

export const handleSendCodeLogic = async (
  data: StepOneForm,
  setVerificationVisible: (visible: boolean) => void
) => {
  const { phoneNumber } = data;

  try {
    toast.loading("인증번호 전송 중...");
    await sendCode(phoneNumber);
    toast.dismiss();
    toast.success("인증번호가 전송되었습니다.");
    setVerificationVisible(true);
  } catch (err) {
    toast.dismiss();
    handleToastError(err);
  }
};

export const handleVerifyCodeLogic = async (
  data: StepOneForm,
  dispatch: AppDispatch,
  router: AppRouterInstance
) => {
  const { name, phoneNumber, authNumber } = data;

  if (!authNumber) {
    toast.error("인증번호를 입력해주세요.");
    return;
  }

  try {
    toast.loading("인증번호 확인 중...");

    await delay(1000); // 1초 대기

    const res = await verifyCode(authNumber);

    if (res.status === 200) {
      toast.dismiss();
      toast.success("인증 성공!");
      dispatch(updateFormData({ name, phoneNumber }));
      await delay(1000); // 1초 대기
      router.push("/signup/2");
    } else {
      toast.dismiss();
      toast.error("인증 실패");
    }
  } catch (err) {
    toast.dismiss();
    handleToastError(err);
  }
};

export async function handleSignUpLogic(
  data: StepTwoForm,
  formData: SignUpFormData,
  dispatch: AppDispatch,
  router: AppRouterInstance,
  setLoading: (loading: boolean) => void
) {
  if (!formData.name || !formData.phoneNumber) {
    toast.error(`필수 정보가 누락되었습니다.\n회원가입을 다시 시도해주세요.`);
    return;
  }

  const payload = {
    ...formData,
    ...data,
    name: formData.name as string,
    phoneNumber: formData.phoneNumber as string,
  };

  console.log("payload", payload);

  try {
    setLoading(true);
    toast.loading("가입 중...");

    await delay(1000); // 1초 대기

    const res = await signUpUser(payload);

    if (res.status === 200) {
      toast.dismiss();
      toast.success("가입 완료! 🎉");
      await delay(1000); // 1초 대기

      const loginRes = await loginUser({
        phoneNumber: payload.phoneNumber,
        studentNumber: payload.studentNumber,
      });

      if (loginRes.status === 200) {
        localStorage.setItem("token", loginRes.headers.temptoken); // 필요 시 저장 위치 변경 가능

        dispatch(resetForm());
        router.push("/nickname");
      } else {
        toast.error("로그인에 실패했습니다.");
      }
    } else if (res.status === 409) {
      toast.dismiss();
      toast.error("이미 등록된 회원입니다.");
    } else {
      toast.dismiss();
      toast.error("STATUS CODE : " + res.status);
    }
  } catch (err) {
    toast.dismiss();
    console.error("회원가입 실패:", err);
    handleToastError(err);
  } finally {
    setLoading(false);
  }
}

export async function handleRestoreSendCodeLogic(
  phoneNumber: string,
  setVerificationVisible: (visible: boolean) => void
) {
  try {
    toast.loading("인증번호 요청 중...");

    await delay(1000);

    const sendRes = await restoreSendCode(phoneNumber);

    console.log("복원 요청 응답:", sendRes);

    if (sendRes.status === 200) {
      toast.dismiss();
      toast.success(sendRes.data);
      setVerificationVisible(true);
    }

    // if (res.status === 200) {
    //   toast.dismiss();
    //   toast.success('복원 완료!');
    //   await delay(1000);

    //   localStorage.removeItem('token');
    //   router.push(redirectPath);
    // } else {
    //   toast.error('복원 실패: 정보를 확인해주세요.');
    // }
  } catch (err) {
    toast.dismiss();
    console.error("복원 요청 실패:", err);
    handleToastError(err);
  }
}

export async function handleRestoreVerifyCodeLogic(
  data: RestoreForm,
  router: AppRouterInstance
) {
  const { authNumber } = data;

  if (!authNumber) {
    toast.error("인증번호를 입력해주세요.");
    return;
  }

  try {
    toast.loading("인증번호 확인 중...");

    await delay(1000); // 1초 대기

    const res = await restoreVerifyCode(authNumber);

    if (res.status === 200) {
      toast.dismiss();
      toast.success("복구 성공!");
      await delay(1000); // 1초 대기
      toast.dismiss();
      toast("잠시 후 로그인 페이지로 이동합니다");

      await delay(1000); // 1초 대기
      toast.dismiss();

      router.push("/login");
    } else {
      toast.dismiss();
      toast.error("인증 실패");
    }
  } catch (err) {
    toast.dismiss();
    handleToastError(err);
  }
}
