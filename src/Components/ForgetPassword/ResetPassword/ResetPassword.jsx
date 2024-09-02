import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();

  const validate = yup.object().shape({
    email: yup
      .string()
      .required("Email is Required")
      .email("Enter valid email"),
    password: yup
      .string()
      .required("Password is Required")
      .matches(
        /^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=\[\]{}|;:'",.<>?\\\/`~]).{8,16}$/,
        "Password contains lowercase, uppercase, digit, symbol, 8-16 chars, no spaces."
      ),
    rePassword: yup
      .string()
      .required("Password is Required")
      .oneOf([yup.ref("password")], "Should be matches password"),
  });

  //continue from here
  async function sendNewPassword(values) {
    setIsLoading(true);
    try {
      await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: values.email,
          newPassword: values.password,
        }
      );
      toast.success("Password Updated Successfully", { id: "resetPassword" });
      navigator("/login");
    } catch (error) {
      toast.error(error.response.data.message, { id: "resetPasswordError" });
    }

    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validate,
    onSubmit: sendNewPassword,
  });

  //go to top of the page
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <section className="mt-16 py-10 lg:p-10 ">
      <h1 className="text-center font-semibold text-black text-2xl md:text-3xl">
        Reset Your Password
      </h1>
      <div className="container max-w-full mx-auto  ">
        <div className="max-w-xl mx-auto px-6">
          <div className="relative flex flex-wrap">
            <div className="w-full relative">
              <form onSubmit={formik.handleSubmit} className="mt-8">
                <div className="mx-auto max-w-lg ">
                  <div className="py-1 relative">
                    <span className="px-1 text-sm text-gray-600">Email</span>
                    <input
                      placeholder=""
                      type="text"
                      name="email"
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:ring-primary focus:border-primary focus:outline-none"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <>
                        <i className=" absolute top-[50%] -translate-y-[50%] right-2 fa-solid fa-circle-exclamation text-red-700"></i>
                        <p className=" text-red-700 pl-2 text-sm ">
                          {formik.errors.email}
                        </p>
                      </>
                    ) : null}
                  </div>
                  <div className="py-1 relative">
                    <span className="px-1 text-sm text-gray-600">Password</span>
                    <input
                      placeholder=""
                      type="password"
                      name="password"
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:ring-primary focus:border-primary focus:outline-none"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <>
                        <p className=" text-red-700 pl-2 text-sm ">
                          {formik.errors.password}
                        </p>
                      </>
                    ) : null}
                  </div>
                  <div className="py-1 mb-10 relative">
                    <span className="px-1 text-sm text-gray-600">
                      Password Confirm
                    </span>
                    <input
                      placeholder=""
                      type="password"
                      name="rePassword"
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:ring-primary focus:border-primary focus:outline-none"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.rePassword}
                    />
                    {formik.errors.rePassword && formik.touched.rePassword ? (
                      <>
                        <p className=" text-red-700 pl-2 text-sm ">
                          {formik.errors.rePassword}
                        </p>
                      </>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="flex flex-row items-center justify-center text-center w-full md:w-1/2 m-auto border rounded-md outline-none h-10 bg-primary hover:bg-secondary duration-500 border-none text-white text-lg font-semibold shadow-sm"
                  >
                    {isLoading ? (
                      <i className="fa-solid fa-circle-notch fa-spin"></i>
                    ) : (
                      <>Reset Password</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
