"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { useRouter } from "next/navigation";
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

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, []);

  const myClass =
    "text-sm underline cursor-pointer text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition";

  const [mode, setMode] = useState(MODE.LOGIN);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  useEffect(() => {
    setMessage("");
  }, [mode]);

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
    if (isLoding) return;
    setIsLoading(true);
    setError("");

    try {
      let response;

      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({ email, password });
          setCooldown(0);
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          setCooldown(0);
          break;
        case MODE.RESET_PASSWORD:
          try {
            const redirectUrl = `${window.location.origin}/reset-password`;
            response = await wixClient.auth.sendPasswordResetEmail(
              email,
              redirectUrl
            );
            setMessage("The reset link has been sent to your email");
          } catch (err) {
            setMessage(
              `Too many attempts. Please try again after ${cooldown} minute`
            );
            setCooldown(60);
            console.error("Error sending reset email:", err);
          }
          break;
        case MODE.EAMIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: email,
          });
          break;
      }

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
          setMessage("Something went wrong, please check your credentials.");
          break;

        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EAMIL_VERIFICATION);
          break;

        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending approval");
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
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center ">
      {message === "The reset link has been sent to your email" ? (
        <div className="text-center bg-white dark:bg-slate-900 shadow-xl rounded-xl p-8">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            ✅ Check your email
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            We’ve sent a reset link to{" "}
            <span className="font-bold">{email}</span>. Please check your inbox.
          </p>
          <button
            onClick={() => setMode(MODE.LOGIN)}
            className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            Back to Login
          </button>
        </div>
      ) : (
        <form
          className="flex flex-col gap-6 w-full max-w-lg bg-white dark:bg-slate-900 shadow-2xl p-8 rounded-xl"
          onSubmit={handelSubmit}
        >
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {formtTitle}
          </h1>

          {mode === MODE.REGISTER && (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-700 dark:text-slate-300">
                UserName
              </label>
              <div className=" ring-2 dark:text-gray-100 text-gray-700 ring-slate-300 dark:ring-slate-700 rounded-md p-3 focus-within:ring-blue-700 dark:focus-within:ring-blue-700 transition">
                <input
                  type="text"
                  placeholder="john"
                  autoComplete="name"
                  className="w-full bg-transparent outline-none"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
          )}

          {mode !== MODE.EAMIL_VERIFICATION ? (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-700 dark:text-slate-300">
                E-mail
              </label>
              <div className=" ring-2 dark:text-gray-100 text-gray-700 ring-slate-300 dark:ring-slate-700 rounded-md p-3 focus-within:ring-blue-700 dark:focus-within:ring-blue-700 transition">
                <input
                  type="email"
                  placeholder="john@exmple.com"
                  autoComplete="email"
                  className="w-full bg-transparent outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-700 dark:text-slate-300">
                Verification Code
              </label>
              <input
                type="text"
                placeholder="Code"
                className="ring-2 dark:text-gray-100 text-gray-700 ring-slate-300 dark:ring-slate-700 rounded-md p-3 bg-transparent "
                onChange={(e) => setEmailCode(e.target.value)}
              />
            </div>
          )}

          {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="flex items-center justify-between ring-2 dark:text-gray-100 text-gray-700 ring-slate-300 dark:ring-slate-700 rounded-md p-3 focus-within:ring-blue-700 dark:focus-within:ring-blue-700 transition">
                <input
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full bg-transparent outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          {mode === MODE.LOGIN && (
            <div
              className={myClass}
              onClick={() => setMode(MODE.RESET_PASSWORD)}
            >
              Forgot Password?
            </div>
          )}

          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition disabled:bg-indigo-400"
            disabled={isLoding}
          >
            {isLoding ? "Loading..." : buttonTitle}
          </button>

          {error && <div className="text-red-600">{error}</div>}

          {mode === MODE.LOGIN && (
            <div className={myClass} onClick={() => setMode(MODE.REGISTER)}>
              <p>Don&apos;t have an account?</p>
            </div>
          )}
          {mode === MODE.REGISTER && (
            <div className={myClass} onClick={() => setMode(MODE.LOGIN)}>
              Already have an account?
            </div>
          )}
          {mode === MODE.RESET_PASSWORD && (
            <div className={myClass} onClick={() => setMode(MODE.LOGIN)}>
              Go back to login
            </div>
          )}

          {message && (
            <div
              className={`text-sm text-center ${
                message.includes("Successful") || message.includes("reset link")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {cooldown > 0
                ? `Too many attempts. Please try again after ${cooldown} seconds`
                : message}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default LoginPage;
