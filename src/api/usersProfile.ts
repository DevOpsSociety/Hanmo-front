"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function fetchUserProfile() {
  const [mainPageData, setMainPageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const temptoken = localStorage.getItem("token");

      if (!temptoken) {
        console.error("토큰이 없습니다.");
        return;
      }

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`;
      console.log("API URL:", url);
      console.log("토큰:", temptoken);

      try {
        const response = await axios.get(url, {
          headers: {
            tempToken: temptoken,
          },
        });
        setMainPageData(response.data);
        console.log("Response:", response);
      } catch (e) {
        console.log("에러: ", e);
      }
    };
    fetchData();
  }, []);
}
