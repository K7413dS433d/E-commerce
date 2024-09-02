import { Label, Textarea } from "flowbite-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import bank from "./../../assets/bank.png";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { userCart } from "./../../Contexts/CartContext";

function CheckOut() {
  // manage animation
  const [x, setX] = useState("105%");
  const [rotate, setRotate] = useState(-12);

  // navigate
  const navigator = useNavigate();
  // get cart id
  const { id } = useParams();
  const [baseUrl, setBaseUrl] = useState(window.location.origin);
  // get cart data
  const { numOfCartItems, cartData, setNumOfCartItems, setCartData } =
    useContext(userCart);
  //loading
  const [loading, setLoading] = useState(false);
  //live writing address
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");

  //payment method
  const [paymentMethod, setPaymentMethod] = useState("cash");

  async function sendData(info) {
    try {
      if (paymentMethod === "cash") {
        setLoading(true);
        await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
          info,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        setLoading(false);
        toast.success("Order has been placed successfully");
        setCartData(null);
        setNumOfCartItems(0);
        navigator("/allOrders");
      } else {
        setLoading(true);
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`,
          info,
          {
            headers: { token: localStorage.getItem("token") },
            params: {
              url: baseUrl,
            },
          }
        );
        window.location.href = data?.session.url;
        setLoading(false);
      }
    } catch (error) {
      toast.error("Could not send data", { id: "error" });
      setLoading(false);
    }
  }

  function formHandler() {
    const phoneReg = /^01[1250][0-9]{8}$/;
    if (!phoneReg.test(phone)) {
      toast.error("Please enter a valid Egyptian number", { id: "phone" });
      return;
    }
    if (!address || !phone || !details) {
      toast.error("Please fill all fields");
    } else {
      sendData({
        shippingAddress: {
          details,
          phone,
          city: address,
        },
      });
    }
  }

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setX("0");
      setRotate(0);
    }

    if (numOfCartItems <= 0) {
      navigator("/cart");
    }

    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <section className="mt-16 py-5 px-2  md:p-5 md:pb-20 flex flex-wrap  flex-col gap-0 min-h-[40svh] ">
      <p className=" text-sm mb-5">
        Home / Cart / <span className="text-primary">CheckOut</span>
      </p>
      <div className=" flex flex-col md:flex-row  justify-center items-center gap-10 px-5 py-10  md:py-0  relative overflow-hidden  ">
        <form className="flex max-w-md flex-col gap-4 w-full md:w-3/6">
          <h2 className="m-auto  font-semibold text-2xl">
            Billing information
          </h2>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="address" value="Address" />
            </div>
            <input
              id="address"
              type="text"
              placeholder="Address"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 text-sm  placeholder:text-sm"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="phone" value="Phone" />
            </div>
            <input
              id="phone"
              type="text"
              placeholder="Phone Number"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 text-sm  placeholder:text-sm"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="Details" value="Details" />
            </div>
            <Textarea
              id="Details"
              placeholder="Write some Details..."
              required
              rows={4}
              className="resize-none focus:ring-primary focus:border-primary"
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            />
          </div>
        </form>

        {/* list  */}
        <motion.div
          initial={{ y: 10 }}
          animate={{ x, rotate }}
          className=" absolute md:static  w-[90%] md:w-[340px] text-gray-900 py-10"
        >
          {/* button  */}
          <button
            onClick={() => {
              if (x === "105%") {
                setX("0");
                setRotate(0);
              } else {
                setX("105%");
                setRotate(-12);
              }
            }}
            className="cursor-pointer bg-primary px-2 py-2 rounded-full  text-white   md:hidden absolute  top-5 -left-2"
          >
            <svg
              className="w-5 h-5"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {x === "105%" ? (
                <path
                  d="M13.5 19.5l-7.5-7.5 7.5-7.5M19.5 12H5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M6 6l12 12M6 18L18 6"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>

          <div className="rounded-lg p-5 shadow-custom-light flex flex-col gap-4 bg-white">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className=" text-xl font-semibold">Billing Details</h2>
                <NavLink
                  to="/cart"
                  className="underline text-sm  font-semibold text-primary self-end"
                >
                  Edit Cart
                </NavLink>
              </div>
              <div className="w-full h-[1px] bg-black opacity-45"></div>
            </div>

            {/* shipping  */}
            <div>
              <div className="mb-3">
                <h2 className="mb-1 font-semibold">SHIPPING</h2>
                <p className=" text-sm font-thin">
                  {address ? address : "Details..."}
                </p>
              </div>
              <div className="w-full h-[1px] bg-black opacity-45"></div>
            </div>

            {/* price  */}
            <div>
              <div className="flex justify-between text-lg mb-1">
                <h2 className="font-semibold"> Total </h2>
                <p>&pound; {cartData?.data.totalCartPrice || 0}</p>
              </div>
              <div className="flex justify-between text-lg mb-3">
                <h2 className="font-semibold"> Number of items </h2>
                <p>{numOfCartItems}</p>
              </div>
              <div className="w-full h-[1px] bg-black opacity-45"></div>
            </div>

            <div>
              <h2 className="font-semibold mb-3">PAYMENT METHOD</h2>
              {/* Bank */}
              <div className="flex justify-between mb-1">
                <div className="flex gap-1 items-center">
                  <input
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                    }}
                    type="radio"
                    id="bank"
                    name="paymentMethod"
                    value="bank"
                    className=" focus:ring-0 text-primary ring-0 w-3 h-3"
                  />
                  <label htmlFor="bank"> Bank</label>
                </div>
                <label htmlFor="bank">
                  <img src={bank} alt="banks image" className="h-5" />
                </label>
              </div>

              {/* Cash */}
              <div className="flex items-center gap-1">
                <input
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                  }}
                  checked={paymentMethod === "cash"}
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  className=" focus:ring-0 text-primary ring-0 w-3 h-3"
                />
                <label htmlFor="cash"> Cash</label>
              </div>
            </div>
            {/* buttons  */}
            <button
              type="submit"
              onClick={formHandler}
              className="w-full text-white bg-primary hover:bg-secondary duration-500  font-medium rounded-lg text-lg px-5 py-2 text-center "
            >
              {loading ? (
                <i className=" fa-solid fa-spin fa-spinner"></i>
              ) : (
                "Order Now"
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CheckOut;
