/* eslint-disable */

import { useLocation } from "react-router-dom";

import AppRoutes from "core/app-routes/AppRoutes";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./AppLayout.css";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import SecondSidebar from "../second-sidebar/SecondSidebar";
import ScrollToTop from "utils/window-scrolls/WindowScrollToTop";
import { ToastWrapper } from "utils/toast-wrapper/ToastWrapper";
import { usePosts } from "core/contexts/posts-context/PostsContext";
import CustomLoader from "components/shared/custom-loader-component/CustomLoader";

const AppLayout = () => {
  const location = useLocation();
  const { isLoading } = usePosts();

  const onAuthenticationPage = () =>
    location.pathname === "/login" || location.pathname === "/sign-up";

  return (
    <div className="app-layout">
      {isLoading && <CustomLoader />}
      <ScrollToTop />
      <ToastWrapper />
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
