import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "./../../Contexts/AuthContext";
import { userWishList } from "./../../Contexts/WishListContext";
import { userCart } from "./../../Contexts/CartContext";
import { apiData } from "../../Contexts/DataContext";
import avatar from "./../../assets/avatar.png";

function CustomNavbar() {
  const { token, setToken } = useContext(auth);
  const [toggled, setToggled] = useState(false);
  const { numOfWishListItems } = useContext(userWishList);
  const { numOfCartItems } = useContext(userCart);
  const { userName, setUserName } = useContext(apiData);
  const navigator = useNavigate();

  //logout function
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    //go back to home page
    navigator("/login");
  }

  return (
    <Navbar
      fluid
      rounded
      className="bg-gray-100 lg:px-20 px-3 fixed top-0 left-0 right-0 z-50"
    >
      <NavLink to="/">
        <i className="fa-solid fa-cart-shopping  text-primary text-2xl md:text-3xl me-1"></i>
        <span className="self-center whitespace-nowrap text-2xl md:text-3xl font-semibold dark:text-white ">
          Fresh Cart
        </span>
      </NavLink>
      <div className="flex md:order-2 gap-2">
        {!token && (
          <>
            <NavLink to="login">
              <Button className="bg-primary hover:!bg-secondary duration-300  focus:!ring-0   ">
                <i className="fa-solid fa-user me-1 py-1"></i> <p>LogIn</p>
              </Button>
            </NavLink>
          </>
        )}
        {/* short circuit evaluation */}
        {token && (
          <>
            <div className="flex items-center gap-3 md:gap-4 ">
              <NavLink to="/wishList" className="relative">
                {({ isActive }) => (
                  <>
                    <i
                      className={`fa-solid fa-heart text-xl sm:text-2xl duration-150 ${
                        isActive
                          ? "text-red-600 "
                          : "text-primary hover:text-red-600"
                      }`}
                    ></i>
                    <div className="absolute inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5  sm:text-[10px] text-[9px] font-bold  bg-[#f9f2f5] text-[#556b2f] border-2 border-[#6b8e23] rounded-full -top-2 -end-2 ">
                      {numOfWishListItems}
                    </div>
                  </>
                )}
              </NavLink>
              <NavLink to="/cart" className="relative">
                {({ isActive }) => (
                  <>
                    <i
                      className={`fa-solid fa-basket-shopping text-xl sm:text-2xl duration-150  ${
                        isActive
                          ? "text-secondary"
                          : "text-primary hover:text-secondary"
                      }`}
                    ></i>
                    <div className="absolute inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5  sm:text-[10px] text-[9px] font-bold bg-[#f9f2f5] text-[#556b2f] border-2 border-[#6b8e23] rounded-full -top-2 -end-2 ">
                      {numOfCartItems}
                    </div>
                  </>
                )}
              </NavLink>
              <div
                className="flex md:order-2 "
                onClick={() => {
                  setToggled(false);
                }}
              >
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={<Avatar alt="User settings" img={avatar} rounded />}
                >
                  <Dropdown.Header>{userName}</Dropdown.Header>
                  <NavLink to="/profile">
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </NavLink>
                  <NavLink to="/allOrders">
                    <Dropdown.Item>All Orders</Dropdown.Item>
                  </NavLink>
                  <NavLink to="/contactUs">
                    <Dropdown.Item>Contact Us</Dropdown.Item>
                  </NavLink>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => {
                      logout();
                      setUserName("");
                    }}
                  >
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </>
        )}
        <Navbar.Toggle
          onClick={() => {
            setToggled(!toggled);
          }}
        />
      </div>
      <Navbar.Collapse
        className={`${
          toggled ? "max-h-96" : "max-h-0 md:max-h-full"
        } transition-all duration-700 block overflow-hidden`}
      >
        <NavLink
          to="/"
          onClick={() => setToggled(false)}
          className={({ isActive }) => {
            return isActive
              ? `text-primary hover:text-primary duration-150 mb-2 md:mb-0 `
              : "hover:text-primary duration-150 mb-2 md:mb-0 ";
          }}
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          onClick={() => setToggled(false)}
          className={({ isActive }) => {
            return isActive
              ? `text-primary hover:text-primary duration-150 mb-2 md:mb-0 `
              : "hover:text-primary duration-150 mb-2 md:mb-0 ";
          }}
        >
          Products
        </NavLink>
        <NavLink
          onClick={() => setToggled(false)}
          to="/categories"
          className={({ isActive }) => {
            return isActive
              ? `text-primary hover:text-primary duration-150 mb-2 md:mb-0 `
              : "hover:text-primary duration-150 mb-2 md:mb-0 ";
          }}
        >
          Categories
        </NavLink>
        <NavLink
          onClick={() => setToggled(false)}
          to="/brands"
          className={({ isActive }) => {
            return isActive
              ? `text-primary hover:text-primary duration-150 mb-2 md:mb-0 `
              : "hover:text-primary duration-150 mb-2 md:mb-0 ";
          }}
        >
          Brands
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
