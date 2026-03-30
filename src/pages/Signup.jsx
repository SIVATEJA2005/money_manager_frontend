import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { validateEmail } from "../util/ValidateEmail.js";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/ApiEndPoints.js";
import { Loader } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../util/uploadProfileImage.js";

const Signup = () =>
{
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    let profileImageUrl="";
    e.preventDefault();
    if (!fullName.trim()) {
      setError("please enter full name.");
      setLoading(false);
      return;
    }
    if(!email.trim() || !validateEmail(email)) {
      setError("please enter email.");
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("please enter password.");
      setLoading(false);
      return;
    }

    setError("");

    try {

      if(profilePhoto)
      {
        const imageUrl=await uploadProfileImage(profilePhoto);
        profileImageUrl=imageUrl || "";
      }


      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        name:fullName,
        email,
        password,
        imageUrl:profileImageUrl
      });

      if (response.status === 201) {

        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log("something went wrong", error);

      toast.error("Registration failed. Please try again.");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <img
            src={assets.backgroundimage}
            alt="background"
            className="absolute inset-0 w-full h-full object-cover blur-sm"
        />

        <div className="relative z-10 w-full max-w-lg px-6">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-semibold text-black text-center mb-2">
              Create An Account
            </h3>

            <p className="text-sm text-slate-700 text-center mb-8">
              Start tracking your spendings by joining with us.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>

              <div className="flex justify-center mb-6">
                <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto}/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    label="Full Name"
                    placeholder="Enter Full Name"
                    type="text"
                />

                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email Address"
                    placeholder="name@example.com"
                    type="email"
                />

                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    placeholder="********"
                    type="password"
                />
              </div>

              {error && (
                  <p className="text-red-700 text-sm text-center bg-red-100 p-2 rounded">
                    {error}
                  </p>
              )}

              <button
                  disabled={loading}
                  className={`bg-purple-500 w-full py-3 text-lg font-medium hover:bg-purple-600 transition flex items-center justify-center gap-2 ${
                      loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  type="submit"
              >
                {loading ? (
                    <>
                      <Loader className="animate-spin w-5 h-5" />
                      Signing Up....
                    </>
                ) : (
                    "Sign Up"
                )}
              </button>

              <p className="text-sm text-slate-800 text-center mt-6">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="font-medium text-purple-600 underline hover:text-purple-950"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Signup;
