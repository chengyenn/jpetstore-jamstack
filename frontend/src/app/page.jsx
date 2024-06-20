// 負責定義 route segment 的 UI，可以想像成首頁內容
// import styles from "./page.module.css";
import HomeContent from "@/app/components/Home/HomeContent";

export default function Home() {
  return (
    <div id="Content">
      <h2>
        Welcome to JPetStore Demo Application on MyBatis + Spring Boot + Spring
        Security + Thymeleaf
      </h2>
      <HomeContent href="/catalog">Enter the Store</HomeContent>
      <HomeContent
        href="https://github.com/kazuki43zoo/mybatis-spring-boot-jpetstore"
        target="source"
      >
        View source code on GitHub
      </HomeContent>

      <p>
        <sub>Copyright kazuki43zoo.com</sub>
      </p>
    </div>
  );
}
