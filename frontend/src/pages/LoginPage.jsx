import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Key, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import {toast} from "react-hot-toast"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    toast.success("log in successfully")
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-lime-700 bg-opacity-20 rounded-2xl shadow-xl"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text">
          Welcome Back Login
        </h2>
        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Key}
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center">
            <Link
              to={"/forgot-password"}
              className="text-sm text-green-200 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p> }
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="mx-auto animate-spin" />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center rounded-bl-2xl rounded-br-2xl">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to={"/signup"} className="hover:underline text-blue-500">
            Signup
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
