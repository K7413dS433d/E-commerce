import * as yup from "yup";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { apiData } from "./../../Contexts/DataContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { auth } from "./../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [prevent, setPrevent] = useState(false);
  const { userName, setUserName } = useContext(apiData);
  const { setToken } = useContext(auth);
  const navigator = useNavigate();

  // Validation Schema for data
  const validateData = yup.object().shape({
    name: yup.string().required("Name is Required"),
    phone: yup
      .string()
      .required("Number is required")
      .matches(/^01[1250][0-9]{8}$/, "Enter Egyptian number"),
    email: yup
      .string()
      .required("Email is Required")
      .email("Enter valid email"),
  });

  // Validation Schema for password
  const validatePassword = yup.object().shape({
    currentPassword: yup
      .string()
      .required("Password is Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=\[\]{}|;:'",.<>?\\\/`~]).{8,16}$/,
        "Password contains lowercase, uppercase, digit, symbol, 8-16 chars, no spaces."
      ),
    password: yup
      .string()
      .required("Password is Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=\[\]{}|;:'",.<>?\\\/`~]).{8,16}$/,
        "Password contains lowercase, uppercase, digit, symbol, 8-16 chars, no spaces."
      ),
    rePassword: yup
      .string()
      .required("Password is Required")
      .oneOf([yup.ref("password")], "Should be matches password"),
  });

  // Cancel button function
  function cancel(formik) {
    //to reset formik values
    formik.resetForm();
  }

  async function sendRequest(values, endPoint) {
    const { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/users/${endPoint}`,
      values,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setUserName(data?.user.name);
  }

  async function saveSettings(data, endPoint) {
    setPrevent(true);
    await toast.promise(
      sendRequest(data, endPoint),
      {
        loading: "Saving...",
        success: <b>Settings saved!</b>,
        error: (err) => {
          const errorMessage =
            err.response?.data?.errors?.msg || "Could not save.";
          setPrevent(false);
          return <b>{errorMessage || "Could not save."}</b>; // Display error message in the toast
        },
      },
      { id: "saveSettings" }
    );
    setPrevent(false);
  }

  //logout function
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    //go back to home page
    navigator("/login");
  }

  // Formik for data
  const dataFormik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
    },
    validationSchema: validateData,
    onSubmit: (values) => {
      saveSettings(values, "updateMe").then(() => {
        logout();
      });
    },
  });

  // Formik for password
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validatePassword,
    onSubmit: (values) => {
      saveSettings(values, "changeMyPassword").then(() => {
        logout();
      });
    },
  });

  return (
    <section className="mt-12 p-5  lg:p-10">
      <h2 className=" text-sm">
        My Account / <span className="text-[#4FA74F]">Profile</span>
      </h2>
      <div className="px-0 md:px-20 mt-10">
        <div className="space-y-12">
          <form
            onSubmit={dataFormik.handleSubmit}
            className="border-b border-gray-900/10 pb-10"
          >
            <h2 className="text-lg font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Your personal information is never shared with anyone.
            </p>
            <div className="px-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2 relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    placeholder={`Current Name: ${userName}`}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#4FA74F] focus:border-[#4FA74F] sm:text-sm sm:leading-6"
                    onChange={dataFormik.handleChange}
                    onBlur={dataFormik.handleBlur}
                    value={dataFormik.values.name}
                  />
                  {dataFormik.errors.name && dataFormik.touched.name ? (
                    <>
                      <i className=" absolute top-[50%] -translate-y-[50%] right-2 fa-solid fa-circle-exclamation text-red-700"></i>
                      <p className="absolute text-red-700 left-2 text-sm ">
                        {dataFormik.errors.name}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2 relative">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#4FA74F] focus:border-[#4FA74F] sm:text-sm sm:leading-6"
                    onChange={dataFormik.handleChange}
                    onBlur={dataFormik.handleBlur}
                    value={dataFormik.values.phone}
                  />
                  {dataFormik.errors.phone && dataFormik.touched.phone ? (
                    <>
                      <i className=" absolute top-[50%] -translate-y-[50%] right-2 fa-solid fa-circle-exclamation text-red-700"></i>
                      <p className="absolute text-red-700 left-2 text-sm ">
                        {dataFormik.errors.phone}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#4FA74F] focus:border-[#4FA74F] sm:text-sm sm:leading-6"
                    onChange={dataFormik.handleChange}
                    onBlur={dataFormik.handleBlur}
                    value={dataFormik.values.email}
                  />
                  {dataFormik.errors.email && dataFormik.touched.email ? (
                    <>
                      <i className=" absolute top-[50%] -translate-y-[50%] right-2 fa-solid fa-circle-exclamation text-red-700"></i>
                      <p className="absolute text-red-700 left-2 text-sm ">
                        {dataFormik.errors.email}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                disabled={prevent}
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => {
                  cancel(dataFormik);
                }}
              >
                Cancel
              </button>
              <button
                disabled={prevent}
                type="submit"
                className={`rounded-md ${
                  prevent ? "bg-secondary" : "bg-primary"
                } px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                Save
              </button>
            </div>
          </form>
          <form onSubmit={passwordFormik.handleSubmit} className="pb-10">
            <h2 className="text-lg font-semibold leading-7 text-gray-900 mb-7">
              Change Password
            </h2>
            <div className="px-5 space-y-10">
              <div className="sm:col-span-3">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Current Password
                </label>
                <div className="mt-2 relative">
                  <input
                    type="text"
                    name="currentPassword"
                    id="currentPassword"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#4FA74F] focus:border-[#4FA74F] sm:text-sm sm:leading-6"
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    value={passwordFormik.values.currentPassword}
                  />
                  {passwordFormik.errors.currentPassword &&
                  passwordFormik.touched.currentPassword ? (
                    <>
                      <i className=" absolute top-[50%] -translate-y-[50%] right-2 fa-solid fa-circle-exclamation text-red-700"></i>
                      <p className="absolute text-red-700 left-2 text-sm ">
                        {passwordFormik.errors.currentPassword}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <div className="mt-2 relative">
                  <input
                    type="text"
                    name="password"
                    id="password"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#4FA74F] focus:border-[#4FA74F] sm:text-sm sm:leading-6"
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    value={passwordFormik.values.password}
                  />
                  {passwordFormik.errors.password &&
                  passwordFormik.touched.password ? (
                    <>
                      <i className=" absolute top-[50%] -translate-y-[50%] right-2 fa-solid fa-circle-exclamation text-red-700"></i>
                      <p className="absolute text-red-700 left-2 text-sm ">
                        {passwordFormik.errors.password}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="rePassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2 relative">
                  <input
                    type="text"
                    name="rePassword"
                    id="rePassword"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#4FA74F] focus:border-[#4FA74F] sm:text-sm sm:leading-6"
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    value={passwordFormik.values.rePassword}
                  />
                  {passwordFormik.errors.rePassword &&
                  passwordFormik.touched.rePassword ? (
                    <>
                      <i className=" absolute top-[50%] -translate-y-[50%] right-2 fa-solid fa-circle-exclamation text-red-700"></i>
                      <p className="absolute text-red-700 left-2 text-sm ">
                        {passwordFormik.errors.rePassword}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
              {/* change pass btn  */}
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  disabled={prevent}
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={() => {
                    cancel(passwordFormik);
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={prevent}
                  type="submit"
                  className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
