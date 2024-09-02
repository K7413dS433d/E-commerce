import { Card } from "flowbite-react";
import { useContext, useEffect } from "react";
import { apiData } from "../../Contexts/DataContext";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import HomeSkeleton from "../Skeleton/HomeSkeleton";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userCart } from "../../Contexts/CartContext";
import { userWishList } from "./../../Contexts/WishListContext";

function Home() {
  const { allProducts, productsLoading, categoriesLoading } =
    useContext(apiData);
  const { addItemToCart } = useContext(userCart);
  const {
    addItemToWishList,
    wishListIDs,
    wishListLoading,
    removeWishListItem,
  } = useContext(userWishList);

  const navigator = useNavigate();

  //add to cart with toast notification
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
    <section className="mt-12 p-5 lg:p-10 flex flex-col gap-16">
      {!productsLoading && !categoriesLoading && !wishListLoading ? (
        <>
          <div className="w-full  m-auto relative">
            <HomeSlider />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-5">
              Browse By Category
            </h2>
            <CategorySlider />
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  justify-center justify-items-center gap-7">
            {allProducts?.data.data.slice(0, 8).map((item, idx) => {
              return (
                <Card className="w-[80%] sm:w-[60%] md:w-[80%] lg:w-full " key={idx}>
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
      ) : (
        <HomeSkeleton />
      )}
    </section>
  );
}

export default Home;
