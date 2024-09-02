import { toast } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { DeleteModal } from "../Modal/DeleteModal";
import CartSkeleton from "./../Skeleton/CartSkeleton";
import { userCart } from "./../../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import emptyCart from "./../../assets/empty_cart.png";

function Cart() {
  //clear Cart modal state
  const [clearModal, setClearModal] = useState(false);
  //prevent multiple clicks
  const [prevent, setPrevent] = useState(false);
  //trigger loading number
  const [loadingId, setLoadingId] = useState(0);

  const navigator = useNavigate();

  const {
    cartData,
    numOfCartItems,
    cartLoading,
    getUserCart,
    updateItemQuantity,
    removeItem,
    clearCart,
  } = useContext(userCart);

  //update item quantity
  async function UpdateQuantity(productId, quantity) {
    if (quantity <= 1) quantity = 1;
    setPrevent(true);
    setLoadingId(productId);
    await updateItemQuantity(productId, quantity);
    setLoadingId(false);
    setPrevent(false);
  }

  //delete item from cart
  async function deleteItem(productId) {
    setPrevent(true);
    await toast.promise(removeItem(productId), {
      loading: "Deleting Item...",
      success: <b>Item deleted.</b>,
      error: <b>Could not delete item.</b>,
    });
    setPrevent(false);
  }

  //clear cart
  async function clearCartData() {
    setPrevent(true);
    await toast.promise(clearCart(), {
      loading: "Clearing cart...",
      success: <b>Cart cleared.</b>,
      error: <b>Could not clear cart.</b>,
    });
    setPrevent(false);
  }

  //get user cart
  useEffect(() => {
    // set scroll to start at the top of the page
    window.scrollTo({
      top: 0,
    });
    //no need to check token user cannot access cart without token
    getUserCart();
  }, []);

  return (
    <>
      <DeleteModal
        openModal={clearModal}
        setOpenModal={setClearModal}
        message="Are you sure you want to clear your cart?"
        action={clearCartData}
      />

      <section className="mt-16 py-5 px-2  md:p-5 flex flex-wrap flex-col gap-0 min-h-[40svh]">
        {!cartLoading ? (
          <>
            <p className=" text-sm mb-5">
              Home / <span className="text-primary">Cart</span>
            </p>
            {numOfCartItems <= 0 ? (
              <>
                <div className="h-96">
                  <img
                    src={emptyCart}
                    alt="empty wishlist"
                    className="block w-full h-full object-contain"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="px-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className=" font-semibold">
                        Total Price : &pound;
                        {cartData?.data.totalCartPrice || 0}
                      </p>
                      <p className="text-sm">{numOfCartItems} items</p>
                    </div>
                    <button
                      disabled={prevent}
                      onClick={() => {
                        setClearModal(true);
                      }}
                      type="submit"
                      className=" text-white bg-red-600 hover:bg-red-800 duration-500  font-medium rounded-lg  text-sm px-5 py-2.5 text-center "
                    >
                      Clear Cart
                    </button>
                  </div>
                  <div className="shadow-md mb-5">
                    <table className="m-auto w-full  border-separate border-spacing-y-5">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                          <th scope="col" className="py-3 ">
                            Image
                          </th>
                          <th scope="col" className="py-3">
                            Product
                          </th>
                          <th scope="col" className="py-3">
                            Quantity
                          </th>
                          <th scope="col" className="py-3">
                            Price
                          </th>
                          <th scope="col" className="py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="w-full text-center ">
                        {cartData?.data.products.map((item, idx) => {
                          return (
                            <tr className="bg-white border-b  " key={idx}>
                              <td
                                onClick={() =>
                                  navigator(
                                    `/productDetails/${item.product._id}`
                                  )
                                }
                              >
                                <img
                                  src={item.product.imageCover}
                                  className="w-16 md:w-32 max-w-full max-h-full m-auto cursor-pointer"
                                  alt={item.product.title
                                    ?.split(" ")
                                    .slice(0, 2)
                                    .join(" ")}
                                />
                              </td>
                              <td
                                onClick={() =>
                                  navigator(
                                    `/productDetails/${item.product._id}`
                                  )
                                }
                                className=" font-semibold text-gray-900 dark:text-white text-wrap cursor-pointer"
                              >
                                {item.product.title
                                  ?.split(" ")
                                  .slice(0, 2)
                                  .join(" ")}
                              </td>
                              <td>
                                <div className="flex justify-center items-center gap-1 md:gap-2">
                                  <button
                                    disabled={prevent}
                                    onClick={() => {
                                      UpdateQuantity(
                                        item.product._id,
                                        item.count + 1
                                      );
                                    }}
                                    title="Add"
                                    className="group cursor-pointer outline-none "
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="25px"
                                      height="25px"
                                      viewBox="0 0 24 24"
                                      className="stroke-primary fill-none group-hover:fill-secondary group-active:stroke-green-200 group-active:fill-green-600 group-active:duration-0 duration-300  "
                                    >
                                      <path
                                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                        strokeWidth="1.5"
                                      ></path>
                                      <path
                                        d="M8 12H16"
                                        strokeWidth="1.5"
                                      ></path>
                                      <path
                                        d="M12 16V8"
                                        strokeWidth="1.5"
                                      ></path>
                                    </svg>
                                  </button>
                                  <div className="w-5">
                                    {loadingId === item.product._id ? (
                                      <i className=" fa-solid fa-spinner fa-spin text-black "></i>
                                    ) : (
                                      <p>{item.count}</p>
                                    )}
                                  </div>
                                  <button
                                    disabled={prevent}
                                    onClick={() => {
                                      UpdateQuantity(
                                        item.product._id,
                                        item.count - 1
                                      );
                                    }}
                                    title="remove"
                                    className={`group cursor-pointer outline-none `}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="25px"
                                      height="25px"
                                      viewBox="0 0 24 24"
                                      className="stroke-primary fill-none group-hover:fill-secondary group-active:stroke-green-200 group-active:fill-green-600 group-active:duration-0 duration-300 "
                                    >
                                      <path
                                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                        strokeWidth="1.5"
                                      ></path>
                                      <path
                                        d="M8 12H16"
                                        strokeWidth="1.5"
                                      ></path>
                                    </svg>
                                  </button>
                                </div>
                              </td>
                              <td className=" font-semibold text-gray-900 dark:text-white">
                                &pound;{item.price}
                              </td>
                              <td>
                                <button
                                  disabled={prevent}
                                  onClick={() => {
                                    deleteItem(item.product._id);
                                  }}
                                >
                                  <i className="fa-solid fa-trash hover:cursor-pointer text-red-600 hover:text-red-800  duration-150"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        if (cartData?.data.products.length) {
                          navigator(`/checkOut/${cartData?.cartId}`);
                        } else {
                          toast.error("Cart is empty", { id: "cartEmpty" });
                        }
                      }}
                      type="submit"
                      className=" text-white bg-primary hover:bg-secondary duration-500  font-medium rounded-lg w-1/2 md:w-1/4  text-sm px-5 py-2.5 text-center "
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <CartSkeleton />
        )}
      </section>
    </>
  );
}

export default Cart;
