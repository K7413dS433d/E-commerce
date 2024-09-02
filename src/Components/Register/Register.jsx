import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
// alias method for import all objects in yub
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  //validation scheme using Yub library shape => return validation scheme
  const validate = yup.object().shape({
    name: yup
      .string()
      .required("Name is Required")
      .min(3, "Minimum Characters is 3")
      .max(20, "Maximum Characters is 20"),
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
    phone: yup
      .string()
      .required("Number is required")
      .matches(/^01[1250][0-9]{8}$/, "Enter Egyptian number"),
  });

  // set initial values for formik
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  // submit function the parameter by default holds all input values
  //function will not be called until validation scheme is true
  async function registerUser(values) {
    //trigger loading
    setLoading(true);
    const toastOptions = {
      duration: 1000,
      id: "register",
    };
    //error handling
    try {
      //call api to to post user registration data to database
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      toast.success("Success! Your account has been created", toastOptions);
      setTimeout(() => {
        navigator("/login");
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
    }
    // stop loading
    setLoading(false);
  }

  // formik configurations
  const formikRegister = useFormik({
    initialValues: initialValues,
    onSubmit: registerUser,
    validationSchema: validate,
  });

  //if logged in redirect to home page
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigator("/");
    }
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <section className="mt-20 md:mt-15 lg:mt-10 lg:p-6 p-0">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-3xl xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create an account
            </h1>
            <form
              className="space-y-6 md:space-y-7"
              // handel refresh page on submit
              onSubmit={formikRegister.handleSubmit}
            >
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 md:col-span-6  mb-3 md:mb-0">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5      "
                      placeholder="Name"
                      value={formikRegister.values.name}
                      onChange={formikRegister.handleChange}
                      onBlur={formikRegister.handleBlur}
                    />
                    {formikRegister.errors.name &&
                    formikRegister.touched.name ? (
                      <>
                        <i className=" absolute top-[50%] -translate-y-[50%] right-2 fa-solid fa-circle-exclamation text-red-700"></i>
                        <p className="absolute text-red-700 left-2 text-sm ">
                          {formikRegister.errors.name}
                        </p>
                      </>
                    ) : null}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 mb-3 md:mb-0">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Phone
                  </label>
                  <div className=" relative">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5      "
                      placeholder="Phone Number"
                      value={formikRegister.values.phone}
                      onChange={formikRegister.handleChange}
                      onBlur={formikRegister.handleBlur}
                    />
                    {formikRegister.errors.phone &&
                    formikRegister.touched.phone ? (
                      <>
                        <i className=" absolute top-[50%] -translate-y-[50%] right-2 fa-solid fa-circle-exclamation text-red-700"></i>
                        <p className="absolute text-red-700 left-2 text-sm ">
                          {formikRegister.errors.phone}
                        </p>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <div className=" relative">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5      "
                    placeholder="example@gmail.com"
                    value={formikRegister.values.email}
                    onChange={formikRegister.handleChange}
                    onBlur={formikRegister.handleBlur}
                  />
                  {formikRegister.errors.email &&
                  formikRegister.touched.email ? (
                    <>
                      <i className=" absolute top-[50%] -translate-y-[50%] right-2 fa-solid fa-circle-exclamation text-red-700"></i>
                      <p className="absolute text-red-700 left-2 text-sm ">
                        {formikRegister.errors.email}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5  "
                    placeholder="Password"
                    value={formikRegister.values.password}
                    onChange={formikRegister.handleChange}
                    onBlur={formikRegister.handleBlur}
                  />
                  {formikRegister.errors.password &&
                  formikRegister.touched.password ? (
                    <>
                      <p className=" text-red-700 pl-2 text-sm ">
                        {formikRegister.errors.password}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Confirm password
                </label>
                <div>
                  <input
                    type="password"
                    name="rePassword"
                    id="confirm-password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5      "
                    placeholder="Confirm Password"
                    value={formikRegister.values.rePassword}
                    onChange={formikRegister.handleChange}
                    onBlur={formikRegister.handleBlur}
                  />
                  {formikRegister.errors.rePassword &&
                  formikRegister.touched.rePassword ? (
                    <>
                      <p className=" text-red-700 pl-2 text-sm ">
                        {formikRegister.errors.rePassword}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
              <div className=" w-full flex justify-center">
                <button
                  type="submit"
                  className="w-full lg:w-2/4  text-white bg-primary hover:bg-secondary duration-500  font-medium rounded-lg text-lg px-5 py-2 text-center"
                >
                  {loading ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "Create an account"
                  )}
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?&nbsp;
                <NavLink
                  to="/login"
                  className="font-medium text-primary hover:underline "
                >
                  Login here
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
