import CommonLayout, { Header, Content, Footer } from "../commonLayout/page";
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
        <SideBarList href="" src="/images/fish_icon.gif">
          Saltwater, Freshwater
        </SideBarList>
        <SideBarList href="" src="/images/dogs_icon.gif">
          Various Breeds
        </SideBarList>
        <SideBarList href="" src="/images/reptiles_icon.gif">
          Lizards, Turtles, Snakes
        </SideBarList>
        <SideBarList href="" src="/images/cats_icon.gif">
          Various Breeds, Exotic Varieties
        </SideBarList>
        <SideBarList href="" src="/images/birds_icon.gif">
          Exotic Varieties
        </SideBarList>
      </div>
    </div>
  );
}

function SideBarList({ href, src, children }) {
  return (
    <div>
      <Link href={href}>
        <img src={src} />
      </Link>
      <br />
      {children}
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
          <area alt="Birds" coords="72,2,280,250" href="" shape="RECT" />
          <area alt="Fish" coords="2,180,72,250" href="" shape="RECT" />
          <area alt="Dogs" coords="60,250,130,320" href="" shape="RECT" />
          <area alt="Reptiles" coords="140,270,210,340" href="" shape="RECT" />
          <area alt="Cats" coords="225,240,295,310" href="" shape="RECT" />
          <area alt="Birds" coords="280,180,350,250" href="" shape="RECT" />
        </map>
      </div>
    </div>
  );
}
