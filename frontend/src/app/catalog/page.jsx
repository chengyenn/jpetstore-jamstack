import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import Main from "@/app/catalog/components/Main";
import Footer from "@/app/components/Footer";

export default function Catalog() {
  return (
    <div>
      <Header />
      <Content>
        {/* Welcome */}
        <div id="Welcome">
          <div id="WelcomeContent">
            <div>
              Welcome <span>Kazuki</span> !
            </div>
          </div>
        </div>
        <Main />
      </Content>
      <Footer />
    </div>
  );
}
