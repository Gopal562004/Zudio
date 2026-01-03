// import React, { useState } from "react";
// import { forgotPassword, resetPassword } from "../../mongo/authServices"; // import your API functions
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify"; // import Toastify
// import "react-toastify/dist/ReactToastify.css"; // import styles

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirmation
//   const [passwordsMatch, setPasswordsMatch] = useState(true); // State to check if passwords match
//   const [loading, setLoading] = useState(false); // to show loading state during API calls
//   const [error, setError] = useState(""); // to show error message if something goes wrong
//   const [passwordError, setPasswordError] = useState(""); // to show password validation error

//   const navigate = useNavigate();

//   // Password validation function
//   const validatePassword = (password) => {
//     const passwordPattern =
//       /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordPattern.test(password);
//   };

//   const handleSendOtp = async () => {
//     try {
//       setLoading(true);
//       await forgotPassword(email); // API call to send OTP
//       setOtpSent(true);
//       setLoading(false);
//       toast.success("OTP sent successfully!"); // Toastify success message
//     } catch (err) {
//       setLoading(false);
//       setError("Error sending OTP. Please try again.");
//       toast.error("Error sending OTP. Please try again."); // Toastify error message
//     }
//   };

//   const handleResetPassword = async () => {
//     if (newPassword === confirmPassword) {
//       if (validatePassword(newPassword)) {
//         try {
//           setLoading(true);
//           await resetPassword({ email, otp, newPassword }); // API call to reset password
//           console.log("Password reset successfully!");
//           setLoading(false);
//           toast.success("Password reset successfully!"); // Toastify success message
//           setTimeout(() => {
//             navigate("/auth/login");
//           }, 2000);
          
//         } catch (err) {
//           setLoading(false);
//           setError("Error resetting password. Please try again.");
//           toast.error("Error resetting password. Please try again."); // Toastify error message
//         }
//       } else {
//         setPasswordError(
//           "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
//         );
//         toast.error("Invalid password format."); // Toastify error message
//       }
//     } else {
//       setPasswordsMatch(false); // Set to false if passwords don't match
//       toast.error("Passwords do not match."); // Toastify error message
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-50">
//       <div className="bg-white rounded-lg shadow-lg w-96 p-6">
//         <h2 className="text-center text-xl font-semibold mb-4 text-black">
//           Forgot Password
//         </h2>
//         <div className="border-t-2 border-black mx-auto w-20 mb-6"></div>

//         {!otpSent ? (
//           <form>
//             <div className="mb-4">
//               <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                 <span className="px-3 text-gray-500">
//                   <i className="fas fa-envelope"></i>
//                 </span>
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="flex-grow py-2 px-4 text-sm outline-none bg-transparent"
//                 />
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={handleSendOtp}
//               className="w-full bg-black text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
//               disabled={loading} // disable while loading
//             >
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </button>
//             {error && (
//               <p className="text-red-500 text-sm text-center">{error}</p>
//             )}
//           </form>
//         ) : (
//           <form>
//             <div className="mb-4">
//               <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                 <span className="px-3 text-gray-500">
//                   <i className="fas fa-lock"></i>
//                 </span>
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="flex-grow py-2 px-4 text-sm outline-none bg-transparent"
//                 />
//               </div>
//             </div>

//             <div className="mb-4">
//               <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                 <span className="px-3 text-gray-500">
//                   <i className="fas fa-key"></i>
//                 </span>
//                 <input
//                   type="password"
//                   placeholder="Enter New Password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   className="flex-grow py-2 px-4 text-sm outline-none bg-transparent"
//                 />
//               </div>
//             </div>

//             <div className="mb-4">
//               <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                 <span className="px-3 text-gray-500">
//                   <i className="fas fa-key"></i>
//                 </span>
//                 <input
//                   type="password"
//                   placeholder="Confirm New Password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="flex-grow py-2 px-4 text-sm outline-none bg-transparent"
//                 />
//               </div>
//             </div>

//             {!passwordsMatch && (
//               <p className="text-red-500 text-sm text-center">
//                 Passwords do not match.
//               </p>
//             )}

//             {passwordError && (
//               <p className="text-red-500 text-sm text-center">
//                 {passwordError}
//               </p>
//             )}

//             <button
//               type="button"
//               onClick={handleResetPassword}
//               className="w-full bg-black text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
//               disabled={loading} // disable while loading
//             >
//               {loading ? "Resetting..." : "Reset Password"}
//             </button>

//             <div className="text-center mt-4">
//               <button
//                 type="button"
//                 onClick={() => setOtpSent(false)}
//                 className="text-sm text-gray-500 hover:text-black transition"
//               >
//                 Resend OTP
//               </button>
//             </div>
//           </form>
//         )}

