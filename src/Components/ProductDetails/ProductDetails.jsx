import { useQuery } from "react-query";
import Slider from "react-slick";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProductSkeleton from "../Skeleton/ProductSkeleton";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { userCart } from "./../../Contexts/CartContext";
import { userWishList } from "./../../Contexts/WishListContext";

function ProductDetails() {
  const navigator = useNavigate();
  //slider settings
  const settings = {
    arrows: false,
    dots: true,
    className: "center",
    fade: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  //   get the id from the url return object {id: "id"}
  const { id } = useParams();

  //useQuery options
  const options = {
    // clear cash every 5 minutes
    cacheTime: 300000,
  };

  const { data, isLoading } = useQuery(
    `product_${id}`,
    async () => {
      return await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
    },
    options
  );

  //get add to cart function from globals context
  const { addItemToCart } = useContext(userCart);

  const [loader, setLoader] = useState(false);

  const { removeWishListItem, wishListIDs, addItemToWishList } =
    useContext(userWishList);

  //add to cart with toast notification
  async function addProductToCart(id) {
    setLoader(true);
    try {
      if (localStorage.getItem("token")) {
        await addItemToCart(id);
        toast.success("Product added to cart.", {
          position: "bottom-center",
        });
      } else {
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
      }
    } catch (error) {
      toast.error("Could not add product to cart.", {
        position: "bottom-center",
      });
    }
    setLoader(false);
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

  // set scroll to start at the top of the page
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <section className="mt-12 p-5 md:p-10 grid grid-cols-12 gap-0 lg:gap-10  justify-center">
      {!isLoading ? (
        <>
          <div className="col-span-12 md:col-start-4 md:col-end-9 lg:col-span-4 mb-10 lg:mb-0  ">
            <Slider {...settings}>
              <div className="outline-none " key={0}>
                <img
                  className="block w-full object-contain h-[400px] md:h-[500px]"
                  src={data?.data.data.imageCover}
                  alt={data?.data.data.title}
                />
              </div>
              {data?.data.data.images.map((img, idx) => {
                return (
                  <div className="outline-none " key={idx + 1}>
                    <img
                      className="block w-full object-contain  h-[400px]  md:h-[500px]"
                      src={img}
                      alt={data?.data.data.title}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="col-span-12 lg:col-span-8 flex  flex-col justify-center gap-2">
            <h2 className=" text-2xl md:text-3xl font-semibold">
              {data?.data.data.title}
            </h2>
            <p className="text-lg">{data?.data.data.description}</p>
            <p className="text-primary">{data?.data.data.category.name}</p>
            <div className="flex justify-between items-center mb-5">
              <span className="text-2xl  text-gray-900 ">
                &pound;{data?.data.data.price}
              </span>
              <div className="flex  ">
                <span className=" rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 ">
                  {data?.data.data.ratingsAverage}
                </span>
                {Array.from({
                  length: Math.floor(data?.data.data.ratingsAverage),
                }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-yellow-300 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className=" flex  justify-between items-center">
              <button
                onClick={() => addProductToCart(data?.data.data._id)}
                type="submit"
                className=" text-white bg-primary hover:bg-secondary duration-500  font-medium rounded-lg  text-sm w-3/4 py-2.5 text-center "
              >
                {loader ? (
                  <i className="fa-solid fa-circle-notch fa-spin "></i>
                ) : (
                  "Add to cart"
                )}
              </button>
              <i
                className={`fa-solid fa-heart fa-2xl hover:cursor-pointer hover:text-red-600 text-gray-900  duration-150 ${
                  wishListIDs?.includes(id) ? "text-red-600" : ""
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
                    if (wishListIDs.includes(id)) {
                      removeProductWishList(id);
                    } else {
                      addProductToWishList(id);
                    }
                  }
                }}
              ></i>
            </div>
          </div>
        </>
      ) : (
        <ProductSkeleton />
      )}
    </section>
  );
}

export default ProductDetails;
