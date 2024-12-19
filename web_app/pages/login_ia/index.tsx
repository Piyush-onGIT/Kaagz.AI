import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "../../public/assets/img/logo.png";

import data from "../../db/data.json";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter(); // Use the useRouter hook

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email and password against data.json
    const user = data.find(
      (item: { type: string; email: string; password: string }) =>
        item.type === "issuing_auth" && item.email === email
    );

    console.log(user);

    if (user && user.password === password) {
      setSuccess(true);
      setError("");
      localStorage.setItem("email", email);
      localStorage.setItem("type", "issuing_authority");
      router.push("/ia"); // Redirect to the /user page
    } else {
      setError("Invalid email or password");
      setSuccess(false);
    }
  };

  return (
    <>
      <div className="w-[100vw] ">
        <a href="/">
          <div className="flex items-center justify-center rounded-md border-3 bg-[#0056b3] w-min m-2 p-2 text-white mb-[-50px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
          </div>
        </a>
      </div>
      <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-14 w-auto"
            src={Logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in as an Issuing Authority
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0056b3] sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-[#0056b3] hover:text-[#0055a0]"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0056b3] sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#0056b3] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#0055a0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0056b3]"
              >
                Sign in
              </button>
            </div>
          </form>

          {error && (
            <p className="mt-4 text-center text-sm/6 text-red-500">{error}</p>
          )}
          {success && (
            <p className="mt-4 text-center text-sm/6 text-green-500">
              Login successful!
            </p>
          )}

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <a
              href="signup_user"
              className="font-semibold text-[#0056b3] hover:text-[#0055a0]"
            >
              Go to signup page
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
