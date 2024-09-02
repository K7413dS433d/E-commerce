import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import AllOrdersSkeleton from "../Skeleton/AllOrdersSkeleton";
import emptyOrders from "../../assets/empty_orders.png";
function AllOrders() {
  const [toggle, setToggle] = useState(false);

  const { data: userOrders, isLoading: ordersLoading } = useQuery(
    "userOrders",
    async () => {
      const { id } = jwtDecode(localStorage.getItem("token"));
      return await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
    }
  );

  const navigator = useNavigate();

  function getDate(date) {
    const newDate = new Date(date);
    const fullDate = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
    return fullDate;
  }

  // set scroll to start at the top of the page
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <section className="mt-12 p-5 lg:p-10 flex flex-col gap-7 min-h-[45svh]">
      <p className=" text-sm">
        My Account / <span className="text-primary">Orders</span>
      </p>
      {ordersLoading ? (
        <AllOrdersSkeleton />
      ) : userOrders?.data.length <= 0 ? (
        <>
          <div className="h-96">
            <img
              src={emptyOrders}
              alt="empty wishlist"
              className="block w-full h-full object-contain"
            />
          </div>
        </>
      ) : (
        <>
          {/* box */}
          {userOrders?.data.map((item, idx) => (
            <div
              key={idx}
              className="border-[green] border p-3 rounded-xl pt-12 md:pt-5 relative"
            >
              <div className="  flex  justify-between items-center  mb-4">
                <div className="flex flex-col gap-1">
                  <p>
                    Order Code:
                    <span className="  font-semibold">#{item.id}</span>
                  </p>
                  <p>
                    Order Date:
                    <span className="  font-semibold">
                      {getDate(item.createdAt)}
                    </span>
                  </p>
                </div>

                <div className="flex  items-center  absolute md:static top-1 left-1/2 -translate-x-1/2 md:translate-x-0 gap-1 md:gap-2">
                  <div
                    className={` w-5 md:w-7 h-5 md:h-7  rounded-full bg-primary  ${
                      item.isDelivered ? "bg-primary" : "bg-red-500"
                    }   flex items-center justify-center `}
                  >
                    {item.isDelivered ? (
                      <i className="fa-solid fa-check text-white  fa-md"></i>
                    ) : (
                      <i className="fa-solid fa-xmark text-white  fa-md"></i>
                    )}
                  </div>
                  <p
                    className={` text-lg md:text-2xl font-semibold ${
                      item.isDelivered ? "text-primary" : "text-red-500"
                    }`}
                  >
                    {item.isDelivered ? "" : "Not"} Delivered
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p>
                    Total Price:&nbsp;
                    <span className="font-semibold">
                      &pound; {item.totalOrderPrice}
                    </span>
                  </p>
                  <p>
                    Item Number:&nbsp;
                    <span className="font-semibold">
                      {item.cartItems.length}
                    </span>
                  </p>
                </div>
              </div>

              {/* toggle button  */}
              <div
                onClick={() => {
                  console.log(item);
                  if (toggle === item._id) {
                    setToggle(false);
                  } else setToggle(item._id);
                }}
                className=" flex gap-1 items-center justify-center md:justify-start mb-1"
              >
                <div className="h-5 w-5 rounded-full border border-primary flex items-center justify-center">
                  {toggle === item._id ? (
                    <i className="fa-solid fa-angle-up"></i>
                  ) : (
                    <i className="fa-solid fa-angle-down"></i>
                  )}
                </div>
                <p className=" font-semibold fa-sm"> More Details....</p>
              </div>
              {/* cart info  */}
              <div
                key={idx}
                className={` duration-300  overflow-hidden
                        ${toggle === item._id ? `h-auto` : "h-0"}`}
              >
                {/* start table  */}
                <div className=" mx-auto p-2">
                  <div className="relative flex flex-col w-full h-full  text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                    <table className="w-full text-center table-auto ">
                      <thead>
                        <tr className="border-b border-slate-300 bg-slate-50">
                          <th className="p-4 text-sm font-normal leading-none text-slate-500">
                            Product
                          </th>
                          <th className="p-4 text-sm font-normal leading-none text-slate-500">
                            Name
                          </th>
                          <th className="p-4 text-sm font-normal leading-none text-slate-500">
                            Quantity
                          </th>
                          <th className="p-4 text-sm font-normal leading-none text-slate-500">
                            Item Price
                          </th>
                          <th className="p-4 text-sm font-normal leading-none text-slate-500">
                            Total Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {item?.cartItems.map((cartItem, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-slate-50 cursor-pointer"
                            onClick={() => {
                              navigator(
                                `/productDetails/${cartItem.product._id}`
                              );
                            }}
                          >
                            <td className="p-4 border-b border-slate-200 py-5">
                              <img
                                src={cartItem.product.imageCover}
                                alt={cartItem.product.title}
                                className="w-16 h-16 object-cover rounded"
                              />
                            </td>
                            <td className="p-4 border-b border-slate-200 py-5">
                              <p className="block font-semibold text-sm text-slate-800">
                                {cartItem.product.title
                                  .split(" ")
                                  .slice(0, 2)
                                  .join(" ")}
                              </p>
                            </td>
                            <td className="p-4 border-b border-slate-200 py-5">
                              <p className="text-sm text-slate-500">
                                {cartItem.count}
                              </p>
                            </td>
                            <td className="p-4 border-b border-slate-200 py-5">
                              <p className="text-sm text-slate-500">
                                &pound;{cartItem.price}
                              </p>
                            </td>
                            <td className="p-4 border-b border-slate-200 py-5">
                              <p className="text-sm text-slate-500">
                                &pound;{cartItem.price * cartItem.count}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* end table  */}
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
}

export default AllOrders;
