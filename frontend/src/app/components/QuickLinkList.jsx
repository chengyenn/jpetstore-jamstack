import Link from "next/link";

export default function QuickLinkList({ categotyObj, children }) {
  return (
    <>
      <Link href={`/catalog/categories/${categotyObj.name}`}>
        <img src={categotyObj.image} />
      </Link>
      {children}
    </>
  );
}
