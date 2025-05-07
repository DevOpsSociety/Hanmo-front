import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";
import { loginAdminUser, signupAdminUser } from "../api/admin/adminUser";
import { findUser } from "../api/user";
import { AdminLoginForm } from "../schemas/admin/adminLoginSchema";
import { AdminSignupForm } from "../schemas/admin/adminSignupSchema";
import { delay } from "./delay";
import { handleToastError } from "./errorHandlers";

export async function handleAdminLoginLogic(
  data: AdminLoginForm,
  router: AppRouterInstance,
  // onSuccessRedirect: string
) {

  console.log("Admin Login Data:", data); // 데이터 확인용 로그 추가

  const { loginId, loginPw, phoneNumber } = data;

  if (!loginId || !loginPw || !phoneNumber) {
    toast.error("모든 항목을 입력해주세요.");
    return;
  }

  try {
    toast.loading("로그인 중...");

    await delay(1000); // 1초 대기

    const res = await loginAdminUser({ loginId, loginPw, phoneNumber });

    console.log("Admin Login Response:", res); // 응답 확인용 로그 추가

    toast.dismiss();

    if (res.status === 200) {
      toast.success("관리자 로그인 성공!");
      const userRes = await findUser(res.headers.temptoken);
      await delay(1000); // 1초 대기
      localStorage.setItem("token", res.headers.temptoken);
      localStorage.setItem("role", "ADMIN");
      localStorage.setItem("nickname", userRes.data.nickname); // 닉네임을 로컬 스토리지에 저장
      router.push("/admin/main"); // ✅ 전달받은 router 사용
    } else {
      toast.error("관리자 로그인 실패");
      return res;
      // onError?.('로그인 실패: 정보를 확인해주세요.');
    }
  } catch (err) {
    toast.dismiss();
    handleToastError(err);
  }
}

export async function handleAdminSignupLogic(
  data: AdminSignupForm,
  router: AppRouterInstance,
) {
  console.log("Admin Login Data:", data); // 데이터 확인용 로그 추가

  const { loginId, loginPw, phoneNumber } = data;

  try {
    toast.loading("회원가입 중...");

    await delay(1000); // 1초 대기

    // admin 전용 로그인 api 로 추후 수정
    const res = await signupAdminUser({ loginId, loginPw, phoneNumber });

    console.log("Admin signup Response:", res); // 응답 확인용 로그 추가

    toast.dismiss();

    if (res.status === 200) {
      toast.success("회원가입 성공!");
      await delay(1000); // 1초 대기
      // localStorage.setItem("token", res.headers.temptoken);
      router.push("/admin/login"); // ✅ 전달받은 router 사용
    } else {
      toast.error("회원가입 실패");
      return res;
      // onError?.('로그인 실패: 정보를 확인해주세요.');
    }
  } catch (err) {
    toast.dismiss();
    handleToastError(err);
  }
}