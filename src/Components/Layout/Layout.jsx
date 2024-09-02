import CustomNavbar from "./../CustomNavbar/CustomNavbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";

function Layout() {
  return (
    <>
      <CustomNavbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
