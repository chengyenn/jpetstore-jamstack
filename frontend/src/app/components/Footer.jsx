import Link from "next/link";

export default function Footer() {
  return (
    <div id="Footer">
      <div id="PoweredBy">
        <Link href="http://kazuki43zoo.com" target="homepage">
          kazuki43zoo.com
        </Link>
      </div>
      <div id="Banner">
        <span>Banner</span>
      </div>
    </div>
  );
}
