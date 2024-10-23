import axios from "axios";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState, useContext, useEffect } from "react";
import { auth } from "./../../Contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

function LogIn() {
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(auth);

  const navigator = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  async function login(values) {
    setLoading(true);
    const toastOptions = {
      duration: 1500,
    };
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      setToken(data.token);
      localStorage.setItem("token", data.token);
      const { name } = jwtDecode(data.token);
      toast(
        () => (
          <span>
            👋 <span className=" font-semibold">WELCOME</span>&nbsp;&nbsp;
            <b className="text-primary">{name}</b>
          </span>
        ),
        toastOptions
      );
      navigator("/");
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
    }
    setLoading(false);
  }

  const formikLogin = useFormik({
    initialValues: initialValues,
    onSubmit: login,
  });

  //if logged in redirect to home page
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigator("/");
    }
    // set scroll to start at the top of the page
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <section className="mt-14 md:mt-0 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl flex justify-center ">
              Sign In
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formikLogin.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                    placeholder="example@gmail.com"
                    onChange={formikLogin.handleChange}
                    value={formikLogin.values.email}
                    onBlur={formikLogin.handleBlur}
                  />
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
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                    onChange={formikLogin.handleChange}
                    value={formikLogin.values.password}
                    onBlur={formikLogin.handleBlur}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <NavLink
                  to="/forgetPassword"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </NavLink>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary hover:bg-secondary duration-500  font-medium rounded-lg text-lg px-5 py-2 text-center "
              >
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Sign in"
                )}
              </button>
              <p className="text-sm font-light text-gray-500">
                Don&rsquo;t have an account yet?&nbsp;
                <NavLink
                  to="/register"
                  className="font-medium text-primary hover:underline "
                >
                  Register
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogIn;
