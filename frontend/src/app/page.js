// 負責定義 route segment 的 UI，可以想像成首頁內容
// import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div id="Content">
      <h2>
        Welcome to JPetStore Demo Application on MyBatis + Spring Boot + Spring
        Security + Thymeleaf
      </h2>
      <Content href="/catalog">Enter the Store</Content>
      <Content
        href="https://github.com/kazuki43zoo/mybatis-spring-boot-jpetstore"
        target="source"
      >
        View source code on GitHub
      </Content>

      <Footer>Copyright kazuki43zoo.com</Footer>
    </div>
  );
}

function Content({ href, target, children }) {
  return (
    <p>
      <Link href={href} target={target}>
        {children}
      </Link>
    </p>
  );
}

function Footer({ children }) {
  return (
    <p>
      <sub>{children}</sub>
    </p>
  );
}