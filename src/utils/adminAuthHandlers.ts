// import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import toast from "react-hot-toast";
// import { loginUser } from "../api/user";
// import { AdminLoginForm } from "../schemas/admin/adminLoginSchema";
// import { delay } from "./delay";
// import { handleToastError } from "./errorHandlers";

// export async function handleAdminLoginLogic(
//     data: AdminLoginForm,
//     router: AppRouterInstance,
//     onSuccessRedirect: string
//   ) {
//     const { id, password } = data;
  
//     if (!id || !password) {
//       toast.error("모든 항목을 입력해주세요.");
//       return;
//     }
  
//     try {
//       toast.loading("로그인 중...");
  
//       await delay(1000); // 1초 대기
  
//       // admin 전용 로그인 api 로 추후 수정
//       const res = await loginUser({ id, password });
    
//       toast.dismiss();
  
//       if (res.status === 200) {
//         toast.success("로그인 성공!");
//         await delay(1000); // 1초 대기
//         localStorage.setItem("token", res.headers.temptoken);
//         router.push(onSuccessRedirect); // ✅ 전달받은 router 사용
//       } else {
//         toast.error("로그인 실패");
//         return res;
//         // onError?.('로그인 실패: 정보를 확인해주세요.');
//       }
//     } catch (err) {
//       toast.dismiss();
//       handleToastError(err);
//     }
//   }