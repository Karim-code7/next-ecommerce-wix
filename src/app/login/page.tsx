"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EAMIL_VERIFICATION = "EAMIL_VERIFICATION",
}

const LoginPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();

  console.log(isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);
  const myClass =
    "text-sm underline cursor-pointer  text-blue-600 font-semibold";

  const [mode, setMode] = useState(MODE.LOGIN);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const pathName = usePathname();
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
      let response;

      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;

        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          break;

        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            pathName
          );
          setMessage("The code has been sent");
          break;

        case MODE.EAMIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: email,
          });
          break;
        default:
          break;
      }
      console.log("Response:", response);

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Successful You are being redirected.");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken
          );
          wixClient.auth.setTokens(tokens);
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          router.push("/");
          break;

        case LoginState.FAILURE:
          if (response.errorCode === "invalidEmail") {
            setMessage("Invalid email address");
          } else if (response.errorCode === "invalidPassword") {
            setMessage("Invalid password");
          } else if (response.errorCode === "emailAlreadyExists") {
            setMessage("Email already exists");
          } else if (response.errorCode === "resetPassword") {
            setMessage("You need to reset your password");
          } else {
            setMessage("Somthing went wrong");
          }
          break;

        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EAMIL_VERIFICATION);
          break;

        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending approval");
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
              autoComplete="username"
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
              autoComplete="email"
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
              autoComplete="current-password"
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
        {message && (
          <div
            className={`text-sm ${
              message === "Successful You are being redirected."
                ? "text-green-600"
                : " text-red-600"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
