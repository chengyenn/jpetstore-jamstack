import Link from "next/link";
// import Image from "next/image";
import CustomImage from "@/app/components/CustomImage";

export default function QuickLinkList({ categotyObj, children }) {
  return (
    <>
      <Link href={`/catalog/categories/${categotyObj.name}`}>
        <CustomImage
          src={categotyObj.image}
          alt="category icon"
          width={categotyObj.width}
          height={categotyObj.height}
          loading="lazy"
        />
      </Link>
      {children}
    </>
  );
}
