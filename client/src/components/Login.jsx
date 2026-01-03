import React, { useState } from "react";

const Login = ({ setShowLogin }) => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "login") {
      console.log("Logging in:", { email, password });
    } else {
      console.log("Registering:", { name, email, password });
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 items-start p-8 py-12 w-80 sm:w-[352px] text-gray-600 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-blue-600">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              type="text"
              placeholder="Type here"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 mt-1 outline-blue-600"
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            placeholder="Type here"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded w-full p-2 mt-1 outline-blue-600"
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            placeholder="Type here"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded w-full p-2 mt-1 outline-blue-600"
          />
        </div>

        {state === "register" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-blue-600 cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-blue-600 cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-all text-white w-full py-2 rounded-md"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
