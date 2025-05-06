"use client";

import { useEffect } from "react";

export default function AdminMainPage(): JSX.Element {
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "ADMIN") {
            alert("관리자 권한이 없습니다.");
            window.location.href = "/admin/login"; // 관리자 로그인 페이지로 리다이렉트
        } else {
            console.log("관리자 권한 확인 완료");
        }
    }, []);
    
    return <div>관리자 메인 페이지</div>
};
