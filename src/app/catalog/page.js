import CommonLayout, { Header, Content, Footer } from "../commonLayout/page";
import categories from "/public/catalogData.json";
import Image from "next/image";
import Link from "next/link";

export default function Catalog() {
  return (
    <div>
      <Header />
      <Content>
        <Welcome />
        <Main />
      </Content>
      <Footer />
    </div>
  );
}

function Welcome() {
  return (
    <div id="Welcome">
      <div id="WelcomeContent">
        <div>
          Welcome <span>Kazuki</span> !
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div id="Main">
      <SideBar />
      <MainImage />
      <div id="Separator">&nbsp;</div>
    </div>
  );
}

function SideBar() {
  return (
    <div id="Sidebar">
      <div id="SidebarContent">
        {categories.map((category) => (
          <SideBarList categotyObj={category} key={category.name} />
        ))}
      </div>
    </div>
  );
}

function SideBarList({ categotyObj }) {
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

function MainImage() {
  return (
    <div id="MainImage">
      <div id="MainImageContent">
        <Image
          height="355"
          width="350"
          src="/images/splash.gif"
          align="middle"
          alt="animal img"
          usemap="#estoremap"
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
  );
}
