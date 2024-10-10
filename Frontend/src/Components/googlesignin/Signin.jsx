import React, { useState, useEffect } from "react";
import { auth, provider } from "./Config";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "./Config";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Form.css";
import Admin from "../Admin.jsx";
import Home from "../Home.jsx";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;
      const userUid = result.user.uid;
      setUserEmail(userEmail);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("uid", userUid);
      navigate(
        userEmail === "cbmsanjay2004@gmail.com" ||
          userEmail === "admin@gmail.com"
          ? "/admin"
          : "/home"
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEmailPasswordAuth = async (event) => {
    event.preventDefault();
    try {
      if (isSignUp) {
        if (password !== reEnterPassword) {
          toast.error("Passwords do not match");
          return;
        }
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userEmail = result.user.email;
        const userUid = result.user.uid;
        setUserEmail(userEmail);
        localStorage.setItem("email", userEmail);
        localStorage.setItem("uid", userUid);
        toast.success("Sign Up Successful!");
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const userEmail = result.user.email;
        const userUid = result.user.uid;
        setUserEmail(userEmail);
        localStorage.setItem("email", userEmail);
        localStorage.setItem("uid", userUid);
        toast.success("Logged In Successfully!");
        setTimeout(() => {
          navigate(
            userEmail === "cbmsanjay2004@gmail.com" ||
              userEmail === "admin@gmail.com"
              ? "/admin"
              : "/home"
          );
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setUserEmail(storedEmail);
      if (
        storedEmail === "cbmsanjay2004@gmail.com" ||
        storedEmail === "admin@gmail.com"
      ) {
        navigate("/admin");
      }
    }
  }, [navigate]);

  return (
    <>
      <ToastContainer />
      {userEmail ? (
        userEmail === "cbmsanjay2004@gmail.com" ||
        userEmail === "admin@gmail.com" ? (
          <Admin />
        ) : (
          <Home />
        )
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h3 className="text-xl font-bold text-center w-full m-2">
            Shopping Cart
          </h3>
          <hr className="border-gray-300" />

          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">
              {isSignUp ? "Create Account" : "Login"}
            </h1>
            <form onSubmit={handleEmailPasswordAuth} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Id <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border rounded-lg"
                  placeholder="Enter your Email ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border rounded-lg"
                  placeholder="Enter your Password"
                />
              </div>
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Re-enter Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                    required
                    className="mt-1 p-2 w-full border rounded-lg"
                    placeholder="Re-enter your Password"
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-white hover:text-blue-600 border-blue-600 border-2"
              >
                {isSignUp ? "Sign Up" : "Login"}
              </button>
            </form>
            <div className="flex items-center justify-between mt-6">
              <div className="border-t border-gray-300 flex-grow mr-3"></div>
              <span className="text-sm text-gray-600">Or sign in with</span>
              <div className="border-t border-gray-300 flex-grow ml-3"></div>
            </div>
            <button
              onClick={handleGoogleSignIn}
              className="mt-4 w-full flex items-center justify-center bg-red-600 text-white p-2 rounded-lg hover:bg-white hover:text-red-600 border-2"
            >
              <GoogleIcon className="mr-2" />
              Sign in with Google
            </button>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="mt-4 w-full text-blue-600 hover:underline"
            >
              {isSignUp
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
