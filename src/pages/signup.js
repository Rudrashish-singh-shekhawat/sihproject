import React, { useState } from "react";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {app} from "../firebase";
import { Eye, EyeOff } from "lucide-react"; // install lucide-react if not already
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, collection, setDoc,doc } from "firebase/firestore";

const firestore = getFirestore(app)
const auth = getAuth(app)

export default function Signup(){
    //taking input from user
    const [uname, setName] = useState("");
    const [email,setEmail] =  useState("");
    const [password,setPassword] =  useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


//authantication of user and resitation 
const creatingUser = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Check your Again!! Passwords do not match!");
      return;
    }
    try {
        setLoading(true);
        setError("");

      // create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
        //adding data 
      
    await setDoc(doc(firestore,"User", user.uid),{
      uid: user.uid,
      name: uname,
      email: email,
      password: password,
    },{ merge: true });
      navigate("/"); // redirect after signup
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
      setError("This email is already registered. Please log in.");
    } else if (err.code === "auth/invalid-email") {
      setError("Invalid email format.");
    } else if (err.code === "auth/weak-password") {
      setError("Password should be at least 6 characters.");
    } else {
      setError(err.message); // fallback
    }
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

  return (
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
          Create Account
        </h2>
        <p className="text-gray-400 text-center mb-8">Sign up to get started</p>

        {/* Form */}
        <form className="space-y-5" onSubmit={creatingUser}>
          {/* Name */}
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
               onChange={(e)=>setName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

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
              className="w-full px-4 py-2 rounded-xl bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
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
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-2 pr-10 rounded-xl bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
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

          {/* Confirm Password */}
          <div className="relative">
            <label
              className="block text-gray-300 mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              id="confirm-password"
              placeholder="Re-enter your password"
              onChange={(e)=>setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-xl bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="button"
              onClick={async () => {
                    setShowConfirm(!showConfirm);}}
              className="absolute right-3 top-10.5 text-gray-400 hover:text-gray-200"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold transition-all duration-300"
             disabled={loading}
          >
           {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-600"></div>
          <p className="px-3 text-gray-400 text-sm">or</p>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        {/* Social Signup */}
        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300">
          Sign up with Google
        </button>

        {/* Login Link */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-green-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
