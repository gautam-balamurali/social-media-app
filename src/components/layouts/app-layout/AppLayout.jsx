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
      {!onAuthenticationPage() && <Header />}
      <section className="section grid-layout">
        <Sidebar />
        <div className="scrollable">
          <AppRoutes />
        </div>
        <SecondSidebar />
      </section>
      <Footer />
      {!onAuthenticationPage() && <Navbar />}
    </div>
  );
};

export default AppLayout;
