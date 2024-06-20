import QuickLinkList from "@/app/components/QuickLinkList";
import Link from "next/link";
import categories from "/public/navData.json";

export default function Header() {
  return (
    <div id="Header">
      <div id="Logo">
        <div id="LogoContent">
          <Link href="/catalog">
            <img src="/images/logo-topbar.gif" alt="logo" />
          </Link>
        </div>
      </div>

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

      <div id="Search">
        <div id="SearchContent">
          <form>
            <input name="keywords" size="14" />
            <button id="searchProducts">Search</button>
          </form>
        </div>
      </div>

      <div id="QuickLinks">
        {categories.map((product) => (
          <QuickLinkList categotyObj={product} key={product.name}>
            <img src="/images/separator.gif" />
          </QuickLinkList>
        ))}
      </div>
    </div>
  );
}
