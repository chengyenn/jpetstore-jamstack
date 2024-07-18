import { useState, useEffect } from "react";

export default function useLoginCheck() {
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const session = localStorage.getItem("token");
      console.log("session:", session);
      if (session) {
        setIsLogined(true);
      }
    }
    checkLogin();
  }, []);

  return [isLogined, setIsLogined];
}
