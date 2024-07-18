"use client";
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import Main from "@/app/catalog/components/Main";
import Footer from "@/app/components/Footer";
import useLoginCheck from "@/hooks/useLoginCheck";
import { useEffect, useState } from "react";

export default function Catalog() {
  const [isLogined, setIsLogined] = useLoginCheck();
  const [userid, setUserid] = useState("");

  useEffect(() => {
    if (isLogined) {
      setUserid(localStorage.getItem("username"));
    } else {
      if (userid !== "") {
        setUserid("");
      }
    }
  }, [isLogined]);

  return (
    <div>
      <Header />
      <Content>
        {/* Welcome */}
        <div id="Welcome">
          <div id="WelcomeContent">
            {isLogined && (
              <div>
                Welcome <span>{userid}</span> !
              </div>
            )}
          </div>
        </div>
        <Main />
      </Content>
      <Footer />
    </div>
  );
}
