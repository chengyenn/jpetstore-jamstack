import SideBarList from "@/app/catalog/components/SideBarList";
import categories from "/public/catalogData.json";
import Image from "next/image";

export default function Main() {
  return (
    <div id="Main">
      {/* Sidebar */}
      <div id="Sidebar">
        <div id="SidebarContent">
          {categories.map((category) => (
            <SideBarList categotyObj={category} key={category.name} />
          ))}
        </div>
      </div>

      {/* MainImage */}
      <div id="MainImage">
        <div id="MainImageContent">
          <Image
            height="355"
            width="350"
            src="/images/splash.gif"
            align="middle"
            alt="animal img"
            useMap="#estoremap"
            priority
          />
          <map name="estoremap">
            {categories.map((categoryArea) => (
              <area
                alt={categoryArea.name}
                coords={categoryArea.coords}
                href={`/catalog/categories/${categoryArea.name}`}
                shape="RECT"
                key={categoryArea.name}
              />
            ))}
          </map>
        </div>
      </div>
      <div id="Separator">&nbsp;</div>
    </div>
  );
}
