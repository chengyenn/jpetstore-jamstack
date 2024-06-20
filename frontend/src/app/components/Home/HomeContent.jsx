import Link from "next/link";

export default function HomeContent({ href, target, children }) {
  return (
    <p>
      <Link href={href} target={target}>
        {children}
      </Link>
    </p>
  );
}
