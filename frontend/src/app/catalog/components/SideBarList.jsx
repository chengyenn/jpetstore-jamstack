import Link from "next/link";
import Image from "next/image";

export default function SideBarList({ categotyObj }) {
  return (
    <div>
      <Link href={`/catalog/categories/${categotyObj.name}`}>
        <Image
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
