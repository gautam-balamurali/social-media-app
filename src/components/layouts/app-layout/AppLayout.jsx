import { useLocation } from "react-router-dom";

import AppRoutes from "core/app-routes/AppRoutes";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./AppLayout.css";
import Navbar from "../navbar/Navbar";

const AppLayout = () => {
  const location = useLocation();

  const onAuthenticationPage = () =>
    location.pathname === "/login" || location.pathname === "/sign-up";

  return (
    <div className="app-layout">
      {!onAuthenticationPage() && <Header />}
      <section className="section">
        <AppRoutes />
      </section>
      <Footer />
      <Navbar />
    </div>
  );
};

export default AppLayout;
