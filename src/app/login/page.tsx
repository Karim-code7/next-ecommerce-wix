"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { usePathname } from "next/navigation";
import { useState } from "react";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EAMIL_VERIFICATION = "EAMIL_VERIFICATION",
}

const LoginPage = () => {
  const wixClient = useWixClient();
  const [mode, setMode] = useState(MODE.LOGIN);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const pathName = usePathname();
  const myClass =
    "text-sm underline cursor-pointer  text-blue-600 font-semibold";
  const formtTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Your Password"
      : "Verify Your Email ";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "Verify ";

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let rsponse;

      switch (mode) {
        case MODE.LOGIN:
          rsponse = await wixClient.auth.login({
            email,
            password,
          });
          break;
      }
      switch (mode) {
        case MODE.REGISTER:
          rsponse = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          break;
      }
      switch (mode) {
        case MODE.RESET_PASSWORD:
          rsponse = await wixClient.auth.sendPasswordResetEmail(
            email,
            pathName
          );
          break;
      }
      switch (mode) {
        case MODE.EAMIL_VERIFICATION:
          rsponse = await wixClient.auth.processVerification({
            verificationCode: email,
          });
          break;
        default:
          break;
      }
      console.log("Response:", rsponse);

      switch (rsponse?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Successful You are being redirected.");
          break;

        default:
          break;
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16  xl:px-32 2xl:px-64 flex items-center justify-center">
      <form
        className="flex flex-col gap-8 w-full max-w-lg shadow-2xl p-8 rounded-md"
        onSubmit={handelSubmit}
      >
        <h1 className="text-2xl font-semibold">{formtTitle}</h1>
        {mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm">UserName</label>
            <input
              type="text"
              name="username"
              placeholder="john"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        ) : null}
        {mode !== MODE.EAMIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Verification Code</label>
            <input
              type="text"
              name="emailCode"
              placeholder="Code"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        )}
        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : null}
        {mode === MODE.LOGIN && (
          <div className={myClass} onClick={() => setMode(MODE.RESET_PASSWORD)}>
            Forgot Password
          </div>
        )}
        <button
          className="bg-lama  text-white p-2 rounded-md disabled:text-pink-200 disabled:cursor-not-allowed "
          disabled={isLoding}
        >
          {isLoding ? "Loding..." : buttonTitle}
        </button>
        {error && <div className="text-red-600"></div>}
        {mode === MODE.LOGIN && (
          <div className={myClass} onClick={() => setMode(MODE.REGISTER)}>
            {" "}
            {"Don't"} have an account
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div className={myClass} onClick={() => setMode(MODE.LOGIN)}>
            Already have an account
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div className={myClass} onClick={() => setMode(MODE.LOGIN)}>
            Go back to login
          </div>
        )}
        {message && <div className="text-green-600 text-sm">{message}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
