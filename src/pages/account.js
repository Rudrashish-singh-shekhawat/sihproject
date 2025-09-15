import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import Micon from "../source/menicon.jpg";


const auth = getAuth(app);
const firestore = getFirestore(app);

export default function Account() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch Firestore data for this user
        const ref = doc(firestore, "User", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUserData(snap.data());
        } else {
          console.warn("No user document found in Firestore");
        }
      } else {
        navigate("/login"); // if not logged in → go login
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        Loading account...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        No account data found.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md text-center text-white">
        <h2 className="text-3xl font-bold mb-6">My Account</h2>

       
          <img
            src={Micon}
            alt="profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md"
          />
        

        <p className="text-xl font-semibold mb-2">{userData.name}</p>
        <p className="text-gray-400 mb-4">{userData.email}</p>

        
        <button
          onClick={() => auth.signOut().then(() => navigate("/login"))}
          className="mt-6 w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
