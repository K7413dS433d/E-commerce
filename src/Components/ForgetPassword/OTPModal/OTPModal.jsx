import { useRef, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OTPForm({ email, sendEmail }) {
  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const navigator = useNavigate();
  // Create references for each input
  const inputRefs = useRef([]);

  // Function to handle input change and move focus to the next input
  const handleInputChange = (e, index) => {
    const { value } = e.target;

    // If a character is entered and it's not the last input, move to the next input
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // If the value is removed (backspace), move focus to the previous input
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  async function reSend() {
    setLoading(true);
    await sendEmail({ email });
    setLoading(false);
  }

  // Mask the email address
  function maskEmail(email) {
    const [localPart, domain] = email.split("@"); // Split the email into local part and domain
    const maskedLocalPart =
      localPart.slice(0, 2) + "*".repeat(localPart.length - 2); // Mask the local part except the first two characters
    return `${maskedLocalPart}@${domain}`; // Concatenate the masked local part with the domain
  }

  async function sendOTP(otp) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: otp }
      );
      toast.success(data.status, { id: "otp" });
      navigator("/forgetPassword/resetPassword");
    } catch (error) {
      toast.error(error.response.data.message, { id: "otp" });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const otp = inputRefs.current.map((ref) => ref.value).join("");
    if (otp.length < 6) {
      toast.error("Please enter a valid CODE", { id: "otp" });
    } else {
      setSendLoading(true);
      await sendOTP(otp);
      setSendLoading(false);
    }
  }

  return (
    <motion.div className="  absolute left-1/2 -translate-x-1/2 max-w-md mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <div className="flex flex-col items-center justify-center text-center space-y-2 mb-8">
        <div className="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email {maskEmail(email)}</p>
        </div>
      </div>
      <form>
        <div className="flex flex-col space-y-10 ">
          <div className="  flex flex-row items-center gap-2 mx-auto w-full max-w-xs">
            {[...Array(6)].map((_, index) => (
              <div className="w-12 h-12" key={index}>
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  maxLength="1"
                  required
                  className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-primary focus:border-primary"
                  type="text"
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-5">
            <div>
              <button
                disabled={sendLoading}
                onClick={handleSubmit}
                type="submit"
                className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none h-10 bg-primary hover:bg-secondary duration-300 border-none text-white text-sm shadow-sm"
              >
                {sendLoading ? (
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                ) : (
                  <>Verify Account</>
                )}
              </button>
            </div>
            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
              <p>Didn’t receive the code?</p>
              <button
                disabled={loading}
                onClick={reSend}
                className="flex flex-row items-center text-primary cursor-pointer"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{
                        opacity: [0.3, 1, 0.3], // Animates from invisible to visible, and back to invisible
                      }}
                      transition={{
                        duration: 1.5, // Duration of one animation cycle
                        repeat: Infinity, // Repeats infinitely
                        ease: "easeInOut", // Easing function for smooth animation
                      }}
                      className="flex items-center"
                    >
                      Sending
                      <div className="flex justify-center items-center mt-2 ">
                        <div className="flex flex-row gap-[.2rem]">
                          <div className="w-1 h-1 rounded-full bg-primary animate-bounce" />
                          <div className="w-1 h-1 rounded-full bg-primary animate-bounce [animation-delay:-.3s]" />
                          <div className="w-1 h-1 rounded-full bg-primary animate-bounce [animation-delay:-.5s]" />
                        </div>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <>Resend</>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

export default OTPForm;
