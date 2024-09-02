import { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import WishListSkeleton from "../Skeleton/WishListSkeleton";
import { userCart } from "../../Contexts/CartContext";
import { userWishList } from "../../Contexts/WishListContext";
import emptyImage from "../../assets/empty_wishList.png";

function WishList() {
  const [wishlistIsLoading, setWishListIsLoading] = useState(false);
  const { addItemToCart } = useContext(userCart);
  const {
    wishListData,
    numOfWishListItems,
    wishListIDs,
    getWishList,
    removeWishListItem,
  } = useContext(userWishList);

  const [prevent, setPrevent] = useState(false);

  //get user wishlist
  async function getUserWishList() {
    setWishListIsLoading(true);
    await getWishList();
    setWishListIsLoading(false);
  }

  //add to cart with toast notification
  async function addProductToCart(productId) {
    await toast.promise(
      addItemToCart(productId),
      {
        loading: "Adding to cart...",
        success: <b>Product added to cart.</b>,
        error: <b>Could not add product to cart.</b>,
      },
      {
        position: "bottom-center",
      }
    );
    removeWishListItem(productId);
    await getWishList();
  }

  //remove from wishlist
  async function removeFromWishList(productId) {
    setPrevent(true);
    await toast.promise(removeWishListItem(productId), {
      loading: "Deleting Item...",
      success: <b>Item deleted.</b>,
      error: <b>Could not delete item.</b>,
    });
    getWishList();
    setPrevent(false);
  }

  //get user cart if logged in
  useEffect(() => {
    // set scroll to start at the top of the page
    window.scrollTo({
      top: 0,
    });
    // no need to check if user is logged in because the route is protected
    getUserWishList();
  }, []);

  return (
    <section className="mt-16 py-5 px-2 md:p-5 flex flex-wrap flex-col gap-0 min-h-[40svh]">
      {!wishlistIsLoading ? (
        <>
          <p className=" text-sm mb-2">
            Home / <span className="text-primary">WishList</span>
          </p>

          {numOfWishListItems <= 0 ? (
            <>
              <div className="h-96">
                <img
                  src={emptyImage}
                  alt="empty wishlist"
                  className="block w-full h-full object-contain"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm ms-2">
                  {typeof numOfWishListItems === "number" ? (
                    numOfWishListItems
                  ) : (
                    <i className="fa-solid fa-hourglass-start fa-spin text-[#C2B280]"></i>
                  )}
                  &nbsp; items
                </p>
              </div>
              {/* data  */}
              <div className=" grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  justify-center justify-items-center gap-7 mt-5 px-5">
                {wishListData?.data
                  .filter((item) =>
                    wishListIDs === true ? true : wishListIDs.includes(item._id)
                  )
                  .map((item, idx) => {
                    return (
                      <Card className="w-full relative " key={idx}>
                        <Link to={`/productDetails/${item._id}`}>
                          <img
                            className="h-[200px] object-contain w-full block "
                            src={item.imageCover}
                            alt={item.title}
                          />
                          <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                            {item.title.split(" ").slice(0, 2).join(" ")}
                          </h5>
                          <div>
                            <span className="text-xl font-semibold text-gray-900 ">
                              &pound;{item.price}
                            </span>
                          </div>
                        </Link>
                        <div className="flex items-center ">
                          <button
                            disabled={prevent}
                            onClick={() => addProductToCart(item._id)}
                            type="submit"
                            className=" text-white bg-primary hover:bg-secondary duration-500  font-medium rounded-lg  text-sm px-5 py-2.5 text-center w-3/4 m-auto"
                          >
                            Add to cart
                          </button>
                          <button disabled={prevent}>
                            <i
                              className="fa-solid fa-heart-circle-xmark fa-xl hover:cursor-pointer text-red-600 hover:text-gray-900  duration-150 absolute top-7 right-2"
                              onClick={() => {
                                removeFromWishList(item._id);
                              }}
                            ></i>
                          </button>
                        </div>
                      </Card>
                    );
                  })}
              </div>
            </>
          )}
        </>
      ) : (
        <WishListSkeleton />
      )}
    </section>
  );
}

export default WishList;
