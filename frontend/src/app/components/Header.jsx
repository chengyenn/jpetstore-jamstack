"use client";
import QuickLinkList from "@/app/components/QuickLinkList";
import Link from "next/link";
import categories from "/public/navData.json";
import Image from "next/image";
import useLoginCheck from "@/hooks/useLoginCheck";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

async function signOutCheck() {
  const res = await fetch(`${apiDomain}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (res.ok) {
    const result = await res.json();
    return result;
  } else {
    const result = await res.json();
    throw new Error(result);
  }
}

export default function Header() {
  const [isLogined, setIsLogined] = useLoginCheck();

  function handleSignOut(event) {
    event.preventDefault();

    signOutCheck()
      .then(() => {
        localStorage.clear();
        setIsLogined(false);
        location.href = "/catalog";
      })
      .catch((error) => {
        alert(`Sign Out failed: ${error}`);
      });
  }

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
          <Link href="/cart">
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
          {isLogined ? (
            <>
              <Link onClick={handleSignOut} href="/catalog">
                Sign Out
              </Link>
              <Image
                src="/images/separator.gif"
                align="middle"
                width="1"
                height="18"
                alt="separator"
              />
              <Link href="/accounts/updateForm">My Account</Link>
            </>
          ) : (
            <Link href="/login">Sign In</Link>
          )}

          <Image
            src="/images/separator.gif"
            align="middle"
            width="1"
            height="18"
            alt="separator"
          />
          <Link href="/help" target="_blank">
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
        {categories.map((product, index) => (
          <QuickLinkList categotyObj={product} key={product.name}>
            {index !== categories.length - 1 && (
              <Image
                src="/images/separator.gif"
                width="1"
                height="18"
                alt="separator"
              />
            )}
          </QuickLinkList>
        ))}
      </div>
    </div>
  );
}
