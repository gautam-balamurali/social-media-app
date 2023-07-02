import { useLocation } from "react-router-dom";

import AppRoutes from "core/app-routes/AppRoutes";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./AppLayout.css";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import SecondSidebar from "../second-sidebar/SecondSidebar";

const AppLayout = () => {
  const location = useLocation();

  const onAuthenticationPage = () =>
    location.pathname === "/login" || location.pathname === "/sign-up";

  return (
    <div className="app-layout">
      <Header />
      {!onAuthenticationPage() && (
        <section className="section grid-layout">
          {<Sidebar />}
          <AppRoutes />
          {<SecondSidebar />}
        </section>
      )}
      {onAuthenticationPage() && (
        <section className="section-auth">
          <AppRoutes />
        </section>
      )}
      {onAuthenticationPage() && <Footer />}
      {!onAuthenticationPage() && <Navbar />}
    </div>
  );
};

export default AppLayout;
