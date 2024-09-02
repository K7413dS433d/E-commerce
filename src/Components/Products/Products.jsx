import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiData } from "./../../Contexts/DataContext";
import { toast } from "react-hot-toast";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import AllProductsSkeleton from "./../Skeleton/AllProductsSkeleton";
import { userCart } from "./../../Contexts/CartContext";
import { userWishList } from "./../../Contexts/WishListContext";

function Products() {
  const [productName, setProductName] = useState("");
  const { allProducts, productsLoading } = useContext(apiData);
  const { addItemToCart } = useContext(userCart);
  const { removeWishListItem, wishListIDs, addItemToWishList } =
    useContext(userWishList);
  const navigator = useNavigate();

  //add product to cart with toast notification
  function addProductToCart(id) {
    if (!localStorage.getItem("token")) {
      toast(
        () => (
          <span>
            To Add To Cart &nbsp;
            <button
              onClick={() => navigator("/login")}
              type="submit"
              className=" text-white bg-primary hover:bg-secondary duration-500  font-medium rounded-lg  text-sm px-3 py-1 text-center "
            >
              LogIn
            </button>
            &nbsp; First
          </span>
        ),
        { id: "signInFirst", duration: 2000 }
      );
    } else {
      toast.promise(
        addItemToCart(id),
        {
          loading: "Adding to cart...",
          success: <b>Product added to cart.</b>,
          error: <b>Could not add product to cart.</b>,
        },
        {
          position: "bottom-center",
        }
      );
    }
  }

  //add to wishlist with toast notification
  function addProductToWishList(id) {
    if (!localStorage.getItem("token")) {
      toast(
        () => (
          <span>
            To Add To Cart &nbsp;
            <button
              onClick={() => navigator("/login")}
              type="submit"
              className=" text-white bg-primary hover:bg-secondary duration-500  font-medium rounded-lg  text-sm px-3 py-1 text-center "
            >
              LogIn
            </button>
            &nbsp; First
          </span>
        ),
        { id: "signInFirst", duration: 2000 }
      );
    } else {
      toast.promise(
        addItemToWishList(id),
        {
          loading: "Adding to Favorites...",
          success: <b>Product added to WishList.</b>,
          error: <b>Could not add product to WishList.</b>,
        },
        {
          position: "bottom-center",
        }
      );
    }
  }

  //remove from wishlist with toast notification
  function removeProductWishList(id) {
    if (!localStorage.getItem("token")) {
      toast(
        () => (
          <span>
            To Add To Cart &nbsp;
            <button
              onClick={() => navigator("/login")}
              type="submit"
              className=" text-white bg-primary hover:bg-secondary duration-500  font-medium rounded-lg  text-sm px-3 py-1 text-center "
            >
              LogIn
            </button>
            &nbsp; First
          </span>
        ),
        { id: "signInFirst", duration: 2000 }
      );
    } else {
      toast.promise(
        removeWishListItem(id),
        {
          loading: "Removing From Favorites...",
          success: <b>Product Removed From WishList.</b>,
          error: <b>Could not Remove product from WishList.</b>,
        },
        {
          position: "bottom-center",
        }
      );
    }
  }

  // set scroll to start at the top of the page
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <section className="mt-11 p-10">
      {productsLoading ? (
        <>
          <div className=" w-full max-w-xl md:px-0 mx-auto bg-white rounded-full mb-8 ">
            <Skeleton height={50} borderRadius={30} />
          </div>
          <AllProductsSkeleton />
        </>
      ) : (
        <>
          {/* search bar  */}
          <div className="fixed w-full max-w-xl px-5 md:px-0 mx-auto bg-white rounded-full  left-1/2 -translate-x-1/2">
            <input
              placeholder="Search ..."
              className="rounded-full w-full h-12 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-[#71bf71] focus:border-[#71bf71]"
              type="text"
              name="query"
              id="query"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
            <div className="absolute inline-flex items-center h-8 p-4 text-sm text-white rounded-full outline-none right-[5%] md:right-[2%] top-[.6rem]  sm:text-base sm:font-medium  select-none pointer-events-none ">
              <svg
                className=" h-5 w-5 text-[#747680]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          {/* data  */}
          <div className=" grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  justify-center justify-items-center gap-7 mt-20">
            {allProducts?.data.data
              .filter((item) => {
                return !productName
                  ? true
                  : item.title
                      .toLowerCase()
                      .includes(productName.toLowerCase());
              })
              .map((item, idx) => {
                return (
                  <Card className="w-full" key={idx}>
                    <Link to={`/productDetails/${item._id}`}>
                      <img
                        className="h-[230px] object-contain w-full block "
                        src={item.imageCover}
                        alt={item.title}
                      />
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                        {item.title.split(" ").slice(0, 2).join(" ")}
                      </h5>
                      <div className=" mt-2 flex justify-between">
                        <span className="text-2xl font-bold text-gray-900 ">
                          &pound;{item.price}
                        </span>
                        <div className="flex items-center">
                          <span className=" rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 ">
                            {item.ratingsAverage}
                          </span>
                          {Array.from({
                            length: Math.floor(item.ratingsAverage),
                          }).map((_, i) => (
                            <svg
                              key={i}
                              className="h-5 w-5 text-yellow-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </Link>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => addProductToCart(item._id)}
                        type="submit"
                        className=" text-white bg-primary hover:bg-secondary duration-500  font-medium rounded-lg  text-sm px-5 py-2.5 text-center "
                      >
                        Add to cart
                      </button>
                      <i
                        className={`fa-solid fa-heart fa-2xl hover:cursor-pointer hover:text-red-600 text-gray-900  duration-150 ${
                          wishListIDs?.includes(item._id) ? "text-red-600" : ""
                        }`}
                        onClick={() => {
                          if (!localStorage.getItem("token")) {
                            toast(
                              () => (
                                <span>
                                  To use WishList &nbsp;
                                  <button
                                    onClick={() => navigator("/login")}
                                    type="submit"
                                    className=" text-white bg-primary hover:bg-secondary duration-500  font-medium rounded-lg  text-sm px-3 py-1 text-center "
                                  >
                                    LogIn
                                  </button>
                                  &nbsp; First
                                </span>
                              ),
                              { id: "signInFirst", duration: 2000 }
                            );
                          } else {
                            if (wishListIDs.includes(item._id)) {
                              removeProductWishList(item._id);
                            } else {
                              addProductToWishList(item._id);
                            }
                          }
                        }}
                      ></i>
                    </div>
                  </Card>
                );
              })}
          </div>
        </>
      )}
    </section>
  );
}

export default Products;
