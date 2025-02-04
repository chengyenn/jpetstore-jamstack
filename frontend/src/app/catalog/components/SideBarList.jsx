import Link from "next/link";
// import Image from "next/image";
import CustomImage from "@/app/components/CustomImage";

export default function SideBarList({ categotyObj }) {
  return (
    <div>
      <Link href={`/catalog/categories/${categotyObj.name}`}>
        <CustomImage
          src={categotyObj.image}
          width={categotyObj.width}
          height={categotyObj.height}
          alt="category icon"
        />
      </Link>
      <br />
      {categotyObj.varieties}
      <br />
    </div>
  );
}
