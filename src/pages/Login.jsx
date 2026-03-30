import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import assets from "../assets/assets";
import Input from "../components/Input";
import { validateEmail } from "../util/ValidateEmail.js";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/ApiEndPoints.js";
import AppContext from "../Context/AppContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Login must be used inside AppProvider");
  }
  const { setUser } = context;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    if (!email.trim() || !validateEmail(email)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter password.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError(
          err?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        <img
            src={assets.backgroundimage}
            alt="background"
            className="absolute inset-0 w-full h-full object-cover blur-sm"
        />

        <div className="relative z-10 w-full max-w-md px-6">
          <div className="bg-white bg-opacity-95 rounded-lg shadow-2xl p-8">
            <h3 className="text-2xl font-semibold text-black text-center mb-2">
              Login
            </h3>

            <p className="text-sm text-slate-700 text-center mb-8">
              Welcome back! Please login to your account.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                  label="Password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                  <p className="text-red-700 text-sm text-center bg-red-100 p-2 rounded">
                    {error}
                  </p>
              )}

              <button
                  type="submit"
                  disabled={loading}
                  className="bg-purple-500 w-full py-3 text-lg font-medium text-white rounded
                         hover:bg-purple-600 transition
                         disabled:opacity-60 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
              >
                {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Logging in...
                    </>
                ) : (
                    "LOGIN"
                )}
              </button>

              <p className="text-sm text-slate-800 text-center mt-6">
                Don’t have an account?{" "}
                <Link
                    to="/signup"
                    className="font-medium text-purple-600 underline hover:text-purple-700"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;
