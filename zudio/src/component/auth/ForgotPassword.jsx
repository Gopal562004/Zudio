import React, { useState } from "react";
import { forgotPassword, resetPassword } from "../../mongo/authServices"; // import your API functions
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // import Toastify
import "react-toastify/dist/ReactToastify.css"; // import styles

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirmation
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to check if passwords match
  const [loading, setLoading] = useState(false); // to show loading state during API calls
  const [error, setError] = useState(""); // to show error message if something goes wrong
  const [passwordError, setPasswordError] = useState(""); // to show password validation error

  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await forgotPassword(email); // API call to send OTP
      setOtpSent(true);
      setLoading(false);
      toast.success("OTP sent successfully!"); // Toastify success message
    } catch (err) {
      setLoading(false);
      setError("Error sending OTP. Please try again.");
      toast.error("Error sending OTP. Please try again."); // Toastify error message
    }
  };

  const handleResetPassword = async () => {
    if (newPassword === confirmPassword) {
      if (validatePassword(newPassword)) {
        try {
          setLoading(true);
          await resetPassword({ email, otp, newPassword }); // API call to reset password
          console.log("Password reset successfully!");
          setLoading(false);
          toast.success("Password reset successfully!"); // Toastify success message
           setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
        } catch (err) {
          setLoading(false);
          setError("Error resetting password. Please try again.");
          toast.error("Error resetting password. Please try again."); // Toastify error message
        }
      } else {
        setPasswordError(
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        toast.error("Invalid password format."); // Toastify error message
      }
    } else {
      setPasswordsMatch(false); // Set to false if passwords don't match
      toast.error("Passwords do not match."); // Toastify error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-center text-xl font-semibold mb-4 text-black">
          Forgot Password
        </h2>
        <div className="border-t-2 border-black mx-auto w-20 mb-6"></div>

        {!otpSent ? (
          <form>
            <div className="mb-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <span className="px-3 text-gray-500">
                  <i className="fas fa-envelope"></i>
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow py-2 px-4 text-sm outline-none bg-transparent"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full bg-black text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
              disabled={loading} // disable while loading
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </form>
        ) : (
          <form>
            <div className="mb-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <span className="px-3 text-gray-500">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="flex-grow py-2 px-4 text-sm outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <span className="px-3 text-gray-500">
                  <i className="fas fa-key"></i>
                </span>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="flex-grow py-2 px-4 text-sm outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <span className="px-3 text-gray-500">
                  <i className="fas fa-key"></i>
                </span>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="flex-grow py-2 px-4 text-sm outline-none bg-transparent"
                />
              </div>
            </div>

            {!passwordsMatch && (
              <p className="text-red-500 text-sm text-center">
                Passwords do not match.
              </p>
            )}

            {passwordError && (
              <p className="text-red-500 text-sm text-center">
                {passwordError}
              </p>
            )}

            <button
              type="button"
              onClick={handleResetPassword}
              className="w-full bg-black text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
              disabled={loading} // disable while loading
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="text-sm text-gray-500 hover:text-black transition"
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}

        {/* Link to Login page */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/auth/login")}
            className="text-sm text-gray-500 hover:text-black transition"
          >
            Back to Login
          </button>
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
