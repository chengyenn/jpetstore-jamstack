// import Image from "next/image";
import Link from "next/link";
import categories from "/public/navData.json";

export default function CommonLayout() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

// Header
export function Header() {
  return (
    <div id="Header">
      <Logo />
      <Menu />
      <Search />
      <QuickLink />
    </div>
  );
}

function Logo() {
  return (
    <div id="Logo">
      <div id="LogoContent">
        <Link href="/catalog">
          <img src="/images/logo-topbar.gif" alt="logo" />
        </Link>
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div id="Menu">
      <div id="MenuContent">
        <Link href="">
          <img src="/images/cart.gif" alt="img_car" align="middle" />
        </Link>
        <img src="/images/separator.gif" align="middle" />
        <Link href="">Sign In</Link>
        {/* <a href="">Sign Out</a> */}
        {/* <img src="/images/separator.gif" align="middle" />
        <a href="">My Account</a> */}
        <img src="/images/separator.gif" align="middle" />
        <Link href="/help" target="help">
          ?
        </Link>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div id="Search">
      <div id="SearchContent">
        <form>
          <input name="keywords" size="14" />
          <button id="searchProducts">Search</button>
        </form>
      </div>
    </div>
  );
}

function QuickLink() {
  return (
    <div id="QuickLinks">
      {categories.map((product) => (
        <QuickLinkList categotyObj={product} key={product.name}>
          <img src="/images/separator.gif" />
        </QuickLinkList>
      ))}
    </div>
  );
}

function QuickLinkList({ categotyObj, children }) {
  return (
    <>
      <Link href={`/catalog/categories/${categotyObj.name}`}>
        <img src={categotyObj.image} />
      </Link>
      {children}
    </>
  );
}

// Content
export function Content({ children }) {
  return (
    <div id="Content">
      {/* <Message /> */}
      <Section>{children}</Section>
    </div>
  );
}

function Message() {
  <ul class="messages">
    <li
    // th:each="message : ${messages}"
    // th:class="${message.type}"
    // th:text="${message.text}"
    ></li>
  </ul>;
}

function Section({ children }) {
  return <section>{children}</section>;
}

// Footer
export function Footer() {
  return (
    <div id="Footer">
      <PowerBy />
      <Banner />
    </div>
  );
}

function PowerBy() {
  return (
    <div id="PoweredBy">
      <Link href="http://kazuki43zoo.com" target="homepage">
        kazuki43zoo.com
      </Link>
    </div>
  );
}

function Banner() {
  return (
    <div id="Banner">
      <span>Banner</span>
    </div>
  );
}
