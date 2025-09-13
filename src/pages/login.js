import React, { useState } from "react";
import {getAuth, signInWithEmailAndPassword, signInWithEmailAndPasswordUserWithEmailAndPassword} from 'firebase/auth';
import {app} from "../firebase";
import { Eye, EyeOff } from "lucide-react"; // install lucide-react if not already
import { Link, useNavigate } from "react-router-dom";

const auth = getAuth(app)

function Login() {
  //taking input from user
      const [email,setEmail] =  useState("");
      const [password,setPassword] =  useState("");
      const [error, setError] = useState("");
//authantication of user and login 
const loginUser = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect after login
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
      setError("This email is not registered please signup first");
    }else if(err.code === "auth/too-many-requests"){
      setError("Invalid password Please try again");
    }else {
      setError(err.message); // fallback
    }
    }
  };

  const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="relative bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
          
          {/* X Button */}
          <button
            onClick={() => navigate('/')} // go back to previous page
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold transition-colors"
          >
            &times;
          </button>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Please sign in to your account
          </p>

          {/* Form */}
          <form className="space-y-5" onSubmit={loginUser}>
            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-300 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
               <button
                 type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10.5 text-gray-400 hover:text-gray-200"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between text-sm text-gray-400">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Remember me</span>
              </label>
              <a href="#" className="hover:underline hover:text-blue-400">
                Forgot password?
              </a>
            </div>
            
          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <p className="px-3 text-gray-400 text-sm">or</p>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Social Login */}
          <button className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-semibold transition-all duration-300">
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-gray-400 text-sm text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
