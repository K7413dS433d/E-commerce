import { useFormik } from "formik";
import * as yup from "yup";
import sendEmail from "../../Lib/email";
import { useState } from "react";
import toast from "react-hot-toast";

function ContactUs() {
  const [isSending, setIsSending] = useState(false);

  const validate = yup.object().shape({
    name: yup.string().required("Name is Required").min(3, "Name is too short"),
    email: yup.string().email().required("Email is Required"),
    phone: yup
      .string()
      .required("Number is required")
      .matches(/^01[1250][0-9]{8}$/, "Enter Egyptian number"),
    message: yup
      .string()
      .required("Message is Required")
      .min(5, "Message is too short"),
  });

  async function sendEmailHandler(values) {
    setIsSending(true);
    try {
      await sendEmail(values.name, values.message, values.email);
      toast.success("Email sent successfully");
    } catch (error) {
      toast.error("Failed to send email");
    }
    setIsSending(false);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: validate,
    onSubmit: sendEmailHandler,
  });

  return (
    <section className="bg-white py-20  lg:py-[80px] overflow-hidden relative z-10">
      <div className="container m-auto">
        <span className="ml-5 block mb-8 text-base text-primary font-semibold">
          Contact Us
        </span>
        <div className="flex flex-wrap lg:justify-between -mx-4">
          <div className="w-full lg:w-1/2 xl:w-6/12 px-4">
            <div className="px-5 md:px-10 max-w-[570px] mb-12 lg:mb-0">
              <h2
                className="
            text-dark
            mb-6
            uppercase
            font-bold
            text-[28px]
            sm:text-[40px]
            lg:text-[36px]
            xl:text-[40px]
            "
              >
                GET IN TOUCH WITH US
              </h2>
              <p className="text-base text-body-color leading-relaxed mb-9 opacity-80">
                If you have any questions, concerns, or feedback, feel free to
                get in touch with us. Our team is dedicated to providing you
                with the best shopping experience and is ready to assist you
                with anything you need. Whether you&lsquo;re looking for product
                information, have inquiries about your order, or need help with
                returns, we&lsquo;re here to help!
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 xl:w-5/12 px-4">
            <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-6 relative">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="
                  w-full
                  rounded
                  py-3
                  px-[14px]
                  text-body-color text-base
                  outline-none
                  focus:ring-primary
                  focus:border-primary
                  "
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <>
                      <i className=" absolute top-[35%] -translate-y-[50%] right-2 fa-solid fa-circle-exclamation text-red-700"></i>
                      <p className=" text-red-700 pl-2 text-sm ">
                        {formik.errors.name}
                      </p>
                    </>
                  ) : null}
                </div>
                <div className="mb-6 relative">
                  <input
                    type="text"
                    placeholder="Your Email"
                    className="
                  w-full
                  rounded
                  py-3
                  px-[14px]
                  text-body-color text-base
                  outline-none
                  focus:ring-primary focus:border-primary
                  "
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <>
                      <i className=" absolute top-[35%] -translate-y-[50%] right-2 fa-solid fa-circle-exclamation text-red-700"></i>
                      <p className=" text-red-700 pl-2 text-sm ">
                        {formik.errors.email}
                      </p>
                    </>
                  ) : null}
                </div>
                <div className="mb-6 relative">
                  <input
                    type="text"
                    placeholder="Your Phone"
                    className="
                  w-full
                  rounded
                  py-3
                  px-[14px]
                  text-body-color text-base
                  outline-none
                  focus:ring-primary focus:border-primary
                  "
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <>
                      <i className=" absolute top-[35%] -translate-y-[50%] right-2 fa-solid fa-circle-exclamation text-red-700"></i>
                      <p className=" text-red-700 pl-2 text-sm ">
                        {formik.errors.phone}
                      </p>
                    </>
                  ) : null}
                </div>
                <div className="mb-6 relative">
                  <textarea
                    rows={6}
                    placeholder="Your Message"
                    className="
                  w-full
                  rounded
                  py-3
                  px-[14px]
                  text-body-color text-base
                  resize-none
                  outline-none
                  focus:ring-primary focus:border-primary
                  "
                    name="message"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                  />
                  {formik.errors.message && formik.touched.message ? (
                    <>
                      <p className=" text-red-700 pl-2 text-sm ">
                        {formik.errors.message}
                      </p>
                    </>
                  ) : null}
                </div>
                <div>
                  <button
                    type="submit"
                    className="
                  w-full
                  text-white
                  bg-primary
                  rounded
                  border border-primary
                  px-3
                  h-12
                  transition
                  hover:bg-secondary
                  duration-500
                  "
                  >
                    {isSending ? (
                      <i className="fa-solid fa-circle-notch fa-spin"></i>
                    ) : (
                      <>Send Message</>
                    )}
                  </button>
                </div>
              </form>
              <div>
                <span className="absolute -top-10 -right-9 z-[-1]">
                  <svg
                    width={100}
                    height={100}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                      fill="#4FA74F"
                    />
                  </svg>
                </span>
                <span className="absolute -right-10 top-[90px] z-[-1]">
                  <svg
                    width={34}
                    height={134}
                    viewBox="0 0 34 134"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="31.9993"
                      cy={132}
                      r="1.66667"
                      transform="rotate(180 31.9993 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 31.9993 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 31.9993 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy={88}
                      r="1.66667"
                      transform="rotate(180 31.9993 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 31.9993 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy={45}
                      r="1.66667"
                      transform="rotate(180 31.9993 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy={16}
                      r="1.66667"
                      transform="rotate(180 31.9993 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy={59}
                      r="1.66667"
                      transform="rotate(180 31.9993 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 31.9993 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 31.9993 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy={132}
                      r="1.66667"
                      transform="rotate(180 17.3333 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 17.3333 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 17.3333 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy={88}
                      r="1.66667"
                      transform="rotate(180 17.3333 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 17.3333 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy={45}
                      r="1.66667"
                      transform="rotate(180 17.3333 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy={16}
                      r="1.66667"
                      transform="rotate(180 17.3333 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy={59}
                      r="1.66667"
                      transform="rotate(180 17.3333 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 17.3333 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 17.3333 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy={132}
                      r="1.66667"
                      transform="rotate(180 2.66536 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 2.66536 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 2.66536 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy={88}
                      r="1.66667"
                      transform="rotate(180 2.66536 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 2.66536 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy={45}
                      r="1.66667"
                      transform="rotate(180 2.66536 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy={16}
                      r="1.66667"
                      transform="rotate(180 2.66536 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy={59}
                      r="1.66667"
                      transform="rotate(180 2.66536 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 2.66536 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 2.66536 1.66665)"
                      fill="#13C296"
                    />
                  </svg>
                </span>
                <span className="absolute -left-7 -bottom-7 z-[-1]">
                  <svg
                    width={107}
                    height={134}
                    viewBox="0 0 107 134"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="104.999"
                      cy={132}
                      r="1.66667"
                      transform="rotate(180 104.999 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 104.999 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 104.999 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy={88}
                      r="1.66667"
                      transform="rotate(180 104.999 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 104.999 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy={45}
                      r="1.66667"
                      transform="rotate(180 104.999 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy={16}
                      r="1.66667"
                      transform="rotate(180 104.999 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy={59}
                      r="1.66667"
                      transform="rotate(180 104.999 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 104.999 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 104.999 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy={132}
                      r="1.66667"
                      transform="rotate(180 90.3333 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 90.3333 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 90.3333 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy={88}
                      r="1.66667"
                      transform="rotate(180 90.3333 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 90.3333 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy={45}
                      r="1.66667"
                      transform="rotate(180 90.3333 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy={16}
                      r="1.66667"
                      transform="rotate(180 90.3333 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy={59}
                      r="1.66667"
                      transform="rotate(180 90.3333 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 90.3333 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 90.3333 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy={132}
                      r="1.66667"
                      transform="rotate(180 75.6654 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy={132}
                      r="1.66667"
                      transform="rotate(180 31.9993 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 75.6654 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 31.9993 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 75.6654 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 31.9993 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy={88}
                      r="1.66667"
                      transform="rotate(180 75.6654 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy={88}
                      r="1.66667"
                      transform="rotate(180 31.9993 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 75.6654 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 31.9993 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy={45}
                      r="1.66667"
                      transform="rotate(180 75.6654 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy={45}
                      r="1.66667"
                      transform="rotate(180 31.9993 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy={16}
                      r="1.66667"
                      transform="rotate(180 75.6654 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy={16}
                      r="1.66667"
                      transform="rotate(180 31.9993 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy={59}
                      r="1.66667"
                      transform="rotate(180 75.6654 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy={59}
                      r="1.66667"
                      transform="rotate(180 31.9993 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 75.6654 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 31.9993 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 75.6654 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 31.9993 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy={132}
                      r="1.66667"
                      transform="rotate(180 60.9993 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy={132}
                      r="1.66667"
                      transform="rotate(180 17.3333 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 60.9993 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 17.3333 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 60.9993 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 17.3333 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy={88}
                      r="1.66667"
                      transform="rotate(180 60.9993 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy={88}
                      r="1.66667"
                      transform="rotate(180 17.3333 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 60.9993 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 17.3333 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy={45}
                      r="1.66667"
                      transform="rotate(180 60.9993 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy={45}
                      r="1.66667"
                      transform="rotate(180 17.3333 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy={16}
                      r="1.66667"
                      transform="rotate(180 60.9993 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy={16}
                      r="1.66667"
                      transform="rotate(180 17.3333 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy={59}
                      r="1.66667"
                      transform="rotate(180 60.9993 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy={59}
                      r="1.66667"
                      transform="rotate(180 17.3333 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 60.9993 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 17.3333 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 60.9993 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 17.3333 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy={132}
                      r="1.66667"
                      transform="rotate(180 46.3333 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy={132}
                      r="1.66667"
                      transform="rotate(180 2.66536 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 46.3333 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 2.66536 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 46.3333 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 2.66536 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy={88}
                      r="1.66667"
                      transform="rotate(180 46.3333 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy={88}
                      r="1.66667"
                      transform="rotate(180 2.66536 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 46.3333 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 2.66536 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy={45}
                      r="1.66667"
                      transform="rotate(180 46.3333 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy={45}
                      r="1.66667"
                      transform="rotate(180 2.66536 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy={16}
                      r="1.66667"
                      transform="rotate(180 46.3333 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy={16}
                      r="1.66667"
                      transform="rotate(180 2.66536 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy={59}
                      r="1.66667"
                      transform="rotate(180 46.3333 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy={59}
                      r="1.66667"
                      transform="rotate(180 2.66536 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 46.3333 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 2.66536 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 46.3333 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 2.66536 1.66665)"
                      fill="#13C296"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
