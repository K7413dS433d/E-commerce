import amazon from "./../../assets/Amazon_Pay_logo.svg.png";
import express from "./../../assets/American-Express-Color.png";
import paypal from "./../../assets/free-paypal-5-226456.png";
import masterCard from "./../../assets/MasterCard_Logo.svg.png";
import googlePlay from "./../../assets/google_play.png";
import appleStore from "./../../assets/apple_store.png";
import { useState } from "react";
import sendEmail from "../../Lib/email";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
const defaultEmail = import.meta.env.VITE_DEFAULT_EMAIL;

function Footer() {
  const [isLoading, setIsLoading] = useState(false);

  const validate = yup.object().shape({
    email: yup.string().email("notValid").required("required"),
  });

  async function share(mail) {
    setIsLoading(true);

    try {
      await sendEmail(
        "Fresh Cart",
        "APP LINK", //message contains app link
        defaultEmail,
        mail.email
      );
      toast.success("Message Send Check Your Email");
    } catch (error) {
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validate,
    onSubmit: share,
  });

  return (
    <footer className="bg-gray-100  py-10 px-6 lg:px-10 flex flex-col gap-5">
      <h2 className="text-xl md:text-3xl font-semibold">
        Get The Fresh Cart APP
      </h2>
      <p className=" opacity-70 text-xs md:text-base">
        We will send you a link, open it on your phone to download the app.
      </p>
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-12 place-content-center gap-3 md:gap-10 px-5"
      >
        <div className=" col-span-12 lg:col-span-10 relative">
          <input
            type="text"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="Email.."
            required=""
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <>
              {formik.errors.email === "notValid" ? (
                <i className="fa-solid fa-circle-xmark absolute top-[50%] -translate-y-[50%] right-2 text-red-700 fa-lg"></i>
              ) : (
                <i className="fa-solid fa-circle-exclamation absolute top-[50%] -translate-y-[50%] right-2 text-red-700 fa-lg"></i>
              )}
            </>
          ) : null}
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="w-full text-white bg-primary hover:bg-secondary duration-500  font-medium rounded-lg text-[.9rem] px-2 py-2 text-center col-span-12 lg:col-span-2  "
        >
          {isLoading ? (
            <i className="fa-solid fa-circle-notch fa-spin"></i>
          ) : (
            <>Share App Link</>
          )}
        </button>
      </form>
      <div className="h-[1px] bg-gray-300 w-full"></div>
      <div className="flex  flex-col gap-3 items-center lg:justify-between lg:flex-row">
        <div className="flex gap-5">
          <p className="hidden lg:block">Payment Partners</p>
          <div className="flex gap-3">
            <img
              src={amazon}
              alt="amazon"
              className="w-[50px] lg:w-[35px] object-contain"
            />
            <img
              src={express}
              alt="Express"
              className="w-[50px] lg:w-[35px] object-contain"
            />
            <img
              src={masterCard}
              alt="masterCard"
              className="w-[50px] lg:w-[35px] object-contain"
            />
            <img
              src={paypal}
              alt="paypal"
              className="w-[50px] lg:w-[35px] object-contain"
            />
          </div>
        </div>
        <div className="flex gap-5">
          <p className="hidden lg:block">Get deliveries with FreshCart</p>
          <div className="flex gap-3">
            <a
              href="https://play.google.com/store/games?device=windows"
              target="_blank"
              className="w-[110px] block"
            >
              <img src={googlePlay} alt="google play" className="w-full" />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              className="w-[100px] block"
            >
              <img src={appleStore} alt="google play" className="w-full" />
            </a>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-gray-300 w-full"></div>
    </footer>
  );
}

export default Footer;
