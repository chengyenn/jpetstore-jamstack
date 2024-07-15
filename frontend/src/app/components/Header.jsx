import QuickLinkList from "@/app/components/QuickLinkList";
import Link from "next/link";
import categories from "/public/navData.json";
import Image from "next/image";
export default function Header() {
  return (
    <div id="Header">
      <div id="Logo">
        <div id="LogoContent">
          <Link href="/catalog">
            <Image
              src="/images/logo-topbar.gif"
              alt="logo"
              loading="lazy"
              width="287"
              height="60"
            />
          </Link>
        </div>
      </div>

      <div id="Menu">
        <div id="MenuContent">
          <Link href="">
            <Image
              src="/images/cart.gif"
              alt="img_car"
              loading="lazy"
              align="middle"
              width="16"
              height="18"
            />
          </Link>
          <Image
            src="/images/separator.gif"
            align="middle"
            width="1"
            height="18"
            alt="separator"
          />
          <Link href="/login">Sign In</Link>
          {/* <a href="">Sign Out</a> */}
          {/* <img src="/images/separator.gif" align="middle" />
          <a href="">My Account</a> */}
          <Image
            src="/images/separator.gif"
            align="middle"
            width="1"
            height="18"
            alt="separator"
          />
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
            <Image
              src="/images/separator.gif"
              width="1"
              height="18"
              alt="separator"
            />
          </QuickLinkList>
        ))}
      </div>
    </div>
  );
}
