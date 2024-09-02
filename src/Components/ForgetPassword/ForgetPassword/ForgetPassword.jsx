import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import OTPModal from "../OTPModal/OTPModal";
import { motion } from "framer-motion";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-hot-toast";

function ForgetPassword() {
  const [trigger, setTrigger] = useState(false);
  const [y, setY] = useState("-100vh");
  const [loading, setLoading] = useState(false);
  const [currenEmail, setCurrentEmail] = useState("");

  async function sendEmail(values) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      toast.success(data.message);
      setTrigger(true);
      setY("0");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function ForgetPass(values) {
    setLoading(true);
    await sendEmail(values);
    setCurrentEmail(values.email);
    setLoading(false);
  }

  const validate = yup.object().shape({
    email: yup
      .string()
      .required("Email is Required")
      .email("Enter valid email"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validate,
    onSubmit: ForgetPass,
  });

  //go to top of the page
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      {!trigger || (
        <div
          onClick={(e) => {
            if (e.target == e.currentTarget) {
              setTrigger(false);
              setY("-100vh");
            }
          }}
          className="mt-12  bg-[#00000046] fixed top-0 left-0 right-0 bottom-0 "
        >
          <motion.div
            layout
            initial={{ y: "-100vh" }}
            animate={{ y }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 150, // Higher values make the spring more rigid
              damping: 10, // Lower values make it more bouncy
            }}
          >
            <OTPModal email={currenEmail} sendEmail={sendEmail} />
          </motion.div>
        </div>
      )}
      <section className="mt-12 p-5 lg:p-10">
        <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
          <h1 className="text-3xl font-semibold">Reset Password</h1>
          <p className="text-slate-500">
            Fill up the form to reset the password
          </p>
          <form className="my-8" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col space-y-5">
              <label htmlFor="email ">
                <p className="text-sm font-medium text-slate-700 pb-2">
                  Email address
                </p>

                {/* popover  */}
                <div className=" relative ">
                  {formik.errors.email && formik.touched.email ? (
                    <motion.div
                      initial={{ x: "center", opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.5,
                      }}
                      className=" absolute -top-[5.3rem] left-1/2 -translate-x-1/2  duration-500  text-red-800 bg-gray-100 w-72 rounded-md  shadow-md text-sm  dark:text-gray-400"
                    >
                      <div className="px-3 text-center py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                        <h3 className="font-semibold  dark:text-white ">
                          Error
                        </h3>
                      </div>
                      <div className="px-3 py-2">
                        <p>{formik.errors.email}</p>
                      </div>
                      <div className=" absolute -bottom-3 left-1/2 -translate-x-1/2">
                        <i className="fa-solid fa-caret-down text-gray-400 " />
                      </div>
                    </motion.div>
                  ) : (
                    ""
                  )}
                  {/* popover end  */}
                </div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="example@gmail.com"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
              </label>
              <button
                disabled={loading}
                type="submit"
                className="w-full h-9 font-medium text-white bg-primary hover:bg-secondary rounded-lg border-secondary duration-300 hover:shadow inline-flex space-x-2 items-center justify-center"
              >
                {loading ? (
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                      />
                    </svg>
                    <span>Reset password</span>
                  </>
                )}
              </button>
              <p className="text-center text-sm ">
                Not registered yet?
                <NavLink
                  to="/register"
                  className="text-primary font-medium inline-flex space-x-1 items-center"
                >
                  &nbsp;
                  <span>Register now </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default ForgetPassword;
