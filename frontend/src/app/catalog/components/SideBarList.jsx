import Link from "next/link";

export default function SideBarList({ categotyObj }) {
  return (
    <div>
      <Link href={`/catalog/categories/${categotyObj.name}`}>
        <img src={categotyObj.image} />
      </Link>
      <br />
      {categotyObj.varieties}
      <br />
    </div>
  );
}