//         {/* Link to Login page */}
//         <div className="text-center mt-4">
//           <button
//             onClick={() => navigate("/auth/login")}
//             className="text-sm text-gray-500 hover:text-black transition"
//           >
//             Back to Login
//           </button>
//         </div>
//       </div>
//       {/* Toast Container */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default ForgotPassword;
import React, { useState, useEffect } from "react";
import { forgotPassword, resetPassword } from "../../mongo/authServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Mail,
  Lock,
  Key,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  Smartphone,
} from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await forgotPassword(email);
      setLoading(false);
      setStep(2);
      setCountdown(60);
      toast.success("OTP sent to your email!");
    } catch (err) {
      setLoading(false);
      toast.error("Error sending OTP. Please try again.");
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerifyOtp = () => {
    if (!otp.includes("") && otp.join("").length === 6) {
      setStep(3);
    } else {
      toast.error("Please enter a valid 6-digit OTP");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(newPassword)) {
      toast.error(
        "Password must contain uppercase, lowercase, number, special character, and be at least 8 characters"
      );
      return;
    }

    try {
      setLoading(true);
      await resetPassword({ email, otp: otp.join(""), newPassword });
      setLoading(false);
      toast.success("Password reset successfully!");
      setTimeout(() => navigate("/auth/login"), 1500);
    } catch (err) {
      setLoading(false);
      toast.error("Error resetting password. Please verify OTP and try again.");
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;

    try {
      setLoading(true);
      await forgotPassword(email);
      setLoading(false);
      setCountdown(60);
      toast.success("New OTP sent!");
    } catch (err) {
      setLoading(false);
      toast.error("Error resending OTP");
    }
  };

  const stages = [
    { number: 1, icon: Mail, active: step >= 1 },
    { number: 2, icon: Smartphone, active: step >= 2 },
    { number: 3, icon: Lock, active: step >= 3 },
  ];

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="text-center p-6 pb-4">
        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center shadow-sm">
          <Key className="text-white" size={22} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Reset Password</h2>
        <p className="text-xs text-gray-500 mt-1">
          {step === 1 && "Enter your email to receive OTP"}
          {step === 2 && "Enter the OTP sent to your email"}
          {step === 3 && "Create your new password"}
        </p>
      </div>

      {/* Stage Indicators */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between relative">
          {/* Connection line */}
          <div className="absolute top-4 left-8 right-8 h-0.5 bg-gray-300"></div>
          <div
            className="absolute top-4 left-8 h-0.5 bg-black transition-all duration-300"
            style={{ width: `${(step - 1) * 50}%` }}
          ></div>

          {stages.map((stage) => {
            const Icon = stage.icon;
            const isActive = stage.active;
            const isCurrent = step === stage.number;

            return (
              <div
                key={stage.number}
                className="flex flex-col items-center relative"
              >
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center mb-1
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-br from-black to-gray-800 text-white"
                      : "bg-gray-100 text-gray-400"
                  }
                  ${isCurrent ? "ring-2 ring-offset-1 ring-gray-300" : ""}
                `}
                >
                  {isActive && step > stage.number ? (
                    <CheckCircle size={14} />
                  ) : (
                    <Icon size={14} />
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  Step {stage.number}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="px-6 pb-6">
        {/* Step 1: Email Input */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={16}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg outline-none bg-gray-50 focus:border-gray-400 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleSendOtp}
              disabled={loading || !email}
              className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-2.5 rounded-lg text-sm font-medium hover:from-black hover:to-gray-900 transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          </div>
        )}

        {/* Step 2: OTP Input */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Enter the 6-digit code sent to{" "}
                <span className="font-medium">{email}</span>
              </p>
              <div className="flex justify-center gap-2 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-10 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg outline-none bg-gray-50 focus:border-gray-400 focus:bg-white transition-colors"
                    onFocus={(e) => e.target.select()}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={otp.includes("")}
              className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-2.5 rounded-lg text-sm font-medium hover:from-black hover:to-gray-900 transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify OTP
            </button>

            <div className="text-center">
              <button
                onClick={handleResendOtp}
                disabled={countdown > 0 || loading}
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center gap-1"
              >
                <RefreshCw
                  size={12}
                  className={loading ? "animate-spin" : ""}
                />
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={16}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg outline-none bg-gray-50 focus:border-gray-400 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={16}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg outline-none transition-colors
                    ${
                      confirmPassword && newPassword !== confirmPassword
                        ? "border-red-300 bg-red-50/50"
                        : "border-gray-300 bg-gray-50 focus:border-gray-400 focus:bg-white"
                    }`}
                />
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <button
              onClick={handleResetPassword}
              disabled={
                loading ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
              }
              className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-2.5 rounded-lg text-sm font-medium hover:from-black hover:to-gray-900 transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        )}

        {/* Back to Login Link */}
        <div className="mt-6 pt-5 border-t border-gray-100">
          <button
            onClick={() => navigate("/auth/login")}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center gap-1 w-full justify-center"
          >
            <ArrowLeft size={12} />
            Back to Login
          </button>
        </div>
      </div>

      {/* Security Note */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100/80 rounded-lg border border-gray-200 p-3">
          <p className="text-xs text-gray-600 text-center">
            🔒 Your information is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
