import { findUser } from "@/api/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * @param redirectIfValid 유효한 토큰일 때 이동할 경로 (예: "/main")
 * @param redirectIfInvalid 무효한 토큰일 때 이동할 경로 (예: "/login")
 * @param redirectIfNoToken 토큰이 없을 때 이동할 경로 (예: "/login")
 * 세 값 모두 undefined면 아무 동작도 하지 않음
 */
export function useAuthRedirect(
  redirectIfValid?: string,
  redirectIfInvalid?: string,
  redirectIfNoToken?: string
) {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const tempToken = localStorage.getItem("token");
      if (!tempToken) {
        if (redirectIfNoToken) {
          router.push(redirectIfNoToken);
        }
        return;
      }

      try {
        const res = await findUser(tempToken);
        if (res.status === 200) {
          if (redirectIfValid) router.push(redirectIfValid);
        } else if (redirectIfInvalid) {
          router.push(redirectIfInvalid);
        }
      } catch {
        if (redirectIfInvalid) {
          router.push(redirectIfInvalid);
        }
      }
    };

    checkToken();
  }, [router, redirectIfValid, redirectIfInvalid, redirectIfNoToken]);
}